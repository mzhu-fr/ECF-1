import express from 'express';
import { adminConnect, adminRegister, login, logout, register } from '../controller/user-auth.js';

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/admin-connect", adminConnect)
router.post("/admin-register", adminRegister)

export default router;