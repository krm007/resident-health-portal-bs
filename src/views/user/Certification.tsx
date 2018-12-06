import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {Col, Form, Input, Modal, Row} from 'antd'
import Button from "antd/lib/button/button";
import {FormComponentProps} from "antd/lib/form";
import * as React from "react";
import {RouteComponentProps} from "react-router";
// import Face from '../../images/userCenter/idCardFace.png';
import {getOneVerify,
         patchOneVerify
} from "../../axios/Request";
import {verifyOneList} from "../../type/MessageData";


const FormItem = Form.Item;
const styles = (theme: Theme) => createStyles<"root" | "hiddenInput" | "imgWrapper" | "imgText">({
    root: {},
    hiddenInput: {
        visibility: "hidden"
    },
    imgWrapper: {
        width: "100%",
        height: "160px",
        padding: "10px",
        border: "1px dashed #bbbbbb",
        borderRadius: "6px",
        "& img": {
            width: "100%",
            height: "100%",
            cursor: "pointer"
        }
    },
    imgText: {
        textAlign: "center"
    }
});

interface Iprops extends WithStyles<typeof styles>, FormComponentProps, RouteComponentProps<any> {

}

interface Istates {
    modalVisible: boolean,
    upLoadEle: any,
    fileList: verifyOneList,
    verifyId: string,
    displayImgUrl: string
}

class Certification extends React.Component<Iprops, Istates> {
    constructor(props: Iprops) {
        super(props);
        this.state = {
            modalVisible: false,
            upLoadEle: "",
            fileList: {},
            verifyId: this.props.match.params.id,
            displayImgUrl: ""
        }
    }

    public componentWillMount = () => {
        // 获取到参数的前提事route中需要配置带参数
        // eg:path={"/user/certification/:id?"}
        if (this.state.verifyId) {// 有传值id
            getOneVerify(this.state.verifyId).then((value) => {
                this.setState({
                    fileList: value.data
                })
            })
        }
    };

    // 否决
    public handleVeto = () => {
        console.log("否决")
    };
    // 点击图片触发upload

    //
    public handleSubmit = (e: any) => {
        e.preventDefault();
        this.state.fileList.state = 2;
        this.setState({
            fileList:this.state.fileList
        }, ()=>{

            patchOneVerify(this.state.fileList,this.state.fileList.id).then((value) => {

            });
        });




    };

    public showModal = (imgUrl: any) => {
        this.setState({
            modalVisible: true,
            displayImgUrl: imgUrl
        })
    };
    public hideModal = () => {
        this.setState({
            modalVisible: false
        })
    };

// 文件列表的删除

    public render() {
        const {getFieldDecorator} = this.props.form;
        const {classes} = this.props;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (
            <div className={classes.root}>
                <Form>
                    <FormItem {...formItemLayout} label="真实姓名">
                        {getFieldDecorator('realName', {
                            initialValue: this.state.fileList.realName
                        })(
                            <Input id="realName" style={{width: "255px"}}/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="身份证号">
                        {getFieldDecorator('idNum', {
                            initialValue: this.state.fileList.idCard,
                        })(
                            <Input id="idNum" style={{width: "255px"}}/>
                        )}

                    </FormItem>
                    <FormItem {...formItemLayout} label="身份证照片">
                        <Row gutter={30}>
                            <Col span={10}>
                                <div className={classes.imgWrapper}>
                                    <img src={this.state.fileList.aboveUrl}
                                         onClick={this.showModal.bind(this, this.state.fileList.aboveUrl)}/>
                                </div>
                                <p className={classes.imgText}>身份证正面</p>
                            </Col>
                            <Col span={10}>
                                <div className={classes.imgWrapper}>
                                    <img src={this.state.fileList.belowUrl}
                                         onClick={this.showModal.bind(this, this.state.fileList.belowUrl)}/>
                                </div>
                                <p className={classes.imgText}>身份证背面</p>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        wrapperCol={{
                            xs: {span: 24, offset: 0},
                            sm: {span: 16, offset: 6},
                        }}
                    >
                        <Button type="primary" onClick={this.handleSubmit} style={{marginRight: "30px"}}>审核通过</Button>
                        <Button type="danger" onClick={this.handleVeto}>审核不通过</Button>
                    </FormItem>
                </Form>
                <Modal
                    visible={this.state.modalVisible}
                    onCancel={this.hideModal}
                    footer={null}
                >
                    <img src={this.state.displayImgUrl} alt="" style={{width: "100%", height: "300px"}}/>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(withStyles(styles)(Certification));