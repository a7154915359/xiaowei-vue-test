<template>
  <div id="myChart" style="width: 100%;height: 260px"></div>
</template>

<script>
// vue文件中引入echarts工具
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
// 以下的组件按需引入
// tooltip组件
require('echarts/lib/component/tooltip')
//  title组件
require('echarts/lib/component/title')
// legend组件
require('echarts/lib/component/legend')
export default {
  name: 'CommonEcharts',
  data () {
    return {
      option: {
        legend: {
          data: ['招商银行']
        },
        xAxis: {
          // 还有其他的type，可以去官网喵两眼哦
          type: 'category',
          // x轴数据
          data: [],
          // x轴名称
          name: '日期',
          // x轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        yAxis: {
          type: 'value',
          // y轴名称
          name: '纵轴名称',
          // y轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        label: {},
        tooltip: {
          // axis   item   none三个值
          trigger: 'axis'
        },
        series: []
      }
    }
  },
  mounted: function () {
    let myChart = echarts.init(document.getElementById('myChart'))
    myChart.setOption(this.option)
    myChart.resize()
  },
  methods: {
    setechartsconfig: function (optionValue) {
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption(optionValue, true)
      myChart.resize()
    }
  }
}
</script>

<style scoped>
</style>
