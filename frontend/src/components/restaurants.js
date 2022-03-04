import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const Restaurant = props => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  }
  const [restaurant, setRestaurant] = useState(initialRestaurantState); // By default all these fields are empty.

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      });
  }

  useEffect(() => { // This useEffect is only called if the id is updated.
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId)
      .then(response => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)  // If you delete a review, it removes it from the state and from the page.
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      })
  }

  return (
    <div>
        {restaurant ? (
          <div>
            <h5>{restaurant.name}</h5>
            <p>
              <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
              <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
            </p>
            <Link to={"/restaurants/" + props.match.params.id + "/review"} className="btn btn-primary">
              Add Review
            </Link>
            <h4>Reviews</h4>
            <div className="row">
              {restaurant.reviews.length > 0 ? (    // If there are more than 0 reviews, display them.
                restaurant.reviews.map((review, index) => {
                  return (
                    <div className="col-lg-4 pb-1" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <p className="card-text">
                            {review.text}<br/>
                            <strong>User: </strong>{review.name}<br/>
                            <strong>Date: </strong>{review.date}
                          </p>
                          {props.user && props.user.id === review.user_id &&  // Checks if user is logged in, and if user's id is the same as the review's id. The last && isn't a mistake but saying to use the following code.
                            <div className="row">
                              <a onClick={() => deleteReview(review._id, index)} className="btn btn-primary col-lg-5 mx-1 mb-1">Delete</a>
                              <Link to={{
                                pathname: "/restaurants/" + props.match.params.id + "/review",
                                state: {
                                  currentReview: review
                                }
                              }} classname="btn btn-primary col-lg-5 mx-1 mb-1">Edit</Link>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-sm-4">
                  <p>No reviews yet.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
              <div>
                <p>No restaurant selected.</p>
              </div>
            )}
    </div>
  );
}

export default Restaurant;