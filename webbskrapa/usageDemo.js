'use strict';
const TimeEdidApi = require('./timeeditApi/index.js');
const init = () => {

    // lnu
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

    // full room schedule
    timeEdidApiLnu.getRoomSchedule('ny160')
        .then((roomSchedule) => {
            console.log(roomSchedule);
        }).catch((er) => {
            console.log(er);
        });


    // liu
    /*const timeEdidApiLiu = new TimeEdidApi(
        'https://se.timeedit.net/web/liu/db1/schema/',
        195
    );

    timeEdidApiLiu.getTodaysRoomSchedule('a311')
        .then((roomSchedule) => {
            console.log(roomSchedule);
        }).catch((er) => {
            console.log(er);
        });

    timeEdidApiLiu.getRoomSchedule('a311')
        .then((roomSchedule) => {
            console.log(roomSchedule);
        }).catch((er) => {
            console.log(er);
        });*/
};

init();
