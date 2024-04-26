const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Mengambil daftar user dengan nomor halaman, pencarian kata kunci dan opsi pencarian asc/desc
 * @param {Object} options - parameter options berupa object
 * @returns {Object} - Mengembalikan object yang berisi data user
 */

async function getUsers(options) {
  // Panggil fungsi dari usersRepository dengan menggunakan options object
  const users = await usersRepository.getUsers(options);

  // Menampilkan data pengguna seperti id, name, email
  const results = users.data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));

  // fungsi ini akan menampilkan semua daftar yang perlu ditampilkan
  return {
    page_number: users.page_number, // menampilkan nomor halaman
    page_size: users.page_size, // menampilkan banyak pengguna tiap halaman
    count: users.count, // menampilkan total pengguna
    total_pages: users.total_pages, // menampilkan total halaman
    has_previous_page: users.has_previous_page, // menyatakan halaman sebelumnya dengan true / false
    has_next_page: users.has_next_page, // menyatakan halaman selanjutnya dengan true / false
    data: results, // data pengguna seperti id, name, email
  };
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the email is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function emailIsRegistered(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (user) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(userId, password) {
  const user = await usersRepository.getUser(userId);
  return passwordMatched(password, user.password);
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  // Check if user not found
  if (!user) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await usersRepository.changePassword(
    userId,
    hashedPassword
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailIsRegistered,
  checkPassword,
  changePassword,
};
