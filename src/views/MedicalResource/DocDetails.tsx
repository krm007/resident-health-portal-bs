import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import {Button, Form, Row, Input, Col, Collapse, Icon, Upload, Modal, message} from 'antd';
import {FormComponentProps} from "antd/lib/form";
import TextArea from "antd/lib/input/TextArea";
import {Link, RouteComponentProps} from "react-router-dom";
import {getOneDoc, postForm} from "../../axios/Request";
import {OneDoc} from "../../type/DoctorData";

const FormItem = Form.Item;
const Panel = Collapse.Panel;
const styles = (theme: Theme) => createStyles({
    root: {},
    textareaStyle: {
        width: "75vw",
        marginLeft: "0.5vw",
    }
});

interface Istate {
    previewVisible: any,
    previewImage: string,
    fileList: any[],
    oneDoc:OneDoc
}

interface Iprops extends WithStyles<typeof styles>, FormComponentProps,RouteComponentProps<any> {
}

let id = 0;
class DocDetails extends React.Component<Iprops, Istate> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
            oneDoc:{}
        }
    }

    public componentWillMount(){
        const id=this.props.match.params.id;
        if (id){
            getOneDoc(id).then(value => {
                console.log(id);
                this.setState({
                    oneDoc:value.data
                })
            })
        }

    }
    /** 提交新增人员 */
    public handleSubmit = (e:any) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            postForm(Object.assign(values,{detail:values})).then(value => {
                message.success("添加成功")
            })
        });
    }

    /** 编辑保存 */
    public updataInfo(){
        alert("保存用户信息成功");
    }

    /** 删除上传图片 */
    public handleCancel = () => this.setState({previewVisible: false});

    /** 文件预览 */
    public handlePreview = (file: any) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    /** 上传文件 */
    public handleChange = ({fileList}: any) => this.setState({fileList});


    /** 把onchange的参数转化为控件的值 */
    public normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    /** 删除经历 */
    public remove = (k: any) => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 0) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter((key: any) => key !== k),
        });
    };

    /** 添加经历 */
    public add = () => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
        // console.log(keys);
    };


    public render() {
        /** 折叠版样式 */
        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 4,
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };
        const formItemLayout = {
            labelCol: {
                xs: {span: 8},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 16},
                sm: {span: 19, offset: 1},
            }
        };
        const thirdFormItemLayout = {
            labelCol: {
                xs: {span: 8},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 16},
                sm: {span: 16},
            }
        }
        const {classes} = this.props;
        const {getFieldDecorator, getFieldValue} = this.props.form;
        /** 添加经历 */
        getFieldDecorator('keys', {initialValue: []});
        const keys = getFieldValue('keys');
        const formItems = keys.map((k: any, index: any) => {
            return (
                <FormItem required={false} key={k}>
                    {getFieldDecorator(`experienceDetails[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: false,
                            whitespace: true,
                            message: "请输入早年经历或删除本项",
                        }],
                    })(
                        <TextArea placeholder="早年经历详情..." style={{width: '96%', marginRight: 8}}/>
                    )}
                    {keys.length > 0 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={() => {
                                this.remove(k)
                            }}
                        />
                    ) : null}
                </FormItem>
            );
        });
        /** 上传按钮 */
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div style={{marginTop: "8px", color: "#666"}}>上传</div>
            </div>
        );

        /** 切换新增和编辑页面的按钮 */
        let button=null;
        const id=this.props.match.params.id;
        if(id){
            button=<Button type="primary" onClick={this.updataInfo}>保存</Button>
        }else {
            button=<Button type="primary" htmlType="submit">确定</Button>
        }
        /** render渲染页面 */
        return (
            <div className={classes.root}>
                <Form onSubmit={this.handleSubmit}>
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Panel header="" key="1" style={customPanelStyle}>
                            <Row gutter={24}> {/*第一行*/}
                                <Col span={6}>
                                    <FormItem label={"姓名"} {...formItemLayout}>
                                        {getFieldDecorator('name', {
                                            initialValue: this.state.oneDoc.name,
                                            rules: [{required: true, message: '请输入姓名'}],
                                        })(
                                            <Input type="text"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={4} offset={14}>
                                    <Row gutter={24}>
                                        <Col span={12}><Button type="primary"><Link to={"/medicalLib/doctorLib"}>返回</Link></Button></Col>
                                        <Col span={12}>{button}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row gutter={24}> {/*第二行*/}
                                <Col span={24}>
                                    <FormItem label={"简介"} labelCol={{span: 1}} wrapperCol={{span: 23}}>
                                        {getFieldDecorator('introduction', {
                                            initialValue: this.state.oneDoc.introduction,
                                            rules: [{required: true, message: '请输入简介'}],
                                        })(
                                            <TextArea className={classes.textareaStyle}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={24}> {/*第三行*/}
                                <Col span={6}>
                                    <FormItem label={"就职医院"} {...thirdFormItemLayout}>
                                        {getFieldDecorator('hospital', {
                                            initialValue: this.state.oneDoc.hospital,
                                            rules: [{required: true, message: '请输入就职医院'}],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem label={"所在科室"} {...thirdFormItemLayout}>
                                        {getFieldDecorator('depart', {
                                            initialValue:this.state.oneDoc.depart,
                                            rules: [{required: true, message: '请输入所在科室'}],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem label={"职称"} {...thirdFormItemLayout}>
                                        {getFieldDecorator('level', {
                                            initialValue:this.state.oneDoc.level,
                                            rules: [{required: true, message: '请输入职称'}],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem label={"职务"} {...thirdFormItemLayout}>
                                        {getFieldDecorator('major', {
                                            initialValue:this.state.oneDoc.major,
                                            rules: [{required: true, message: '请输入职务'}],
                                        })(
                                            <Input/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={24}> {/*第四行*/}
                                <Col span={6}>
                                    <FormItem label={"学历"} {...formItemLayout}>
                                        {getFieldDecorator('education', {
                                            rules: [{required: true, message: '请输入学历'}],
                                        })(
                                            <Input type="text"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={14} offset={4}>
                                    <FormItem label={"擅长疾病"} labelCol={{span: 6}} wrapperCol={{span: 18}}>
                                        {getFieldDecorator('skillful', {
                                            initialValue:this.state.oneDoc.skillful,
                                            rules: [{required: true, message: '请输入擅长'}],
                                        })(
                                            <TextArea/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="人物履历" key="2" style={customPanelStyle}>
                            <Row gutter={24}> {/*第一行*/}
                                <Col span={24}>
                                    <FormItem labelCol={{span: 1}} wrapperCol={{span: 23}}>
                                        {getFieldDecorator('experienceDetail', {
                                            rules: [{required: true, message: '请输入经历详情'}],
                                        })(
                                            <TextArea placeholder="早年经历详情..."/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            {formItems}
                            <FormItem>
                                <Button type="dashed" onClick={this.add}>
                                    <Icon type="plus-circle"/>添加经历
                                </Button>
                            </FormItem>
                        </Panel>
                        <Panel header="工作方向" key="3" style={customPanelStyle}>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <FormItem labelCol={{span: 1}} wrapperCol={{span: 23}}>
                                        {getFieldDecorator('workDirection', {
                                            rules: [{required: true, message: '请输入工作方向'}],
                                        })(
                                            <TextArea placeholder="工作方向..."/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="从业经历" key="4" style={customPanelStyle}>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <FormItem labelCol={{span: 1}} wrapperCol={{span: 23}}>
                                        {getFieldDecorator('careerExperience', {
                                            rules: [{required: true, message: '请输入从业经历'}],
                                        })(
                                            <TextArea placeholder="从业经历..."/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="荣誉奖项" key="5" style={customPanelStyle}>
                            <Row gutter={24}>
                                <Col span={24}>
                                    <FormItem labelCol={{span: 1}} wrapperCol={{span: 23}}>
                                        {getFieldDecorator('honorary', {
                                            rules: [{required: true, message: '请输入荣誉奖项'}],
                                        })(
                                            <TextArea placeholder="荣誉奖项..."/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel header="医生风采" key="6" style={customPanelStyle}>
                            <FormItem>
                                {getFieldDecorator("imgFiles")(
                                    <div className="clearfix">
                                        <Upload action="/manage/upload?type=NEWS"
                                                listType="picture-card"
                                                fileList={this.state.fileList}
                                                onPreview={this.handlePreview}
                                                onChange={this.handleChange}>
                                            {this.state.fileList.length >= 4 ? null : uploadButton}
                                        </Upload>
                                        <Modal visible={this.state.previewVisible} footer={null}
                                               onCancel={this.handleCancel}>
                                            <img alt="example" style={{width: '100%'}} src={this.state.previewImage}/>
                                        </Modal>
                                    </div>
                                )}
                            </FormItem>
                        </Panel>
                    </Collapse>
                </Form>
            </div>
        );
    }
}

export default withStyles(styles)(Form.create()(DocDetails));