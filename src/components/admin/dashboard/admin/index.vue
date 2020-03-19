<template>
  <div >
    <el-card class="box-card" v-loading="loading" style="margin-bottom: 10px">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold">系统资源使用情况</span>
        <el-button style="float: right;padding-bottom: 6px;" @click="getsysteminfo" icon="el-icon-refresh" size="small" type="primary">刷新</el-button>
      </div>
      <span>
        <div style="width: 25%;float: left">
          <el-progress class = "syspro" :show-text ="true" type="circle" :percentage="cpuUse" :color="colors"></el-progress>
          <div class="usetitle">cpu使用情况</div>
        </div>
        <div style="width: 25%;float: left">
          <el-progress class = "syspro" type="circle" :percentage="memUse" :color="colors"></el-progress>
          <div class="usetitle">内存使用情况</div>
        </div>
        <div style="width: 25%;float: left">
          <el-progress class = "syspro" :show-text ="true" type="circle" :percentage="diskUse" :color="colors"></el-progress>
          <div class="usetitle">磁盘使用情况</div>
        </div>
        <div style="width: 25%;float: left">
          <el-progress class = "syspro" type="circle" :percentage="percentage" :color="colors"></el-progress>
          <div class="usetitle">待开发</div>
        </div>
      </span>
    </el-card>
    <el-card class="box-card" v-loading="lineLoading">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold">系统资源使用时间轴</span>
        <el-button style="float: right;padding-bottom: 6px;" @click="getsystemlinechart" icon="el-icon-refresh" size="small" type="primary">刷新</el-button>
      </div>
      <Common-Echarts ref="CommonEcharts"></Common-Echarts>
    </el-card>
  </div>
</template>

<script>
import CommonEcharts from '@/components/common/CommonEcharts'
export default {
  components: {CommonEcharts},
  data () {
    return {
      cpuUse: 0,
      memUse: 0,
      diskUse: 0,
      percentage: 10,
      loading: false,
      lineLoading: false,
      colors: [
        {color: '#6f7ad3', percentage: 20},
        {color: '#1989fa', percentage: 30},
        {color: '#5cb87a', percentage: 70},
        {color: '#e6a23c', percentage: 80},
        {color: '#f56c6c', percentage: 90}
      ]
    }
  },
  mounted: function () {
    this.getsysteminfo()
    this.getsystemlinechart()
    this.percentage = 20
  },
  methods: {
    getsysteminfo () {
      this.loading = true
      this.cpuUse = 0
      this.memUse = 0
      this.diskUse = 0
      this.$axios.get('/systeminfo/useinfo').then(resp => {
        if (resp && resp.status === 200) {
          this.cpuUse = resp.data.data.cpuUse
          this.memUse = resp.data.data.memUse
          this.diskUse = resp.data.data.diskUse
          this.loading = false
        }
      })
    },
    getsystemlinechart () {
      this.lineLoading = true
      let lineChartConfig = {
        legend: {
          data: ['cpu', '内存', '磁盘']
        },
        xAxis: {
          // 还有其他的type，可以去官网喵两眼哦
          type: 'category',
          // x轴数据
          data: [],
          // x轴名称
          name: '时间',
          // x轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        yAxis: {
          type: 'value',
          // y轴名称
          name: '占用情况',
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
        }
      }
      this.$axios.get('/systeminfo/uselineinfo').then(resp => {
        if (resp && resp.status === 200) {
          lineChartConfig.xAxis.data = resp.data.data.lineTime
          let cpuUse = {
            name: 'cpu',
            data: resp.data.data.cpuLineUseVal,
            type: 'line'
          }
          let memUse = {
            name: '内存',
            data: resp.data.data.memLineUseVal,
            type: 'line'
          }
          let diskUse = {
            name: '磁盘',
            data: resp.data.data.diskLineUseVal,
            type: 'line'
          }
          lineChartConfig.series = [cpuUse, memUse, diskUse]
          this.$refs.CommonEcharts.setechartsconfig(lineChartConfig)
          this.lineLoading = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .syspro{
    margin-left: 50px;
    margin-right: 50px;
    display: inline-block;
  }
  .usetitle{
    height: 40px;
  }
</style>
