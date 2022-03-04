import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
    static async apiGetRestaurants (req, res, next) {   // User may or may not be passing variables in with the URL.
        const restaurantsPerPage = req.query.resturantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20  // Checks if restaurantsPerPage is being passed in and then converts to an int. Otherwise default is 20 restaurants per page.
        const page = req.query.page ? parseInt(req.query.page, 10) : 0  // Checks if page is being passed in and then converts to an int. Otherwise default is page 0.

        let filters = {};   // Filters is set to default.
        if (req.query.cuisine) {    // If user entered cuisine as query, filters is set to cuisine.
            filters.cuisine = req.query.cuisine
        } else if (req.query.zipcode) {    // If user entered zipcode as query, filters is set to cuisine.
            filters.zipcode = req.query.zipcode
        } else if (req.query.name) {    // If user entered name as query, filters is set to cuisine.
            filters.name = req.query.name
        }

        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({  // Pass in filters, page, & restaurantsPerPage. Returns the restaurantsList & totalNumRestaurants.
            filters,
            page,
            restaurantsPerPage,
        });

        let response = {    // Return the json response with all this data.
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
        }
        res.json(response);
    }

    static async apiGetRestaurantById(req, res, next) {
        try {
            let id = req.params.id || {}    // Checks for the ID parameter in the URL.
            let restaurant = await RestaurantsDAO.getRestaurantByID(id);
            if (!restaurant) {  // If no restaurant is found, return an error.
                res.status(404).json({ error: "Not found" });
                return;
            }
            res.json(restaurant);   // Or else return the restaurant.
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetRestaurantCuisines(req, res, next) {
        try {
            let cuisines = await RestaurantsDAO.getCuisines();  // Doesn't require any parameters.
            res.json(cuisines);
        } catch (e) {   // Either gets all cuisines or returns an error.
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }

}