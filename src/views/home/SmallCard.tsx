import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {Card, Col} from 'antd';
import * as React from "react";
import Hr from "./Hr"


const styles = (theme: Theme) => createStyles({
    root: {},
    fontNum:{
        fontSize:"30px",
        fontWeight:900,
        color:"#fff"
    },
    common:{
        backgroundColor:"rgb(82,185,138)"
    },
    fontStyle:{
        fontSize:"8px",
        color:"#fff",
        fontWeight:600
    },
    cardStyle:{
        "& .ant-card-body": {
            padding: "10px 20px",
            extend:"common"
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
            color:"#fff",
            extend:"common"
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
    images:string,
    title:string,
    oneData:string,
    twoData:string
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
                       <Card title={this.props.title} bordered={true} style={{width:"25vw"}} className={classes.cardStyle}>
                           <div style={{display:"flex",justifyContent:"space-around"}}>
                               <div style={{lineHeight:"67px"}}>
                                   <img src={this.props.images} style={{width:"50px",height:"50px"}} alt=""/>
                               </div>
                               <div style={{width:"100px"}}>
                                   <span className={classes.fontNum}>233,16</span>
                                   <p className={classes.fontStyle}>{this.props.oneData}</p>
                               </div>
                               <div ><Hr/></div>
                               <div style={{width:"100px"}}>
                                   <span className={classes.fontNum}>233,16</span>
                                   <p className={classes.fontStyle}>{this.props.twoData}</p>
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