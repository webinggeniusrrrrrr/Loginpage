# User Authentication with Firebase

This project demonstrates user authentication using Firebase, featuring both signup and login functionalities. It utilizes Firebase's Realtime Database to store user information securely.

## Features

- User signup with email and password
- User login with email and password
- Firebase Realtime Database integration for user data storage
- User-friendly interface for seamless navigation

## Technologies Used

- HTML
- CSS
- JavaScript
- Firebase (Authentication & Realtime Database)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Tahasaif3/Signup-Login-Authentication-Through-Firebase.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Signup-Login-Authentication-Through-Firebase
   ```

3. **Open the `welcome.html` file in your browser.**

## Firebase Setup

To use Firebase in this project, follow these steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Navigate to the **Authentication** section and enable Email/Password sign-in.
4. Navigate to the **Realtime Database** section and create a new database.
5. Replace the Firebase configuration in your project with the configuration details from your Firebase project:

   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       databaseURL: "YOUR_DATABASE_URL",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

## Usage

- **Signup:** Users can create a new account by providing their email and password.
- **Login:** Registered users can log in with their email and password.
- After successful authentication, users can be redirected to a welcome page or dashboard.

## Live Demo

- **View Live Demo:** view it live on vercel [here](). 

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Firebase](https://firebase.google.com/) for providing easy-to-use authentication and database services.
