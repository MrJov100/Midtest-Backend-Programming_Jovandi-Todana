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
// Fungsi async untuk mendapatkan kupon berdasarkan ID
async function getCoupon(request, response, next) {
  try {
    // Mendapatkan ID dari parameter request
    const id = request.params.id;
    // Mendapatkan kupon dengan ID yang diberikan
    const coupon = await couponsService.getCoupon(id);

    // Jika kupon tidak ditemukan, maka error
    if (!coupon) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Kupon tidak diketahui'
      );
    }
    // Mengembalikan kupon dalam format JSON jika berhasil
    return response.status(200).json(coupon);
  } catch (error) {
    // Menangani error dengan meneruskannya ke middleware berikutnya
    return next(error);
  }
}

/**
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
// Fungsi async untuk membuat kupon baru
async function createCoupon(request, response, next) {
  try {
    // Mendapatkan data kupon dari body request
    const {
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions,
    } = request.body;

    // Membuat kupon dengan data yang diberikan
    const berhasil = await couponsService.createCoupon(
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions
    );

    // Jika gagal membuat kupon, lemparkan error
    if (!berhasil) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Gagal membuat kupon'
      );
    }

    // Mengembalikan data kupon yang baru dibuat dalam format JSON jika berhasil
    return response.status(200).json({
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions,
    });
  } catch (error) {
    // Menangani error dengan mencetak pesan kesalahan dan meneruskannya ke middleware berikutnya
    console.error('Gagal membuat kupon:', error);
    return next(error);
  }
}

// Fungsi async untuk mengupdate kupon yang ada
async function updateCoupon(request, response, next) {
  try {
    // Mendapatkan ID kupon dari parameter request
    const coupon_id = request.params.id;

    // Mendapatkan data kupon dari body request
    const {
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions,
    } = request.body;

    // Mengupdate kupon dengan data yang diberikan
    const berhasil = await couponsService.updateCoupon(
      coupon_id,
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions
    );

    // Jika gagal mengupdate kupon, maka error
    if (!berhasil) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Gagal update kupon'
      );
    }

    // Mengembalikan data kupon yang diupdate dalam format JSON jika berhasil
    return response.status(200).json({
      id: coupon_id,
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions,
    });
  } catch (e) {
    // Menangani error dengan meneruskannya ke middleware berikutnya
    return next(e);
  }
}

// Fungsi async untuk menghapus kupon
async function deleteCoupon(request, response, next) {
  try {
    // Mendapatkan ID kupon dari parameter request
    const id = request.params.id;

    // Menghapus kupon berdasarkan ID
    const berhasil = await couponsService.deleteCoupon(id);
    // Jika gagal menghapus kupon, lemparkan error
    if (!berhasil) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Gagal hapus kupon'
      );
    }

    // Mengembalikan data kupon yang dihapus dalam format JSON jika berhasil
    return response.status(200).json({ id: id });
  } catch (err) {
    // Menangani error dengan meneruskannya ke middleware berikutnya
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
