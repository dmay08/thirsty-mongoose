var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema( {
    content: String,
}, {
    timestamps: true
}); 

var beerSchema = new Schema( {
    name: String,
    style: String,
    bars: [{type: Schema.Types.ObjectId, ref: 'Bar'}],
    comments: [commentSchema]
}, {
    timestamps: true
});

// New function! 'What to do AFTER/POST the 'remove' operation'
beerSchema.post('remove', function (doc) {
    this.model('Bar').find(
        { beers: doc._id },
        function (err, bars) {
            bars.forEach(function (bar) {
                bar.beers.remove(doc._id);
                bar.save();
            });
        }
    );
});




module.exports = mongoose.model('Beer', beerSchema);