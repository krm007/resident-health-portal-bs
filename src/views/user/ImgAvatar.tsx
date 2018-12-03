import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import {WithStyles} from "@material-ui/core/styles/withStyles";
import {Icon, message, Upload} from "antd";
import * as React from 'react';

const styles = (theme: Theme) => createStyles<"root">({
    root: {},

});

function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
    const isPNG = file.type === 'image/png';
    if (!isPNG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isPNG && isLt2M;
}

interface Iprops extends WithStyles<typeof styles> {
    upLoadType: string,
    imgBg: string,
}

class ImgAvatar extends React.Component<Iprops> {
    public state = {
        loading: false,
        imageUrl: ""
    };

    public handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl: any) => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    };

    public render() {
        const classes = this.props;

        const cssProperties = {
            padding: "20px 0",
            // @ts-ignore
            backgroundImage: "url(" + classes.imgBg + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        };
        const uploadButton = (
            <div style={{...cssProperties, position: "relative"}}>
                <Icon type={this.state.loading ? 'loading' : 'plus-circle'}
                      style={{fontSize: "25px",color:"#52C41A", position: "absolute", top: "65px", left: "46%"}} />
                <div className="ant-upload-text" style={{width: "255px", height: "120px"}}>
                    <span style={{verticalAlign: "bottom", position: "absolute", bottom: 10, left: "35%"}}>
                        {this.props.upLoadType}
                    </span>
                </div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%', height: '130px'}}/> : uploadButton}
            </Upload>
        );
    }
}

export default withStyles(styles)(ImgAvatar);