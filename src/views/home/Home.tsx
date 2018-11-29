import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import { Row} from 'antd';
import * as React from "react";
import SmallCard from "./SmallCard";
import RegisterLog from "./RegisterLog";
import {getLogList} from "../../axios/Request";
import LineChart from "./LineChart";



const styles = (theme: Theme) => createStyles({
    root:{},
    homeOne: {
        "& .ant-card-body":{
            backgroundColor:"rgb(82,185,138)"
        },
        "& .ant-card-head":{
            backgroundColor:"rgb(82,185,138)"
        }
    },
    homeTwo: {
        "& .ant-card-body":{
            backgroundColor:"rgb(60,142,217)"
        },
        "& .ant-card-head":{
            backgroundColor:"rgb(60,142,217)"
        }
    },
    homeThree: {
        "& .ant-card-body":{
            backgroundColor:"rgb(242,123,118)"
        },
        "& .ant-card-head":{
            backgroundColor:"rgb(242,123,118)"
        }
    },
    // firstInfo: {
    //     width: "100%",
    //     height: "45px",
    //     margin: "auto",
    //     borderRadius: "3px",
    //     backgroundColor: "rgb(69,138,182)",
    // },
    secondCard: {
        width: "100%",
        height: "130px",
        margin: "20px auto",
    },
    thirdLog: {
        width: "100%",
        height: "50vh",
        margin: "auto",
        border: "1px solid rgb(241,241,241)",
        overflowY: "scroll"
    }
});

interface Istate {
    dataLog: any
}

interface Iprops extends WithStyles<typeof styles> {
}

class Home extends React.Component<Iprops, Istate> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            dataLog: getLogList()
        };
    }

    public componentWillMount() {

    }



    public render() {
        const {classes} = this.props;
        return (
            <div>
                {/*<div className={classes.firstInfo}>*/}
                    {/*<Row type="flex" justify="start" align="middle"*/}
                         {/*style={{lineHeight: "45px", fontSize: "10px", color: "#fff"}}>*/}
                        {/*<Col span={4} offset={1}>网站总访问量：596,421</Col>*/}
                        {/*<Col span={4}>网站总预约量：135,778</Col>*/}
                        {/*<Col span={4}>昨日访问量：588</Col>*/}
                        {/*<Col span={4}>昨日预约量：371</Col>*/}
                    {/*</Row>*/}
                {/*</div>*/}
                <div className={classes.secondCard}>
                    <Row type="flex" justify="space-between" align="middle" gutter={16}>
                        <SmallCard classes={{root:classes.homeOne}}/>
                        <SmallCard classes={{root:classes.homeTwo}}/>
                        <SmallCard classes={{root:classes.homeThree}}/>
                    </Row>
                </div>
                <LineChart />
                <div><span style={{paddingLeft: "10px"}}>登录日志</span></div>
                <br/>
                <div className={classes.thirdLog}>
                    <RegisterLog data={this.state.dataLog}/>
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(Home);