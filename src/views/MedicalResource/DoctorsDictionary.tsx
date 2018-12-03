import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {Input, Button, Table, Divider, Modal, Popconfirm} from 'antd';
import {getDocDic,getOneDoc} from "../../axios/Request";
import {DocDic} from "../../type/DoctorData";
import {Link} from "react-router-dom";

const Search = Input.Search;

const styles = (theme: Theme) => createStyles({
    root: {
    },
    addButton:{
        float:"left",
        marginLeft:"20px",
        backgroundColor:"rgb(82,185,138)",
        borderColor:"rgb(82,185,138)"
    }
});
interface Istate{
    data:DocDic[],
    visible: boolean

}

interface Iprops extends WithStyles<typeof styles> {

}

class DoctorsDictionary extends React.Component<Iprops,Istate> {
    constructor(props:Iprops){
        super(props);
        this.state={
            data:[],
            visible: false

        }
    }

    public componentWillMount(){
        /** 获取医生字典 */
        getDocDic().then(value => {
            // console.log(value.data._embedded.portalDoctors);
            this.setState({
                data:value.data._embedded.portalDoctors
            })
        });
    }

    /** 停用医生 */
    public preventDoc=(id:any)=>{
        // 获取当前医生的信息
        getOneDoc(id).then(value => {
            console.log(value.data);
        })
    }

    /** 点击批量导入 */
    public showModal=()=>{
        this.setState({
            visible: true,
        });
    };

    public handleOk = (e:any) => {
        this.setState({
            visible: false,
        });
    };

    public handleCancel = (e:any) => {
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
            render: (record:any) => (
                <span>
                    <Link to={`/docDetails/${record.id}`} >详情</Link>
                    <Divider type="vertical" />
                    <Popconfirm title="确定停用？" onConfirm={() => this.preventDoc(record.id)}>
                        <a href="javascript:void(0);">停用</a>
                    </Popconfirm>
                </span>
            )
        }];

        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div style={{width:"90%",height:"32px"}}>
                    <Search
                        placeholder="输入关键字"
                        onSearch={value => console.log(value)}
                        enterButton={true}
                        style={{width: "27%",float:"left"}}
                    />
                    <Button type="primary" style={{float:"left",marginLeft:"20px"}} onClick={this.showModal} >批量导入</Button>
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
                <Table columns={columns} size={"middle"} dataSource={this.state.data} />
            </div>);
    }
}

export default withStyles(styles)(DoctorsDictionary);