# Pomodoro Timer

A customizable Pomodoro timer application designed to help you boost your productivity by managing your work and break intervals effectively. This app is inspired by the Pomodoro Technique, which breaks work into intervals, traditionally 25 minutes in length, separated by short breaks.

The UI is inspired by [Pomofocus](https://pomofocus.io/), but the implementation and code are completely written from scratch, as this website uses an HTML + CSS framework while this project uses the React framework.

## Table of Contents

- [Features](#features)
- [Demo](#Demo)
- [Technologies Used](#technologies-used)
- [Backend Decisions](#backend-decisions)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Customizable Timer**: Set your own work and break durations.
- **Task Management**: Add tasks and track how many Pomodoros you have completed for each task.
- **Visual Feedback**: Clear visual indicators for active timers and completed sessions.
- **History Tracking**: Keep track of completed Pomodoros and breaks.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **User Authentication**: Secure login using Auth0.

## Demo
![Pomodoro Timer Demo](demo/Timer.png)

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Axios**: For making HTTP requests to the backend.
- **Auth0**: For user authentication and authorization.
- **CSS**: For styling the application.
- **React Icons**: For using icons in the UI.

## Backend Decisions

### Architecture

- **RESTful API**: The backend is designed as a `RESTful API`, allowing the frontend to communicate with the server using `standard HTTP methods (GET, POST, PUT, DELETE)`. This architecture is suitable for applications requiring CRUD operations.

### Technology Stack

- **Node.js and Express**: The backend is built using `Node.js`, which allows for `JavaScript` to be used on both the frontend and backend. `Express` is used as the framework for building the API, providing a robust set of features for web applications.

### Database

- **MongoDB**: The application uses `MongoDB` as a `NoSQL` database, allowing for flexible data modeling. This is beneficial for storing user data, timer events, and history logs.

### Authentication

- **Auth0**: The application uses `Auth0` for user authentication, simplifying the process of managing user sessions and security. `Auth0` supports various authentication methods, including social logins and email/password.

### API Design

- **Endpoints**: The backend includes specific endpoints for functionalities such as user registration, user login, timer events, and user history.
- **Data Validation**: Data validation is implemented to ensure that only valid data is processed, using libraries like Joi or express-validator.
- **Error Handling**: Proper error handling is implemented to provide meaningful responses to the client, improving user experience.

### Scalability and Performance

- **Caching**: Caching strategies may be implemented to improve performance for frequently accessed data.
- **Load Balancing**: Load balancing can be considered to distribute incoming requests across multiple server instances, ensuring scalability.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pomodoro-timer.git
   cd pomodoro-timer
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Auth0 credentials:
   ```plaintext
   REACT_APP_AUTH0_DOMAIN=your-auth0-domain
   REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Log in using your Auth0 credentials.
3. Set your desired work and break durations.
4. Click on the "Pomodoro", "Short Break", or "Long Break" buttons to start the timer.
5. Use the play, pause, and reset buttons to control the timer.
6. View your timer history to track your productivity.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.