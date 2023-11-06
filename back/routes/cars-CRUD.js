import express from 'express';
import { createCar, deleteCar, getCar, getCars, updateCar } from '../controller/cars-CRUD.js';

const router = express.Router()

router.get("/cars-display", getCars)
router.get("/cars-display/:id", getCar)
router.delete("/cars-display/:id", deleteCar)
router.post("/cars-display", createCar)
router.put("/cars-display/:id", updateCar)

export default router;