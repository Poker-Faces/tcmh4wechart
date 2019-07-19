import React from 'react';
import { Carousel, Tabs } from 'antd-mobile';
import ListViewExample from './ListViewExample';
import router from 'umi/router';
import { queryUserList } from '@/services/api';

export default class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      tabs: [
        { title: '养生', key: '1' },
        { title: '保健', key: '2' },
        { title: '医药', key: '3' },
        { title: '疾病', key: '4' },
      ],
      imgHeight: 176,
    };
  }

  goDetail = newsId => {
    router.push('/');
  };

  setRow = (rowData, sectionID, rowID) => {
    return (
      <div
        key={rowID}
        style={{ padding: '0 15px' }}
        onClick={() => this.goDetail(rowData.userName)}
      >
        <div style={{ display: 'flex', padding: '15px 0' }}>
          <img
            style={{ height: '64px', marginRight: '15px' }}
            src={
              'http://www.chinadaily.com.cn/hqzx/images/attachement/jpg/site385/20120924/00221918200911ca40e52b.jpg'
            }
            alt=""
          />
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
            <div style={{ textAlign: 'left', lineHeight: 1.3 }}>{rowData.userCompany}</div>
          </div>
        </div>
      </div>
    );
  };

  renderContent = (tab, index) => {
    return (
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          backgroundColor: '#fff',
        }}
      >
        {/*<div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>*/}
        <ListViewExample
          index={tab.key}
          row={() => this.setRow}
          listName="userList"
          queryListFetch={queryUserList}
          height={0.55}
        />
      </div>
    );
  };

  render() {
    const { data, imgHeight, tabs } = this.state;
    return (
      <div>
        <Carousel
          autoplay={true}
          infinite
          // slideWidth={0.9}
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
        >
          {data.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: imgHeight }}
            >
              <img
                // src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                src={`http://www.chinadaily.com.cn/hqzx/images/attachement/jpg/site385/20120924/00221918200911ca40e52b.jpg`}
                alt={val}
                style={{ width: '100%', verticalAlign: 'top' }}
                title={val}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        <Tabs tabs={tabs} initialPage={tabs[0].key} animated={true} prerenderingSiblingsNumber={0}>
          {this.renderContent}
        </Tabs>
      </div>
    );
  }
}
