
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let songSchema = new Schema({
    artist_id: String,
    song_id: String,
    song_info: {
        artist: String,
        title: String,
        album: String,
        release_date: Number,
        genre: String,
        lyric: String
    }
}, {
    collection: 'song_data'
});

module.exports = mongoose.model('song_data', songSchema);