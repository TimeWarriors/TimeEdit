'use strict';
const request = require('request');

const TimeEditCrawler = class {
    constructor(roomDataIdUrl, roomScheduleURL) {
        this.roomDataIdUrl = roomDataIdUrl;
        this.roomScheduleURL = roomScheduleURL;
        this.searchText = 'search_text=';
        this.objectsText = 'objects=';
    }

    /**
     * [get html from site]
     * @param  {[string]} url [url to site]
     * @return {[string]}     [html in string]
     */
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
        let urlArray = this._splitString(this.roomDataIdUrl, this.searchText);
        return this._joinString(urlArray, `${this.searchText}${roomId}`);
    }

    buildScheduleRoomURL(roomDataId){
        let urlArray = this._splitString(this.roomScheduleURL, this.objectsText);
        return this._joinString(urlArray, `${this.objectsText}${roomDataId}`);
    }

    _splitString(string, splitWord){
        return string.split(splitWord);
    }

    _joinString(array, joinOn){
        return array.join(joinOn);
    }
};


module.exports = TimeEditCrawler;
