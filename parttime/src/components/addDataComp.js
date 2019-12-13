import React, { Component } from 'react'
import { Form, Modal, Input, message, Upload, Icon, Button } from 'antd'
import { Type } from 'utils'
import config from 'config'
let FormItem = Form.Item

class AddDataComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAdd: false,
      upload: {
        loading: false,
        imageURL: '',
        data: { fileLocation: 'user' },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ showAdd: nextProps.showAdd })
  }
  // 取消，关闭，调用父组件关闭弹框
  hideModel() {
    this.props.onClose()
  }
  beforeFileUpload({ dataIndex, accept, size }, file) {
    let typeCheck = accept.split(',').includes(file.type)
    let sizeCheck = file.size / 1024 / 1024 <= size
    if (!typeCheck) { message.error('文件格式不正确') }
    if (!sizeCheck) { message.error(`文件不能超过${size}m`) }
    let checkSuccess = typeCheck && sizeCheck
    // 加载状态
    if (checkSuccess) {
      let { upload } = this.state
      upload.loading = true
      this.setState({ upload })
    }
    return checkSuccess
  }
  handleFileChange(field, info) {
    let file = info.file
    if (file.response && file.response.success && file.response.data && file.response.data.path) {
      let { upload } = this.state
      upload.imageURL = `${config.baseUrl.resource.upload}${file.response.data.path}`
      // 为Form对应的字段设置值
      this.props.form.setFieldsValue({ [`${field.key}`]: file.response.data.path })
      this.setState({ upload })
      upload.loading = false
    }
  }
  customerValidator(field, rule, value, callback) {
    let message = ''
    if (value && /[`~!#$%^&*()_+<>?:"{},\/;'[\]]/im.test(value)) {
      message = '非法字符'
    }
    if (field.required && !value) {
      message = `请输入${field.title}`
    }
    if (field.required && value) {
      if (Type.isRegExp(field.validExp)) {
        if (!field.validExp.test(value)) {
          if (Type.isString(field.validMsg)) {
            message = field.validMsg
          } else {
            message = '输入格式不正确'
          }
        }
      }
    }
    if (message) {
      callback(message)
    } else {
      callback()
    }
  }
  // 确认，调用父组件，添加数据
  confirmForm(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return message.error(err)
      }
      this.props.onAddData(values)
    })
  }
  render() {
    let { showAdd, upload: { loading, imageURL, data, headers }} = this.state
    let { field, title, form: { getFieldDecorator }} = this.props
    let formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 }}
    let tailFormLayout = { wrapperCol: { xs: { span: 18, offset: 6 }, sm: { span: 18, offset: 6 }}}
    let uploadButton = (<div><Icon type={ loading ? 'loading' : 'plus'} /><div className="ant-upload-text">上传</div></div>)
    return <Modal
      footer={null}
      visible={showAdd}
      title={'添加' + title}
      centered
      onCancel={this.hideModel.bind(this)}>
      <Form onSubmit={this.confirmForm.bind(this)} {...formItemLayout}>
        {field.map((f, index) => {
          switch (f.type) {
            case 'file':
              return <FormItem
                name='file'
                headers={headers}
                key={f.key}
                label={f.title}>
                {getFieldDecorator(f.key)(<div>
                  <Upload
                    name="file"
                    accept={f.accept}
                    data={data}
                    listType="picture-card"
                    showUploadList={false}
                    action="http://localhost:3332/api/base/singleFile"
                    beforeUpload={this.beforeFileUpload.bind(this, f)}
                    onChange={this.handleFileChange.bind(this, f)}>
                    {imageURL ? <img src={imageURL} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </div>)}
              </FormItem>
            default:
              return <FormItem key={f.key} label={f.title}>
                {getFieldDecorator(f.key, { rules: [{ validator: this.customerValidator.bind(this, f) }] })(<Input placeholder={'请输入' + f.title}/>)}
              </FormItem>
          }
        })}
        <FormItem { ...tailFormLayout}>
          <Button type="primary" htmlType="submit">确定</Button>
        </FormItem>
      </Form>
    </Modal>
  }
}
const AddComp = Form.create({ name: 'add_comp' })(AddDataComp)
export default AddComp
