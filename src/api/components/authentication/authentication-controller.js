const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    return response.status(200).json(loginSuccess);
  } catch (error) {
    // Tangani kesalahan dengan benar
    if (error.statusCode && error.statusCode === 403) {
      // Jika kode status adalah 403, kirim respons dengan status 403
      return response.status(403).json({
        statusCode: error.statusCode,
        error: error.error,
        description: error.description,
        message: error.message,
      });
    } else {
      // Jika kode status bukan 403, lempar kesalahan ke middleware berikutnya
      return next(error);
    }
  }
}

module.exports = {
  login,
};
