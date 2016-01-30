'use strict';
const cheerio = require('cheerio');

const TimeEditDataParser = class {
    constructor(){

    }

    getDataId(html){
        let $ = this._loadHtml(html);
        return $('#objectbasketitemX0').data('id');
    }

    buildTodaysSchedule(object){
        if(!object.hasOwnProperty('reservations')){ throw 'invalid search result'; }

        return object.reservations
            .map((reservation) => {
                return {
                    booking: {
                        time:{
                            endDate: reservation.enddate,
                            endTime: reservation.endtime,
                            startDate: reservation.startdate,
                            startTime: reservation.starttime
                        },
                        id: reservation.id,
                        other: reservation.columns[8],
                        staff: reservation.columns[3]
                    }
                };
            }).filter((reservation) => {
                let reservationDate = this.parseDate(reservation.booking.time.startDate);
                let todaysDate = this.getTodaysDate();

                return reservationDate.getFullYear() === todaysDate.getFullYear() &&
                    reservationDate.getMonth() === todaysDate.getMonth() &&
                    reservationDate.getDate() === todaysDate.getDate();
            });
    }

    isRoomValid(html){
        let $ = this._loadHtml(html);
        return $('.searchObject').hasOwnProperty('0');
    }

    getTodaysDate(){
        //year, month, day, hours, minutes, seconds, milliseconds
        return new Date('2016', '2', '1', 0, 0,0); // fake date
    }

    parseDate(dateString){
        return new Date(dateString);
    }

    _loadHtml(html){
        return cheerio.load(html);
    }

};

module.exports = new TimeEditDataParser();
