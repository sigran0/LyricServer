
Lyric REST API Server
=============

This application is Lyric RESTFULL API Server

useage: ```localhost/api/songs?start_index={...}&limit={...}&artist_id={...}&genre={...}&artist={...}&title={...}&start_date={...}&end_date={...}&title_in={...}&lyric_in```

each parameters can be skipped and can search complex parameter

start_index : start index in the database
limit : limit of request data length
artist_id : search by artist_id
genre : search by genre
artist : search by artist name
title : search by title
start_date : search by start_date with timestamp
end_date : search by end_date with timestamp, default: Date.now()
title_in : search by substring in the title
lyric_in : search by substring in the lyric