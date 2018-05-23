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
                'contact' : false,
            },
            'appArray' : [],
        };

        this._appState = appState;
        this._appStateSubject.next(<any> this._appState);
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

            this._appState.appArray.push({'component' : app});
            this._appStateSubject.next(<any> this._appState);
            return;
        }

        let idx = _.findIndex(this._appState.appArray, { component : app });

        if(type === 'update'){
            if(!this._appState.app[`${app}`]){
                return;
            }

            this._appState.appArray.splice(idx, 1);
            this._appState.appArray.push({'component' : app});
            this._appStateSubject.next(<any> this._appState);
            return;
        }

        if(type === 'close'){
            _.each(this._appState.app, (val, key) =>{
                if(key === app){
                    this._appState.app[key] = false;
                }
            });

            this._appState.appArray.splice(idx, 1);
            this._appStateSubject.next(<any> this._appState);
            return;
        }

        return;
    }

    getAppStateSubscribe() : Observable<any> {
        return this._appStateSubject.asObservable();
    }

}
