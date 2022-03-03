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

    static async apiGetRestaurantById() {
        
    }
}
