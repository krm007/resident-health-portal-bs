import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
// @ts-ignore
import *as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';// 引入折线图
import 'echarts/lib/component/tooltip';// 引入提示框和标题组件

import 'echarts/lib/component/legend';

const styles = (theme: Theme) => createStyles<"root">({
    root: {
        "& #mainMonth>div>canvas": {
            width: "80vw !important"
        }
    }
});

interface Iprops extends WithStyles<typeof styles> {
}

class ChartDay extends React.Component<Iprops> {
    public componentDidMount() {
        // @ts-ignore
        const myChartDays = echarts.init(document.getElementById('mainDays'));
        myChartDays.setOption({

            legend: {
                top: "10%",
                right: "30vw",
                icon: "circle",
                data: ['网站访问量', '网站预约量'],
            },
            // @ts-ignore
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                top: '30%',
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tues', 'Wen', 'Thr', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '网站访问量',
                    smooth: true,
                    type: 'line',
                    // @ts-ignore
                    color: ["rgb(69,138,182)"],
                    areaStyle: {normal: {color: "rgb(69,138,182)"}},
                    data: [5, 15, 10, 30, 20, 15, 10]
                },
                {
                    name: '网站预约量',
                    smooth: true,
                    type: 'line',
                    // @ts-ignore
                    color: ["rgb(69,182,151)"],
                    data: [20, 15, 10, 15, 20, 30, 10]
                }
            ]
        });
    }

    public render() {
        const {classes} = this.props;
        return (<div className={classes.root}>
            <div id="mainDays" style={{width: "80vw", height: 240, margin: "auto", border: "1px red solid"}}/>
        </div>);
    }
}

export default withStyles(styles)(ChartDay);