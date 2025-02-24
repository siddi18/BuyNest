import express from "express";
const router = express.Router()
import { loginUser, registerUser, updateUserProfile, logoutUser, forgotPassword, resetPassword, getUsers, updateUser, getUserById, deleteUser} from "../controllers/userController.js"; 

router.post('/login', loginUser)
router.post('/register', registerUser)
router.put('/update', updateUserProfile)
router.get('/logoutUser', logoutUser)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:resetToken', resetPassword)
router.get('/', getUsers)
router.put('/:id', updateUser)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)


export default router;