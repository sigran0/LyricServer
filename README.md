
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

주의점
================
sort 호출할때 메모리 문제 발생한다면?

sort 할 타겟을 index로 잡아주니까 문제 해결

mongoDB에서는 각 index가 8바이트의 용량을 잡아먹는다고 하니까

총 32MB의 용량 중 index가 차지할 수 있는 갯수는 대략 400만개 정도임
