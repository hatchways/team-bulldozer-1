# Mentions Crawler

## Links/Resources

- [Github Repo](https://github.com/hatchways/team-bulldozer-1/invitations)
- [Drive Folder](https://drive.google.com/drive/u/2/folders/1_LKa9peQrEwvZEWDE-z-AD7DMntX3qoP)


## Stack

- MongoDB + [Mongoose](https://mongoosejs.com/docs/) + [Passport-JS](http://www.passportjs.org/)
- Express.js
- Node.js
    - [Search tweets](https://developer.twitter.com/en/docs/tweets/search/overview) : free is limited in time range but faster to implement
    - [Twitter feed source api](https://developer.twitter.com/en/docs/tweets/filter-realtime/overview) : Best of all, allow real-time capture of tweets. Needs a running worker, can't be deployed to serverless
    - [Reddit Search API](https://www.reddit.com/dev/api/#GET_search)
      - [reddit npm](https://www.npmjs.com/package/reddit)
- React (bootstraped with [create-react-app](https://create-react-app.dev/)) 
    - [Material-UI](https://material-ui.com/) is used for UI components
    - All styles are authored using [JSS](https://cssinjs.org/) using Material UI's wrappers
- Code linting using ESlint acording to [Airbnb's JS code style guide](https://github.com/airbnb/javascript/tree/master/react)

## Back-end

### Folder structure

```
server
├─── requests.http        # Manual test examples for API endpoints
├─── src
│    ├─── app.js          # Bundle Express app
│    ├─── bin
│    │     └─── www.js    # App entry point (HTTP Server)
│    ├─── config          # Environment variables and configuration related stuff
│    ├─── loaders         # Split the startup process into modules
│    ├─── models          # Database models
│    ├─── routes          # Express route controllers for all the endpoints of the app
│    ├─── services        # All the business logic is here
│    └─── validators      # Validate user input + middleware
└─── test                 # Unit Test specs
```

### Starting MongoDB server locally (Docker)

  - [Reference](https://hub.docker.com/_/mongo)

```
docker run --name hatchways-mongo -p 27017:27017 -d mongo:4.4-bionic
```

### Starting the backend

1. In the `/server` folder, install dependencies with `npm install`
2. To run:
    * Run `npm run debug` to start the backend locally with hot reload on `http://localhost:3001`
    * Run `npm test` to run unit tests


## Front-end

### Folder structure
```
client
├───public              # Static files
├───src
├───├───assets          # Visual assets (images, icons, etc.)
├───├───components      # Reusable components
├───├───layouts         # Layouts used by the routes to render the different interfaces
├───├───pages           # Page components that get rendered into the layouts
├───├───themes          # Material UI theme definition
├───├───utils           # Non-React JS code and classes to support the components
├───├───├───api         #   - Static classes that wrap backend API calls
├───├───    helpers.js  #   - Pure functions reused through the app
└───    App.jsx         # App init + routes
└───    index.jsx       # Main entry point / app mount
```

### Starting the app

1. In the `/client` folder, install dependencies with `npm install`
2. To run:
    * Run `npm start` to start the app locally with hot reload on `http://localhost:3000`
    * Run `npm build` to build and minify the app for production
3. For more details, see [Create React App docs](https://create-react-app.dev/docs/getting-started).
