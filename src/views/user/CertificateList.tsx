import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {ColumnProps} from "antd/lib/table";

import {Col, Row, Table, Radio, Input} from "antd";
import {getVerify} from "../../axios/Request";
import {verifyList} from 'src/type/MessageData';

const styles = (theme: Theme) => createStyles<"CertificateList"|"search"|"boundery"|"listContent">({
    CertificateList: {},
    search: {
        paddingTop: "5px",
        paddingBottom: "6px"
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

interface Iprops extends WithStyles<typeof styles> {
}
interface Istate {
    mode:string,
    infoList: [],
    loading:boolean
}
class CertificateList extends React.Component<Iprops,Istate> {
    public tableSet: {};

    private tableColumns: Array<ColumnProps<verifyList>> = [
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
                            审核
                        </span>
                    )
                } else if (record.status === 1) {
                    return (
                        <span>
                            审核
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
    constructor(props:Iprops){
        super(props);
            this.state={
                mode:'未认证',
                infoList: [],
                loading:true
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
        getVerify().then(value => {
            this.setState({
                infoList: value.data._embedded.verifies,
                loading:false
            })
        });
    };
    public handleSearch = (val: string) => {
        const params = {content:val};
        console.log(params)
    };
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
                        style={{width: 225, marginLeft: "14px", marginRight: "24px"}}
                        placeholder="输入关键字"
                        onSearch={(value:any) => this.handleSearch(value)}
                        enterButton={true}
                    />
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
                    <Table {...this.tableSet} columns={this.tableColumns} dataSource={this.state.infoList} loading={this.state.loading}/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(CertificateList);