import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const signupValidationSchema = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    // profilePhoto: Joi.string().uri().optional().label('Profile Photo'),
    firstName: Joi.string()
      .required()
      .messages({
        'string.empty': 'First Name is required.',
      }),
    lastName: Joi.string().optional().label('Last Name'),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.',
      }),
    // mobileNumber: Joi.string()
    //   .pattern(/^[1-9][0-9]{9}$/)
    //   .optional()
    //   .messages({
    //     'string.pattern.base': 'Mobile Number must be a valid 10-digit number.',
    //   }),
    // address: Joi.string().optional().label('Address'),
    // city: Joi.string().optional().label('City'),
    // zipCode: Joi.string()
    //   .pattern(/^[1-9][0-9]{5}$/)
    //   .optional()
    //   .messages({
    //     'string.pattern.base': 'Zip Code must be a valid 5 or 6-digit number.',
    //   }),
    // state: Joi.string().optional().label('State'),
    // gender: Joi.string()
    //   .valid('Male', 'Female', 'Other')
    //   .optional()
    //   .messages({
    //     'any.only': 'Gender must be one of Male, Female, or Other.',
    //   }),
    // dob: Joi.date()
    //   .optional()
    //   .max('now')
    //   .messages({
    //     'date.max': 'Date of Birth cannot be in the future.',
    //   }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 8 characters long.',
      }),
    confirmPassword: Joi.string().optional(),
    isActive: Joi.boolean().optional().default(true),
    isDeleted: Joi.boolean().optional().default(false),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({
      message: 'Validation errors',
      errors: error.details.map((err) => err.message),
    });
    return; // Ensure no further middleware execution
  }

  next(); // Validation passed, proceed to the next middleware
};


 const loginValidationSchema = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.',
      }),

    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/)
      .required()
      .messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 8 characters long.',
        'string.pattern.base': 'Password must contain at least one special character.',
      }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({
      message: 'Validation errors',
      errors: error.details.map((err) => err.message),
    });
    return; // Ensure no further middleware execution
  }

  next(); // Validation passed, proceed to the next middleware
};

export default {
  signupValidationSchema,
  loginValidationSchema
}
