//DAO: Data Access Object



//import { ObjectId } from "mongodb";
let restaurants;    // Use to store a reference to our database.

import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;  // Use ObjectID to convert a String to a MongoDB object.

export default class RestaurantsDAO {
    static async injectDB(conn) {   // Use to connect to our database. Called as soon as our server starts.
        if (restaurants) {  
            return;
        }   
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants");  // Try to connect to our database, the "restaurants" collection.
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${e}`,
            );
        }
    }

    static async getRestaurants({   // Gets a list of all restaurants in the database.
        filters = null,     // Default by null, unless user passes something in.
        page = 0,   // Defaults to page 0.
        restaurantsPerPage = 20,    // Defaults to 20 restaurants per page.
    } = {}) {
        let query;
        if (filters) {  // User can search by name, cuisine, or zipcode.
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } } // Specified in MongoDB will check a certain field.
            } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        let cursor;

        try {
            cursor = await restaurants
            .find(query)    // Find all restaurants in the database that match this query.
        } catch (e) {   // If there is no query, returns an error.
            console.error(`Unable to issue find command, ${e}`);
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page); // To locate which page user is on, use the limit and current page to determine what to display.

        try {
            const restaurantsList = await displayCursor.toArray();
            const totalNumRestaurants = await restaurants.countDocuments(query);

            return { restaurantsList, totalNumRestaurants }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`
            );
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }
    }

    static async getRestaurantByID(id) {
        try {
            const pipeline = [  // A pipeline helps match different collections together.
                {
                    $match: {
                        _id: new ObjectId(id),   // Trying to match a specific ID of a restaurant.
                    },
                },
                    {
                        $lookup: {  // Then lookup reviews to add to the result.
                            from: "reviews",
                            let: {
                                id: "$_id",
                            },
                            pipeline: [
                                {
                                    $match: {   // And match all the reviews that match that restaurant_id.
                                        $expr: {
                                            $eq: ["$restaurant_id", "$$id"],
                                        },
                                    },
                                },
                                {
                                    $sort: {
                                        date: -1,
                                    },
                                },
                            ],
                            as: "reviews",  // Set the result as reviews.
                        },
                    },
                    {
                        $addFields: {
                            reviews: "$reviews",
                        },
                    },
            ]
            return await restaurants.aggregate(pipeline).next();    // Returns the restaurant with all the reviews connected.
        } catch (e) {
            console.error(`Something went wrong in getRestaurantByID: ${e}`);
            throw e;
        }
    }

    static async getCuisines() {
        let cuisines = [];
        try {
            cuisines = await restaurants.distinct("cuisine");   // Return all distinct cuisines in the database.
            return cuisines;
        } catch (e) {
            console.error(`Unable to get cuisines, ${e}`);
            return cuisines;
        }
    }

}