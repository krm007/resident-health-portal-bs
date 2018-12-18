import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {
  Button,
  Col,
  Collapse,
  Form,
  Icon,
  Input,
  Modal,
  Row,
  Upload,
  message
} from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Link, RouteComponentProps } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";
import { getOneHos, postHosForm, updateHos } from "../../axios/Request";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const styles = (theme: Theme) =>
  createStyles({
    root: {},
    textareaStyle: {
      width: "75vw",
      marginLeft: "0.5vw"
    }
  });
interface Istate {
  previewVisible: any;
  previewImage: string;
  oneHos: any;
  initArray: any[];
  id: any;
}
interface Iprops
  extends WithStyles<typeof styles>,
    FormComponentProps,
    RouteComponentProps<any> {}

let id = 0;
class HosDetails extends React.Component<Iprops, Istate> {
  private fileList: UploadFile[] = [];
  constructor(props: Iprops) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      previewVisible: false,
      previewImage: "",
      oneHos: {},
      initArray: []
    };
  }

  public componentWillMount() {
    if (this.state.id) {
      /** 详情回显 */
      getOneHos(this.state.id).then(value => {
        // console.log(value.data.detail);
        if (value.data.detail) {
          /** 图片回显 */
          if (value.data.detail.images) {
            this.fileList = value.data.detail.images;
          }
          /** 特色科室回显 */
          const arrayC = value.data.detail.specialUnits;
          const arrayA: any[] = [];
          if (arrayC) {
            for (let i = 0; i < arrayC.length; i++) {
              arrayA.push(i);
            }
          }
          this.props.form.setFields({ keys: arrayA });
          this.setState({
            initArray: arrayA,
            oneHos: value.data.detail
          });
        }
      });
    }
  }

  /** 提交新增人员 */
  public handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        postHosForm(
          Object.assign(values, { detail: this.props.form.getFieldsValue() })
        ).then(value => {
          message.success("添加成功！");
          this.props.history.push("/medicalLib/hospitalLib");
        });
      }
    });
  };

  /** 修改保存 */
  public updateInfo = (params: any) => {
    const updateData: any = this.props.form.getFieldsValue();
    updateData.detail = this.props.form.getFieldsValue();
    if (this.state.id) {
      updateHos(updateData, this.state.id).then(value => {
        message.success("修改成功！");
        this.props.history.push("/medicalLib/hospitalLib");
      });
    }
  };

  /** 关闭预览 */
  public handleCancel = () => this.setState({ previewVisible: false });

  /** 图片预览 */
  public handlePreview = (file: any) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  /** 把onchange的参数转化为控件的值 */
  public normFile = (e: UploadChangeParam) => {
    if (e.file.response) {
      const file: UploadFile = {
        url: e.file.response.imageUrl,
        uid: e.file.uid,
        size: e.file.size,
        name: e.file.name,
        type: e.file.type
      };
      this.fileList.push(file);
      return this.fileList;
    }
    return e.fileList;
  };

  /** 删除图片 */
  public deleteImg = (file: UploadFile) => {
    this.fileList = this.fileList.filter(value => value.url !== file.url);
    return true;
  };

  /** 删除特色科室 */
  public remove = (k: any) => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 0) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter((key: any) => key !== k)
    });
  };

  /** 特色科室 */
  public add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    this.setState({
      oneHos: { specialUnits: Array(nextKeys.size) }
    });
    form.setFieldsValue({
      keys: nextKeys
    });
    // console.log(keys);
  };

  public render() {
    const customPanelStyle = {
      background: "#f7f7f7",
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: "hidden"
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 19, offset: 1 }
      }
    };
    const twoFormItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 15, offset: 1 }
      }
    };
    const thirdFormItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 }
      }
    };
    const { classes } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    /** 特色科室。。。 */
    getFieldDecorator("keys", { initialValue: this.state.initArray });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k: any, index: any) => {
      return (
        <FormItem required={false} key={k}>
          {getFieldDecorator(`specialUnits[${k}]`, {
            initialValue: this.state.oneHos.specialUnits[k],
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: false,
                whitespace: true,
                message: "请输入特色科室或删除本项"
              }
            ]
          })(
            <TextArea
              placeholder="如:肿瘤科,..."
              style={{ width: "96%", marginRight: 8 }}
            />
          )}
          {keys.length > 0 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => {
                this.remove(k);
              }}
            />
          ) : null}
        </FormItem>
      );
    });
    /** 上传按钮 */
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div style={{ marginTop: "8px", color: "#666" }}>上传</div>
      </div>
    );

    /** 切换新增和编辑页面的按钮 */
    let button = null;
    if (this.state.id) {
      button = (
        <Button type="primary" onClick={this.updateInfo}>
          保存
        </Button>
      );
    } else {
      button = (
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      );
    }

    return (
      <div className={classes.root}>
        <Form onSubmit={this.handleSubmit}>
          <Collapse bordered={false} defaultActiveKey={["1"]}>
            <Panel header="" key="1" style={customPanelStyle}>
              <Row gutter={24}>
                {" "}
                {/*第一行*/}
                <Col span={6}>
                  <FormItem label={"名称"} {...formItemLayout}>
                    {getFieldDecorator("name", {
                      initialValue: this.state.oneHos.name,
                      rules: [{ required: true, message: "请输入名称" }]
                    })(<Input type="text" />)}
                  </FormItem>
                </Col>
                <Col span={4} offset={14}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Button type="primary">
                        <Link to={"/medicalLib/hospitalLib"}>返回</Link>
                      </Button>
                    </Col>
                    <Col span={12}>{button}</Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={24}>
                {" "}
                {/*第二行*/}
                <Col span={24}>
                  <FormItem
                    label={"简介"}
                    labelCol={{ span: 1 }}
                    wrapperCol={{ span: 23 }}
                  >
                    {getFieldDecorator("introduction", {
                      initialValue: this.state.oneHos.introduction,
                      rules: [{ required: true, message: "请输入简介" }]
                    })(<TextArea className={classes.textareaStyle} />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                {" "}
                {/*第三行*/}
                <Col span={6}>
                  <FormItem label={"中文名称"} {...thirdFormItemLayout}>
                    {getFieldDecorator("ChineseName", {
                      initialValue: this.state.oneHos.ChineseName,
                      rules: [{ required: true, message: "请输入中文名称" }]
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label={"外文名称"} {...thirdFormItemLayout}>
                    {getFieldDecorator("EnglishName", {
                      initialValue: this.state.oneHos.EnglishName,
                      rules: [{ required: false, message: "请输入外文名称" }]
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label={"医院等级"} {...thirdFormItemLayout}>
                    {getFieldDecorator("level", {
                      initialValue: this.state.oneHos.level,
                      rules: [{ required: true, message: "请输入医院等级" }]
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label={"医院类型"} {...thirdFormItemLayout}>
                    {getFieldDecorator("category", {
                      initialValue: this.state.oneHos.category,
                      rules: [{ required: true, message: "请输入医院类型" }]
                    })(<Input />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                {" "}
                {/*第四行*/}
                <Col span={8}>
                  <FormItem label={"成立时间"} {...twoFormItemLayout}>
                    {getFieldDecorator("establishDate", {
                      initialValue: this.state.oneHos.establishDate,
                      rules: [{ required: true, message: "请输入成立时间" }]
                    })(<Input type="text" />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label={"地理位置"} {...twoFormItemLayout}>
                    {getFieldDecorator("location", {
                      initialValue: this.state.oneHos.location,
                      rules: [{ required: true, message: "请输入地理位置" }]
                    })(<Input type="text" />)}
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem label={"电话"} {...twoFormItemLayout}>
                    {getFieldDecorator("phone", {
                      initialValue: this.state.oneHos.phone,
                      rules: [{ required: true, message: "请输入电话" }]
                    })(<Input type="text" />)}
                  </FormItem>
                </Col>
              </Row>
            </Panel>
            <Panel header="支付账户" key="2" style={customPanelStyle}>
              <Row type="flex" justify="space-around">
                <Col span={4}>
                  <img
                    src={require("../../images/hospitalDetail/QRCode.png")}
                  />
                </Col>
                <Col span={4}>
                  <img
                    src={require("../../images/hospitalDetail/QRCode.png")}
                  />
                </Col>
              </Row>
            </Panel>
            <Panel header="特色科室" key="3" style={customPanelStyle}>
              {formItems}
              <FormItem>
                <Button type="dashed" onClick={this.add}>
                  <Icon type="plus-circle" />
                  添加科室
                </Button>
              </FormItem>
            </Panel>
            <Panel header="医护团队" key="4" style={customPanelStyle}>
              <Row gutter={24}>
                <Col span={24}>
                  <FormItem labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
                    {getFieldDecorator("medicineTeam", {
                      initialValue: this.state.oneHos.medicineTeam,
                      rules: [{ required: false, message: "请输入医护团队" }]
                    })(<TextArea placeholder="医护团队..." />)}
                  </FormItem>
                </Col>
              </Row>
            </Panel>
            <Panel header="医院风采" key="5" style={customPanelStyle}>
              <FormItem>
                {getFieldDecorator("images", {
                  valuePropName: "fileList",
                  getValueFromEvent: this.normFile,
                  initialValue: this.state.oneHos.images
                })(
                  <Upload
                    action="/manage/upload?type=HOSPITAL"
                    listType="picture-card"
                    onRemove={this.deleteImg}
                    onPreview={this.handlePreview}
                  >
                    {uploadButton}
                  </Upload>
                )}
              </FormItem>
            </Panel>
          </Collapse>
        </Form>
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt="大图"
            style={{ width: "100%" }}
            src={this.state.previewImage}
          />
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Form.create()(HosDetails));
