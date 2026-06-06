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

const createTaskSchema = yup.object({
  title: yup.string().required("Title is required").trim(),
  description: yup.string().nullable().optional().default(""),
  status: yup.string().oneOf(["PENDING", "COMPLETED"]).default("PENDING"),
})

const updateTaskSchema = yup.object({
  title: yup.string().optional().trim(),
  description: yup.string().nullable().optional().default(""),
  status: yup.string().oneOf(["PENDING", "COMPLETED"]),
})

module.exports = { signupSchema, loginSchema, createTaskSchema, updateTaskSchema }
