const router = require("express").Router()
const { taskController } = require("../controllers")
const { validateSchema } = require("../middlewares")
const { createTaskSchema, updateTaskSchema } = require("../validations")

router.get("/", taskController.getTasks)
router.get("/:id", taskController.getTask)
router.post("/", validateSchema(createTaskSchema), taskController.createTask)
router.put("/:id", validateSchema(updateTaskSchema), taskController.updateTask)
router.delete("/:id", taskController.deleteTask)

module.exports = router
