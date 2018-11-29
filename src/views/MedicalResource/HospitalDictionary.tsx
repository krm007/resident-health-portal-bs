import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Input, Button, Table, Divider } from "antd";
import { getHosDic } from "../../axios/Request";
import { HosDic } from "../../type/HospitalData";
import {Link} from "react-router-dom";

const Search = Input.Search;

const styles = (theme: Theme) => createStyles({
      root: {},
      addButton:{
          float:"left",
          marginLeft:"20px",
          backgroundColor:"rgb(82,185,138)",
          borderColor:"rgb(82,185,138)"
      }
  });
interface Istate {
  data: HosDic[];
}

interface Iprops extends WithStyles<typeof styles> {}

class HospitalDictionary extends React.Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      data: []
    };
  }

  public componentWillMount() {
    // this.setState({
    //   data: getHosDic()
    // });
    getHosDic().then(value => {
        this.setState({
            data:value.data.content
        })

    });
  }

  public render() {
    const columns = [
      {
        title: "医院名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "医院等级",
        dataIndex: "level",
        key: "level"
      },
      {
        title: "医院类型",
        dataIndex: "category",
        key: "category"
      },
      {
        title: "医院地址",
        dataIndex: "location",
        key: "location"
      },
      {
        title: "电话",
        key: "phone",
        dataIndex: "phone"
      },
      {
        title: "操作",
        key: "action",
        render: () => (
          <span>
            <a href="javascript:;">详情</a>
            <Divider type="vertical" />
            <a href="javascript:;">停用</a>
          </span>
        )
      }
    ];

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div style={{ width: "90%", height: "32px" }}>
          <Search
            placeholder="输入关键字"
            onSearch={value => console.log(value)}
            enterButton={true}
            style={{ width: "27%", float: "left" }}
          />
          <Button type="primary" style={{ float: "left", marginLeft: "20px" }}>批量导入</Button>
            <Button type="primary" className={classes.addButton}><Link to={"/addHos"}>新增</Link></Button>
        </div>
        <br />
        <Table columns={columns} size={"middle"} dataSource={this.state.data} />
      </div>
    );
  }
}

export default withStyles(styles)(HospitalDictionary);
