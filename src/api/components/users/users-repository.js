const { User } = require('../../../models');

/**
 * Mengambil data user menggunakan fungsi page_number, page_size, sort, dan search
 * @param {object} options - parameter options berupa object
 * @returns {Promise} - mengembalikan objek selesai yang berisi data user yang diberi nomor halaman
 */
async function getUsers(options) {
  // fungsi constant dari parameter options dengan memiliki nilai default di masing-masing objek
  // page number dibuat defaultnya yakni 1
  // page size dibaut defaultnya yakni 10
  const { page_number = 1, page_size = 10, search = {}, sort = {} } = options;

  // fungsi constant filter untuk menyimpan karakteristik pencarian dari user
  const filter = {};

  // fungsi if untuk membuat penyaringan data berdasarkan kata kunci pencarian
  if (search.field && search.key) {
    filter[search.field] = { $regex: search.key, $options: 'i' };
  }

  // fungsi query untuk mengambil data user dari database
  const query = User.find(filter);

  // fungsi count untuk menghitung total data yang sesuai dengan pencarian
  const count = await User.countDocuments(filter);

  // User dapat menambahkan kriteria seperti ascending atau descending
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

  // menjalankan fungsi query untuk mendapat data user yang sesuai
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
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
