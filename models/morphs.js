

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let morphsSchema = new Schema({
    artist_id: String,
    song_id: String,
    morphs: []
}, {
    collection: 'morphs_data'
});

module.exports = mongoose.model('morphs_data', morphsSchema);