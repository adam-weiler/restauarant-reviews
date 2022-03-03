import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {   // Getting information from the body of the POST request.
            const restaurantId = req.body.restaurand_id;
            const review = req.body.text;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date,
            )
            res.json({ status: "success" }); // Review entered into database.
        } catch (e) {
            res.status(500).json({ error: e.message }); // Or returns an error.
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {   // Getting information from the body of the POST request.
            const reviewId = req.body.review_id;
            const text = req.body.text;
            const date = new Date();

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                text,
                date,
              )

            var { error } = reviewResponse;

            if (error) {
                res.status(400).json({ error });
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update review - user may not be original poster",
                )
            }  

            res.json({ status: "success" }); // Review entered into database.
        } catch (e) {
            res.status(500).json({ error: e.message }); // Or returns an error.
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {   // Getting information from the URL request and the body of the POST request.
            const reviewId = req.query.id;
            const userId = req.body.user_id;    // This is not good practice. Normally shouldn't have anything in the body in the DELETE request.
            console.log(reviewId);

            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            )
            res.json({ status: "success" }); // Review deleted from database.
        } catch (e) {
            res.status(500).json({ error: e.message }); // Or returns an error.
        }
    }
}