const { authController } = require("../controllers")
const { validateSchema } = require("../middlewares")
const { signupSchema, loginSchema } = require("../validations")

const router = require("express").Router()

router.post("/login", validateSchema(loginSchema), authController.login)

router.post("/signup", validateSchema(signupSchema), authController.signUp)

module.exports = router
