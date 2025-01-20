import * as Yup from "yup"

export const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(8, "Password must be atlest 8 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required").min(8, "Password must be atlest  8 characters"),
})

// export const otpValidation =Yup.object().shape({
//   otp: Yup.string()
//     .required("OTP is required")
//     .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
// })

export const basicDetailValidation = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("First Name is required")
    .min(3, "Name must be longer"),
  lastName: Yup.string()
    .trim()
    .required("Last Name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  mobileNumber: Yup.string()
    .trim()
    .optional()
    .matches(/^\d{10}$/, "Mobile Number must be exactly 10 digits"),
  address: Yup.string()
    .trim()
    .required("Address is required"),
  city: Yup.string()
    .trim()
    .required("City is required"),
  state: Yup.string()
    .trim()
    .required("State is required"),
  zipCode: Yup.string()
    .trim()
    .matches(/^\d{6}$/, "Zip Code must be exactly 6 digits")
    .required("Zip Code is required"),
});


export const inviteFriendSchema = Yup.object().shape({
  friends: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        message: Yup.string().optional(),
      })
    )
    .required("At least one friend is required"),
});
