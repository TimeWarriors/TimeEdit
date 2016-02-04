'use strict';
const request = require('request');


const TimeEditCrawler = class {
    constructor(originUrl, types) {
        this.originUrl = originUrl;
        this.roomUrl = `objects.html?max=15&fr=t&partajax=t&im=f&sid=3&l=sv_SE&search_text=&types=${types}`;
        this.scheduleUrl = 'ri.json?h=f&sid=3&p=0.m%2C12.n&objects=&ox=0&types=0&fe=0&h2=f';
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
        let urlArray = this._splitString(this.roomUrl, this.searchText);
        return this.originUrl + this._joinString(urlArray, `${this.searchText}${roomId}`);
    }

    buildScheduleRoomURL(roomDataId){
        let urlArray = this._splitString(this.scheduleUrl, this.objectsText);
        return this.originUrl + this._joinString(urlArray, `${this.objectsText}${roomDataId}`);
    }

    _splitString(string, splitWord){
        return string.split(splitWord);
    }

    _joinString(array, joinOn){
        return array.join(joinOn);
    }
};


module.exports = TimeEditCrawler;
