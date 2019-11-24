<template>
  <div class="home">
      <!-- 头部面包屑组件 -->
     <home-bread></home-bread>
     <div class="container">
        <div class="data">
          <div class="title">物料数据统计</div>
          <el-row :inline='true' style="margin-left:350px">
              <el-col :span="3" class="dayData">当日数据：</el-col>
              <el-col :span="3">10吨<span class="info">新增物料</span></el-col>
              <el-col :span="3">18<span class="info">新增订单</span></el-col>
              <el-col :span="3">999+<span class="info">新增项目</span></el-col>
          </el-row>
          <el-row :inline='true' style="margin-left:350px">
              <el-col :span="3" class="dayData">总数据：</el-col>
              <el-col :span="3">1000+<span class="info">使用人员</span></el-col>
              <el-col :span="3">1000+<span class="info">订单</span></el-col>
              <el-col :span="3">66666<span class="info">业务员</span></el-col>
          </el-row>
     </div>
      <div class="trend">
           <div ref="mian1"  style="width:100%;height:calc(100vh-90px);"></div>
      </div>
     </div>
      
      <div id="pieChart" style=" width: 600px; height: 370px;border:1px solid black;margin:-500px auto"></div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components:{
  },
   mounted(){
       
         this.chartFn()
    },
  methods:{
        chartFn(){
            // 基于准备好的dom，初始化echarts实例
            var pieChart = this.$echarts.init(document.getElementById('pieChart'));
            pieChart.setOption({
                title:{
                    text:'物料饼图', //标题
                    subtext: '物料生产',  //副标题
                    x:'center'  // 位置
                },
                legend: {
                    orient: 'vertical', //图例列表的布局朝向。
                    left: 'left', //距离左侧的距离
                    data: ['热线电话','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie', //类型
                        radius : '60%', //饼图的半径
                        center: ['50%', '60%'], //饼图位置的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
                        data:[
                            {value:335, name:'热血电话'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
                    }
                ]
            })
        }
  }
}
</script>

<style lang="stylus" scoped>
 .container
   width:100%;
   padding:10px;
  .title
   font-size:20px;
   text-align:center;
   width:100%;
   line-height:30px;
   margin-bottom:20px;
  .el-col
    background-color:#EBEEF5;
    margin:5px 10px;
    line-height:35px;
    border-radius:5px;
    text-align:center;
    overflow:hidden;
    .info 
      font-size:12px;
      color:grey;
      margin-left:5px;
  .dayData 
    background-color:#409EFF;
   .trend 
     width:80%;
     height:450px;
     margin: 50px auto;
</style>