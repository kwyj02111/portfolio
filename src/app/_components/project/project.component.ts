import { Component, OnInit } from '@angular/core';

/*service*/
import { AppStateService } from '../../_services/index';

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    styleUrls : [
                    '../../_css/common.css',
                    '../../_css/project.css'
                ],
})
export class ProjectComponent implements OnInit {

    public _project : any;

    constructor(
        private _appState : AppStateService,
    ) {
        this.registerTwoWayBind();
    }

    ngOnInit(){
    }

    //data binding
    registerTwoWayBind(){
        this._project = {
            'elem' : {
                'selected' : {
                    'id' : '4',
                    'subject' : 'Symflow Webpage Renewal',
                    'date' : '2017.12 - 2018.03',
                    'position' : 'Front-end Developer',
                    'language' : 'angular 4',
                    'content' : '테스트 컨텐츠1 테스트 컨텐츠1 테스트 컨텐츠1 테스트 컨텐츠1',
                },
            },
            'data' : {
                'list' : [{
                        'id' : '4',
                        'subject' : 'Symflow Webpage Renewal',
                        'date' : '2017.12 - 2018.03',
                        'position' : 'Front-end Developer',
                        'language' : 'angular 4',
                        'content' : '테스트 컨텐츠1 테스트 컨텐츠1 테스트 컨텐츠1 테스트 컨텐츠1',
                    },
                    {
                        'id' : '3',
                        'subject' : 'KreditJob Webpage',
                        'date' : '2016.10 - 2017.10',
                        'position' : 'Front-end & Back-end Developer',
                        'language' : ' Node.js, Apache, jQuery, D3.js, gulp, Solr, ESLint, Mocha, Selenium WebDriver',
                        'content' : '테스트 컨텐츠2 크레딧잡 테스트 컨텐츠2 크레딧잡 테스트 컨텐츠2 크레딧잡',
                    },
                    {
                        'id' : '2',
                        'subject' : 'KreditJob App',
                        'date' : '2016.07 - 2017.09',
                        'position' : 'App Developer',
                        'language' : 'android, swift',
                        'content' : '테스트 컨텐츠3 크레딧잡 앱앱앱앱앱 크레딧잡 앱앱앱앱앱 크레딧잡 앱앱앱앱앱',
                    },
                    {
                        'id' : '1',
                        'subject' : 'Radio-controlled Cam Tank',
                        'date' : '2016.05 - 2016.05',
                        'position' : 'Developer',
                        'language' : 'C',
                        'content' : '라즈베리파이와 아두이노를 이용한 무선조종 캠탱크',
                    },
                ],
            },
        }
    }

    selectedProjectItem(item : any){
        if(typeof item === 'undefined'){
            return;
        }


        if(this._project.elem.selected.id === item.id){
            return;
        }

        this._project.elem.selected = item;
        return;
    }

    // 창 끄기
    closeApp(){
        this._appState.updateAppState('project', 'close');
        return;
    }

}
