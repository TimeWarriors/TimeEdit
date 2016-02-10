'use strict';
const TimeEdidApi = require('./timeeditApi/index.js');
const init = () => {

    // lnu
    const timeEdidApiLnu = new TimeEdidApi(
        'https://se.timeedit.net/web/lnu/db1/schema1/',
        4
    );

    // todays schedule
    timeEdidApiLnu.getTodaysSchedule('ny105')
        .then((roomSchedule) => {
            console.log(JSON.stringify(roomSchedule, null ,2));
        }).catch((er) => {
            console.log(er);
        });

    // full schedule
    timeEdidApiLnu.getSchedule('ny105')
        .then((schedule) => {
            console.log(JSON.stringify(schedule, null ,2));
        }).catch((er) => {
            console.log(er);
        });

    // search and se if schedule exists
    timeEdidApiLnu.search('ny105')
        .then((result) => {
            console.log(JSON.stringify(result, null ,2));
        }).catch((er) => {
            console.log(er);
        });


    // liu
    /*const timeEdidApiLiu = new TimeEdidApi(
        'https://se.timeedit.net/web/liu/db1/schema/',
        195
    );

    timeEdidApiLiu.getTodaysSchedule('a311')
        .then((roomSchedule) => {
            console.log(roomSchedule);
        }).catch((er) => {
            console.log(er);
        });

    timeEdidApiLiu.getSchedule('a311')
        .then((roomSchedule) => {
            console.log(roomSchedule);
        }).catch((er) => {
            console.log(er);
        });*/
};

init();
