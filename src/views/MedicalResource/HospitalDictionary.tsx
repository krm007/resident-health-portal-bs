import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Input, Button, Table, Divider, Modal, Switch, message } from "antd";
import { getHosDic } from "../../axios/Request";
import { HosDic } from "../../type/HospitalData";
import { Link } from "react-router-dom";
import service from "../../axios/Service";

const Search = Input.Search;

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    addButton: {
      float: "left",
      marginLeft: "20px",
      backgroundColor: "rgb(82,185,138)",
      borderColor: "rgb(82,185,138)"
    }
  });
interface Istate {
  data: HosDic[];
  visible: boolean;
}

interface Iprops extends WithStyles<typeof styles> {}

class HospitalDictionary extends React.Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      data: [],
      visible: false
    };
  }

  public componentWillMount() {
    this.getData({});
  }
  /** 获取医院字典 */
  public getData = (params: any) => {
    getHosDic(params).then(value => {
      this.setState({
        data: value.data._embedded.portalHospitals
      });
    });
  };

  /** 查询医院字典 */
  public search = (value: any) => {
    this.getData({
      name_like: value,
      level_like: value,
      category_like: value,
      location_like: value,
      phone_like: value
    });
  };

  /** 停用医院 */
  public preventHos = (params: any) => {
    if (params.status === 1) {
      params.status = 0;
      message.warning("已停用！");
    } else {
      params.status = 1;
      message.success("启用成功！");
    }
    service
      .get(`/portalHospitals/${params.id}/changeStatus`, {
        params: { status: params.status }
      })
      .then(value => {
        this.getData({});
      });
  };

  /** 点击批量导入 */
  public showModal = () => {
    this.setState({
      visible: true
    });
  };

  public handleOk = (e: any) => {
    this.setState({
      visible: false
    });
  };

  public handleCancel = (e: any) => {
    this.setState({
      visible: false
    });
  };

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
        render: (record: any) => {
          console.log(record.status === 1 ? true : false);
          return (
            <span>
              <Link to={`/hosDetails/${record.id}`}>详情</Link>
              <Divider type="vertical" />
              <Switch
                checkedChildren="启用"
                unCheckedChildren="停用"
                checked={record.status === 1 ? true : false}
                onChange={() => {
                  this.preventHos(record);
                }}
              />
            </span>
          );
        }
      }
    ];

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div style={{ width: "90%", height: "32px" }}>
          <Search
            placeholder="输入关键字"
            onSearch={this.search}
            enterButton={true}
            style={{ width: "27%", float: "left" }}
          />
          <Button
            type="primary"
            style={{ float: "left", marginLeft: "20px" }}
            onClick={this.showModal}
          >
            批量导入
          </Button>
          <Modal
            title="温馨提示"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>正在开发中敬请期待...</p>
          </Modal>
          <Button type="primary" className={classes.addButton}>
            <Link to={"/addHos"}>新增</Link>
          </Button>
        </div>
        <br />
        <Table columns={columns} size={"middle"} dataSource={this.state.data} />
      </div>
    );
  }
}

export default withStyles(styles)(HospitalDictionary);
