const yup = require("yup")

const signupSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  role: yup.string().required(),
})

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

module.exports = { signupSchema, loginSchema }
