import express from 'express';
import { createEmployee, displayEmployee, displayForAdmin, displayForEmployee, updateEmployee, updateToAdmin } from '../controller/employee-CRUD.js';

const router = express.Router();

router.post("/", createEmployee)
router.put("/update/:id", updateEmployee)
router.put("/admin/:id", updateToAdmin)
router.get("/admin", displayForAdmin)
router.get("/colleague", displayForEmployee)
router.get("/", displayEmployee)

export default router;