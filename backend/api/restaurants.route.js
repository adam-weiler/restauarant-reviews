import express from "express";
import RestaurantsCtrl from "./restaurants.controller.js";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();    // The different routes ppl can go to.

// router.route("/").get((req, res) => res.send("Hello world!"));  // Our demo route. Going to root responds with HW.
router.route("/").get(RestaurantsCtrl.apiGetRestaurants);   // Going to root returns this method.

router
    .allroute("/review")
    .post(ReviewsCtrl.apiPostReview)    // If POST, use apiPostReview method.
    .put(ReviewsCtrl.apiUpdateReview)   // If PUT, use apiUpdateReview method.
    .delete(ReviewsCtrl.apiDeleteReview)    // If DELETE, use apiDeleteReview method.

export default router;