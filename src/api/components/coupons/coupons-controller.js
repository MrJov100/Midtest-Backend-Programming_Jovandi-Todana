const couponsService = require('./coupons-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getCoupons(request, response, next) {
  try {
    const coupons = await couponsService.getCoupons();
    return response.status(200).json(coupons);
  } catch (error) {
    return next(error);
  }
}

/**
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getCoupon(request, response, next) {
  try {
    const id = request.params.id;
    const coupon = await couponsService.getCoupon(id);

    if (!coupon) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Kupon tidak diketahui'
      );
    }
    return response.status(200).json(coupon);
  } catch (error) {
    return next(error);
  }
}

/**
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createCoupon(request, response, next) {
  try {
    const {
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions,
    } = request.body;

    const berhasil = await couponsService.createCoupon(
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions
    );

    if (!berhasil) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Gagal membuat kupon'
      );
    }

    return response.status(200).json({
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions,
    });
  } catch (error) {
    // Menampilkan pesan kesalahan lebih rinci
    console.error('Error while creating coupon:', error);
    // Melanjutkan ke middleware error handler berikutnya
    return next(error);
  }
}

/**
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateCoupon(request, response, next) {
  try {
    const coupon_id = request.params.id;

    const {
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions,
    } = request.body;

    const berhasil = await couponsService.updateCoupon(
      coupon_id, // Memperbarui agar menggunakan coupon_id
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions
    );

    if (!berhasil) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY, // Memperbaiki pengejaan
        'Gagal update kupon'
      );
    }

    return response.status(200).json({
      id: coupon_id,
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions,
    });
  } catch (e) {
    return next(e);
  }
}

/**
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteCoupon(request, response, next) {
  try {
    const id = request.params.id;

    const berhasil = await couponsService.deleteCoupon(id);
    if (!berhasil) {
      throw errorResponder(
        errortypes.UNPROCESSABLE_ENTITY,
        'Gagal hapus kupon'
      );
    }

    return response.status(200).json({ id: id });
  } catch (err) {
    return next(err);
  }
}

// Ekspor fungsi-fungsi agar dapat digunakan oleh file lainnya
module.exports = {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
