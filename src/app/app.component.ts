import { Component, OnInit } from '@angular/core';

/*service*/
import { AppStateService } from './_services/index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './_css/common.css'
    ],
})
export class AppComponent implements OnInit {

    public _mainApp : any;

    constructor(
        private _appState : AppStateService,
    ) { }

    ngOnInit() {
        this.appState();
    }

    appState(){
        this._mainApp = this._appState.getAppState();
        return;
    }
}
