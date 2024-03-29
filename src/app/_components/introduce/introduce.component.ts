import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

/*service*/
import { AppStateService } from '../../_services/index';
import { DeviceService } from '../../_services/index';

/*import jquery, d3, underscore*/
import * as $ from 'jquery';
import * as _ from 'underscore';
import * as d3 from 'd3';
import 'd3-selection-multi';

@Component({
    selector: 'introduce',
    templateUrl: './introduce.component.html',
    styleUrls : [
                    '../../_css/common.css',
                    '../../_css/introduce.css'
                ],
})
export class IntroduceComponent implements OnInit, OnDestroy {

    public _introduce : any;
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
                this._introduce.device = r_notice;
                return;
            });

        this.onCreateBarChart();
    }

    ngOnDestroy() {
        this._appStateHandler.unsubscribe();
        this._deviceInfoHandler.unsubscribe();
    }

    //data binding
    registerTwoWayBind(){
        this._introduce = {
            'data' : {
                'profile' : [{
                        'title': 'birth',
                        'value' : '1993.02.11',
                },
                {
                        'title': 'Phone',
                        'value' : '+82 10 3131 2188',
                },
                {
                        'title': 'E-mail',
                        'value' : 'kwyj0211@gmail.com',
                },
                {
                        'title': 'address',
                        'value' : 'Noryangjin-dong, Dongjak-gu, Seoul',
                }],
                'barGraph' : [
                    {'skill' : 'Html/css/js', 'value' : 80},
                    {'skill' : 'Angular', 'value' : 70},
                    {'skill' : 'jquery', 'value' : 75},
                    {'skill' : 'Git', 'value' : 65},
                    {'skill' : 'd3', 'value' : 70},
                    {'skill' : 'Nodejs', 'value' : 65},
                    {'skill' : 'mysql', 'value' : 67},
                    {'skill' : 'React', 'value' : 50},
                ],
            },
            'fullScreen' : false,
            'device' : this._device.getDeviceInfo(),
            'zindex' : 0,
        }
    }

    setComponentZindex(){

        let stateArray = this._appState.getAppState().appArray;
        let idx = _.findIndex(stateArray, { component : 'introduce' });

        if(idx < 0){
            return;
        }

        this._introduce.zindex = idx + 101;
        return;
    }

    // window resize
    @HostListener('window:resize', ['$event']) onResize($event) {
        let width = this._dom.body.clientWidth;
        this._device.updateDeviceInfo(width);

        $('#skillChart').empty();
        this.onCreateBarChart();
        return;
    }

    // Bar chart create
    onCreateBarChart(){

        let graphWidth = $('#introduceSkillGraph').width();
        let graphHeight = $('#introduceSkillGraph').height();
        let graphMarginLeft = 80;
        let graphMargin = 20;
        let barWidth = graphWidth - (graphMargin + graphMarginLeft);

        var _svgContainer = undefined;

        _svgContainer = d3.select('#introduceSkillGraph')
            .select('#skillChart')
            .attrs({
                'id' : 'skillChart',
                'class' : 'skill-chart-svg',
                'width' : graphWidth,
                'height' : graphHeight,
        });

        // skill List만 추출
        let skillList = _.pluck(this._introduce.data.barGraph, 'skill').reverse();

        // X축 설정
        var xScale = d3.scaleLinear()
                   .domain([0, 100])
                   .range([0, barWidth]);

        // Y축 설정
        var yScale = d3.scalePoint()
            .domain(skillList)
            .range([graphHeight - graphMargin, graphMargin]);

        _svgContainer.append('g')
          .call(d3.axisLeft(yScale).tickSize(0))
          .attr('id', 'yAxisG')
          .attr('class', 'skill-chart-yaxis')
          .attr('transform', 'translate(' + Number(graphMarginLeft-5) + ', 0)')
          .style('font-size', '12px')
          .selectAll('.domain').attr('visibility', 'hidden');

        let chartHeight = 14;
        let halfChartHeight = Number(chartHeight/2);

        // background chart
        var backChart = _svgContainer.append("g")
                    .selectAll('.background-bar')
                    .data(this._introduce.data.barGraph)
                    .enter()
                    .append('rect')
                    .attr('class', 'background-bar skill-chart-background-bar')
                    .attr('transform', `translate(0, -${halfChartHeight})`)
                    .attr('width', barWidth)
                    .attr('height', chartHeight)
                    .attr('x', graphMarginLeft)
                    .attr('y', (dd) => { return yScale(dd.skill); })
                    .attr('rx', halfChartHeight)
                    .attr('ry', halfChartHeight)
                    .style('fill', '#e3e2e2');

        // data에 따른 skill값 chart
        var chart = _svgContainer.append("g")
                    .selectAll('.bar')
                    .data(this._introduce.data.barGraph)
                    .enter()
                    .append('rect')
                    .attr('class', 'bar skill-chart-bar')
                    .attr('transform', `translate(0, -${halfChartHeight})`)
                    .attr('width', (dd) => { return xScale(dd.value); })
                    .attr('height', chartHeight)
                    .attr('x', graphMarginLeft)
                    .attr('y', (dd) => { return yScale(dd.skill); })
                    .attr('rx', halfChartHeight)
                    .attr('ry', halfChartHeight)
                    .style('fill', '#FB5959');

        return;
    }

    // 창 끄기
    closeApp(){
        this._appState.updateAppState('introduce', 'close');
        return;
    }

    // 창 최소화
    MinimizeApp(){
        $('#introduceContainer').addClass('minimize');
        return;
    }

    // 창 전체화면
    fullScreenApp(){

        if(this._introduce.device.isMobile){
            return;
        }

        let screen = this._introduce.fullScreen;

        if(screen){
            this._introduce.fullScreen = false;
        } else {
            this._introduce.fullScreen = true;
        }

        return;
    }

}
