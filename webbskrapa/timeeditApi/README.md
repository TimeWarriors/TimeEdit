

#### Example


```javascript
const timeEdidApiLnu = new TimeEdidApi(
    'https://se.timeedit.net/web/lnu/db1/schema1/',
    4
);

// todays room schedule
timeEdidApiLnu.getTodaysRoomSchedule('ny110')
    .then((roomSchedule) => {
        console.log(roomSchedule);
    }).catch((er) => {
        console.log(er);
    });
```
