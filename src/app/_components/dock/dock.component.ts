import { Component, OnInit } from '@angular/core';

/*service*/
import { AppStateService } from '../../_services/index';

/*import jquery*/
import * as $ from 'jquery';

@Component({
    selector: 'dock',
    templateUrl: './dock.component.html',
    styleUrls : [
                    '../../_css/common.css',
                    '../../_css/dock.css'
                ],
})

export class DockComponent implements OnInit {

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

        // 창이 열려있거나 최소화일 경우
        if(state.app[app]){
            $(`#${app}Container`).removeClass('minimize');
            this._appState.updateAppState(app, 'update');
            return;
        }

        this._appState.updateAppState(app, 'open');
        return;
    }

}
