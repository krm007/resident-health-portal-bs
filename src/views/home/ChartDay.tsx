import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
// @ts-ignore
import *as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';// 引入折线图
import 'echarts/lib/component/tooltip';// 引入提示框和标题组件
import 'echarts/lib/component/legend';

const datasss = [5, 15, 10, 30, 20, 15, 10];
const datayyy= [20, 15, 10, 15, 20, 30, 10];

const styles = (theme: Theme) => createStyles<"root">({
    root: {
        "& #mainDays>div:nth-of-type(1)": {
            width: "80vw !important"
        },
        "& #mainDays>div:nth-of-type(2)": {
            width: "10vw !important"
        },
        "& #mainDays>div>canvas": {
            width: "80vw !important"
        }
    }
});
interface Istate{
    /** 规定状态里的数据类型 */
    dataFw:number[],
    dataYy:number[]
}
interface Iprops extends WithStyles<typeof styles> {

}

class ChartDay extends React.Component<Iprops,Istate> {
    constructor(props:Iprops){
        super(props);
        this.state={
            /** 初始化为空 */
            dataFw:[],
            dataYy:[]
        }
    }
    public UNSAFE_componentWillMount(){
        this.setState({
            /** 加载时给初始化数据赋值 */
            dataFw:datasss,
            dataYy:datayyy
        })
    }
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
                    areaStyle: {normal: {color: "rgba(69,138,182,.3)"}},
                    data: this.state.dataFw
                },
                {
                    name: '网站预约量',
                    smooth: true,
                    type: 'line',
                    // @ts-ignore
                    color: ["rgb(69,182,151)"],
                    data:this.state.dataYy
                }
            ]
        });
    }

    public render() {
        const {classes} = this.props;
        return (<div className={classes.root}>
            <div id="mainDays" style={{width: "80vw", height: 240, margin: "auto"}}/>
        </div>);
    }
}

export default withStyles(styles)(ChartDay);