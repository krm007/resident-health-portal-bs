import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import Filter from "./Filter";
import {
    Row, Col,
    Table,
    Radio,
    Divider,
} from "antd";

const styles = (theme: Theme) => createStyles<"InfoPushList" | "filter" | "listContent" | "boundery">({
    InfoPushList: {
        "& .ant-radio-button-wrapper-checked": {
            background: "#3c8ed9",
            color: "#fff"
        }
    },
    filter: {
        marginBottom: 10
    },
    boundery: {
        height: 10,
        backgroundColor: "#f0f2f5",
        margin: "0 -14px"
    },
    listContent: {
        paddingTop: "10px"
    }
});

const data: any = [];
for (let i = 1; i <= 6; i++) {

    data.push({
        index: i,
        // @ts-ignore
        key: i,
        // @ts-ignore
        name: 'John Brown${i}'
    });
}

interface Iprops extends WithStyles<typeof styles> {
}

interface Istate {
    mode: string,
    selectedData: string
}

class InfoPushList extends React.Component<Iprops, Istate> {
    public tableSet: {};

    constructor(props: Iprops) {
        super(props);
        this.state = {
            mode: "已发布",
            selectedData: ""
        };
        this.tableSet = {
            size: "small",
            showHeader: false,
            bordered: false
        };
    }

    public handleScreen = (key: any) => {
        // 这里是异步获取key 有一定延时

        this.setState({
            selectedData: key
        });

    };
    public handleModeChange = (e: any) => {
        const mode = e.target.value;
        this.setState({mode});
    };

    public render() {
        const {classes} = this.props;
        const columns = [
            {
                title: 'Index',
                dataIndex: 'index',
                key: 'index',
                width: 40
            }, {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text: any) => <a href="javascript:;">{text}</a>,
            }, {
                title: 'Action',
                key: 'action',
                width: 160,
                render: (text: any, record: any) => (
                    <span>
                      <a href="javascript:;">发布</a>
                      <Divider type="vertical"/>
                      <a href="javascript:;">编辑</a>
                      <Divider type="vertical"/>
                      <a href="javascript:;">删除</a>
                    </span>
                ),
            }];
        return (
            <div className={classes.InfoPushList}>
                <div className={classes.filter}>
                    <Filter handleScreen={this.handleScreen}/>
                </div>
                <div className={classes.boundery}/>
                <div className={classes.listContent}>
                    <Row>
                        <Col span={4}>
                            通知公告
                        </Col>
                        <Col span={6} push={14} style={{textAlign: "right"}}>
                            <Radio.Group onChange={this.handleModeChange} value={this.state.mode}
                                         style={{marginBottom: 8}} size={"small"}>
                                <Radio.Button value="已发布">已发布</Radio.Button>
                                <Radio.Button value="未发布">未发布</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Table {...this.tableSet} columns={columns} dataSource={data}/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(InfoPushList);