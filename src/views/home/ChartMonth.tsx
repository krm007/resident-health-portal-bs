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
        "& #mainMonth>div":{
            width:"80vw !important"
        }
    }
});

interface Iprops extends WithStyles<typeof styles> {
}

class ChartMonth extends React.Component<Iprops> {

    public componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        // @ts-ignore
        const myChartMonth = echarts.init(document.getElementById('mainMonth'));

        myChartMonth.setOption({

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
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
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
                    data: [5, 15, 10, 20, 10, 15, 5, 15, 10, 20, 10, 15,]
                },
                {
                    name: '网站预约量',
                    smooth: true,
                    type: 'line',
                    // @ts-ignore
                    color: ["rgb(69,182,151)"],
                    data: [20, 12, 10, 15, 20, 20, 10, 15, 20, 15, 20, 10]
                }
            ]
        });

    }

    public render() {
        const {classes} = this.props;
        return (<div className={classes.root}>
            <div id="mainMonth" style={{width: "80vw", height: 240, margin: "auto", border: "1px red solid"}}/>
        </div>);
    }
}

export default withStyles(styles)(ChartMonth);