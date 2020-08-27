# Mentions Crawler

## Links/Resources

- [Github Repo](https://github.com/hatchways/team-bulldozer-1/invitations)
- [Drive Folder](https://drive.google.com/drive/u/2/folders/1_LKa9peQrEwvZEWDE-z-AD7DMntX3qoP)


## Stack

- MongoDB + [Mongoose](https://mongoosejs.com/docs/) + [Passport-JS](http://www.passportjs.org/)
- Express.js
- Node.js
    - [Search tweets](https://developer.twitter.com/en/docs/tweets/search/overview): free is limited in time range but faster to implement
    - [Twitter feed source api](https://developer.twitter.com/en/docs/tweets/filter-realtime/overview): Best of all, allow real-time capture of tweets. Needs a running worker, can't be deployed to serverless
    - [Reddit Search API](https://www.reddit.com/dev/api/#GET_search)
      - [reddit npm](https://www.npmjs.com/package/reddit)
    - [Bull](https://github.com/OptimalBits/bull): redis based queue
    
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

### Starting Backend server containers locally (Docker)

  - [Mongo](https://hub.docker.com/_/mongo)
  - [Redis](https://hub.docker.com/_/redis)
  - [Docker-compose](https://docs.docker.com/compose/gettingstarted/)

First, in the `/server` folder :

1. Copy `.env.example` to `.env`
2. Change api keys in `.env` file
    - Get your own [Twitter API](https://developer.twitter.com/en/apps) key

To start all backend services at once. Service will be available at http://localhost:3001

```
docker-compose up -d
```

To start redis and mongo only (for backend dev)

```
docker-compose up -d redis mongo
```

To update backend container

```
docker-compose build
```

Clean up resources

```
docker-compose down
```


### Starting the backend

In the `/server` folder

1. Copy `.env.example` to `.env`
2. Change api keys in `.env` file
    - Get your own [Twitter API](https://developer.twitter.com/en/apps) key
3. Start mandatory services: `docker-compose up -d redis mongo`
4. Install dependencies with `npm install`
5. To run:
    * Run `npm run debug` to start the backend locally with hot reload on `http://localhost:3001`
    * Run `npm test` to run unit tests


## Front-end

### Folder structure
```
client
├───public           # Static files
├───src
├───├───assets       # Visual assets (images, icons, etc.)
├───├───components   # Reusable components
├───├───layouts      # Layouts used by the routes to render the different interfaces
├───├───pages        # Page components that get rendered into the layouts
├───├───themes       # Material UI theme definition
└───    App.jsx      # App init + routes
└───    index.jsx    # Main entry point / app mount
```

### Starting the app

1. In the `/client` folder, install dependencies with `npm install`
2. To run:
    * Run `npm start` to start the app locally with hot reload on `http://localhost:3000`
    * Run `npm build` to build and minify the app for production
3. For more details, see [Create React App docs](https://create-react-app.dev/docs/getting-started).
