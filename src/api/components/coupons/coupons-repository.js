const { Coupon } = require('../../../models');

/**
 * Fungsi untuk mendapatkan semua kupon dari database
 * @param {object} options
 * @returns {Promise}
 */
async function getCoupons(options) {
  const { page_number = 1, page_size = 10, search = {}, sort = {} } = options;

  // fungsi constant filter untuk menyimpan karakteristik pencarian dari kupon
  const filter = {};

  // fungsi if untuk membuat penyaringan data berdasarkan kata kunci pencarian
  if (search.field && search.key) {
    filter[search.field] = { $regex: search.key, $options: 'i' };
  }

  // fungsi query untuk mengambil data kupon dari database
  const query = Coupon.find(filter);

  // fungsi count untuk menghitung total data yang sesuai dengan pencarian
  const count = await Coupon.countDocuments(filter);

  // Admin dapat menambahkan kriteria seperti ascending atau descending
  if (sort.field) {
    // ketika descending, maka nilai akan -1
    // ketika ascending, maka nilai akan 1
    const sortOrder = sort.order === 'desc' ? -1 : 1;
    query.sort({ [sort.field]: sortOrder });
  }

  // fungsi lewatData untuk menghitung berapa data yang dilewati berdasarkan nomor halaman
  const lewatData = (page_number - 1) * page_size;
  // menerapkan fungsi lewat dan limit pada query
  query.skip(lewatData).limit(page_size);

  // menjalankan fungsi query untuk mendapat data kupon yang sesuai
  const data = await query.exec();

  // fungsi total_pages untuk menghitung total halaman
  const total_pages = Math.ceil(count / page_size);
  // fungsi untuk memeriksa apakah halaman sebelum dan selanjutnya tersedia
  const has_previous_page = page_number > 1;
  const has_next_page = page_number < total_pages;

  // mengembalikan objek yang berisi data pengguna dan objek yang lainnya
  return {
    page_number,
    page_size,
    count,
    total_pages,
    has_previous_page,
    has_next_page,
    data,
  };
}

/**
 * @param {string} id
 * @returns {Promise}
 */
async function getCoupon(id) {
  return Coupon.findById(id);
}

/**
 * Fungsi ini untuk membuat kupon baru di database
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

/**
 * Fungsi ini untuk memperbarui kupon di database
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

/**
 * Fungsi untuk menghapus kupon dari basis data
 * @param {string} id
 * @returns {Promise}
 */
async function deleteCoupon(id) {
  await Coupon.deleteOne({ _id: id });
}

module.exports = {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
