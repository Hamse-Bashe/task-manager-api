import express from 'express'
const router = express.Router();
import { getUsers, createUser, updateUser, deleteUser, getUserInfo } from '../controllers/usersController.js'

router.get('/', getUsers)
router.get('/:id', getUserInfo)
router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)




export default router;