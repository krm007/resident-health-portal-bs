import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Button, DatePicker, Form, Radio, Row, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";

const styles = (theme: Theme) =>
  createStyles<"root">({
    root: {}
  });

interface Iprops extends WithStyles<typeof styles>, FormComponentProps {}

class NosourceManagement extends React.Component<Iprops> {
  private dom: HTMLDivElement | null;
  public searchData = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    console.log(this.dom);
    console.log(super.setState({}));
  };
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
        <Row>
          <Form layout={"inline"} onSubmit={this.searchData}>
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
          </Form>
        </Row>
        <div>
          <Radio.Group>
            <Radio.Button value="am">只看上午</Radio.Button>
            <Radio.Button value="pm">只看下午</Radio.Button>
          </Radio.Group>
        </div>
      </div>
    );
  }
}

export default Form.create()(withStyles(styles)(NosourceManagement));
