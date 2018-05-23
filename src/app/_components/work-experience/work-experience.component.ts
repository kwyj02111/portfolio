import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

/*service*/
import { AppStateService } from '../../_services/index';
import { DeviceService } from '../../_services/index';

/*import jquery, underscore*/
import * as $ from 'jquery';
import * as _ from 'underscore';

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
    private _appStateHandler; // App State - subscribe
    private _deviceInfoHandler; // device Info - subscribe

    constructor(
        private _appState : AppStateService,
        private _device : DeviceService,
        @Inject(DOCUMENT) private _dom: Document,
    ) {
        this.registerTwoWayBind();
        this.setComponentZindex();
    }

    ngOnInit() {
        this._appStateHandler = this._appState.getAppStateSubscribe()
            .subscribe((r_notice) => {
                this.setComponentZindex();
                return;
            });

        this._deviceInfoHandler = this._device.getDeviceInfoSubscribe()
            .subscribe((r_notice) => {
                this._workExperience.device = r_notice;
                return;
            });
    }

    ngOnDestroy() {
        this._appStateHandler.unsubscribe();
        this._deviceInfoHandler.unsubscribe();
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
            'fullScreen' : false,
            'device' : this._device.getDeviceInfo(),
            'zindex' : 0,
        }
    }

    setComponentZindex(){

        let stateArray = this._appState.getAppState().appArray;
        let idx = _.findIndex(stateArray, { component : 'workExperience' });

        if(idx < 0){
            return;
        }

        this._workExperience.zindex = idx + 1;
        return;
    }

    // window resize
    @HostListener('window:resize', ['$event']) onResize($event) {
        let width = this._dom.body.clientWidth;
        this._device.updateDeviceInfo(width);
        return;
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

    // 창 최소화
    MinimizeApp(){
        $('#workExperienceContainer').addClass('minimize');
        return;
    }

    // 창 전체화면
    fullScreenApp(){

        if(this._workExperience.device.isMobile){
            return;
        }

        let screen = this._workExperience.fullScreen;

        if(screen){
            this._workExperience.fullScreen = false;
        } else {
            this._workExperience.fullScreen = true;
        }

        return;
    }

}
