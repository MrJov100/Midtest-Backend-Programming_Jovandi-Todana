const joi = require('joi'); // Mengimpor modul Joi untuk validasi data.

module.exports = {
  createCoupon: {
    // Membuat objek untuk validasi pembuatan kupon.
    body: {
      coupons_date_expired: joi // Memvalidasi tanggal kedaluwarsa kupon
        .string() // Menentukan bahwa nilai harus berupa string
        .min(1) // Menentukan panjang minimal string yakni 1
        .max(100) // Menentukan panjang maksimal string yakni 100
        .required() // Menyatakan bahwa nilai harus diisi
        .label('Coupons Date Expire'), // Menambahkan label untuk pesan kesalahan

      coupons_name: joi // Memvalidasi nama kupon
        .string() // Menentukan bahwa nilai harus berupa string
        .min(1) // Menentukan panjang minimal string yakni 1
        .max(100) // Menentukan panjang maksimal string yakni 100
        .required() // Menyatakan bahwa nilai harus diisi
        .label('Coupons Name'), // Menambahkan label untuk pesan kesalahan

      coupons_discount_percentage: joi // Memvalidasi persentase diskon kupon
        .number() // Menentukan bahwa nilai harus berupa angka
        .min(1) // Menentukan nilai minimal yakni 1
        .max(100) // Menentukan nilai maksimal yakni 100
        .required() // Menyatakan bahwa nilai harus diisi.
        .label('Coupons Discount Percentage'), // Menambahkan label untuk pesan kesalahan

      coupons_term_and_conditions: joi // Memvalidasi syarat dan ketentuan kupon
        .string() // Menentukan bahwa nilai harus berupa string
        .min(1) // Menentukan panjang minimal string yakni 1
        .max(200) // Menentukan panjang maksimal string  yakni 200
        .required() // Menyatakan bahwa nilai harus diisi
        .label('Coupons Terms and Conditions'), // Menambahkan label untuk pesan kesalahan
    },
  },

  updateCoupon: {
    // Membuat objek untuk validasi pembaruan kupon
    body: {
      coupons_date_expired: joi // Memvalidasi tanggal kedaluwarsa kupon
        .string() // Menentukan bahwa nilai harus berupa string
        .min(1) // Menentukan panjang minimal string yakni 1
        .max(100) // Menentukan panjang maksimal string  yakni 100
        .required() // Menyatakan bahwa nilai harus diisi
        .label('Coupons Date Expire'), // Menambahkan label untuk pesan kesalahan

      coupons_name: joi // Memvalidasi nama kupon
        .string() // Menentukan bahwa nilai harus berupa string
        .min(1) // Menentukan panjang minimal string yakni 1
        .max(100) // Menentukan panjang maksimal string yakni 100
        .required() // Menyatakan bahwa nilai harus diisi
        .label('Coupons Name'), // Menambahkan label untuk pesan kesalahan

      coupons_discount_percentage: joi // Memvalidasi persentase diskon kupon
        .number() // Menentukan bahwa nilai harus berupa angka
        .min(1) // Menentukan nilai minimal yakni 1
        .max(100) // Menentukan nilai maksimal yakni 100
        .required() // Menyatakan bahwa nilai harus diisi
        .label('Coupons Discount Percentage'), // Menambahkan label untuk pesan kesalahan

      coupons_term_and_conditions: joi // Memvalidasi syarat dan ketentuan kupon
        .string() // Menentukan bahwa nilai harus berupa string
        .min(1) // Menentukan panjang minimal string yakni 1
        .max(200) // Menentukan panjang maksimal string yakni 200
        .required() // Menyatakan bahwa nilai harus diisi
        .label('Coupons Terms and Conditions'), // Menambahkan label untuk pesan kesalahan.
    },
  },
};
