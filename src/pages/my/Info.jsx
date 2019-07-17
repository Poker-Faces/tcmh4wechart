import React from 'react';
import { List, InputItem, DatePicker, Button, Flex, Picker, ImagePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import * as ReactDOM from 'react-dom';

const Item = List.Item;

@createForm()
export default class Info extends React.Component {
  state = {
    files: [],
    multiple: false,
    sex: '1',
  };
  handleSubmit = () => {
    const {} = this.props.from;
  };

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };

  onAddImageClick = e => {
    // e.preventDefault();
    this.setState({
      files: [
        {
          url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
          id: '3',
        },
      ],
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const sex = [{ label: '男', value: '1' }, { label: '女', value: '2' }];
    return (
      <div>
        <form>
          <List style={{ margin: '5px 0', backgroundColor: 'white' }}>
            <Item
              arrow={'horizontal'}
              extra={
                <ImagePicker
                  files={this.state.files}
                  onChange={this.onChange}
                  onImageClick={this.onAddImageClick}
                  selectable={this.state.files.length < 1}
                  multiple={this.state.multiple}
                  disableDelete={false}
                  length={1}
                  style={{ width: '90px', borderRadius: '50%' }}
                />
              }
            >
              头像：
            </Item>
            <InputItem
              {...getFieldProps('password')}
              type="text"
              clear={true}
              placeholder="请输入"
              style={{ textAlign: 'right', paddingRight: '22px' }}
            >
              昵称：
            </InputItem>

            <DatePicker
              {...getFieldProps('dp', {
                initialValue: this.state.date,
                rules: [{ required: true, message: 'Must select a date' }],
              })}
              mode={'date'}
              title={'选择出生日期'}
            >
              <List.Item arrow="horizontal">生日：</List.Item>
            </DatePicker>

            <Picker
              data={sex}
              title={'选择性别'}
              cols={1}
              onOk={val => this.setState({ sex: val })}
              // value={this.state.sex}
              {...getFieldProps('sex', { initialValue: this.state.sex })}
            >
              <List.Item arrow="horizontal">性别：</List.Item>
            </Picker>
          </List>
        </form>
        <Button
          type="primary"
          style={{ margin: '70px auto', width: '200px' }}
          onClick={this.handleSubmit}
        >
          保存
        </Button>
      </div>
    );
  }
}
