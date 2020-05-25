const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController')

router.post('/register',authController.register)
router.post('/',authController.AuthenticatorResponse)
router.post('/create',taskController.create)
router.get('/tarefas/:id',taskController.onetasks)
router.get('/tarefas',taskController.alltasks)
router.delete('/delete/:id',taskController.delete)


module.exports = router;
