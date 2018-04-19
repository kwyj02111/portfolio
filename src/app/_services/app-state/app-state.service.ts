import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

/*modules*/
import * as _ from 'underscore';

@Injectable()
export class AppStateService {

    private _appState : any;
    private _appStateSubject = new Subject<any>();

    constructor() {
        this.setAppState();
    }

    setAppState(){

        var appState = {
            'app' : {
                'introduce' : false,
                'workExperience' : false,
                'project' : false,
                'resume' : false,
                'terminal' : false,
                'contect' : false,
            },
            'appArray' : [],
        };

        this._appState = appState;
        return;
    }

    getAppState(){
        return this._appState;
    }

    updateAppState(app : any, type : any){
        if(typeof app === 'undefined'){
            return;
        }

        if(typeof type === 'undefined'){
            return;
        }

        if(type === 'open'){
            _.each(this._appState.app, (val, key) =>{
                if(key === app){
                    this._appState.app[key] = true;
                }
            });
        }

        if(type === 'close'){
            _.each(this._appState.app, (val, key) =>{
                if(key === app){
                    this._appState.app[key] = false;
                }
            });
        }

        console.log(this._appState.app);
        return;
    }

}
