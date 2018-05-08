let express = require('express');
let Song = require('../models/song');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'success',
        data: []
    })
});

router.get('/songs', (req, res) => {

    let start_index = req.query.start || 0;
    let limit = req.query.limit || 50;
    let artist_id = req.query.artist_id || null;
    let genre = req.query.genre || null;
    let artist = req.query.artist || null;
    let title = req.query.title || null;
    let start_date = req.query.start_date || null;
    let end_date = req.query.end_date || Date.now();
    let title_in = req.query.title_in || null;
    let lyric_in = req.query.lyric_in || null;
    let order = req.query.order || '1';

    let query = Song.find();

    if(artist_id !== null)
        query = query.where('artist_id').equals(artist_id);

    if(genre != null)
        query = query.where('song_info.genre').equals(genre);

    if(artist != null)
        query = query.where('song_info.artist').equals(artist);

    if(title != null)
        query = query.where('song_info.title').equals(title);

    if(title_in != null)
        query = query.where('song_info.title').regex(title_in);

    if(lyric_in != null)
        query = query.where('song_info.lyric').regex(lyric_in);

    if(start_date != null)
        query = query.gte('song_info.release_date', start_date);

    if(end_date != null){
        //  이렇게 할 필요는 없지만 미관상 놔둔다 -_-
        let str = 'song_info.release_date';
        if(order === '1')
            str = '-' + str;

        query = query.lte('song_info.release_date', end_date)
                     .sort(str);
    }

    query.skip(start_index)
        .limit(limit)
        .then((data) => {
            res.json({
                status: 200,
                message: 'success',
                data: data
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                message: err,
                data: null
            });
        });
});

module.exports = router;
