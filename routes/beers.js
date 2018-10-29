var express = require('express');
var router = express.Router();
var beers = require('../controllers/beersController');

router.get('/', beers.index);
router.get('/new', beers.new);
router.get('/:id', beers.show);
router.post('/', beers.create);
router.delete('/:id', beers.destroy);
router.post('/:id/comments', beers.createComment);


module.exports = router;