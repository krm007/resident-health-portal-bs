import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Divider, Form, Input, Modal, Radio, Select, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { BlacklistData } from "../../type/SourcesData";
import { getBlacklist } from "../../axios/Request";
import { ColumnProps } from "antd/lib/table";
import RadioGroup from "antd/lib/radio/group";
import service from "../../axios/Service";
import * as qs from "qs";

const styles = (theme: Theme) =>
  createStyles<"root" | "sss">({
    root: {
      backgroundColor: "sss"
    },
    sss: {
      extend: "root"
    }
  });

interface Iprops extends WithStyles<typeof styles>, FormComponentProps {}
interface Istates {
  data: BlacklistData[];
  blackStates: boolean;
  recordStates: boolean;
  recordList: any[];
  dateStop: number;
}
/**
 * 用户黑名单管理
 */
class Blacklist extends React.Component<Iprops, Istates> {
  private queryData: { username?: string; verifyStatus?: string } = {};
  private tableColumns: Array<ColumnProps<BlacklistData>> = [
    {
      title: "用户名",
      align: "center",
      dataIndex: "username"
    },
    {
      title: "创建时间",
      align: "center",
      dataIndex: "createTime"
    },
    {
      title: "账号状态",
      align: "center",
      dataIndex: "status"
    },
    {
      title: "违约次数",
      align: "center",
      dataIndex: "defaultTimes"
    },
    {
      title: "操作",
      align: "center",
      render: (text, record, index) => {
        if (record.verifyStatus !== "1") {
          return (
            <span>
              <a
                onClick={this.checkRecord.bind(this, record.userId)}
                style={{ marginRight: 10 }}
              >
                违约记录
              </a>
              <a onClick={this.addBlack.bind(this, record.userId)}>
                加入黑名单
              </a>
            </span>
          );
        } else {
          return <a>违约记录</a>;
        }
      }
    }
  ];
  private userId: string;
  constructor(props: Iprops) {
    super(props);
    this.state = {
      data: [],
      blackStates: false,
      recordStates: false,
      recordList: [],
      dateStop: 30
    };
  }
  public checkRecord = (id: string) => {
    this.setState({
      recordStates: true
    });
    service
      .get(`/breakContractRecords/query`, { params: { userId: id } })
      .then(value => {
        this.setState({
          recordList: value.data._embedded.breakContractRecords
        });
      });
  };
  public addBlack = (userId: string) => {
    this.userId = userId;
    this.setState({
      blackStates: true
    });
  };
  public UNSAFE_componentWillMount(): void {
    this.getData();
  }
  public getData = () => {
    getBlacklist(this.queryData).then(value => {
      this.setState({
        data: value.data._embedded.blackLists
      });
    });
  };
  public searchData = (value: string) => {
    this.queryData.username = value;
    this.getData();
  };
  public addBlackList = () => {
    service.post(
      "/user/disableBlackList",
      qs.stringify({ id: this.userId, dates: this.state.dateStop })
    );
    this.setState({
      blackStates: false
    });
  };
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Form layout={"inline"} style={{ marginBottom: 20 }}>
          <Form.Item label={"黑名单"}>
            {getFieldDecorator("verifyStatus", {
              initialValue: "",
              getValueFromEvent: args => {
                this.queryData.verifyStatus = args;
                this.getData();
                return args;
              }
            })(
              <Select style={{ width: "150px" }}>
                <Select.Option value={""}>全部</Select.Option>
                <Select.Option value={"1"}>黑名单</Select.Option>
                <Select.Option value={"2"}>白名单</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label={"用户名称"}>
            {getFieldDecorator("userName")(
              <Input.Search
                placeholder="用户名称"
                onSearch={this.searchData}
                enterButton={true}
              />
            )}
          </Form.Item>
        </Form>
        <Table
          size={"middle"}
          dataSource={this.state.data}
          columns={this.tableColumns}
        />
        <Modal
          visible={this.state.blackStates}
          title={"停用时间"}
          centered={true}
          onOk={this.addBlackList}
          onCancel={() => {
            this.setState({
              blackStates: false
            });
          }}
        >
          <div>
            <RadioGroup
              value={this.state.dateStop}
              onChange={e => {
                this.setState({
                  dateStop: e.target.value
                });
              }}
            >
              <Radio value={30}>一个月</Radio>
              <Radio value={90}>三个月</Radio>
              <Radio value={180}>六个月</Radio>
              <Radio value={360}>一年</Radio>
            </RadioGroup>
            <div style={{ color: "red" }}>
              "进入黑名单用户将不能使用预约挂号功能，其它功能照常使用"
            </div>
          </div>
        </Modal>
        <Modal
          centered={true}
          visible={this.state.recordStates}
          title={"违约记录"}
          onOk={() => {
            this.setState({
              recordStates: false
            });
          }}
          onCancel={() => {
            this.setState({
              recordStates: false
            });
          }}
        >
          {this.state.recordList.map((value, index) => {
            return (
              <div key={value.id}>
                <span style={{ marginRight: 20 }}>{value.date}</span>
                <span>{value.info}</span>
                <Divider />
              </div>
            );
          })}
        </Modal>
      </div>
    );
  }
}

export default Form.create()(withStyles(styles)(Blacklist));
