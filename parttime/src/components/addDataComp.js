import React, { Component } from 'react'
import { Form, Modal, Input, message } from 'antd'
// import style from './../static/css/index.pcss'

class AddDataComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAdd: false
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ showAdd: nextProps.showAdd })
  }
  hideModel() {
    this.setState({ showAdd: false })
  }
  confirmForm() {
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.error(err)
      }
      this.props.onAddData(values)
    })
  }
  render() {
    let { field, title } = this.props
    let { getFieldDecorator } = this.props.form
    let { showAdd } = this.state
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 }}
    return <Modal title={'添加' + title} centered visible={showAdd} onCancel={this.hideModel.bind(this)} onOk={this.confirmForm.bind(this)}>
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

const AddComp = Form.create({ name: 'horizontal_login' })(AddDataComp)
export default AddComp
