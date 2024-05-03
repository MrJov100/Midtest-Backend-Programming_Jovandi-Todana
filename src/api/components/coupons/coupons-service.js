const couponsRepository = require('./coupons-repository');

// Fungsi untuk mendapatkan semua kupon
/**
 * @returns {Array}
 */
async function getCoupons() {
  const coupons = await couponsRepository.getCoupons();

  const results = [];
  for (let i = 0; i < coupons.length; i += 1) {
    const coupon = coupons[i];
    results.push({
      id: coupon._id, // Menggunakan _id sebagai ID kupon
      coupons_date_expired: coupon.coupons_date_expired,
      coupons_name: coupon.coupons_name,
      coupons_discount_percentage: coupon.coupons_discount_percentage,
      coupons_term_and_conditions: coupon.coupons_term_and_conditions,
    });
  }
  return results;
}

/**
 * @param {string} id
 * @returns {Object}
 */
async function getCoupon(id) {
  const coupon = await couponsRepository.getCoupon(id);

  // Kupon tidak ditemukan
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

// Fungsi untuk membuat kupon baru
/**
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

// Fungsi untuk memperbarui kupon
/**
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

// Fungsi untuk menghapus kupon
/**
 *
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

// Ekspor fungsi-fungsi agar dapat digunakan oleh file lainnya
module.exports = {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
