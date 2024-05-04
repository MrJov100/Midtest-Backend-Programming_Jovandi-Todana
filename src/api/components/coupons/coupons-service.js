const couponsRepository = require('./coupons-repository');

/**
 * Fungsi ini untuk mendapatkan semua kupon
 * @param {Object} options
 * @returns {Array}
 */
async function getCoupons(options) {
  const coupons = await couponsRepository.getCoupons(options);

  // Menampilkan data kupon
  const results = coupons.data.map((coupon) => ({
    id: coupon._id, // Menggunakan _id sebagai ID kupon
    coupons_date_expired: coupon.coupons_date_expired,
    coupons_name: coupon.coupons_name,
    coupons_discount_percentage: coupon.coupons_discount_percentage,
    coupons_term_and_conditions: coupon.coupons_term_and_conditions,
  }));

  // fungsi ini akan menampilkan semua daftar yang perlu ditampilkan
  return {
    page_number: coupons.page_number, // menampilkan nomor halaman
    page_size: coupons.page_size, // menampilkan banyak pengguna tiap halaman
    count: coupons.count, // menampilkan total pengguna
    total_pages: coupons.total_pages, // menampilkan total halaman
    has_previous_page: coupons.has_previous_page, // menyatakan halaman sebelumnya dengan true / false
    has_next_page: coupons.has_next_page, // menyatakan halaman selanjutnya dengan true / false
    data: results, // data kupon
  };
}

/**
 * @param {string} id
 * @returns {Object}
 */
async function getCoupon(id) {
  const coupon = await couponsRepository.getCoupon(id);

  // Jika kupon tidak ditemukan, maka kembalikan null
  if (!coupon) {
    return null;
  }

  return {
    id: coupon._id, // Menggunakan _id sebagai ID kupon
    coupons_date_expired: coupon.coupons_date_expired,
    coupons_name: coupon.coupons_name,
    coupons_discount_percentage: coupon.coupons_discount_percentage,
    coupons_term_and_conditions: coupon.coupons_term_and_conditions,
  };
}

/**
 * Fungsi ini untuk membuat kupon baru
 * @param {string} coupons_date_expired
 * @param {string} coupons_name
 * @param {number} coupons_discount_percentage
 * @param {string} coupons_term_and_conditions
 * @returns {boolean}
 */
async function createCoupon(
  coupons_date_expired,
  coupons_name,
  coupons_discount_percentage,
  coupons_term_and_conditions
) {
  try {
    await couponsRepository.createCoupon(
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions
    );
    return true;
  } catch (error) {
    throw new Error('Failed to create new coupon');
  }
}

/**
 * Fungsi ini untuk memperbarui kupon
 * @param {string} id
 * @param {string} coupons_date_expired
 * @param {string} coupons_name
 * @param {number} coupons_discount_percentage
 * @param {string} coupons_term_and_conditions
 * @returns {boolean}
 */
async function updateCoupon(
  id,
  coupons_date_expired,
  coupons_name,
  coupons_discount_percentage,
  coupons_term_and_conditions
) {
  try {
    await couponsRepository.updateCoupon(
      id,
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions
    );
    return true;
  } catch (err) {
    throw new Error('Failed to update coupon');
  }
}

/**
 * Fungsi ini untuk menghapus kupon
 * @param {string} id
 * @returns {boolean}
 */
async function deleteCoupon(id) {
  try {
    await couponsRepository.deleteCoupon(id);
    return true;
  } catch (err) {
    throw new Error('Failed to delete coupon');
  }
}

module.exports = {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
