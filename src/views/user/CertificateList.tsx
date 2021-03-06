import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {ColumnProps} from "antd/lib/table";

import {Col, Row, Table, Radio, Input, Divider} from "antd";
import {getVerify} from "../../axios/Request";
import {verifyList} from 'src/type/MessageData';
import {RouteComponentProps} from "react-router";

const styles = (theme: Theme) => createStyles<"CertificateList"|"search"|"boundery"|"listContent">({
    CertificateList: {},
    search: {
        paddingBottom: "15px"
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

interface Iprops extends WithStyles<typeof styles>,RouteComponentProps {
}
interface Istate {
    mode:string,
    infoList: [],
    loading:boolean
}
class CertificateList extends React.Component<Iprops,Istate> {
    public tableSet: {};
    // 认证列表表头
    private tableColumns: Array<ColumnProps<verifyList>> = [
        {
            title: '序号',
            width: 80,
            key: 'id',
            render: (text, record, index) => `${index + 1}`
        }, {
            title: '用户',
            dataIndex: 'userId',
            key: 'userId',
            render: (text: any,record:any) => <span>{record.userId}</span>,
        },{
            title: '申请时间',
            dataIndex: 'applicateTime',
            key: 'applicateTime',
            render: (text: any,record:any) => <span>{record.applicateTime}</span>
        }, {
            title: '操作',
            width: 160,
            render: (text: any, record: any) => {
                if (record.state === 0) {
                    return (
                        <span>
                            <span>已提交资料</span>
                            <Divider type="vertical"/>
                            <a href="javascript:;" onClick={this.handleVerify.bind(this,record.id)}>审核</a>
                        </span>
                    )
                } else if (record.state === 1) {
                    return (
                        <span>
                            <span>已认证</span>
                            <Divider type="vertical"/>
                            <a href="javascript:;" onClick={this.handleVerify.bind(this,record.id)}>去审核</a>
                        </span>
                    )
                } else if(record.state === 2){
                    return (
                        <span>
                            <span>审核通过</span>
                        </span>
                    )
                }else{
                    return (
                        <span>
                            审核未通过
                        </span>
                    )
                }
            }
        }
    ];
    constructor(props:Iprops){
        super(props);
            this.state={
                mode:'未认证',
                infoList: [],
                loading:true
            };
            this.tableSet = {
                size:'middle',
                showHeader: true,
                bordered: false
            };

    }
    public componentWillMount() {
        this.setInfo();
    }
    // 获取数据函数
    public setInfo(){
        getVerify().then(value => {
            this.setState({
                infoList: value.data._embedded.verifies,
                loading:false
            })
        });
    };
    // 点击搜索按钮
    public handleSearch = (val: string) => {
        const params = {content:val};
        console.log(params)
    };
    // 点击审核按钮
    public handleVerify=(id:any)=>{
        this.props.history.push(`/user/certification/${id}`)
    };
    // 切换认证类型
    public handleModeChange = (e: any) => {
        const mode = e.target.value;
        this.setState({mode});
    };
    public render() {
        const {classes} = this.props;
        const Search = Input.Search;
        return (
            <div className={classes.CertificateList}>
                <div className={classes.search}>
                    <Search
                        style={{width: 225}}
                        placeholder="用户名称"
                        onSearch={(value:any) => this.handleSearch(value)}
                        enterButton={true}
                    />
                </div>
                <div className={classes.boundery}/>
                <div className={classes.listContent}>
                    <Row>
                        <Col span={4}>
                            认证列表
                        </Col>
                        <Col span={6} push={14} style={{textAlign: "right"}}>
                            <Radio.Group onChange={this.handleModeChange} value={this.state.mode}
                                         style={{marginBottom: 8}} size={"small"}>
                                <Radio.Button value="已发布">已认证</Radio.Button>
                                <Radio.Button value="未发布">未认证</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Table {...this.tableSet} columns={this.tableColumns} dataSource={this.state.infoList} loading={this.state.loading}/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CertificateList);