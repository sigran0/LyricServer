
Lyric REST API Server
=============

This application is Lyric RESTFULL API Serve

useage: ```localhost/api/songs?{params}```

each parameters can be skipped and can search complex parameter

## parameter list

1. start_index : start index in the database
2. limit : limit of request data length
3. artist_id : search by artist_id
4. genre : search by genre
5. artist : search by artist name
6. title : search by title
7. start_date : search by start_date with timestamp
8. end_date : search by end_date with timestamp, default: Date.now()
9. title_in : search by substring in the title
10. lyric_in : search by substring in the lyric