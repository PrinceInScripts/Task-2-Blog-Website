<H1 align ="center" > A Blogging Web App  </h1>

  * [Configuration and Setup](#configuration-and-setup)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)


## Configuration and Setup

To run this project locally, follow these steps:

1. Fork and clone the repository or download it as a zip file and extract it on your machine.
2. Open the project in your preferred code editor.
3. Open the terminal and navigate to the project directory.

In the first terminal

```
$ cd client
$ npm install (to install frontend-side dependencies)
$ npm run  start (to start the frontend)
```

In the second terminal

- cd server and Set environment variables in config.env under ./config
- Create your mongoDB connection url, which you'll use as your MONGO_URI
- Supply the following credentials

```
#  ---  Config.env  ---
NODE_ENV = production
PORT =5000
URI =http://localhost:3000
MONGO_URI =
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d
RESET_PASSWORD_EXPIRE =  
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 
SMTP_USERNAME = 
SMTP_PASSWORD =
SMTP_FROM_EMAIL = 
CONTACT_US_EMAIL =
FRONTEND_URL=http://localhost:5173
```


```
# --- Terminal ---
$ npm install (to install backend-side dependencies)
$ npm start (to start the backend)
```

##  Key Features

- User registration and login
- Authentication using JWT Tokens
- CRUD operations (Blog create, read, update and delete)
- Upload user ımages and blog ımages  to the server
- Liking  blog and Comment on blog
- Toast loading effect
- Responsive Design

<br/>

##  Technologies used

This project was created using the following technologies.

####  Frontend 

- [React js ](https://www.npmjs.com/package/react) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [React Hooks  ](https://reactjs.org/docs/hooks-intro.html) - For managing and centralizing application state
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - To handle routing
- [axios](https://www.npmjs.com/package/axios) - For making Api calls
- [Tailwind CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - For User Interface
- [CK-Editor](https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html) - Rich Text Editor 
- [React icons](https://react-icons.github.io/react-icons/) -
 Small library that helps you add icons  to your react apps.

####  Backend 

- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests
- [Mongoose](https://mongoosejs.com/) - For modeling and mapping MongoDB data to JavaScript
- [express-async-handler](https://www.npmjs.com/package/express-async-handler) - Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers 
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For authentication
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - For data encryption
- [Nodemailer](https://nodemailer.com/about/) - Send e-mails from Node.js
- [Dotenv](https://www.npmjs.com/package/dotenv) - Zero Dependency module that loads environment variables
- [multer](https://www.npmjs.com/package/multer) - Node.js middleware for uploading files 
- [slugify](https://www.npmjs.com/package/slugify) - For encoding titles into a URL-friendly format
- [cors](https://www.npmjs.com/package/cors) - Provides a Connect/Express middleware


####  Database 

 - [MongoDB ](https://www.mongodb.com/) - It provides a free cloud service to store MongoDB collections.
