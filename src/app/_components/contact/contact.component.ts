import { Component, OnInit } from '@angular/core';

/*service*/
import { AppStateService } from '../../_services/index';

/*import jquery*/
import * as $ from 'jquery';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls : [
                    '../../_css/common.css',
                    '../../_css/contact.css'
                ],
})
export class ContactComponent implements OnInit {

    public _contact : any; // contact data bind

    constructor(
        private _appState : AppStateService,
    ) {
        this.registerTwoWayBind();
    }

    ngOnInit() {
    }

    registerTwoWayBind(){
        this._contact = {
            'data' : [
                {'title' : 'phone', 'value' : '+82 10 3131 2188', 'src' : '/assets/phone-icon.png'},
                {'title' : 'mail', 'value' : 'kwyj0211@gmail.com', 'src' : '/assets/mail-icon.png'},
                {'title' : 'github', 'value' : 'https://github.com/kwyj02111', 'src' : '/assets/github-white-icon.svg'},
            ],
            'fullScreen' : false,
        };

        return;
    }

    // 창 끄기
    closeApp(){
        this._appState.updateAppState('contact', 'close');
        return;
    }

    // 창 최소화
    MinimizeApp(){
        $('#contactContainer').addClass('minimize');
        return;
    }

    // 창 전체화면
    fullScreenApp(){

        let screen = this._contact.fullScreen;

        if(screen){
            this._contact.fullScreen = false;
        } else {
            this._contact.fullScreen = true;
        }

        return;
    }
}
