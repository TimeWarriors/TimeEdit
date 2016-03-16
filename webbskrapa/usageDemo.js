'use strict';
const TimeEdidApi = require('./timeeditApi/index.js');
const init = () => {

    // lnu
    /*const timeEdidApiLnu = new TimeEdidApi(
        'https://se.timeedit.net/web/lnu/db1/schema1/',
        3
    );*/

    // todays schedule
    /*timeEdidApiLnu.getTodaysSchedule('ny105')
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

    // get the diffrent types of schedule
    TimeEdidApi.getAllTypes(
            'https://se.timeedit.net/web/lnu/db1/schema1/'
        ).then((result) => {
            console.log(JSON.stringify(result, null ,2));
        }).catch((er) => {
            console.log(er);
        });*/


    TimeEdidApi.getScheduleByScheduleUrl(
            'https://se.timeedit.net/web/lnu/db1/schema1/s.html?i=6Y7XYQQ7wZ36QvZ5071875y7YQ8'
        ).then((result) => {
            console.log(JSON.stringify(result, null ,2));
        }).catch((er) => {
            console.log(er);
        });

};

init();
