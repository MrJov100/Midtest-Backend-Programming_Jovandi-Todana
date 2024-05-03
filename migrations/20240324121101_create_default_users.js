const logger = require('../src/core/logger')('api');
const { User } = require('../src/models');
const { Coupon } = require('../src/models');
const { hashPassword } = require('../src/utils/password');

const name = 'Administrator';
const email = 'admin@example.com';
const password = '123456';

const coupons_date_expired = '2024/01/01';
const coupons_name = 'KUPON24';
const coupons_discount_percentage = '24';
const coupons_term_and_conditions = 'Syarat & Kondisi Berlaku';

(async () => {
  try {
    await Coupon.create({
      coupons_date_expired,
      coupons_name,
      coupons_discount_percentage,
      coupons_term_and_conditions,
    });
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();

logger.info('Creating default users');

(async () => {
  try {
    const numUsers = await User.countDocuments({
      name,
      email,
    });

    if (numUsers > 0) {
      throw new Error(`User ${email} already exists`);
    }

    const hashedPassword = await hashPassword(password);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (e) {
    logger.error(e);
  } finally {
    process.exit(0);
  }
})();
