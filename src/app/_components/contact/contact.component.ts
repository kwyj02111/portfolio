import { Component, OnInit } from '@angular/core';

/*service*/
import { AppStateService } from '../../_services/index';

@Component({
    selector: 'contact',
    templateUrl: './contact.component.html',
    styleUrls : [
                    '../../_css/common.css',
                    '../../_css/contact.css'
                ],
})
export class ContactComponent implements OnInit {

    public _contact : any; // terminal data bind

    constructor(
        private _appState : AppStateService,
    ) { }

    ngOnInit() {
        this.registerTwoWayBind();
    }

    registerTwoWayBind(){
        this._contact = {
            'data' : [
                {'title' : 'phone', 'value' : '+82 10 3131 2188', 'src' : '/assets/phone-icon.png'},
                {'title' : 'mail', 'value' : 'kwyj0211@gmail.com', 'src' : '/assets/mail-icon.png'},
                {'title' : 'github', 'value' : 'https://github.com/kwyj02111', 'src' : '/assets/github-white-icon.svg'},
            ]
        };

        return;
    }

    // 창 끄기
    closeApp(){
        this._appState.updateAppState('contact', 'close');
        return;
    }
}
