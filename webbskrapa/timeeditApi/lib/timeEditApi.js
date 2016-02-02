'use strict';
const TimeEditCrawler = require('./timeEditCrawler.js');
const dataParser = require('./timeEditDataParser.js');

const TimeEditAPi = class extends TimeEditCrawler {
    constructor(url1, url2){
        super(url1, url2);
    }

    /**
     * [gets todays schedule for a room]
     * @param  {[string]} roomId [name of a room]
     * @return {[object]}        [todays schedule for a room]
     */
    getTodaysRoomSchedule(roomId){
        return new Promise((resolve, reject) => {
            this._doRoomSchedule(roomId)
                .then((jsonString) => {
                    const parsedJson = JSON.parse(jsonString);
                    resolve(dataParser.buildTodaysSchedule(parsedJson));
                }).catch((er) => {
                    reject(er);
                });
        });
    }

    /**
     * [room schedule over multible days]
     * @param  {[string]} roomId [name of a room]
     * @return {[object]}        [schedule for a room over multible days]
     */
    getRoomSchedule(roomId){
        return new Promise((resolve, reject) => {
            this._doRoomSchedule(roomId)
                .then((jsonString) => {
                    const parsedJson = JSON.parse(jsonString);
                    resolve(dataParser.buildRoomSchedule(parsedJson));
                }).catch((er) => {
                    reject(er);
                });
        });
    }

    _doRoomSchedule(roomId){
        // super in promise v8 bugg fix
        const roomSchedule = (html) => {
            if(dataParser.isRoomValid(html)){
                let dataId = dataParser.getDataId(html);
                return super.getHtml(super.buildScheduleRoomURL(dataId));
            }else {
                throw 'room not valid';
            }
        };
        return new Promise((resolve, reject) => {
            super.getHtml(super.buildRoomDataURL(roomId))
                .then((html) => {
                    return roomSchedule(html);
                })
                .then((jsonString) => {
                    resolve(jsonString);
                }).catch((er) => {
                    reject(er);
                });
        });
    }
};

module.exports = TimeEditAPi;
