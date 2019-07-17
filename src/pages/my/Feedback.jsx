import React from 'react';
import { List, InputItem, DatePicker, Button, Flex, Picker, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
import * as ReactDOM from 'react-dom';

const Item = List.Item;

@createForm()
export default class Feedback extends React.Component {
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
            <TextareaItem
              {...getFieldProps('count')}
              rows={7}
              count={100}
              placeholder={'请填写您的反馈或者建议'}
            />

            <InputItem
              {...getFieldProps('password')}
              type="text"
              clear={true}
              placeholder="手机号码或者QQ"
            >
              联系方式：
            </InputItem>
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
