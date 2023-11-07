import express from 'express';
import { getCarReview, getUserReviews, userDeleteReview, userPostReview, userUpdateReview } from '../controller/reviews-CRUD.js';

const router = express.Router()

router.get("/car-review/:id", getCarReview)
router.get("/user-reviews/:id", getUserReviews)
router.post("/car-reviews/:id", userPostReview)
router.put("/user-reviews/:id", userUpdateReview)
router.delete("/user-reviews", userDeleteReview)

export default router;