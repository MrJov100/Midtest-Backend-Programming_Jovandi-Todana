const { Coupon } = require('../../../models');

/**
 * Fungsi untuk mendapatkan semua kupon dari database
 * @param {object} options
 * @returns {Promise}
 */
async function getCoupons(options) {
  // fungsi constant dari parameter options dengan memiliki nilai default di masing-masing objek
  // page number dibuat defaultnya yakni 1
  // page size dibaut defaultnya yakni 10
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

  // Admin dapat menambhkan kriteria seperti ascending atau descending
  if (sort.field) {
    // ketika descending, maka nilai akan -1
    // ketika ascending, maka nilai akan 1
    const sortOrder = sort.order === 'desc' ? -1 : 1;
    query.sort({ [sort.field]: sortOrder });
  }

  // fungsi lewatData untuk menghitng berapa data yang dilewati berdasarkan nomor halaman
  const lewatData = (page_number - 1) * page_size;
  // menerapkan fungsi lewat dan limit pada query
  query.skip(lewatData).limit(page_size);

  // menjalankan fungsi query untuk mendapat data kupon yang sesuai
  const data = await query.exec();

  // fungsi total_pages untuk menghitung total halaman
  const total_pages = Math.ceil(count / page_size);
  // fungsi untuk memeriksa apakah halaman sebelm dan selanjutnya tersedia
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
 * @param {string} id // Parameter id adalah ID kupon yang akan dicari
 * @returns {Promise} // Mengembalikan promise dari operasi pencarian kupon
 */
async function getCoupon(id) {
  // Mendefinisikan fungsi asynchronous untuk mendapatkan kupon berdasarkan ID
  return Coupon.findById(id); // Menggunakan model Coupon untuk mencari kupon berdasarkan ID
}

/**
 * Fungsi ini untuk membuat kupon baru di database
 * @param {string} coupons_date_expired -tanggal kedaluwarsa kupon
 * @param {string} coupons_name -nama kupon
 * @param {number} coupons_discount_percentage -persentase diskon kupon
 * @param {string} coupons_term_and_conditions -syarat dan ketentuan kupon
 * @returns {Promise} - Mengembalikan promise dari operasi pembuatan kupon
 */
async function createCoupon(
  coupons_date_expired,
  coupons_name,
  coupons_discount_percentage,
  coupons_term_and_conditions
) {
  // Mendefinisikan fungsi asynchronous untuk membuat kupon baru di database
  return Coupon.create({
    // Membuat kupon baru menggunakan model Coupon
    coupons_date_expired,
    coupons_name,
    coupons_discount_percentage,
    coupons_term_and_conditions,
  });
}

/**
 * Fungsi ini untuk memperbarui kupon di database
 * @param {string} id - Parameter id adalah ID kupon yang akan diperbarui
 * @param {string} coupons_date_expired - tanggal kedaluwarsa kupon
 * @param {string} coupons_name - nama kupon.
 * @param {number} coupons_discount_percentage - persentase diskon kupon
 * @param {string} coupons_term_and_conditions -syarat dan ketentuan kupon
 * @returns {Promise} - Mengembalikan promise dari operasi pembaruan kupon
 */
async function updateCoupon(
  id,
  coupons_date_expired,
  coupons_name,
  coupons_discount_percentage,
  coupons_term_and_conditions
) {
  // Mendefinisikan fungsi asynchronous untuk memperbarui kupon di database
  return Coupon.updateOne(
    // Memperbarui kupon dengan menggunakan model Coupon
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
 * @param {string} id - Parameter id adalah ID kupon yang akan dihapus
 * @returns {Promise} - Mengembalikan promise dari operasi penghapusan kupon
 */
async function deleteCoupon(id) {
  // Mendefinisikan fungsi asynchronous untuk menghapus kupon dari basis data
  await Coupon.deleteOne({ _id: id }); // Menghapus kupon dengan menggunakan model Coupon
}

// Ekspor fungsi-fungsi agar dapat digunakan oleh file lainnya
module.exports = {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
