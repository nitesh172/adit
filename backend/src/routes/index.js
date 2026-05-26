const router = require("express").Router()
const { StatusCodes } = require("http-status-codes")

router.get("/health", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "Health is good" })
})

module.exports = router
