'use strict';
const request = require('request');

const TimeEditCrawler = class {
    constructor(roomDataIdUrl, roomScheduleURL) {
        this.roomDataIdUrl = roomDataIdUrl;
        this.roomScheduleURL = roomScheduleURL;
    }

    getHtml(url){
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    return resolve(body);
                }
                return reject(error);
            });
        });
    }

    buildRoomDataURL(roomId){
        let urlArray = this._splitString(this.roomDataIdUrl, 'search_text=');
        return this._joinString(urlArray, `search_text=${roomId}`);
    }

    buildScheduleRoomURL(roomDataId){
        let urlArray = this._splitString(this.roomScheduleURL, 'objects=');
        return this._joinString(urlArray, `objects=${roomDataId}`);
    }

    _splitString(string, splitWord){
        return string.split(splitWord);
    }

    _joinString(array, joinOn){
        return array.join(joinOn);
    }
};


module.exports = TimeEditCrawler;
