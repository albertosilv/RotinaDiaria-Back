const express = require('express')
const router = express.Router()

const taskController = require('../controllers/taskController')
const authMiddleware = require('../middleware/auth')

router.use(authMiddleware)

router.post('/create',taskController.create)
router.get('/tarefas/:id',taskController.onetasks)
router.get('/tarefas',taskController.alltasks)
router.delete('/delete/:id',taskController.delete)
router.put('/editar/:id',taskController.update)

module.exports = router;
