import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const RestaurantsList = props => {
  // Use React Hooks to set state variables.
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState([""]);
  const [searchZip, setSearchZip] = useState([""]);
  const [searchCuisine, setSearchCuisine] = useState([""]);
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => { // This tells our component needs to do something after rendering.
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = e => {   // Can search by Name.
    const searchName = e.target.value;
    setSearchName(searchName);  // If on change, update searchName state variable.
  };

  const onChangeSearchZip = e => {   // Can search by Zip.
    const searchZip = e.target.value;
    setSearchZip(searchZip);  // If on change, update searchZip state variable.
  };

  const onChangeSearchCuisine = e => {   // Can search by Cuisine.
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);  // If on change, update searchCuisine state variable.
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll() // Retrieve all the restaurant data.
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);  // This goes into the restaurants' state.
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines() // Retrieve all the cuisine data.
      .then(response => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));  // This goes into the cuisines' state. The first element of the array is "All Cuisines". This will be the drop down menu.
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {   // query is userInput. by is either "name", "zipcode", or "cuisine".
    RestaurantDataService.find(query, by)
    .then(response => {
      console.log(response.data);
      setRestaurants(response.data.restaurants);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const findByName = () => {
    find(searchName, "name"); // Uses the find() above.
  };

  const findByZip = () => {
    find(searchZip, "zipcode"); // Uses the find() above.
  };

  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines") {
      refreshList();   // Uses the refreshList() above, which then loads retrieveRestaurants() above.
    } else {
      find(searchCuisine, "cuisine"); // Uses the find() above.
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
          <input 
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchName}
          onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-lg-4">
          <input 
          type="text"
          className="form-control"
          placeholder="Search by zip"
          value={searchZip}
          onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>

        <div className="input-group col-lg-4">
          <select onChange={onChangeSearchCuisine}>
            {cuisines.map(cuisine => {
              return (
                <option value={cuisine}> {cuisine.substr(0,20)} </option> // Shows only the first 20 characters of the cuisine name.
              )
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address}, ${restaurant.address.zipcode}`;  // Concat the address into a single variable.
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br />
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                    <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1" >
                      View Reviews
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RestaurantsList;