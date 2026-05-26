const { StatusCodes } = require("http-status-codes")
const { AuthService } = require("../services")

const authService = new AuthService()

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body)

    if (result === "USER_NOT_FOUND") {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" })
    }

    if (result === "INVALID_CREDENTIALS") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid credentials" })
    }

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const signUp = async (req, res) => {
  try {
    const result = await authService.signUp(req.body)
    res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

module.exports = { login, signUp }
