const joi = require('joi');

module.exports = {
  createCoupon: {
    body: {
      coupons_date_expired: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('Coupons Date Expire'),
      coupons_name: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('Coupons Name'),
      coupons_discount_percentage: joi
        .number()
        .min(1)
        .max(100)
        .required()
        .label('Coupons Discount Percentage'),
      coupons_term_and_conditions: joi
        .string()
        .min(1)
        .max(200)
        .required()
        .label('Coupons Terms and Conditions'),
    },
  },

  updateCoupon: {
    body: {
      coupons_date_expired: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('Coupons Date Expire'),
      coupons_name: joi
        .string()
        .min(1)
        .max(100)
        .required()
        .label('Coupons Name'),
      coupons_discount_percentage: joi
        .number()
        .min(1)
        .max(100)
        .required()
        .label('Coupons Discount Percentage'),
      coupons_term_and_conditions: joi
        .string()
        .min(1)
        .max(200)
        .required()
        .label('Coupons Terms and Conditions'),
    },
  },
};
