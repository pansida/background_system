<template>
    <el-row class="mains">
      <el-col :span="8">
          <div class="grid-content bg-purple">
              <el-card class="box-card">
                  <div slot="header" class="clearfix user">
                    <img src="../assets/user.png" alt="" width="150" height="150">
                    <div class="username">
                      <p>Admin</p>
                      <span>超级管理员</span>
                  </div>
                  </div>
                  <div class="text item times">
                    <p>上次登录时间：<span>2022-11-8</span></p>
                    <p>上次登录地点：<span>武汉</span></p>
                  </div>
              </el-card>
          </div>
          <el-card class="box-card list">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column v-for="(item,index) in tableLabel" :key='index'
                  :prop="index"
                  :label="item"
                  width="auto">
                </el-table-column>
              </el-table>
          </el-card>

        </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light" style="margin-left:20px">
          <div class="order_list">
            <el-card v-for="data in countData" :key="data.name" class="orderList">
              <i :class="`icon el-icon-${data.icon}`" :style="{background:data.color}"></i>
              <div class="order">
                <p>￥{{data.value}}</p>
                <span>{{data.name}}</span>
              </div>
            </el-card>
          </div>
          <el-card style="height:280px">
            <!-- 折线图 -->
            <div ref="echarts0" style="height:280px"></div>
          </el-card>
          <div class="tu">
            <el-card>
              <div ref="echarts1" style="height:260px"></div>
            </el-card>
            <el-card>
              <div ref="echarts2" style="height:260px"></div>
            </el-card>
          </div>
        </div>
        </el-col>
    </el-row>
</template>

<script>
import * as echarts from 'echarts'
import {getData} from '../api'
export default {
    name:'HomePage',
    data() {
      return {
        tableLabel: {
                name: '课程',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
        countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
            ],
        tableData: [],
      };
    },
    mounted(){
      getData().then(({ data })=>{
        const { tableData,orderData,userData,videoData} = data.data
        this.tableData = tableData
        // 折线图
        const echarts0 = echarts.init(this.$refs.echarts0)
        const echarts0Options = {}
        const data0 = Object.keys(orderData.data[0])
        echarts0Options.tooltip = {}
        echarts0Options.legend = {data:data0}
        echarts0Options.xAxis = {data:data0}
        echarts0Options.yAxis = {}
        echarts0Options.series = []
        data0.forEach(key=>{
          echarts0Options.series.push({
            name:key,
            data:orderData.data.map(item=>item[key]),
            type:'line'
          })
        })
        echarts0.setOption(echarts0Options)
        // 树状图
        const echarts1 = echarts.init(this.$refs.echarts1)
        const echarts1Options = {}
        const data1 = userData.map(item=>item.date)
        echarts1Options.tooltip = {}
        echarts1Options.legend = {data:['新增用户','活跃用户']}
        echarts1Options.xAxis = {data: data1}
        echarts1Options.yAxis = {}
        echarts1Options.color = ["#2ec7c9", "#b6a2de"]
        echarts1Options.series = [
          {
            name:'新增用户',
            data:userData.map(item=>item.new),
            type:'bar'
          },
          {
            name:'活跃用户',
            data:userData.map(item=>item.active),
            type:'bar'
          }
        ]
        echarts1.setOption(echarts1Options)
        // 饼状图
        const echarts2 = echarts.init(this.$refs.echarts2)
        const echarts2Options = {}
        echarts2Options.tooltip = {}
        echarts2Options.series =[{
          type:'pie',
          data:[],
          radius: '60%'
        }
        ]
        videoData.forEach(item=>{
          echarts2Options.series[0].data.push({
            name:item.name,
            value:item.value
          })
        })
        echarts2.setOption(echarts2Options)






      })
    }
}
</script>

<style lang="less" scoped>

.grid-content{
  :deep(.el-card__header){
    display: flex;
    .user{
      display: flex;
      img{
        border-radius: 50%;
        margin-right: 40px;
      }
      .username{
        p{
          font-size: 32px;
          margin: 30px 0 20px 0;
        }
        span{
          color: #999999;
        }
      }
    }
  }
  :deep(.el-card__body){
    .times{
      p{
        color: #999999;
        span{
          margin-left: 60px;
        }
      }
    }
  }
}
.list{
  margin-top: 20px;
  height: 475px;
}
.order_list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  :deep(.el-card__body){
    display: flex;
    padding: 0;

  }
  :deep(.orderList){
    padding: 0;
    width: 32%;
    height: 80px;
    margin-bottom: 20px;
   i{
    width: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 30px;
      color: white;
    }
    .order{
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15px;
      p{
        font-size: 30px;
        margin-bottom: 10px;
        line-height: 30px;
        height: 30px;
      }
      span{
        font-size: 14px;
        color: #999;
        text-align: center;
      }
    }
  }
}
.tu{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 48%;
    height: 260px;
  }
}

</style>

