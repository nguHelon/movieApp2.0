# Description

Embark on a cinematic journey with my Movie Trailer Website, a feature-rich full-stack application crafted on the MERN framework. Immerse yourself in the world of film as you watch trailers and delve into comprehensive movie information. Effortlessly search for your favorite movies and actors through the user-friendly interface. This readme will guide you on how to run the project locally, enabling you to explore its functionalities at your convenience. Elevate your movie-watching experience with this dynamic and engaging platform that caters to the preferences of avid film enthusiasts.

# Functionalities

- Visitors : They have the ability to search for latest movies and actors and have information on them, they can also watch trailers watch trailers.

- Users : Users have the same privileges as visitors, but when a visitor creates an account, they can now add movies to their favorites and watchlist and also Login and Logout.

## Required Configurations

- Install node.js in your system. You can download it from their [official website](https://nodejs.org/).

## Installation

1. Clone this github repository on your local machine :

```bash
git clone https://github.com/nguHelon/movieApp2.0.git

```

2. Move to movieap2.0 directory :

```bash
cd movieapp2.0

```

3. Run the below command in the client and server directories:

```bash
npm install

```

4. In the client directory create a .env file containing the following env variables:

```bash
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY_FOR_GOOGLE_AUTHENTICATION

VITE_BACKEND_SERVICE_URL="http://localhost:5000"

```

5. In the server directory create a .env file containing the following env variables:

```bash
MONGO_URI=YOUR_MONGO_URI

TOKEN_SECRET=YOUR_JWT_SECRET_TOKEN

PORT=5000
```

# Running the application

1. In the client directory run the following command :

```bash
npm run dev

```

In your web browser the application will be available via http://localhost:5173.

2. In the server directory run the following command :

```bash
npm run dev

```

The backend will be accessible at this address ➡ http://localhost:5000/.
