import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {Input, Button, Table, Divider, Modal, Switch, message} from 'antd';
import {getDocDic} from "../../axios/Request";
import {DocDic} from "../../type/DoctorData";
import {Link} from "react-router-dom";
import service from "../../axios/Service";

const Search = Input.Search;

const styles = (theme: Theme) => createStyles({
    root: {},
    addButton: {
        float: "left",
        marginLeft: "20px",
        backgroundColor: "rgb(82,185,138)",
        borderColor: "rgb(82,185,138)"
    }
});

interface Istate {
    data: DocDic[],
    visible: boolean
}

interface Iprops extends WithStyles<typeof styles> {

}

class DoctorsDictionary extends React.Component<Iprops, Istate> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            data: [],
            visible: false,
        }
    }

    /** 查询医生字典 */
    public search=(value:any)=>{
        this.getData({name_like:value,depart_like:value,title_like:value,hospital_like:value})
    };

    public componentWillMount() {
        this.getData({})
    }

    /** 获取医生字典 */
    public getData = (params:any) => {
        getDocDic(params).then(value => {
            // console.log(value.data._embedded.portalDoctors);
            this.setState({
                data: value.data._embedded.portalDoctors
            })
        });
    };

    /** 停用医生 */
    public preventDoc = (params: any) => {
        if (params.status === 1) {
            params.status = 0;
            message.warning("已停用！");
        } else {
            params.status = 1;
            message.success("启用成功！");
        }
        service.get(`/portalDoctors/${params.id}/changeStatus`, {params:{status:params.status}}).then(value => {
            this.getData({});
        })
    };

    /** 点击批量导入 */
    public showModal = () => {
        this.setState({
            visible: true,
        });
    };

    public handleOk = (e: any) => {
        this.setState({
            visible: false,
        });
    };

    public handleCancel = (e: any) => {
        this.setState({
            visible: false,
        });
    };

    public render() {
        const columns = [{
            title: '医生名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '职称',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '就职医院',
            dataIndex: 'hospital',
            key: 'hospital',
        }, {
            title: '所在科室',
            dataIndex: 'depart',
            key: 'depart',
        }, {
            title: '操作',
            key: 'action',
            render: (record: any) => (
                <span>
                    <Link to={`/docDetails/${record.id}`}>详情</Link>
                    <Divider type="vertical"/>
                    <Switch checkedChildren="启用" unCheckedChildren="停用"
                            defaultChecked={record.status === 1 ? true : false} onChange={() => {
                        this.preventDoc(record)
                    }}/>
                </span>
            )
        }];

        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div style={{width: "90%", height: "32px"}}>
                    <Search
                        placeholder="输入关键字"
                        onSearch={this.search}
                        enterButton={true}
                        style={{width: "27%", float: "left"}}
                    />
                    <Button type="primary" style={{float: "left", marginLeft: "20px"}}
                            onClick={this.showModal}>批量导入</Button>
                    <Modal
                        title="温馨提示"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>正在开发中敬请期待...</p>
                    </Modal>
                    <Button type="primary" className={classes.addButton}><Link to={"/addDoc"}>新增</Link></Button>
                </div>
                <br/>
                <Table columns={columns} size={"middle"} dataSource={this.state.data}/>
            </div>);
    }
}

export default withStyles(styles)(DoctorsDictionary);