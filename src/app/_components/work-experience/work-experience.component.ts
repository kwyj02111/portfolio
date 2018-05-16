import { Component, OnInit } from '@angular/core';

/*service*/
import { AppStateService } from '../../_services/index';

@Component({
    selector: 'workExperience',
    templateUrl: './work-experience.component.html',
    styleUrls : [
                    '../../_css/common.css',
                    '../../_css/workExperience.css'
                ],
})
export class WorkExperienceComponent implements OnInit {

    public _workExperience : any;

    constructor(
        private _appState : AppStateService,
    ) {
        this.registerTwoWayBind();
    }

    ngOnInit() {
    }

    //data binding
    registerTwoWayBind(){
        this._workExperience = {
            'elem' : {
                'selected' : {},
            },
            'data' : {
                'list' : [{
                        'id' : '2',
                        'name' : 'IT&BASIC',
                        'date' : '2017.12 - 2018.03',
                        'position' : 'Front-end Developer',
                        'location' : 'Yeokgok (Bucheon-si, Gyeonggi-do)',
                        'content' : '아이티앤베이직 Symflow 2.0 리뉴얼 1차개발 완료',
                    },
                    {
                        'id' : '1',
                        'name' : 'KreditData',
                        'date' : '2016.07 - 2017.10',
                        'position' : 'Front-end & Back-end & App Developer',
                        'location' : 'Yeouido (Yeongdeungpo-gu, Seoul)',
                        'content' : '크레딧잡 서비스 리뉴얼 개발 및 유지보수, 크레딧잡 앱개발',
                    },
                ],
            },
        }
    }

    selectedCompanyItem(company : any){
        if(typeof company === 'undefined'){
            return;
        }


        if(this._workExperience.elem.selected.id === company.id){
            return;
        }

        this._workExperience.elem.selected = company;
        return;
    }


    // 창 끄기
    closeApp(){
        this._appState.updateAppState('workExperience', 'close');
        return;
    }


}
