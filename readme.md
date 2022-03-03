# Sample API Requests

### Example 1:
GET request - Return all restaurants in database:
http://localhost:5000/api/v1/restaurants

### Example 2:
GET request - Return restaurants in a certain ZIP code - page 1 of results:
http://localhost:5000/api/v1/restaurants?zipcode=10012

### Example 3:
GET request - Return restaurants in a certain ZIP code - page 2 of results:
http://localhost:5000/api/v1/restaurants?zipcode=10012&page=2

### Example 4:
GET request - Return restaurants with Italian cuisine:
http://localhost:5000/api/v1/restaurants?cuisine=Italian

### Example 5:
GET request -  Return restaurants with Riviera in the name:
http://localhost:5000/api/v1/restaurants?name=Riviera

### Example 6:
POST request - Create a new review to first restaurant in collection:
http://localhost:5000/api/v1/restaurants/review

JSON:
```
{
	"restaurant_id": "5eb3d668b31de5d588f4292a",
	"text": "Great food!",
	"user_id": "1234",
	"name": "John Smith"
}
```
** This creates a objectID of 62201fc7ba7690167b4cea38*
** It is not good practice to have the user_id in the body of the text instead of proper authentication.*

### Example 7:
PUT request - Update an existing review based on previous objectID:
http://localhost:5000/api/v1/restaurants/review

JSON:
```
{
	"review_id": "62201fc7ba7690167b4cea38",
	"text": "Great food! I was so happy about the discount!",
	"user_id": "1234",
	"name": "John Smith"
}
```
** It is not good practice to have the user_id in the body of the text instead of proper authentication.*

### Example 8:
DELETE request - Remove an existing review based on previous objectID:
http://localhost:5000/api/v1/restaurants/review?id=62201fc7ba7690167b4cea38

JSON:
```
{
	"user_id": "1234",
	"name": "John Smith"
}
```
** It is not good practice to have the user_id in the body of the text instead of proper authentication.*
