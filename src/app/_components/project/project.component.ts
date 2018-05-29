import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

/*service*/
import { AppStateService } from '../../_services/index';
import { DeviceService } from '../../_services/index';

/*import jquery, underscore*/
import * as $ from 'jquery';
import * as _ from 'underscore';

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

    ngOnInit(){

        this._appStateHandler = this._appState.getAppStateSubscribe()
            .subscribe((r_notice) => {
                this.setComponentZindex();
                return;
            });

        this._deviceInfoHandler = this._device.getDeviceInfoSubscribe()
            .subscribe((r_notice) => {
                this._project.device = r_notice;
                return;
            });
    }

    ngOnDestroy() {
        this._appStateHandler.unsubscribe();
        this._deviceInfoHandler.unsubscribe();
    }

    //data binding
    registerTwoWayBind(){
        this._project = {
            'elem' : {
                'selected' : {
                    'id' : '5',
                    'subject' : 'Symflow Webpage Renewal',
                    'date' : '2017.12 - 2018.03',
                    'position' : 'Front-end Developer',
                    'language' : 'Angular (4.x), jQuery, Node.js, Docker, MYSQL, Laravel',
                    'content' : '‘심플로우’란 별도의 장비나 App 없이 간편하게 실시간 소통을 이룰 수 있는 온라인 청중응답 시스템 서비스입니다. 새로운 디자인의 리뉴얼 개발로 모바일 웹 및 반응형 웹으로 제작되었습니다.\nFront-end는 Angular(4.x)와 jQuery를 사용하여 개발하였습니다. Node 소켓 통신을 이용해 사용자가 실시간으로 프레젠테이션 공유, 설문조사, 질문하기 등의 서비스를 가능하도록 하였습니다. 이미지 업로드, 엑셀 다운로드 등의 기능은 이미지 서버를 활용하였습니다.',
                },
            },
            'data' : {
                'list' : [{
                        'id' : '5',
                        'subject' : 'Symflow Webpage Renewal',
                        'date' : '2017.12 - 2018.03',
                        'position' : 'Front-end Developer',
                        'language' : 'Angular (4.x), jQuery, Node.js, Docker, MYSQL, Laravel',
                        'content' : '‘심플로우’란 별도의 장비나 App 없이 간편하게 실시간 소통을 이룰 수 있는 온라인 청중응답 시스템 서비스입니다. 새로운 디자인의 리뉴얼 개발로 모바일 웹 및 반응형 웹으로 제작되었습니다.\nFront-end는 Angular(4.x)와 jQuery를 사용하여 개발하였습니다. Node 소켓 통신을 이용해 사용자가 실시간으로 프레젠테이션 공유, 설문조사, 질문하기 등의 서비스를 가능하도록 하였습니다. 이미지 업로드, 엑셀 다운로드 등의 기능은 이미지 서버를 활용하였습니다.',
                    },
                    {
                        'id' : '4',
                        'subject' : 'KreditJob Webpage',
                        'date' : '2016.09 - 2017.10',
                        'position' : 'Front-end & Back-end Developer',
                        'language' : 'Node.js, Apache, jQuery, D3.js(3.x), gulp, MYSQL, CentOS 6.8, Solr, ESLint, Mocha, Selenium WebDriver',
                        'content' : '‘크레딧잡’은 국민연금 공공 데이터를 사용하여 전국 52만 기업의 고용정보와 연봉정보를 제공하는 서비스로 모바일 웹 및 반응형 웹으로 제작되었습니다.\nFront-end는 jQuery 기반으로 D3.js를 사용하여 데이터를 그래프로 시각화 하였습니다. 서버는 Cent0S 6.8로 구축하였고, Back-end는 Apache, Node.js, Express를 사용하였습니다.\n프로젝트 설정 및 패키지관리, 빌드는 npm과 gulp를 사용하였으며, 검색 및 자동환성 기능에는 Solr를 사용했습니다. Mocha, Selenium WebDriver를 사용하여 테스트를 자동화 하였고, gulp시 ESLint를 추가해 린팅검사를 하였습니다. 원티드, 코멘토 등의 협력 업체의 API와 네이버 뉴스 API를 request 형식으로 요청하여 해당 정보를 노출 시켰습니다.',
                    },
                    {
                        'id' : '3',
                        'subject' : 'KreditJob iOS App',
                        'date' : '2016.08 - 2017.09',
                        'position' : 'App Developer',
                        'language' : 'Swift, Xcode',
                        'content' : '크레딧잡 iOS 앱은 크레딧잡 서비스를 웹뷰로 띄워 보여주는 방식으로, Xcode에서 Swift를 이용해 개발되었습니다.\n앱스토어 배포용 바이너리 빌드 후 업로드하여 앱 심사를 거쳐 배포하였습니다. 크레딧잡 iOS 앱은 iOS 9.0 이상의 버전부터 사용이 가능했습니다.',
                    },
                    {
                        'id' : '2',
                        'subject' : 'KreditJob Android App',
                        'date' : '2016.07 - 2017.08',
                        'position' : 'App Developer',
                        'language' : 'Java, Android Developer Tools (Android Studio + Android SDK)',
                        'content' : '크레딧잡 Android 앱은 크레딧잡 서비스를 웹뷰로 띄워 보여주는 방식으로 개발되었습니다.\n Android Studio를 이용하여 작업하였으며, APK 파일 생성 후 Google Play 스토어에 배포하였습니다. 크레딧잡 Android 앱은 Android 4.x (Ice cream sandwich) 이상의 버전부터 사용이 가능했습니다. ',
                    },
                    {
                        'id' : '1',
                        'subject' : 'Radio-controlled Cam Tank',
                        'date' : '2016.05 - 2016.05',
                        'position' : 'Developer',
                        'language' : 'Arduino IDE, Raspberry Pi2, C, Java, Android Developer Tools (Eclipse + Android SDK)',
                        'content' : '라즈베리파이와 아두이노를 이용한 무선조종 캠탱크입니다.\n무선으로 조종 가능한 탱크를 제작하고 Cam 기능을 탑재하여 탱크가 이동하며 주위배경을 실시간으로 확인할 수 있습니다. 리눅스와 안드로이드 기반의 임베디드 교육 지식을 활용하였습니다. 영상을 위해 Pi Camera를 사용하였으며, GStreamer를 사용해 실시간 스트리밍이 가능하도록 했습니다.',
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
        let idx = _.findIndex(stateArray, { component : 'project' });

        if(idx < 0){
            return;
        }

        this._project.zindex = idx + 101;
        return;
    }

    // window resize
    @HostListener('window:resize', ['$event']) onResize($event) {
        let width = this._dom.body.clientWidth;
        this._device.updateDeviceInfo(width);
        return;
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

    // 창 최소화
    MinimizeApp(){
        $('#projectContainer').addClass('minimize');
        return;
    }

    // 창 전체화면
    fullScreenApp(){

        if(this._project.device.isMobile){
            return;
        }

        let screen = this._project.fullScreen;

        if(screen){
            this._project.fullScreen = false;
        } else {
            this._project.fullScreen = true;
        }

        return;
    }
}
