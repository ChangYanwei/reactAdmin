import React, { Component } from "react";
import ReactECharts from "echarts-for-react";
import { Card, Button } from "antd";

export default class Bar extends Component {
  state = {
    sales: [5, 20, 31, 10, 10, 20],
    stores: [4, 25, 30, 14, 5, 22],
  };

  // 更新柱状图数据
  update = () => {
    this.setState(state => ({
      sales: state.sales.map(item => item - 1),
      stores: state.stores.reduce((pre, item) => {
        pre.push(item + 1);
        return pre;
      }, []),
    }));
  };

  getOption = (sales, stores) => {
    const options = {
      title: {
        text: "ECharts 图表",
      },
      tooltip: {},
      legend: {
        data: ["销量", "库存"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: sales,
        },
        {
          name: "库存",
          type: "bar",
          data: stores,
        },
      ],
    };
    return options;
  };

  render() {
    const title = (
      <Button type="primary" onClick={this.update}>
        更新
      </Button>
    );
    const { sales, stores } = this.state;
    return (
      <Card title={title}>
        <ReactECharts
          option={this.getOption(sales, stores)}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
        />
      </Card>
    );
  }
}
