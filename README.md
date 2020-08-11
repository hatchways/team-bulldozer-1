# Mentions Crawler

## Links/Resources

- [Github Repo](https://github.com/hatchways/team-bulldozer-1/invitations)
- [Drive Folder](https://drive.google.com/drive/u/2/folders/1_LKa9peQrEwvZEWDE-z-AD7DMntX3qoP)


## Stack

  - MongoDB + [Mongoose](https://mongoosejs.com/docs/) + [Passport-JS](http://www.passportjs.org/)
    - [Search tweets](https://developer.twitter.com/en/docs/tweets/search/overview) : free is limited in time range but faster to implement
    - [Twitter feed source api](https://developer.twitter.com/en/docs/tweets/filter-realtime/overview) : Best of all, allow real-time capture of tweets. Needs a running worker, can't be deployed to serverless
    - [Reddit Search API](https://www.reddit.com/dev/api/#GET_search)
      - [reddit npm](https://www.npmjs.com/package/reddit)

  - Express.js
  - React + [Material-UI](https://material-ui.com/)
  - Node.js

## Back-end

### Folder structure

```
server
│   app.js          # App entry point
└───api             # Express route controllers for all the endpoints of the app
└───config          # Environment variables and configuration related stuff
└───loaders         # Split the startup process into modules
└───models          # Database models
└───services        # All the business logic is here
└───subscribers     # Event handlers for async task
```

### Starting MongoDB server locally (Docker)

  - [Reference](https://hub.docker.com/_/mongo)

```
docker run --name hatchways-mongo -p 27017:27017 -d mongo:4.4-bionic
```

## Front-end


