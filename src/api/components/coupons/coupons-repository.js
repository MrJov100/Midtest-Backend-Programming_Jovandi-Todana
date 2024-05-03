const { Coupon } = require('../../../models');

// Fungsi untuk mendapatkan semua kupon dari basis data
/**
 * @returns {Promise}
 */
async function getCoupons() {
  return Coupon.find({});
}

/**
 * @param {string} id
 * @returns {Promise}
 */
async function getCoupon(id) {
  return Coupon.findById(id);
}

// Fungsi untuk membuat kupon baru di basis data
/**
 * @param {string} coupons_date_expired
 * @param {string} coupons_name
 * @param {number} coupons_discount_percentage
 * @param {string} coupons_term_and_conditions
 * @returns {Promise}
 */
async function createCoupon(
  coupons_date_expired,
  coupons_name,
  coupons_discount_percentage,
  coupons_term_and_conditions
) {
  return Coupon.create({
    coupons_date_expired,
    coupons_name,
    coupons_discount_percentage,
    coupons_term_and_conditions,
  });
}

// Fungsi untuk memperbarui kupon di basis data
/**
 * @param {string} id
 * @param {string} coupons_date_expired
 * @param {string} coupons_name
 * @param {number} coupons_discount_percentage
 * @param {string} coupons_term_and_conditions
 * @returns {Promise}
 */
async function updateCoupon(
  id,
  coupons_date_expired,
  coupons_name,
  coupons_discount_percentage,
  coupons_term_and_conditions
) {
  return Coupon.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        coupons_date_expired,
        coupons_name,
        coupons_discount_percentage,
        coupons_term_and_conditions,
      },
    }
  );
}

// Fungsi untuk menghapus kupon dari basis data
/**
 * @param {string} id
 * @returns {Promise}
 */
async function deleteCoupon(id) {
  await Coupon.deleteOne({ _id: id });
}

// Ekspor fungsi-fungsi agar dapat digunakan oleh file lainnya
module.exports = {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
