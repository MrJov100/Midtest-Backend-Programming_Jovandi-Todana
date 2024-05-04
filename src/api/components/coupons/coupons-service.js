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
 * @param {string} id - Parameter id adalah ID kupon yang akan dicari
 * @returns {Object} - Mengembalikan objek kupon jika ditemukan, jika tidak, kembalikan null
 */
async function getCoupon(id) {
  // Mengambil data kupon dari repository
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
 * @param {string} coupons_date_expired - tanggal kedaluwarsa kupon
 * @param {string} coupons_name - nama kupon
 * @param {number} coupons_discount_percentage - persentase diskon kupon
 * @param {string} coupons_term_and_conditions - syarat dan ketentuan kupon
 * @returns {boolean} - Mengembalikan true jika kupon berhasil dibuat
 */
async function createCoupon(
  coupons_date_expired,
  coupons_name,
  coupons_discount_percentage,
  coupons_term_and_conditions
) {
  try {
    // Mendefinisikan fungsi asynchronous untuk membuat kupon baru
    await couponsRepository.createCoupon(
      // Mencoba membuat kupon baru dengan menggunakan repository
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions
    );
    return true; // Mengembalikan true jika kupon berhasil dibuat
  } catch (error) {
    // Menangkap kesalahan jika gagal membuat kupon
    throw new Error('Failed to create new coupon'); // Melempar kesalahan dengan pesan yang sesuai
  }
}

/**
 * Fungsi ini untuk memperbarui kupon
 * @param {string} id - Parameter id adalah ID kupon yang akan diperbarui
 * @param {string} coupons_date_expired // tanggal kedaluwarsa kupon
 * @param {string} coupons_name // nama kupon
 * @param {number} coupons_discount_percentage - persentase diskon kupon
 * @param {string} coupons_term_and_conditions - syarat dan ketentuan kupon
 * @returns {boolean} - Mengembalikan true jika kupon berhasil diperbarui
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
      // Mencoba memperbarui kupon dengan menggunakan repository
      id,
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions
    );
    return true; // Mengembalikan true jika kupon berhasil diperbarui
  } catch (err) {
    // Menangkap kesalahan jika gagal memperbarui kupon
    throw new Error('Failed to update coupon'); // Melempar kesalahan dengan pesan yang sesuai
  }
}

/**
 * Fungsi ini untuk menghapus kupon
 * @param {string} id - Parameter id adalah ID kupon yang akan dihapus.
 * @returns {boolean} - Mengembalikan true jika kupon berhasil dihapus.
 */
async function deleteCoupon(id) {
  try {
    await couponsRepository.deleteCoupon(id); // Mencoba menghapus kupon dengan menggunakan repository
    return true; // Mengembalikan true jika kupon berhasil dihapus
  } catch (err) {
    // Menangkap kesalahan jika gagal menghapus kupon
    throw new Error('Failed to delete coupon'); // Melempar kesalahan dengan pesan yang sesuai
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
