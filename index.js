const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

// Creating a connection to the database
const connection  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Aryan456@234'
});

// Connect to the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');

    // Prepare the SQL query for bulk insertion
    let q  = "INSERT INTO user(id, username, email, password) VALUES ?";
    
    // Generate random users using faker
    let users = [
        [faker.string.uuid(), faker.internet.userName(), faker.internet.email(), faker.internet.password()],
        [faker.string.uuid(), faker.internet.userName(), faker.internet.email(), faker.internet.password()],
    ];

    // Insert the users into the database
    connection.query(q, [users], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return;
        }
        console.log(result);
    });

    // Close the connection after the query
    connection.end();
});
