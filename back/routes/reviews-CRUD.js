import express from 'express';
import { getCarReview } from '../controller/reviews-CRUD.js';

const router = express.Router()

router.get("/car-review/:id", getCarReview)

export default router;