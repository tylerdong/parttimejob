import React, { Component } from 'react'
import { Form, Modal, Input, message, Upload, Icon } from 'antd'
let FormItem = Form.Item

class AddDataComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAdd: false,
      upload: { loading: false, imageUrl: '', data: { fileLocation: 'user' }, headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ showAdd: nextProps.showAdd })
  }
  // 取消，关闭，调用父组件关闭弹框
  hideModel() {
    this.props.onClose()
  }
  beforeFileUpload(file) {
    // TODO
  }
  handleFileChange(info) {
    // TODO
  }
  // 确认，调用父组件，添加数据
  confirmForm() {
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(err)
      }
      this.props.onAddData(values)
    })
  }
  render() {
    let { showAdd, upload: { loading, imageUrl, data, headers }} = this.state
    let { field, title, form: { getFieldDecorator }} = this.props
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 }}
    const uploadButton = (<div><Icon type={ loading ? 'loading' : 'plus'} /><div className="ant-upload-text">Upload</div></div>)
    return <Modal
      visible={showAdd}
      title={'添加' + title}
      data={data}
      centered
      onCancel={this.hideModel.bind(this)}
      onOk={this.confirmForm.bind(this)}>
      <Form {...formItemLayout}>
        {field.map((f, index) => {
          switch (f.type) {
            case 'img':
              return <FormItem
                name='file'
                headers={headers}
                key={f.key}
                label={f.title}>
                {getFieldDecorator(f.key, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{ required: true, whitespace: true, message: `请上传${f.title}` }]
                })(<Upload
                  name="file"
                  data={data}
                  listType="picture-card"
                  showUploadList={false}
                  action="http://localhost:3332/api/base/singleFile"
                  beforeUpload={this.beforeFileUpload.bind(this)}
                  onChange={this.handleFileChange.bind(this)}>
                  {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>)}
              </FormItem>
            default:
              return <FormItem key={f.key} label={f.title}>
                {getFieldDecorator(f.key, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{ required: true, whitespace: true, message: `${f.title}不能为空` }],
                })(<Input placeholder={'请输入' + f.title}/>)}
              </FormItem>
          }
        })}
      </Form>
    </Modal>
  }
}
const AddComp = Form.create({ name: 'add_comp' })(AddDataComp)
export default AddComp
