'use strict';
const request = require('request');


const TimeEditCrawler = class {
    constructor(originUrl, types) {
        if(!this.validUrl(originUrl)){
            throw 'invalid url';
        }
        this.originUrl = originUrl;

        this.searchURL = `objects.html?max=15&fr=t&partajax=t&im=f&sid=3&l=sv_SE&search_text=&types=${types}`;
        this.scheduleUrl = 'ri.json?h=f&sid=3&p=0.m%2C12.n&objects=&ox=0&types=0&fe=0&h2=f';
        this.typeUrlExtension = 'ri1Q7.html';
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

    isHtmlURL(url){
        let reg = new RegExp('html');
        return this.originUrl.match(reg);
    }

    getJsonUrlFromHtmlUrl(url){
        url = url || this.originUrl;
        let reg = new RegExp('html');
        return url.replace(reg, 'json');
    }

    /**
     * [checks if url is valid or not]
     * @return {[bool]} [if url is valid or not]
     */
    validUrl(url){
        url = url || this.originUrl;
        let timeeditReg = new RegExp('timeedit');
        let urlReg = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
        if(!urlReg.test(url)){
            return false;
        }
        if(!url.match(timeeditReg)){
            return false;
        }
        return true;
    }

    getTypeUrl(){
        return this.originUrl+this.typeUrlExtension;
    }

    buildDataURL(id){
        let urlArray = this._splitString(this.searchURL, this.searchText);
        return this.originUrl + this._joinString(urlArray, `${this.searchText}${id}`);
    }

    buildScheduleURL(dataId){
        return  Array.isArray(dataId) ?
            this._buildMultibleScheduleURL(dataId) :
            this._buildScheduleURL(dataId);
    }

    _buildScheduleURL(dataId){
        let urlArray = this._splitString(this.scheduleUrl, this.objectsText);
        return this.originUrl + this._joinString(urlArray, `${this.objectsText}${dataId}`);
    }

    _buildMultibleScheduleURL(dataIds){
        let urlArray = this._splitString(this.scheduleUrl, this.objectsText);
        return this.originUrl + this._joinString(urlArray, `${this.objectsText}${dataIds.join()}`);
    }

    _splitString(string, splitWord){
        return string.split(splitWord);
    }

    _joinString(array, joinOn){
        return array.join(joinOn);
    }
};

module.exports = TimeEditCrawler;
