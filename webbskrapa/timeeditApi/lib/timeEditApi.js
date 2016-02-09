'use strict';
const TimeEditCrawler = require('./timeEditCrawler.js');
const dataParser = require('./timeEditDataParser.js');

const TimeEditAPi = class extends TimeEditCrawler {
    constructor(url, types){
        super(url, types);
    }

    /**
     * [schedule over multible days]
     * @param  {[string]} id     [name of thing]
     * @return {[object]}        [schedule over multible days]
     */
    getSchedule(id){
        return new Promise((resolve, reject) => {
            this._getSchedule(id)
                .then((jsonString) => {
                    const parsedJson = JSON.parse(jsonString);
                    resolve(dataParser.buildSchedule(parsedJson, id));
                }).catch((er) => {
                    reject(er);
                });
        });
    }

    /**
     * [gets todays schedule for a room]
     * @param  {[string]} id     [name of a thing]
     * @return {[object]}        [todays schedule for a room]
     */
    getTodaysSchedule(id){
        return new Promise((resolve, reject) => {
            this._getSchedule(id)
                .then((jsonString) => {
                    const parsedJson = JSON.parse(jsonString);
                    resolve(dataParser.buildTodaysSchedule(parsedJson, id));
                }).catch((er) => {
                    reject(er);
                });
        });
    }

    _getSchedule(id){
        const schedule = (html) => {
            if(dataParser.isValidSearch(html)){
                let dataId = dataParser.getDataIds(html);
                return super.getHtml(super.buildScheduleURL(dataId));
            }
            throw 'room not valid';
        };

        return new Promise((resolve, reject) => {
            super.getHtml(super.buildDataURL(id))
                .then((html) => {
                    return schedule(html);
                }).then((jsonString) => {
                    resolve(jsonString);
                }).catch((er) => {
                    reject(er);
                });
        });
    }

};

module.exports = TimeEditAPi;
