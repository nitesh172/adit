const app = require("./app")
const config = require("./config")
const connectDB = require("./db")

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
  connectDB()
})
