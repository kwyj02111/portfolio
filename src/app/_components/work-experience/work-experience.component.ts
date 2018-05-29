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
                        'content' : '- Angular(4.x)를 이용해 심플로우 서비스 모바일 웹 및 반응형 웹 제작\n- Node 소켓 통신을 이용해 실시간 웹 서비스 구현\n- TTA 정보통신 시험 규격에 맞도록 Front-end 개발',
                    },
                    {
                        'id' : '1',
                        'name' : 'KreditData',
                        'date' : '2016.07 - 2017.10',
                        'position' : 'Front-end & Back-end & App Developer',
                        'location' : 'Yeouido (Yeongdeungpo-gu, Seoul)',
                        'content' : '- 국민연금 공공데이터를 사용하여 크레딧잡 서비스의 모바일 웹 및 반응형 웹 제작\n- D3.js를 사용하여 국민연금 공공데이터를 그래프로 시각화\n- gulp를 사용해 크레딧잡 서비스 Front-end 빌드 및 uglify\n- Apache, Node.js, Express로 이루어진 Back-end 구축\n- 크레딧잡 서비스의 CentOS 6.8, CentOS 7 서버 구축 및 관리\n- 크레딧잡 서비스의 Android 및 iOS 앱 개발 및 배포\n- mysql을 사용하여 매월 50만 기업 정보 데이터 및 solr 업데이트',
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

        this._workExperience.zindex = idx + 101;
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
