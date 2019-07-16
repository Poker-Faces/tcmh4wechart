import React from 'react';
import { Carousel, WingBlank, Tabs, WhiteSpace, ListView } from 'antd-mobile';
import ListViewExample from './ListViewExample';
import router from 'umi/router';
import { queryUserList } from '@/services/api';

const tabs = [{ title: '养生' }, { title: '保健' }, { title: '医药' }, { title: '疾病' }];

export default class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }

  goDetail = newsId => {
    router.push('/');
  };

  setRow = (rowData, sectionID, rowID) => {
    console.log(rowData);
    return (
      <div
        key={rowID}
        style={{ padding: '0 15px' }}
        onClick={() => this.goDetail(rowData.userName)}
      >
        <div style={{ display: 'flex', padding: '15px 0' }}>
          <img style={{ height: '64px', marginRight: '15px' }} src={rowData.img} alt="" />
          <div style={{ lineHeight: 1.2 }}>
            <div
              style={{
                marginBottom: '8px',
                fontWeight: 'bold',
                textAlign: 'left',
                lineHeight: 1.3,
              }}
            >
              {rowData.userName}
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.3 }}>
              {rowData.userCompany}-{rowID}
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderContent = tab => {
    for (let i = 0; i < tabs.length; i++) {
      if (tab.title === tabs[i].title) {
        return (
          <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <ListViewExample
              index={i + 1}
              row={() => this.setRow}
              listName="userList"
              queryListFetch={queryUserList}
              height={0.62}
            />
          </div>
        );
      }
    }
  };

  render() {
    return (
      <div>
        <Carousel
          autoplay={true}
          infinite
          slideWidth={0.9}
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        <WhiteSpace />
        <Tabs tabs={tabs} initialPage={0} animated={true} usePaged={true}>
          {this.renderContent}
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}
