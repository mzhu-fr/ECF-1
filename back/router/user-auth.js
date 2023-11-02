import express from 'express';
import { register } from '../controller/user-auth.js';

const router = express.Router()

router.post("/login", register)

export default router;