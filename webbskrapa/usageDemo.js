'use strict';
const TimeEdidApi = require('./timeeditApi/index.js');
const init = () => {

    // lnu
    const timeEdidApiLnu = new TimeEdidApi(
        'https://se.timeedit.net/web/lnu/db1/schema1/objects.html?max=15&fr=t&partajax=t&im=f&sid=3&l=sv_SE&search_text=&types=4',
        'https://se.timeedit.net/web/lnu/db1/schema1/ri.json?h=f&sid=3&p=0.m%2C12.n&objects=&ox=0&types=0&fe=0&h2=f'
    );

    // todays room schedule
    timeEdidApiLnu.getTodaysRoomSchedule('ny105')
        .then((roomSchedule) => {
            console.log(roomSchedule);
        }).catch((er) => {
            console.log(er);
        });

    // full room schedule
    timeEdidApiLnu.getRoomSchedule('ny110')
        .then((roomSchedule) => {
            console.log(roomSchedule);
        }).catch((er) => {
            console.log(er);
        });


    // liu
    /*const timeEdidApiLiu = new TimeEdidApi(
        'https://se.timeedit.net/web/liu/db1/schema/objects.html?max=15&fr=t&partajax=t&im=f&sid=3&l=sv_SE&search_text=&types=195',
        'https://se.timeedit.net/web/liu/db1/schema/ri.json?h=f&sid=3&p=0.m%2C12.n&objects=&ox=0&types=0&fe=0&h2=f'
    );

    timeEdidApiLiu.getTodaysRoomSchedule('a311')
        .then((roomSchedule) => {
            console.log(roomSchedule);
        }).catch((er) => {
            console.log(er);
        });

    timeEdidApiLiu.getRoomSchedule('a311')
        .then((roomSchedule) => {
            fsp.writeFile('example.json', JSON.stringify(roomSchedule));
            console.log(roomSchedule);
        }).catch((er) => {
            console.log(er);
        });*/
};

init();
