const router = require('express').Router();

const Validators = require('../validators').search;
const { search } = require('../services/search');

router.get('/', Validators.search, search);

module.exports = router;
