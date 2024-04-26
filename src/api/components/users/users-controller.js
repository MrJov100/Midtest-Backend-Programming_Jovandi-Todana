const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Mengatasi permintaan untuk mendapat daftar user
 * @param {object} request - Objek request Express
 * @param {object} response - Objek respons Express
 * @param {object} next - Middleware rute Express
 * @returns {object} Objek respons untuk meneruskan kesalahan ke berikutnya
 */
async function getUsers(request, response, next) {
  try {
    // fungsi constant untuk mendapat paramter query reuqest
    const { page_number, page_size, search, sort } = request.query;
    // fungsi constant options untuk menciptakan objek berdasarkan parameter query
    const options = {
      page_number: parseInt(page_number) || 1, // nomor halaman dengan default: 1
      page_size: parseInt(page_size) || 10, // jumlah data per halaman dengan default 10
      search: parseSearchQuery(search), // opsi untuk pencarian
      sort: parseSortQuery(sort), // opsi untuk urut
    };

    // fungsi untuk mendapatkan daftar user berdasarkan opsi
    const users = await usersService.getUsers(options);

    // fungsi untuk mengembalikan daftar user sebagai respons
    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

/**
 * Melakukan parse string query pengurutan menjadi sebuah objek
 * @param {string} sortQuery - String query pengurutan
 * @returns {Object} objek opsi pengurutan data
 */
function parseSortQuery(sortQuery) {
  // fungsi jika tidak terdapat query pengurutan,
  // maka akan dikembalikan sebuah objek kosong
  if (!sortQuery) return {};

  // Memecah string query pengurutan menjadi field dan sort
  const [field, order] = sortQuery.split(':');

  // Mengembalikan objek opsi pengurutan
  return { field, order };
}

/**
 * Melakukan parse string query pencarian menjadi sebauh obyek
 * @param {string} searchQuery - String query pencarian
 * @returns {Object} objek opsi pencarian data
 */
function parseSearchQuery(searchQuery) {
  // fungsi bekerja jika tidak ada query pencarian,
  // maka akan kembalikan sebuah objek ksong
  if (!searchQuery) return {};
  // Memecah string query pencarian menjadi field dan kata kunci
  const [field, key] = searchQuery.split(':');
  // Mengembalikan objek opsi pencarian
  return { field, key };
}

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getUser(request, response, next) {
  try {
    const user = await usersService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown user');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createUser(request, response, next) {
  try {
    const name = request.body.name;
    const email = request.body.email;
    const password = request.body.password;
    const password_confirm = request.body.password_confirm;

    // Check confirmation password
    if (password !== password_confirm) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Password confirmation mismatched'
      );
    }

    // Email must be unique
    const emailIsRegistered = await usersService.emailIsRegistered(email);
    if (emailIsRegistered) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email is already registered'
      );
    }

    const success = await usersService.createUser(name, email, password);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(200).json({ name, email });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateUser(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const email = request.body.email;

    // Email must be unique
    const emailIsRegistered = await usersService.emailIsRegistered(email);
    if (emailIsRegistered) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email is already registered'
      );
    }

    const success = await usersService.updateUser(id, name, email);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteUser(request, response, next) {
  try {
    const id = request.params.id;

    const success = await usersService.deleteUser(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle change user password request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function changePassword(request, response, next) {
  try {
    // Check password confirmation
    if (request.body.password_new !== request.body.password_confirm) {
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        'Password confirmation mismatched'
      );
    }

    // Check old password
    if (
      !(await usersService.checkPassword(
        request.params.id,
        request.body.password_old
      ))
    ) {
      throw errorResponder(errorTypes.INVALID_CREDENTIALS, 'Wrong password');
    }

    const changeSuccess = await usersService.changePassword(
      request.params.id,
      request.body.password_new
    );

    if (!changeSuccess) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to change password'
      );
    }

    return response.status(200).json({ id: request.params.id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
};
