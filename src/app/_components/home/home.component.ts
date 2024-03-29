import { Component, OnInit } from '@angular/core';

/*service*/
import { AppStateService } from '../../_services/index';

/*import jquery*/
import * as $ from 'jquery';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls : [
                    '../../_css/common.css',
                    '../../_css/home.css'
                ],
})
export class HomeComponent implements OnInit {

    constructor(
        private _appState : AppStateService,
    ) { }

    ngOnInit(){
    }

    // App open
    openApp(app : any){
        if(typeof app === 'undefined'){
            return;
        }

        let state = this._appState.getAppState();

        // 창 최소화일 경우
        if(state.app[app]){
            $(`#${app}Container`).removeClass('minimize');
            return;
        }

        this._appState.updateAppState(app, 'open');
        return;
    }

    // Github open
    clickGithubApp(){
        let url = `https://github.com/kwyj02111`;

        window.open(url);
        return;
    }

}