import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {FilterArr} from "../../type/MessageData";
import {
    Row, Col,
    Table,
    Radio,
    Divider,
    Button,
    Popconfirm,
    message
} from "antd";
import {delateNew, filterQuery, getInfoPushList} from "../../axios/Request";
import {PushList} from "../../type/MessageData";
import {ColumnProps} from "antd/lib/table";
import {RouteComponentProps} from "react-router";
import Filter from "./Filter";

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


interface Iprops extends WithStyles<typeof styles>, RouteComponentProps {
}

interface Istate {
    mode: string,
    selectedData: FilterArr,
    infoList: PushList[]
}

class InfoPushList extends React.Component<Iprops, Istate> {
    public tableSet: {};
    private tableColumns: Array<ColumnProps<PushList>> = [
        {
            title: '序号',
            width: 40,
            key: 'key',
            render: (text, record, index) => `${index + 1}`
        }, {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
            render: (text: any) => <a href="javascript:;">{text}</a>,
        }, {
            title: 'Action',
            width: 160,
            render: (text: any, record: any) => {
                if (record.status === 0) {
                    return (
                        <span>
                            <Button type="primary" href="javascript:;"
                                    onClick={this.handlePublish.bind(this, record.id)}>发布</Button>
                              <Divider type="vertical"/>
                              <a href="javascript:;">编辑</a>
                              <Divider type="vertical"/>
                              <Popconfirm title="确定删除？" onConfirm={() => this.deleteNews(record.id)}>
                                <a href="javascript:void(0);">删除</a>
                              </Popconfirm>
                        </span>
                    )
                } else if (record.status === 1) {
                    return (
                        <span>
                            <a href="javascript:;">已发布</a>
                              <Divider type="vertical"/>
                              <a href="javascript:;" onClick={this.handleEdit.bind(this, record.id)}>编辑</a>
                              <Divider type="vertical"/>
                             <Popconfirm title="确定删除？" onConfirm={() => this.deleteNews(record.id)}>
                                <a href="javascript:void(0);">删除</a>
                              </Popconfirm>
                        </span>
                    )
                } else {
                    return (
                        <span>
                            未知状态
                        </span>
                    )
                }
            }
        }
    ];

    constructor(props: Iprops) {
        super(props);
        this.state = {
            mode: "已发布",
            selectedData: {},
            infoList: []
        };
        this.tableSet = {
            size: "small",
            showHeader: false,
            bordered: false
        };
    }

    public componentWillMount() {
        this.setInfo();
    }
    public setInfo(){
        getInfoPushList().then(value => {
            this.setState({
                infoList: value.data._embedded.news
            })
        });
    }
    // 点击发布
    public handlePublish = (id: any) => {
        console.log(id)
    };
    // 点击编辑
    public handleEdit = (id: any) => {
        this.props.history.push(`/infoPushEditor/${id}`)
    };
    // 点击删除
    public deleteNews = (id: any) => {
        delateNew(id).then((value)=>{
            message.success("删除成功~");
            this.setInfo()
        })
    };
    public handleScreen = (params: FilterArr) => {
        // 这里是异步获取key 有一定延时
        filterQuery(params).then((value)=>{
            this.setState({
                infoList: value.data._embedded.news
            })
        })

    };
    public handleModeChange = (e: any) => {
        const mode = e.target.value;
        this.setState({mode});
    };

    public render() {
        const {classes} = this.props;
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
                    <Table {...this.tableSet} columns={this.tableColumns} dataSource={this.state.infoList}/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(InfoPushList);