let express = require('express');
let Song = require('../models/song');
let Morphs = require('../models/morphs');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'success',
        data: []
    });
});

router.post('/morphs', (req, res) => {

    let artist_id = req.body.artist_id;
    let song_id = req.body.song_id;
    let morphs = req.body.morphs;

    // console.log(req.body);

    let morphs_data = new Morphs({
        artist_id: artist_id,
        song_id: song_id,
        morphs: morphs
    });

    morphs_data.save()
        .then(() => {
            res.json({
                status: 200,
                message: 'success',
                data: true
            });
        })
        .catch((err) => {
            console.log('fucking', err);
            res.status(500).json({
                status: 500,
                message: err,
                data: false
            });
        });

});

router.post('/songs', (req, res) => {

    let artist_id = req.body.artist_id;
    let song_id = req.body.song_id;
    let artist = req.body.song_info.artist;
    let title = req.body.song_info.title;
    let album = req.body.song_info.album;
    let release_date = req.body.song_info.release_date;
    let genre = req.body.song_info.genre;
    let lyric = req.body.song_info.lyric;
    
    let song = new Song({
        artist_id: artist_id,
        song_id: song_id,
        song_info: {
            artist: artist,
            title: title,
            album: album,
            release_date: release_date,
            genre: genre,
            lyric: lyric
        }
    });

    song.save()
        .then(() => {
            res.json({
                status: 200,
                message: 'success',
                data: true
            });
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                message: err,
                data: false
            });
        });
});

router.get('/morphs', (req, res) => {

    let start_index = req.query.start || 0;
    let limit = req.query.limit || 50;
    let genre = req.query.genre || null;
    let artist = req.query.artist || null;

    let songQuery = Song.find();
    let morphsQuery = Morphs.find();

    if(genre !== null)
        songQuery = songQuery.where('song_info.genre').equals(genre);

    if(artist !== null)
        songQuery = songQuery.where('song_info.artist').equals(artist);

    songQuery.select('song_id').select('artist_id').select('-_id');

    songQuery
        .skip(start_index)
        .limit(limit)
        .then((song_datas) => {

            let song_id_list = song_datas.map((data) => {
                return data.song_id;
            });

            morphsQuery.where('song_id').equals(song_id_list);

            return morphsQuery;
        })
        .then((morphs_datas) => {

            console.log(morphs_datas.length);
            res.json({
                status: 200,
                message: 'success',
                data: morphs_datas
            })
        });
});

router.get('/songs', (req, res) => {

    let start_index = req.query.start || 0;
    let limit = req.query.limit || 50;
    let artist_id = req.query.artist_id || null;
    let song_id = req.query.song_id || null;
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

    if(song_id != null)
        query = query.where('song_id').equals(song_id);

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
            console.log(data.length);
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