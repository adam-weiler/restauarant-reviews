import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;  // Use ObjectID to convert a String to a MongoDB object.

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {  // If the review already exists.
            return;
        }
        try {
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");  // If it doesn't exist already, it will be created when trying to add a document to it.
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(restaurantId, user, review, date) {
        try {
            const reviewDoc = { name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId),  // Converts restaurant_id into an ObjectId.
            }

            return await reviews.insertOne(reviewDoc); // Inserts into the database.
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e }
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId)},    // Looks for the userId and reviewId. We don't want to update unless they are the original writer.
                { $set: { text: text, date: date } },   // Then sets the new text of the review and the new date.
            )
            
            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),    // Looks for the userId and reviewId. We don't want to delete unless they are the original writer.
                user_id: userId,
            })
            
            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e }
        }
    }
}