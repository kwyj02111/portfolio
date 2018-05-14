import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl } from '@angular/forms';

/*service*/
import { AppStateService } from '../../_services/index';

/*import jquery, d3*/
import * as $ from 'jquery';

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

    constructor(
        private _appState : AppStateService,
    ) { }

    ngOnInit() {
        this.registerTwoWayBind();
        this.getDate();
    }

    ngDoCheck() {
        // textarea focus
        let index = this._terminal.search.length;
        $(`#terminalInput${index}`).focus();
        return;
    }

    registerTwoWayBind(){
        this._terminal = {
            'data' : {
                'nowTime' : '',
            },
            'search' : [],
            'depth' : '/desktop',
        };

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

            console.log('엔터다!!!!');
            this.getSearchResult(textElem.val());
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
                    { 'contents' : 'ls : Show List \ncd : Enter Folder \ncat : If you want to view the text file, type cat', 'folder' : false },
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

            case 'workExperience':
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
                    { 'contents' : 'resume.txt', 'folder' : false },
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
                    { 'contents' : 'symflow.txt', 'folder' : false },
                    { 'contents' : 'kreditjobWeb.txt', 'folder' : false },
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
            case 'resume.txt':
                if(depth === '/desktop'){
                    message = [{ 'contents' : `resume\ntext\n`, 'folder' : false }];
                }
                break;

            case 'contactaddress.txt':
                if(depth === '/desktop'){
                    message = [{ 'contents' : `Phone : 82 10 3131 2188 \nEmail : kwyj0211@gmail.com \n`, 'folder' : false }];
                }
                break;

            case 'profile.txt':
                if(depth === '/desktop/introduce'){
                    message = [{ 'contents' :
                        `birth : 1993.02.11 \n Phone : 82 10 3131 2188 \nEmail : kwyj0211@gmail.com \naddress: Noryangjin-dong, Dongjak-gu, Seoul`,
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
                    message = [{ 'contents' : `itnbasic`, 'folder' : false }];
                }
                break;

            case 'kreditdata.txt':
                if(depth === '/desktop/workExperience'){
                    message = [{ 'contents' : `kreditdata`, 'folder' : false }];
                }
                break;

            case 'symflow.txt':
                if(depth === '/desktop/project'){
                    message = [{ 'contents' : `symflow`, 'folder' : false }];
                }
                break;

            case 'kreditjobweb.txt':
                if(depth === '/desktop/project'){
                    message = [{ 'contents' : `kreditjobweb`, 'folder' : false }];
                }
                break;

            case 'kreditjobapp.txt':
                if(depth === '/desktop/project'){
                    message = [{ 'contents' : `kreditjobapp`, 'folder' : false }];
                }
                break;

            case 'camtank.txt':
                if(depth === '/desktop/project'){
                    message = [{ 'contents' : `camtank`, 'folder' : false }];
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
        this._appState.updateAppState('terminal', 'close');
        return;
    }

}
