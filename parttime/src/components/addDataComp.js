import React, { Component } from 'react'
import { Form, Modal, Input, message } from 'antd'

class AddDataComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ showAdd: nextProps.showAdd })
  }
  // 取消，关闭，调用父组件关闭弹框
  hideModel() {
    this.props.onClose()
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
    let { showAdd } = this.state
    let { field, title } = this.props
    let { getFieldDecorator } = this.props.form
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 }}
    return <Modal
      visible={showAdd}
      title={'添加' + title}
      centered
      onCancel={this.hideModel.bind(this)}
      onOk={this.confirmForm.bind(this)}>
      <Form {...formItemLayout}>
        {field.map((f, index) => <Form.Item key={f.key} label={f.title}>
          {getFieldDecorator(f.key, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [
              { required: true, whitespace: true, message: `${f.title}不能为空` },
            ],
          })(<Input placeholder={'请输入' + f.title}/>)}
        </Form.Item>)}
      </Form>
    </Modal>
  }
}

const AddComp = Form.create({ name: 'add_comp' })(AddDataComp)
export default AddComp
