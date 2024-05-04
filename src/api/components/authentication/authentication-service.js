const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');

const waktuTerakhirLogin = {};

const percobaanLoginGagal = {};

const batasGagalLogin = 5;

const hukumanWaktuTunggu = 30 * 60 * 1000; // hitungan ini berarti 30 menit dalam milidetik

/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(email, password) {
  const user = await authenticationRepository.getUserByEmail(email);

  // Fungsi pengecekan apabila email user sudah melebihi batasGagalLogin
  if (
    percobaanLoginGagal[email] >= batasGagalLogin &&
    Date.now() - waktuTerakhirLogin[email] < hukumanWaktuTunggu
  ) {
    // Apabila user gagal login sebanyak 5 kali, akan mendapat error
    // dan pesan bahwa gagal login melebihi limit
    throw {
      statusCode: 403,
      error: 'FORBIDDEN',
      description: 'TOO MANY FAILED LOGIN ATTEMPTS',
      message:
        'Anda telah mencoba login melebihi limit attempt! Silahkan tunggu 30 menit untuk mencoba lagi!',
    };
  }

  // We define default user password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the user login is invalid. We still want to
  // check the password anyway, so that it prevents the attacker in
  // guessing login credentials by looking at the processing time.
  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  // Because we always check the password (see above comment), we define the
  // login attempt as successful when the `user` is found (by email) and
  // the password matches.
  if (user && passwordChecked) {
    // Fungsi ini bekerja apabila user berhasil login
    // Fungsi akan memulai kembali perhitungan gagal login dan waktu login
    resetPemeriksaanGagalLogin(email);

    return {
      email: user.email,
      name: user.name,
      user_id: user.id,
      token: generateToken(user.email, user.id),
    };
  } else {
    // Fungsi ini akan menghitung dan menyimpan jumlah user gagal login
    waktuTerakhirLogin[email] = Date.now();
    // Menghitung jumlah percobaan gagal logil pada email user
    percobaanLoginGagal[email] = (percobaanLoginGagal[email] || 0) + 1;

    // Apabila user gagal login sebanyak 5 kali, sistem akan melempar error
    if (percobaanLoginGagal[email] >= batasGagalLogin) {
      throw {
        statusCode: 403,
        statusCode: 403,
        error: 'FORBIDDEN',
        description: 'TOO MANY FAILED LOGIN ATTEMPTS',
        message:
          'Anda telah mencoba login melebihi limit attempt! Silahkan tunggu 30 menit untuk mencoba lagi!',
      };
    }
  }

  return null;
}

/**
 * Fungsi ini berguna untuk memulai kembali semua perhitungan gagal login
 * @param {string} email - email user
 */
function resetPemeriksaanGagalLogin(email) {
  percobaanLoginGagal[email] = 0;
  waktuTerakhirLogin[email] = null;
}

module.exports = {
  checkLoginCredentials,
};
