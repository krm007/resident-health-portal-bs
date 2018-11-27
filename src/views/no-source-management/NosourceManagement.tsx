import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Button, DatePicker, Form, Radio, Row, Select, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Sources } from "../../type/SourcesData";
import { getSources } from "../../axios/Request";
import { ColumnProps } from "antd/lib/table";

const styles = (theme: Theme) =>
  createStyles<"root" | "amAndPm">({
    root: {},
    amAndPm: {
      paddingTop: "20px",
      paddingBottom: "10px"
    }
  });

interface Iprops extends WithStyles<typeof styles>, FormComponentProps {}
interface Istates {
  data: Sources[];
}
class NosourceManagement extends React.Component<Iprops, Istates> {
  private dom: HTMLDivElement | null;
  private tableColums: Array<ColumnProps<Sources>> = [
    {
      title: "时间",
      dataIndex: "time"
    },
    {
      title: "时间段",
      dataIndex: "gradle"
    },
    {
      title: "所属医院",
      dataIndex: "hospitalName"
    },
    {
      title: "号源总数",
      dataIndex: "total"
    },
    {
      title: "已预约数",
      dataIndex: "appointed"
    },
    {
      title: "剩余号数",
      render: (text, record, index) => {
        if (record.total && record.appointed) {
          return record.total - record.appointed;
        } else {
          return "";
        }
      }
    }
  ];
  constructor(props: Iprops) {
    super(props);
    this.state = {
      data: []
    };
  }
  public searchData = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    console.log(this.dom);
    console.log(super.setState({}));
  };
  public UNSAFE_componentWillMount(): void {
    getSources().then(value => {
      this.setState({
        data: value.data._embedded.sources
      });
    });
  }

  public render() {
    const { classes } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        className={classes.root}
        ref={instance => {
          this.dom = instance;
        }}
      >
        <Form layout={"inline"} onSubmit={this.searchData}>
          <Row>
            <Form.Item label={"时间"}>
              {getFieldDecorator("data")(<DatePicker />)}
            </Form.Item>
            <Form.Item label={"选择医院"}>
              {getFieldDecorator("doctor")(
                <Select style={{ width: "176px" }}>
                  <Select.Option value={333}>内江人民医院</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              <Button htmlType={"submit"} type={"primary"}>
                查询
              </Button>
            </Form.Item>
          </Row>
          <div className={classes.amAndPm}>
            <Radio.Group>
              <Radio.Button value="am">只看上午</Radio.Button>
              <Radio.Button value="pm">只看下午</Radio.Button>
            </Radio.Group>
          </div>
        </Form>
        <Table size={"middle"} dataSource={this.state.data} columns={this.tableColums} />
      </div>
    );
  }
}

export default Form.create()(withStyles(styles)(NosourceManagement));
