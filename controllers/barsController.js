const Bar = require('../models/Bar');
const Beer = require('../models/Beer');

module.exports = {

    index: function(req, res, next) {
        Bar.find({}, function(err, bars) {
            if (err) return next(err);
            res.render('bars/index', {bars});
        });
    },

    new: function(req, res, next) {
        res.render('bars/new');
    },

    create: function(req, res, next) {
        let data = req.body;
        Bar.create({
            name: data.name
        }, function(err) {
            if (err) return next(err);
            res.redirect('/bars'); // this needs to go to 'bars/:id/show'
        });
    },

    show: function(req, res, next) {
        Bar.findById(req.params.id).populate('beers').exec(function(err, bar) {
            if (err) return next(err);
            Beer.find({}, function(err, beers) {
                res.render('bars/show', {beers, bar});
            });
        });
    },

    newBeer: function(req, res) {
        Beer.find({bars: {$ne: req.params.id}})
        // --alternate way to find beers not currently being served
        // Beer.find({})
        //   .where('bars').nin([req.params.id])
          .exec(function(err, beers) {
            res.render('bars/serve', {
              pageTitle: 'Click Beer to Serve',
              beers,
              barId: req.params.id
            });
          });
      },

    createBeer: function(req, res, next) {
        Bar.findById(req.params.barId, (err, bar) => {
          bar.beers.push(req.body.beer);
          bar.save(() => {
            Beer.findById(req.body.beer, (err, beer) => {
              beer.bars.push(req.params.barId);
              beer.save(() => {
                res.redirect(`/bars/${bar.id}`);
              });
            });
          });
        });
      },

    removeBeer: function(req, res, next) {
        Bar.findById(req.params.barId, function(err, bar) {
            bar.beers.remove(req.params.beerId);
            bar.save(function(err) {
                Beer.findById(req.params.beerId, function(err, beer) {
                    beer.bars.remove(req.params.barId);
                    beer.save(function(err) {
                        res.redirect(`/bars/${req.params.barId}`);
                    });
                });
            });
        });
    },

    destroy: function(req, res, next) {
        Bar.remove({_id: req.params.id}, function(err) {
            if (err) return next(err);
            res.redirect('/bars');
        });
    }



}