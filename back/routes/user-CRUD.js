import express from "express";
import { deleteUser, getUser, getUsers, updateUser, updateUserPassword } from "../controller/user-CRUD.js";
import { register } from "../controller/user-auth.js";

const router = express.Router()
// CREATE
router.post("/all", register)

// READ
router.get("/all", getUsers)
router.get("/all/user/:id", getUser)

// UPDATE
router.put("/all/user/:id", updateUser)
router.put("/all/password/:id", updateUserPassword)

// DELETE
router.delete("/all/user/:id", deleteUser)

export default router