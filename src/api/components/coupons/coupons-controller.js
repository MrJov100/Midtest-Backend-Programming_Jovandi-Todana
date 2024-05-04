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
    // fungsi constant untuk mendapat paramter query reuqest
    const { page_number, page_size, search, sort } = request.query;
    // fungsi constant options untuk menciptakan objek berdasarkan parameter query
    const options = {
      page_number: parseInt(page_number) || 1, // nomor halaman dengan default: 1
      page_size: parseInt(page_size) || 10, // jumlah data per halaman dengan default 10
      search: parseSearchQuery(search), // opsi untuk pencarian
      sort: parseSortQuery(sort), // opsi untuk urut
    };

    // fungsi untuk mendapatkan daftar kupon berdasarkan opsi
    const coupons = await couponsService.getCoupons(options);

    // fungsi untuk mengembalikan daftar kupon sebagai respons
    return response.status(200).json(coupons);
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
    console.error('Gagal membuat kupon:', error);
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
      coupon_id,
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions
    );

    if (!berhasil) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
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
        errorTypes.UNPROCESSABLE_ENTITY,
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
