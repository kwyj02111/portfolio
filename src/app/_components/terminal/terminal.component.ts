import { Component, OnInit, DoCheck, OnDestroy, HostListener, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';

/*service*/
import { AppStateService } from '../../_services/index';
import { DeviceService } from '../../_services/index';

/*import jquery, underscore*/
import * as $ from 'jquery';
import * as _ from 'underscore';

@Component({
    selector: 'terminal',
    templateUrl: './terminal.component.html',
    styleUrls : [
                    '../../_css/common.css',
                    '../../_css/terminal.css'
                ],
})
export class TerminalComponent implements OnInit, DoCheck {

    public _terminal : any; // terminal data bind
    private _appStateHandler; // App State - subscribe
    private _deviceInfoHandler; // device Info - subscribe

    constructor(
        private _appState : AppStateService,
        private _device : DeviceService,
        @Inject(DOCUMENT) private _dom: Document,
    ) {
        this.registerTwoWayBind();
        this.setComponentZindex();
        this.getDate();
    }

    ngOnInit() {
        this._appStateHandler = this._appState.getAppStateSubscribe()
            .subscribe((r_notice) => {
                this.setComponentZindex();
                return;
            });

        this._deviceInfoHandler = this._device.getDeviceInfoSubscribe()
            .subscribe((r_notice) => {
                this._terminal.device = r_notice;
                return;
            });
    }

    ngDoCheck() {
        let index = this._terminal.search.length;

        // 최소화 일 경우 focus remove
        if($('#terminalContainer').hasClass('minimize')){
            $(`#terminalInput${index}`).blur();
            return;
        }

        // textarea focus
        $(`#terminalInput${index}`).focus();
        return;
    }

    ngOnDestroy() {
        this._appStateHandler.unsubscribe();
        this._deviceInfoHandler.unsubscribe();
    }

    registerTwoWayBind(){
        this._terminal = {
            'data' : {
                'nowTime' : '',
            },
            'search' : [],
            'depth' : '/desktop',
            'fullScreen' : false,
            'device' : this._device.getDeviceInfo(),
            'zindex' : 0,
        };

        return;
    }

    setComponentZindex(){

        let stateArray = this._appState.getAppState().appArray;
        let idx = _.findIndex(stateArray, { component : 'terminal' });

        if(idx < 0){
            return;
        }

        this._terminal.zindex = idx + 101;
        return;
    }

    // window resize
    @HostListener('window:resize', ['$event']) onResize($event) {
        let width = this._dom.body.clientWidth;
        this._device.updateDeviceInfo(width);
        return;
    }

    // textarea css auto adjust
    adjustTextareaStyle(index : number){

        if(typeof index === 'undefined'){
            return;
        }

        let textElem = $(`#terminalInput${index}`);
        let scrollHeight = textElem.prop('scrollHeight');
        let navWidth = ($(`#terminalInputNav${index}`).width() + 3) + 'px';

        let width = '100%';

        if(scrollHeight < 20){
            width = `calc(100% - ${navWidth})`;
        }

        return { 'width' : width, 'height' : `${scrollHeight}px` };
    }

    keyDownTerminal(event : any, index : number){

        if(typeof event === 'undefined'){
            return;
        }

        if(typeof index === 'undefined'){
            return;
        }

        let textElem = $(`#terminalInput${index}`);

        // enter key event
        if(event.which === 13){
            this.getSearchResult(textElem.val());
            $(`#terminalInput${index}`).blur();
            textElem.attr('readonly', 'readonly');
            return;
        }

        return;
    }

    getSearchResult(search){
        if(typeof search === 'undefined'){
            return;
        }

        let originKeyword = search.toLowerCase();
        let keyword = originKeyword;

        if(originKeyword.substr(0,2) === 'cd'){
            keyword = 'cd';
        }

        if(originKeyword.substr(0,3) === 'cat'){
            keyword = 'cat';
        }

        var pushData = {
            'keyword' : originKeyword,
            'depth' : this._terminal.depth,
        };

        switch (keyword) {
            case 'help':
                pushData['result'] = [
                    { 'contents' :
                    'ls \t\t Show List \ncd \t\t Enter Folder \ncat \t\t If you want to view the text file, type cat\npwd \t Print working directory\nexit \t\t Close terminal',
                    'folder' : false },
                ];
                break;

            case 'pwd':
                pushData['result'] = [{ 'contents' : this._terminal.depth, 'folder' : false }];
                break;

            case 'ls':
                pushData['result'] = this.showList();
                break;

            case 'cd':
                let data = this.enterFolder(originKeyword);
                pushData['result'] = data['message'];
                pushData['depth'] = data['depth'];

                this._terminal.depth = data['depth'];
                break;

            case 'cat':
                pushData['result'] = this.viewTextContents(originKeyword);
                break;

            case 'exit':
                this.closeApp();
                break;

            default:
                pushData['result'] = [{ 'contents' : `${keyword} : command not found`, 'folder' : false }];
                break;
        }

        this._terminal.search.push(pushData);
        return;
    }

    // When type 'cd'
    enterFolder(command){
        if(typeof command === 'undefined'){
            return;
        }

        let depth = this._terminal.depth;
        let folder = command.substring(2,command.length).trim();
        let message = [{ 'contents' :  `cd: no such file or directory: ${folder}`, 'folder' : false }];

        switch (folder) {

            case 'desktop':
                if(depth === ''){
                    message = [];
                    depth += '/desktop';
                }

                break;

            case 'introduce':
                if(depth === '/desktop'){
                    message = [];
                    depth += '/introduce';
                }

                break;

            case 'workexperience':
                if(depth === '/desktop'){
                    message = [];
                    depth += '/workExperience';
                }
                break;

            case 'project':
                if(depth === '/desktop'){
                    message = [];
                    depth += '/project';
                }
                break;

            case '..' :
                let detphArray = depth.split('/');
                let changeDetph = '';
                for(var idx in detphArray){
                    if(Number(idx) < detphArray.length-1){

                        if(Number(idx) !== 0){
                            changeDetph += `/`;
                        }

                        changeDetph += `${detphArray[idx]}`;
                    }
                }

                message = [];
                depth = changeDetph;
                break;

            default:
                break;
        }

        return {'message' : message, 'depth' : depth};
    }

    // When type 'ls'
    showList(){
        let depth = this._terminal.depth;
        let list = [];

        switch (depth) {

            case '':
                list = [
                    { 'contents' : 'desktop', 'folder' : true },
                ];
                break;

            case '/desktop':
                list = [
                    { 'contents' : 'introduce', 'folder' : true },
                    { 'contents' : 'workExperience', 'folder' : true },
                    { 'contents' : 'project', 'folder' : true },
                    { 'contents' : 'terminal', 'folder' : false },
                    { 'contents' : 'contactAddress.txt', 'folder' : false },
                ];
                break;

            case '/desktop/introduce':
                list = [
                    { 'contents' : 'profile.txt', 'folder' : false },
                    { 'contents' : 'skill.txt', 'folder' : false },
                ];
                break;

            case '/desktop/workExperience':
                list = [
                    { 'contents' : 'itnbasic.txt', 'folder' : false },
                    { 'contents' : 'kreditdata.txt', 'folder' : false },
                ];
                break;

            case '/desktop/project':
                list = [
                    { 'contents' : 'portfolio.txt', 'folder' : false },
                    { 'contents' : 'symflow.txt', 'folder' : false },
                    { 'contents' : 'kreditjob.txt', 'folder' : false },
                    { 'contents' : 'npsDataProject.txt', 'folder' : false },
                    { 'contents' : 'kreditjobApp.txt', 'folder' : false },
                    { 'contents' : 'camTank.txt', 'folder' : false },
                ];
                break;

            default:
                break;
        }

        return list;
    }

    // When type 'cat'
    viewTextContents(command : string){
        if(typeof command === 'undefined'){
            return;
        }

        let file = command.substring(3, command.length).trim();
        let message = [{ 'contents' : `cat:  no such file: ${file}`, 'folder' : false }];
        let depth = this._terminal.depth;

        switch (file) {

            case 'contactaddress.txt':
                if(depth === '/desktop'){
                    message = [{ 'contents' : `Phone : +82 10 3131 2188 \nEmail : kwyj0211@gmail.com \n`, 'folder' : false }];
                }
                break;

            case 'profile.txt':
                if(depth === '/desktop/introduce'){
                    message = [{ 'contents' :
                        `birth : 1993.02.11 \nPhone : +82 10 3131 2188 \nEmail : kwyj0211@gmail.com \naddress: Noryangjin-dong, Dongjak-gu, Seoul`,
                        'folder' : false
                    }];
                }
                break;

            case 'skill.txt':
                if(depth === '/desktop/introduce'){
                    message = [{ 'contents' : `Html/css/js, Angular, jquery, git, D3, nodejs, mysql, react`, 'folder' : false }];
                }
                break;

            case 'itnbasic.txt':
                if(depth === '/desktop/workExperience'){
                    message = [{ 'contents' : `Date : 2017.12 - 2018.03\nPosition : Front-end Developer`, 'folder' : false }];
                }
                break;

            case 'kreditdata.txt':
                if(depth === '/desktop/workExperience'){
                    message = [{ 'contents' : `Date : 2016.07 - 2017.10\nPosition : Front-end & Back-end & App Developer`, 'folder' : false }];
                }
                break;

            case 'portfolio.txt':
                if(depth === '/desktop/project'){
                    message = [{ 'contents' : `Date : 2018.04 - 2018.05\nPosition : Front-end Developer\nDev Environment : Angular (5.x), jQuery, D3.js (4.x), surge`, 'folder' : false }];
                }
                break;

            case 'symflow.txt':
                if(depth === '/desktop/project'){
                    message = [{ 'contents' : `Date : 2017.12 - 2018.03\nPosition : Front-end Developer\nDev Environment : Angular (4.x), jQuery, Node.js, Socket.io, Docker, MariaDB, PHP(7.x)-Laravel, redis , Python, Linux, AWS`, 'folder' : false }];
                }
                break;

            case 'kreditjob.txt':
                if(depth === '/desktop/project'){
                    message = [{ 'contents' : `Date : 2016.09 - 2017.10\nPosition : Front-end & Back-end Developer\nDev Environment : CentOS 6.8, MYSQL, Node.js, Express, Apache, jQuery, D3.js(3.x), Solr, ESLint, Mocha, Selenium WebDriver`, 'folder' : false }];
                }
                break;

            case 'npsdataproject.txt':
                if(depth === '/desktop/project'){
                    message = [{ 'contents' : `Date : 2017.07 - 2017.10\nPosition : Front-end & Back-end Developer\nDev Environment : CentOS 6.8, MYSQL, Node.js, React(15.x), Redux(3.x), jQuery, D3.js (4.x)`, 'folder' : false }];
                }
                break;

            case 'kreditjobapp.txt':
                if(depth === '/desktop/project'){
                    message = [{ 'contents' : `Date : 2016.07 - 2017.09\nPosition : App Developer\nDev Environment : Swift, Xcode / Java, Android Developer Tools (Android Studio + Android SDK)`, 'folder' : false }];
                }
                break;

            case 'camtank.txt':
                if(depth === '/desktop/project'){
                    message = [{ 'contents' : `Date : 2016.05 - 2016.05\nPosition : Developer\nDev Environment : Arduino IDE, Raspberry Pi2, C, Java, Android Developer Tools (Eclipse + Android SDK)`, 'folder' : false }];
                }
                break;

            default:
                break;
        }

        return message;
    }

    getDate(){
        let date = new Date().toString().split(' ');

        let dayWeek = date[0];
        let month = date[1];
        let day = date[2];
        let year = date[3];
        let time = date[4]

        this._terminal.data.nowTime = `${dayWeek} ${month} ${day} ${year} ${time}`;

        return;
    }

    // 창 끄기
    closeApp(){
        let index = this._terminal.search.length;
        $(`#terminalInput${index}`).blur();

        this._appState.updateAppState('terminal', 'close');
        return;
    }

    // 창 최소화
    MinimizeApp(){
        $('#terminalContainer').addClass('minimize');
        return;
    }

    // 창 전체화면
    fullScreenApp(){

        if(this._terminal.device.isMobile){
            return;
        }

        let screen = this._terminal.fullScreen;

        if(screen){
            this._terminal.fullScreen = false;
        } else {
            this._terminal.fullScreen = true;
        }

        return;
    }

}
