import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Input,Button,Table, Divider} from 'antd';
import {getDocDic} from "../../axios/Request";
import {DocDic} from "../../type/HospitalData";
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
    data:DocDic[]
}

interface Iprops extends WithStyles<typeof styles> {

}

class DoctorsDictionary extends React.Component<Iprops,Istate> {
    constructor(props:Iprops){
        super(props);
        this.state={
            data:[]
        }
    }

    public componentWillMount(){
        getDocDic().then(value => {
            this.setState({
                data:value.data.content
            })
        });
    }

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
            dataIndex: 'hospitalName',
            key: 'hospitalName',
        }, {
            title: '所在科室',
            dataIndex: 'depart',
            key: 'depart',
        }, {
            title: '操作',
            key: 'action',
            render: () => (
                <span>
                    <Link to={"/docDetails"} >详情</Link>
                    <Divider type="vertical" />
                    <a href="javascript:;">停用</a>
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
                    <Button type="primary" style={{float:"left",marginLeft:"20px"}}>批量导入</Button>
                    <Button type="primary" className={classes.addButton}><Link to={"/addDoc"}>新增</Link></Button>
                </div>
                <br/>
                <Table columns={columns} size={"middle"} dataSource={this.state.data} />
            </div>);
    }
}

export default withStyles(styles)(DoctorsDictionary);