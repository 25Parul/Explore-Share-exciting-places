# Explore: Share exciting places with others

This is a full-stack application developed using the MERN stack, offering a comprehensive solution. It empowers users to easily share places that hold significance to them, whether they are personal favorites or noteworthy locations they want to highlight. Each shared place is enriched with essential details such as an image, location, title, and description. Additionally, users can explore a directory of other users, accessing their shared places and conveniently viewing them on a Google map. Furthermore, users have dedicated profiles that enable them to effectively manage and oversee their shared places.

## Technologies Used

- **MongoDB**: NoSQL database for storing user and place data.
- **Express.js**: Web application framework for building the server-side API.
- **React.js**: JavaScript library for building the user interface.
- **Node.js**: JavaScript runtime environment for running the server-side code.
- **Google Maps API**: Used for integrating maps and location services.
- **Vite**: Modern build tool for optimizing and bundling the frontend code.

## Requirements

- **Core CRUD operations**: Enables users to perform essential Create, Read, Update, and Delete actions on place data.
- **Multiple data models**: Incorporates user and place models, enabling efficient relationship management and mapping between users and their associated places.
- **Image Handling**: Enables users to select, preview, and securely store images using Multer. Uploaded images are stored in an organized file storage location, with unique file names generated using the UUID library.
- **Input Validation**: Implements thorough validation of user input to ensure the storage of accurate and valid data in the database. This validation process is performed on both the front-end and back-end sides of the application.
- **Authentication and Authorization**: Requires user sign-up or login for accessing specific app sections. Only logged-in users can create new places, and place creators have exclusive rights to update or delete their entries.
- **Integration with Google Maps API**: Seamlessly integrates Google Maps API for maps and location services.

## Functionality 

1. Sign up or log in to access the full functionality of the application.
2. Explore shared places by browsing the list of users and viewing their shared places.
3. Share your own places by uploading an image, providing location details, and adding a title.

## Deployment

The app is [live](https://explore-share-exciting-places-with-other.onrender.com) on Render. Visit the link to access the deployed version of the application.

## Getting Started

### Development prerequisites

Make sure you have the following prerequisites installed on your machine:

- Node.js: You can download it from the official website: [Node.js](https://nodejs.org)
- MongoDB: Install MongoDB and set it up locally or use a cloud-based MongoDB service.
- Vite: Install Vite globally by running the following command:

```bash
npm install -g create-vite
```
Nodemon: Install nodemon globally by running the following command:
```bash
npm install -g nodemon
``` 
### Installation

1. Clone the repository to your local machine.

```bash
git clone https://github.com/25Parul/Explore-Share-exciting-places-with-other-users.git
```

2. Install the required libraries for the backend and frontend.

```bash
cd Backend
npm install
npm install express path mongoose dotenv fs express-validator cors multer

cd ../Client
npm install
npm install react-router-dom
```

### Backend environment variable Setup

1. In the `Backend` folder, create a `.env` file and add the necessary environment variables. You can use the `.env` example file as a template.
```MONGO_URL: your MongoDB connection string```

### Frontend Setup

Click [here](https://developers.google.com/maps/documentation/javascript/overview#js_api_loader_package) to understand the integration with Google map api

### Running the Application

1. Open two separate terminals.

2. In the first terminal, navigate to the `backend` folder and start the backend server.

```bash
cd backend
nodemon server.cjs
```
The application will open in your web browser at [http://localhost:4010](http://localhost:4010).

3. In the second terminal, navigate to the `client` folder and start the frontend development server.

```bash
cd client
npm run dev
```
The application will open in your web browser at [http://localhost:5173](http://localhost:5173).

### API Endpoints

- `GET /api/places/:pid` - Get a place by ID
- `GET /api/places/user/:uid` - Get places by user ID
- `POST /api/places/` - Create a new place
- `PATCH /api/places/:pid` - Update a place
- `DELETE /api/places/:pid` - Delete a place
- `GET /api/users/` - Get all users
- `POST /api/users/signup` - User sign up
- `POST /api/users/login` - User login

## Notes

- Make sure MongoDB is running either locally or using a cloud-based MongoDB service. Update the MongoDB connection string in the `.env` file.
- Feel free to explore and customize the code according to your requirements. The project structure provides separate folders for the backend and frontend, allowing you to work on each part independently.
- Refer to the respective documentation for each library or framework for more detailed information on how to use them in your project.

**Installing Additional Libraries**

Please note that as you progress with the project, you may come across additional libraries or dependencies that are not listed here. If you encounter any missing libraries or dependencies, you can install them using your preferred package manager (`npm`, `yarn`, etc.) by running the appropriate command. Make sure you have navigated to the correct project directory before running the command.

```shell
npm install <library-name>
yarn add <library-name>
```

##Contact Me

If you have any questions about the project, feel free to reach out via [my LinkedIn](https://www.linkedin.com/in/parul-jain25/)

