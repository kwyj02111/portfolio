import { Component, OnInit } from '@angular/core';

/*service*/
import { AppStateService } from '../../_services/index';

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

        this._appState.updateAppState(app, 'open');
        return;
    }

}
