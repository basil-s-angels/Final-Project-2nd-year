// import bcrypt from 'bcrypt';
// import bodyParser from 'body-parser';
// import express from 'express';
// import jwt from 'jsonwebtoken';
// import { Pool } from 'pg';

// const pool = new Pool({
//     user: 'your_pg_user',
//     host: 'localhost',
//     database: 'your_db_name',
//     password: 'your_db_password',
//     port: 5432,
// });


// async function startServer() {
//     // Create an Express app
//     const app = express();

//     // Connect to the PostgreSQL database using a connection pool
//     const connection = await pool.connect();

//     // Middleware for parsing JSON and URL-encoded data
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({ extended: true }));

//     // Endpoint for user registration
//     app.post('/register', async (request, response) => {
//         const { email, password } = request.body;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert a new user into the 'users' table and return the id and email of the created user
//         const { rows } = await connection.query(
//             'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
//             [email, hashedPassword],
//         );

//         response.json({ createdUser: rows[0] });
//     });

//     // Endpoint for user login
//     app.post('/login', async (request, response) => {
//         const { email, password } = request.body;

//         // Retrieve user information based on the provided email
//         const { rows } = await connection.query(
//             'SELECT * FROM users WHERE email = $1',
//             [email],
//         );

//         if (rows.length === 0) {
//             // If no user with the provided email is found, return an error
//             response.status(401).json({ message: 'Email or password is incorrect' });
//         } else {
//             // Check if the provided password matches the hashed password stored in the database
//             const correctPassword = await bcrypt.compare(password, rows[0].password);

//             if (correctPassword) {
//                 // If the password is correct, create a JWT token and send it as a response
//                 const token = jwt.sign(
//                     { userId: rows[0].id, email: rows[0].email },
//                     'secret', // Replace with a more secure secret
//                     {
//                         expiresIn: '1h',
//                     },
//                 );
//                 response.json({ token });
//             } else {
//                 // If the password is incorrect, return an error
//                 response.status(401).json({ message: 'Email or password is incorrect' });
//             }
//         }
//     });

//     // Endpoint for getting user information
//     app.get('/me', async (request, response) => {
//         const authHeader = request.header('Authorization');
//         const token = authHeader?.split(' ')[1];

//         if (!token) {
//             // If no token is provided, return an authentication error
//             response.status(401).json({ message: 'Not authenticated' });
//             return;
//         }

//         try {
//             // Verify the JWT token and get user claims
//             const claims = jwt.verify(token, 'secret'); // Replace with the same secret used for signing
//             const { userId } = claims as any;

//             // Retrieve user information from the database based on the user id
//             const { rows } = await connection.query(
//                 'SELECT id, email, presidentialBet FROM users WHERE id = $1',
//                 [userId],
//             );
//             response.json({ me: rows[0] });
//         } catch (error) {
//             // If there is an error in token verification, return an authentication error
//             response.status(401).json({ message: 'Not authenticated' });
//         }
//     });

//     // Endpoint for fetching channels
//     app.get('/channels', async (request, response) => {
//         // Retrieve all channels from the 'channels' table
//         const result = await connection.query(
//             'SELECT * FROM channels ORDER BY name',
//         );
//         response.json(result.rows);
//     });

//     // Endpoint for fetching messages for a specific channel
//     app.get('/messages/:channelName', async (request, response) => {
//         // Retrieve messages for a specific channel by joining the 'messages' and 'channels' tables
//         const result = await connection.query(
//             /* sql */
//             `
//             SELECT messages.* FROM messages
//             INNER JOIN channels ON messages.channel_id = channels.id
//             WHERE name = $1
//           `,
//             [request.params.channelName],
//         );
//         console.log('DB results', result.rows);
//         response.json(result.rows);
//     });

//     // Serve static files from the 'public' directory
//     app.use(express.static('public'));

//     // Start the server on port 3000
//     app.listen(3000, () => {
//         console.log('Server has started at http://localhost:3000');
//     });
// }

// // Call the function to start the server
// startServer();
