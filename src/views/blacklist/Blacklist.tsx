import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Form, Input, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { BlacklistData } from "../../type/SourcesData";
import { getBlacklist } from "../../axios/Request";
import { ColumnProps } from "antd/lib/table";

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
}

class Blacklist extends React.Component<Iprops, Istates> {
  private tableColumns: Array<ColumnProps<BlacklistData>> = [
    {
      title: "用户名",
      dataIndex: "username"
    },
    {
      title: "创建时间",
      dataIndex: "createTime"
    },
    {
      title: "账号状态",
      dataIndex: "status"
    },
    {
      title: "违约次数",
      dataIndex: "defaultTimes"
    }
  ];
  constructor(props: Iprops) {
    super(props);
    this.state = {
      data: []
    };
  }
  public UNSAFE_componentWillMount(): void {
    getBlacklist().then(value => {
      this.setState({
        data: value.data._embedded.blackLists
      });
    });
  }

  public searchData = () => {};
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Form
          layout={"inline"}
          onSubmit={this.searchData}
          style={{ marginBottom: 20 }}
        >
          <Form.Item label={"用户名称"}>
            {getFieldDecorator("userName")(
              <Input.Search
                placeholder="用户名称"
                onSearch={value => console.log(value)}
                enterButton={true}
              />
            )}
          </Form.Item>
        </Form>
        <Table size={"middle"} dataSource={this.state.data} columns={this.tableColumns} />
      </div>
    );
  }
}

export default Form.create()(withStyles(styles)(Blacklist));
