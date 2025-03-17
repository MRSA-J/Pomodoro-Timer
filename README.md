# Pomodoro Timer

A customizable Pomodoro timer application designed to help you boost your productivity by managing your work and break intervals effectively. This app is inspired by the Pomodoro Technique, which breaks work into intervals, traditionally 25 minutes in length, separated by short breaks.

The UI is inspired by [Pomofocus](https://pomofocus.io/), but the implementation and code are completely written from scratch, as this website uses an HTML + CSS framework while this project uses the React framework.

This is a project for an take-home-interview. Due to time constraints, this is a simplified version of the Pomodoro Timer. If I had more time, I would implement CRUD functionality for the history tracker, a leaderboard for all users, and additional features.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Framework](#framework)
- [Backend Decisions](#backend-decisions)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Reflection](#reflection)
- [License](#license)

## Features

- **Customizable Timer**: Set your own work and break durations.
- **Task Management**: Add tasks and track how many Pomodoros you have completed for each task.
- **Visual Feedback**: Clear visual indicators for active timers and completed sessions.
- **History Tracking**: Keep track of completed Pomodoros and breaks.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **User Authentication**: Secure login using Auth0.

### Future Features
- **CRUD Functionality for History Tracking**: Due to time constraints, this feature has not yet been implemented. It would be beneficial if the history could be pulled from the database, allowing users to modify, delete, or resume their sessions. Additionally, it would be helpful if users could set labels for each task and if a filtering option for tasks could be implemented. Currently, users can only add the sessions.
- **Scalability and Performance**: for the backend.
- **Responsiveness**: Test it on more screen size. 

## Demo

- **Frontend**: [Pomodoro Timer Frontend](https://pomodoro-timer-h9tyc58cz-chen-weis-projects.vercel.app/)
- **Backend**: [Pomodoro Timer Backend](https://pomodoro-timer-auhy.onrender.com)

![Pomodoro Timer Demo](https://github.com/MRSA-J/Pomodoro-Timer/blob/main/demo/Pomodoro.jpg)
![Long Break](https://github.com/MRSA-J/Pomodoro-Timer/blob/main/demo/Long%20Break.jpg)
![Short Break](https://github.com/MRSA-J/Pomodoro-Timer/blob/main/demo/Short%20Break.jpg)

## Framework

- **React**: Frontend library for building user interfaces.
- **Axios**: For making HTTP requests to the backend.
- **Auth0**: For user authentication and authorization.
- **CSS**: For styling the application.
- **React Icons**: For using icons in the UI.
- **MongoDB**: For backend

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

3. Create a `.env` file in the `frontend` directory and add your Auth0 credentials:
   ```plaintext
   REACT_APP_AUTH0_DOMAIN=your-auth0-domain
   REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
   REACT_APP_BACKEND_URL=your-backend-url
   ```

4. Create a `.env` file in the `backend` directory and add your Auth0 credentials:
   ```plaintext
   MONGODB_URI= your-mongodb-url
   FRONTEND_URL=your-front-end-deploy-url
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## Troubleshooting
If your frontend works well locally but does not function properly when deployed, remember to check that your frontend URL is also updated on the `Auth0` platform; add it as a callback URL.

## Usage

1. Open the application in your browser at `https://pomodoro-timer-h9tyc58cz-chen-weis-projects.vercel.app/`.
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

## Reflection
For this project, the most time-consuming parts were:
- Designing the Pomodoro history backend storage
- Implementing the logic for resuming, starting, and ending the timer, as well as handling the button clicks for Pomodoro, short break, and long break.
- Figuring out why I'm always stuck at the Auth0 authentication page

### 1. Designing the Pomodoro History Backend Storage
There are two designs for the Pomodoro history. One design involves storing it as time sessions, which includes 3 or more variables for the latest start, resume, and end button clicks time. The other design stores each user click as a time event.

**(1) Storing Pomodoro History as Time Sessions**

We need at least three variables to store the latest three button clicks and evaluate them with the backend code regarding the website's status. This approach does not allow us to monitor each user's individual clicks.

**(2) Storing Each User's Click as a Time Event**

If we choose this strategy, we will be able to track each user's button click event and maintain a more detailed version of their history when rendering on the frontend. Since Pomodoro timers are designed to help users focus, I believe that breaks also matter and should be displayed to users. The UI design could vary, but this approach can prevent users from repeatedly clicking start and stop. I generate time sessions from this time events manually.

Choosing either design 1 or 2 is viable; it depends on the use case and the frontend design. This project chooses the latter design for better user behavioral tracking, while [Pomofocus](https://pomofocus.io/) chooses the former.

### 2. Implementing the Logic for Resuming, Starting, and Ending the Timer, as Well as Handling the Button Clicks for Pomodoro, Short Break, and Long Break
The detailed logic can be found in [frontend/src/components/Timer/Timer.js](https://github.com/MRSA-J/Pomodoro-Timer/blob/main/frontend/src/components/Timer/Timer.js). In my design, each time event has four statuses: start, end, resume, and link-break. The link-break status is designed for when a user has an active Pomodoro timer and refreshes the page; this ensures that the page does not lose track of their status and that the Pomodoro timer continues to run normally.

### 3.Figuring out why I'm always stuck at the Auth0 authentication page
I tried all the methods I could find online; they all discuss cross-site strategies, but none of them worked. After several hours, I discovered that the issue was due to the website needing some time to load. I have to determine whether the website is loading before entering the Auth0 logic.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/MRSA-J/Pomodoro-Timer/blob/main/LICENSE) file for details.

