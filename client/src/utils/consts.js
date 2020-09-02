export default {
  env: {
    API_URL: process.env.REACT_APP_API_URL,
    SOCKET_URL: process.env.REACT_APP_SOCKET_API_URL,
  },
  CRAWLERS: [
    { name: 'twitter', label: 'Twitter', logo: require('../assets/img/crawlers/twitter.svg') },
    { name: 'reddit', label: 'Reddit', logo: require('../assets/img/crawlers/reddit.svg') },
  ],
};
