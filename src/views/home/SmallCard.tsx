import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {Card, Col} from 'antd';
import * as React from "react";
import Hr from "./Hr"


const styles = (theme: Theme) => createStyles({
    root: {},
    fontNum:{
        fontSize:"30px",
        fontWeight:900
    },
    fontStyle:{
        fontSize:"8px",
        color:"rgb(69,182,171)",
        fontWeight:600
    },
    cardStyle:{
        "& .ant-card-body": {
            padding: "10px 20px",

        },
        "& .ant-card-head": {
            "& .ant-card-extra": {
                padding: "5px 0"
            },
            "& .ant-card-head-title": {
                padding: 0,
                height: "35px",
                lineHeight:"35px"
            },
            borderBottom: 0,
            minHeight: 20,
            padding: "0 20px",
        },
        "& .ant-list-item-content":{
            minWidth:0
        },
        borderColor: "#b7e6ff",
        borderRadius: 3,
        height:"130px"
    },
    cardIndex:{
        textAlign:"center",
    }
});

interface Iprops extends WithStyles<typeof styles> {
    // data:CardInfo[]
}

class SmallCard extends React.Component<Iprops> {
    public render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Col span={8}>
               {/*<List>*/}
                   {/*dataSource={}*/}
                   {/*renderItem={(item) => (*/}
                   {/*<List.Item column={24} style={{border: 0}}>*/}
                       <Card title="医疗资源" bordered={true} style={{width:"25vw"}} className={classes.cardStyle}>
                           <div style={{display:"flex",justifyContent:"space-around"}}>
                               <div >
                                   <img src={require("../../images/testCard.jpg")} style={{width:"70px",height:"70px"}} alt=""/>
                               </div>
                               <div style={{width:"100px"}}>
                                   <span className={classes.fontNum}>233,16</span>
                                   <p className={classes.fontStyle}>医院总数</p>
                               </div>
                               <div ><Hr/></div>
                               <div style={{width:"100px"}}>
                                   <span className={classes.fontNum}>233,16</span>
                                   <p className={classes.fontStyle}>医院总数</p>
                               </div>
                           </div>
                       </Card>
                   {/*</List.Item>*/}
               {/*)}*/}
               {/*</List>*/}


                </Col>

            </div>
        );
    }
}

export default withStyles(styles)(SmallCard);