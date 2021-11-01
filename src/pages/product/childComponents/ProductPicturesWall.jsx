import React, { Component } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import { reqRemoveImg } from "../../../api/product";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// 用于图片上传的组件
export default class ProductPicturesWall extends Component {
  static propTypes = {
    fileList: PropTypes.array.isRequired,
  };

  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  // 隐藏展示图片的modal
  handleCancel = () => this.setState({ previewVisible: false });

  // 处理图片预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      console.log(file.originFileObj);
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  // 图片发生改变
  handleChange = async ({ file, fileList }) => {
    if (file.status === "done") {
      const result = file.response;
      if (result.status === 0) {
        message.success("图片上传成功");
        const { name, url } = result.data;
        file.name = name;
        file.url = url;
      } else {
        message.error("图片上传失败");
      }
    } else if (file.status === "removed") {
      const result = await reqRemoveImg({
        name: file.name,
      });
      if (result.status === 0) {
        message.success("删除成功");
      } else {
        message.error("删除失败");
      }
    }
    this.setState({ fileList });
  };

  // 获取图片的名称
  getImgs = () => {
    const { fileList } = this.state;
    return fileList.map(item => item.name);
  };

  // 初始化图片
  initFileList = () => {
    const fileList = this.props.fileList.map(name => {
      return {
        name,
        statue: "done",
        url: `http://localhost:5000/upload/${name}`,
      };
    });
    this.setState({
      fileList,
    });
  };

  componentDidMount() {
    this.initFileList();
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          name="image"
          action="/manage/img/upload"
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
