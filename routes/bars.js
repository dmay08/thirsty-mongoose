var express = require('express');
var router = express.Router();
var bars = require('../controllers/barsController');

router.get('/', bars.index);
router.get('/new', bars.new);
router.get('/:id', bars.show);
router.post('/', bars.create);
router.delete('/:id', bars.destroy)
router.get('/:id/beers/new', bars.newBeer)
router.post('/:barId/beers', bars.createBeer)
router.delete('/:barId/beers/:beerId', bars.removeBeer);

module.exports = router;