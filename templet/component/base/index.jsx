import React, { Component } from 'react';
import { Button, Table, Pagination } from 'antd';
import ajax from 'common/utils/ajax.jsx';
import './index.styl';

const { Column } = Table;

class PredictionAdc extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
  }
  render() {
    // const FormItem = Form.Item;
    return <div className="predictionAdc-content">
      <div className="predictionAdc-table">
        <div className="predictionAdc">
          <div className="predictionAdc-time-content">
            <div className="time-content-left">
              <div className="content-left-title">
                <span className="mes-name">模型xx评估</span>
                <span className="mes-find">查看历史趋势</span>
              </div>
              <div className="content-left-body">
                <div className="predictionAdc-time">
                  <span className="time-lookOver-conent">本日</span>
                  <span className="time-number">{'100'}</span>
                  <span className="time-time">{'2018/01/01'}</span>
                </div>
                <span className="division-line"></span>
                <div className="predictionAdc-time">
                  <span className="time-lookOver-conent">最近七天</span>
                  <span className="time-number">{'100'}</span>
                  <span className="time-time">{'2018/01/01'}</span>
                </div>
              </div>
            </div>
            <div className="time-content-right">
              <div className="content-right-title">
                <span className="mes-name">模型xx评估</span>
                <span className="mes-find" >查看历史趋势</span>
              </div>
              <div className="content-right-body">
                <div className="predictionAdc-time">
                  <span className="time-lookOver-conent">本日</span>
                  <span className="time-number">{'100'}</span>
                  <span className="time-time">{'2018/01/01'}</span>
                </div>
                <span className="division-line"></span>
                <div className="predictionAdc-time">
                  <span className="time-lookOver-conent">最近七天</span>
                  <span className="time-number">{'100'}</span>
                  <span className="time-time">{'2018/01/01'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="predictionAdc-menu">
            <span className="predictionAdc-menu-title">最新模型数据</span>
            <span className="title-name-time">{'2018/01/01'}</span>
            <Button className="model-contrast" type="primary" >模型对比</Button>
          </div>
          <div className="predictionAdc-list-content">
            <Table pagination={false}
              className="table"
              hasBorder={false}
							dataSource={[]}>
							<Column title="xxx"
								dataIndex="SHEET ID"
								key="SHEET ID" />
							<Column title="xxx"
								dataIndex="Model"
								key="Model" />
							<Column title="xxx"
								dataIndex="xxx"
								key="CD-P" />
							<Column title="xxx"
								dataIndex="CD-M"
								key="CD-M"
							/>
              <Column title="xxx"
								dataIndex="LOGON_TIME"
								key="LOGON_TIME"
							/>
						</Table>
          </div>
        </div>
      </div>
      {this.state.totalPage ? <div className="predictionAdc-pages">
        <Pagination
          total={10}
          pageSize={1}
          showQuickJumper
          shape="arrow-only"
          current={1}
        />
      </div> : null}
    </div>
  }
}

export default PredictionAdc;
