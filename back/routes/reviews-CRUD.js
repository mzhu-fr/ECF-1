import express from 'express';
import { getCarReview, getUserCarReview, getUserReviews, userDeleteReview, userPostReview, userUpdateReview } from '../controller/reviews-CRUD.js';

const router = express.Router()

router.get("/car-review/:id", getCarReview)
router.get("/user-reviews/:id", getUserReviews)
router.get("/user-car-review/:iduser/:idcars", getUserCarReview)
router.post("/car-reviews/:id", userPostReview)
router.put("/user-reviews/:id", userUpdateReview)
router.delete("/user-reviews", userDeleteReview)

export default router;