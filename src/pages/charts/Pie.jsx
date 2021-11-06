import React, { Component } from "react";
import ReactECharts from "echarts-for-react";

export default class Pie extends Component {
  state = {
    sales: [5, 20, 31, 10, 10, 20],
    stores: [4, 25, 30, 14, 5, 22],
  };

  getOption = () => {
    const options = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "衬衫" },
            { value: 735, name: "羊毛衫" },
            { value: 580, name: "雪纺衫" },
            { value: 484, name: "裤子" },
            { value: 300, name: "高跟鞋" },
          ],
        },
      ],
    };
    return options;
  };

  render() {
    return (
      <ReactECharts
        option={this.getOption()}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
      />
    );
  }
}
