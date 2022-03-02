import app from "./server.js";
import mongodb from "mongodb";  // Used to access mongodb.
import dotenv from "dotenv";    // Used to access environment variables.
dotenv.config();    // Load in environment variables.
const MongoClient = mongodb.MongoClient;    // Access our Mongo client.

const port = process.env.PORT || 8000;  // Use port from .env file, or 8000.

MongoClient.connect(    // Connect to database.
    process.env.RESTREVIEWS_DB_URI, // The environment variable with username & password for MongoDB.
    {
        // poolSize: 50,      // Only 50 ppl can connect at once.
        wtimeout: 2500,      // After 2500 miliseconds the request times out.
        // useNewUrlParse: true    // They recently changed MongoDB driver, and put the new connection parser behind this flag.
    })
    .catch(err => {      // If error, log to console and exit the process.
        console.error(err.stack);  
        process.exit(1);
    })
    .then(async client => {     // Succesful connection to database.
        app.listen(port, () => {    // Starts our web server.
            console.log(`Listening on port ${port}`);
        })
    }
);