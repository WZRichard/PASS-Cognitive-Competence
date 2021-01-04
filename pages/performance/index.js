
const app = getApp()
import * as echarts from '../../components/ec-canvas/echarts';

//柱状象形图
function initChart1(chart,newList) {   

  var spirit = 'path://M-22.788,24.521c2.08-0.986,3.611-3.905,4.984-5.892 c-2.686,2.782-5.047,5.884-9.102,7.312c-0.992,0.005-0.25-2.016,0.34-2.362l1.852-0.41c0.564-0.218,0.785-0.842,0.902-1.347 c2.133-0.727,4.91-4.129,6.031-6.194c1.748-0.7,4.443-0.679,5.734-2.293c1.176-1.468,0.393-3.992,1.215-6.557 c0.24-0.754,0.574-1.581,1.008-2.293c-0.611,0.011-1.348-0.061-1.959-0.608c-1.391-1.245-0.785-2.086-1.297-3.313 c1.684,0.744,2.5,2.584,4.426,2.586C-8.46,3.012-8.255,2.901-8.04,2.824c6.031-1.952,15.182-0.165,19.498-3.937 c1.15-3.933-1.24-9.846-1.229-9.938c0.008-0.062-1.314-0.004-1.803-0.258c-1.119-0.771-6.531-3.75-0.17-3.33 c0.314-0.045,0.943,0.259,1.439,0.435c-0.289-1.694-0.92-0.144-3.311-1.946c0,0-1.1-0.855-1.764-1.98 c-0.836-1.09-2.01-2.825-2.992-4.031c-1.523-2.476,1.367,0.709,1.816,1.108c1.768,1.704,1.844,3.281,3.232,3.983 c0.195,0.203,1.453,0.164,0.926-0.468c-0.525-0.632-1.367-1.278-1.775-2.341c-0.293-0.703-1.311-2.326-1.566-2.711 c-0.256-0.384-0.959-1.718-1.67-2.351c-1.047-1.187-0.268-0.902,0.521-0.07c0.789,0.834,1.537,1.821,1.672,2.023 c0.135,0.203,1.584,2.521,1.725,2.387c0.102-0.259-0.035-0.428-0.158-0.852c-0.125-0.423-0.912-2.032-0.961-2.083 c-0.357-0.852-0.566-1.908-0.598-3.333c0.4-2.375,0.648-2.486,0.549-0.705c0.014,1.143,0.031,2.215,0.602,3.247 c0.807,1.496,1.764,4.064,1.836,4.474c0.561,3.176,2.904,1.749,2.281-0.126c-0.068-0.446-0.109-2.014-0.287-2.862 c-0.18-0.849-0.219-1.688-0.113-3.056c0.066-1.389,0.232-2.055,0.277-2.299c0.285-1.023,0.4-1.088,0.408,0.135 c-0.059,0.399-0.131,1.687-0.125,2.655c0.064,0.642-0.043,1.768,0.172,2.486c0.654,1.928-0.027,3.496,1,3.514 c1.805-0.424,2.428-1.218,2.428-2.346c-0.086-0.704-0.121-0.843-0.031-1.193c0.221-0.568,0.359-0.67,0.312-0.076 c-0.055,0.287,0.031,0.533,0.082,0.794c0.264,1.197,0.912,0.114,1.283-0.782c0.15-0.238,0.539-2.154,0.545-2.522 c-0.023-0.617,0.285-0.645,0.309,0.01c0.064,0.422-0.248,2.646-0.205,2.334c-0.338,1.24-1.105,3.402-3.379,4.712 c-0.389,0.12-1.186,1.286-3.328,2.178c0,0,1.729,0.321,3.156,0.246c1.102-0.19,3.707-0.027,4.654,0.269 c1.752,0.494,1.531-0.053,4.084,0.164c2.26-0.4,2.154,2.391-1.496,3.68c-2.549,1.405-3.107,1.475-2.293,2.984 c3.484,7.906,2.865,13.183,2.193,16.466c2.41,0.271,5.732-0.62,7.301,0.725c0.506,0.333,0.648,1.866-0.457,2.86 c-4.105,2.745-9.283,7.022-13.904,7.662c-0.977-0.194,0.156-2.025,0.803-2.247l1.898-0.03c0.596-0.101,0.936-0.669,1.152-1.139 c3.16-0.404,5.045-3.775,8.246-4.818c-4.035-0.718-9.588,3.981-12.162,1.051c-5.043,1.423-11.449,1.84-15.895,1.111 c-3.105,2.687-7.934,4.021-12.115,5.866c-3.271,3.511-5.188,8.086-9.967,10.414c-0.986,0.119-0.48-1.974,0.066-2.385l1.795-0.618 C-22.995,25.682-22.849,25.035-22.788,24.521z';
  var maxData = 100;
  console.log(newList)
const option = {
  tooltip: {
    confine: true,
    enterable: true,  //鼠标是否可以移动到tooltip区域内
    trigger: 'item',

  },
  xAxis: {
      max: maxData,
      splitLine: {show: false},
      offset: 10,
      axisLine: {
          lineStyle: {
              color: '#172451'
          }
      },
      axisLabel: {
          margin: 10
      }
  },
  yAxis: {
      data: ['P(计划)', 'A(注意力)', 'S(同时性)', 'S(继时性)'],
      inverse: true,
      axisTick: {show: false},
      axisLine: {show: false},
      axisLabel: {
          margin: 10,
          color: '#172451',
          fontSize: 13
      }
  },
  grid: {
      top: 'center',
      height: 200,
      left: 80,
      right: 80
  },
  series: [{
      // current data
      type: 'pictorialBar',
      symbol: spirit, 
      symbolRepeat: 'fixed',
      symbolMargin: '5%',
      symbolClip: true,
      symbolSize: 30,
      symbolBoundingData: maxData,
      itemStyle: {
          normal: {
              // opacity: 1
              color: '#1890ff'
          }
      },
      data:newList,
      markLine: {
          symbol: 'none',
          label: {
              formatter: 'max: {c}',
              position: 'start'
          },
          lineStyle: {
              color: '#172451',
              type: 'dotted',
              opacity: 0.2,
              width: 2
          },
          data: [{
              type: 'max'
          }]
      },
      z: 10
  }, {
      // full data
      type: 'pictorialBar',
      itemStyle: {
          normal: {
              color: '#1890ff',
              opacity: 0.4
          }
      },
      label: {
          show: true,
          formatter: function (params) {
             var score = params.value / maxData * 100
              if(score>=90){
                return "A";
              }else if(score<90&&score>=75)
              {
                return 'B';
              }else if(score<75&&score>=60)
              {
                return "C";
              }else{
                return "D";
              }
            //   return (params.value / maxData * 100).toFixed(1);
          },
          position: 'right',
          offset: [10, 0],
          color: '#172451',
          fontSize: 18
      },
      animationDuration: 0,
      symbolRepeat: 'fixed',
      symbolMargin: '5%',
      symbol: spirit, 
      symbolSize: 30,
      symbolBoundingData: maxData,
      data:newList,
      z: 5
  }]

};
  chart.setOption(option);
// return myChart;
}
//雷达图
function initChart2(chart,newList, originList, highestList, sysWidth) {   
  var r=120;
  if(sysWidth>=2.2){
    r=90;
  }else if(sysWidth<2.2&&sysWidth>1.3){
    r=120;
  }else{
    r=180;
  }
    console.log(newList)
    const option = {
      tooltip: {
        //雷达图的tooltip不会超出画布，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
        confine: true,
        enterable: true,  //鼠标是否可以移动到tooltip区域内
        trigger: 'item',
        formatter: function (params) {
          console.log(params.name)
          console.log(params.data)
          return params.name+'\n(计划)P: '+params.data.value[0]+'\n(注意力)A: '+params.data.value[1]+'\n(同时性)S: '+params.data.value[2]+'\n(继时性)S: '+params.data.value[3]
        }
      },
      legend: {
          data:['初次','最新','最高']
      },
      radar:[
        {
          shape: 'circle',
          name: {
            textStyle: {
                color: 'white',
                backgroundColor: '#000000',
                borderRadius: 5,
                padding: [3,3]
            }
          },
          splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: false,
         },
         splitLine: {
            lineStyle: {
              color: '#172451', // 设置网格的颜色
              opacity: 0.5
            },
          },
         axisLine: { // (圆内的几条直线)坐标轴轴线相关设置
            lineStyle: {
              color: '#172451',
              // 坐标轴线线的颜色。
              width: 1,
              // 坐标轴线线宽。
              type: 'solid',
              // 坐标轴线线的类型。
              opacity: 0.5
            }
          },
          indicator: [
            {text: 'P', max: 100,
            axisLabel: {
                show: true,
                fontSize: 12,
                color: '#172451',
                showMaxLabel: true, //不显示最大值，即外圈不显示数字30
                showMinLabel: false, //显示最小数字，即中心点显示0
            },
        },
            
            {text: 'A', max: 100},
            {text: 'S\n(同)', max: 100},
            {text: 'S\n(继)', max: 100}
        ],
        radius: r,
        splitNumber: 4,
        
      }

      ],
      series:[
        {
          type: 'radar',
          tooltip: {
              trigger: 'item',
              textStyle:{
                align:'left'
            }
          },
          symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
          symbolSize: 8, // 拐点的大小
          itemStyle: { // 折线拐点标志的样式。
            normal: { // 普通状态时的样式
                lineStyle: {
                    width: 3
                },
                opacity: 1
            },
            emphasis: { // 高亮时的样式
                lineStyle: {
                    width: 8
                },
                opacity: 1
            }
        },
          data: [
              {
                  value: originList,
                  name: '初次',
                  itemStyle: {
                    normal: {
                        // color: 'rgba(255,225,0,.3)',
                        color:'#E53A40',
                        lineStyle: {
                           color:'#E53A40',
                        },
                    },
                }
              } ,
              {
                    value:newList,
                    name: '最新',
                    itemStyle: {
                        normal: {
                            // color: 'rgba(60,135,213,.3)',
                            color:'#30A9DE',
                            lineStyle: {
                                width: 1,
                                // color: 'rgba(60,135,213,.3)',
                                color:'#30A9DE',
                            },
                        },
                    }
              },
                {
                    value: highestList,
                    name: '最高',
                    itemStyle: {
                        normal: {
                            // color: 'rgba(255,74,74,.3)',
                            color:'#F6B352',
                            lineStyle: {
                                width: 1,
                                // color: 'rgba(255,74,74,.3)',
                                color:'#F6B352',
                            },
                        },
                    },
                }
          ]
      }
      ]
  };
    chart.setOption(option);
  
}
Page({  
        data: {
          showModalStatus: false,
          imgSrc:"https://qbkeass.cn/images/level/level-info.png",
          ec1: {
                lazyLoad: true //初始化加载
            },
          ec2: {
                lazyLoad: true
            },
          timer:'', 
          reTest:0,
          passAnalysis:[], 
          passInfo:[
            {
              id:0,
              name:'计划能力',
              game1:'【计划连接】',
              game2:'【视觉搜索】',
              
          },
          {
            id:1,
            name:'注意力',
            game1:'【颜色判别】',
            game2:'【接受的注意】',
           },
           {
            id:2,
            name:'同时性加工',
            game1:'【矩阵问题】',
            game2:'【水果配对】',
           
           },
           {
            id:3,
            name:'继时性加工',
            game1:'【数字回忆】',
            game2:'【句子问题】',
           },
        ]  

        },
      onLoad: function (options) {
          var _this = this;

          this.setData({                    //每隔一分钟刷新一次
              timer: setInterval(function () {
                      wx.request({
                        url: 'https://qbkeass.cn/pass/getNew.php',
                        data: {
                          'wx_id' : app.globalData.openid
                        },
                        method: 'GET',
                        header:{
                          'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
                        },
                        success: function(res){
                          var newlist = []
                          newlist.push(parseInt(res.data.p))
                          newlist.push(parseInt(res.data.a))
                          newlist.push(parseInt(res.data.s1))
                          newlist.push(parseInt(res.data.s2))
                          app.globalData.newList = newlist
                          _this.init_one(newlist);
                        }
                      })
                      wx.request({
                        url: 'https://qbkeass.cn/pass/getBest.php',
                        data: {
                          'wx_id' : app.globalData.openid
                        },
                        method: 'GET',
                        header:{
                          'content-type': 'application/x-www-form-urlencoded;charset=utf-8' 
                        },
                        success: function(res){
                          var bestlist = []
                          bestlist.push(parseInt(res.data.p))
                          bestlist.push(parseInt(res.data.a))
                          bestlist.push(parseInt(res.data.s1))
                          bestlist.push(parseInt(res.data.s2))
                          app.globalData.highestList = bestlist
                        }
                      })
                      _this.init_two(app.globalData.newList,app.globalData.originList, app.globalData.highestList,app.globalData.sysWidth);
                      _this.init_analyse(app.globalData.newList,app.globalData.originList, app.globalData.highestList)
                  }, 60000),
          })
      },
      onReady: function () {               //这一步是一定要注意的
          this.oneComponent = this.selectComponent('#mychart-dom-bar1');  
          this.twoComponent = this.selectComponent('#mychart-dom-bar2');
          this.init_one(app.globalData.newList),
          this.init_two(app.globalData.newList,app.globalData.originList,app.globalData.highestList,app.globalData.sysWidth)
          this.init_analyse(app.globalData.newList,app.globalData.originList, app.globalData.highestList,)
          console.log(this.data.passAnalysis)
      },
      onUnload: function () {
          clearInterval(this.data.timer)
      },
      init_one: function (newList) {           //初始化第一个图表
          this.oneComponent.init((canvas, width, height, dpr) => {
              const chart = echarts.init(canvas, null, {
                  width: width,
                  height: height,
                  devicePixelRatio: dpr 
              });
              initChart1(chart, newList)
              this.chart = chart;
              return chart;
          });
        },
        init_two: function (newList,originList, highestList,sysWidth) {        //初始化第二个图表
          this.twoComponent.init((canvas, width, height, dpr) => {
              const chart = echarts.init(canvas, null, {
                  width: width,
                  height: height,
                  devicePixelRatio: dpr 
              });
              initChart2(chart, newList,originList, highestList,sysWidth)
              this.chart = chart;
              return chart;
          });
      },
      init_analyse: function(newList, originList, highestList){
        var passJson = [];
        for(var i=0; i<4;i++){
          var score = newList[i];
          var level = this.getLevel(score);
          var comment1, comment2, passAdvice;
          var row = {};
          if(score-originList[i]>7){
            comment1 = '有所进步';
          }else if(Math.abs(score-originList[i])<=7){
            comment1 = '基本保持原有水平';
          }else{
            comment1 = '有所退步';
          }
          if(score-highestList[i]>7){
            comment2 = '达到新的高度，超越自己';
          }else if(Math.abs(score-highestList[i])<=7){
            comment2 = '基本保持原有水平';
          }else{
            comment2 = '有所退步';
          }
          if(level=='A'){
            passAdvice = '这项能力「非常优秀」请继续保持！相信你在这个能力的发展上一定有自己的心得';
          }else if(level=='B')
          {
            passAdvice = '这项能力「较为优秀」，希望探险者继续努力，更上一层楼！';
          }else if(level=='C')
          {
            passAdvice = '这项能力「比较一般」，需要探险者付出比较多的汗水与精力！请多加练习'+this.data.passInfo[i].game1+'、'+this.data.passInfo[i].game2+'，提高能力！';
          }else{
            passAdvice = '这项能力「较弱」，但不要灰心，多加练习'+this.data.passInfo[i].game1+'、'+this.data.passInfo[i].game2+'，提升能力等级！';
          }
          console.log(score);
          row.id = i;
          row.score = score;
          row.level = level;
          row.comment1 = comment1;
          row.comment2 = comment2;
          row.passAdvice = passAdvice;
          passJson.push(row);
        }
        this.setData({
          passAnalysis:passJson,
        })
      },
      getLevel(score){
        if(score>=90){
          return "A";
        }else if(score<90&&score>=75)
        {
          return 'B';
        }else if(score<75&&score>=60)
        {
          return "C";
        }else{
          return "D";
        }
      },
 
   powerDrawer: function (e) {
          var currentStatu = e.currentTarget.dataset.statu;
          this.util(currentStatu)
  },
  //模块弹窗设置
  util: function (currentStatu) {
          /* 动画部分 */
          // 第1步：创建动画实例   
          var animation = wx.createAnimation({
            duration: 200,  //动画时长  
            timingFunction: "linear", //线性  
            delay: 0  //0则不延迟  
          });
          // 第2步：这个动画实例赋给当前的动画实例  
          this.animation = animation;
          // 第3步：执行第一组动画  
          animation.opacity(0).rotateX(-100).step();
          // 第4步：导出动画对象赋给数据对象储存  
          this.setData({
            animationData: animation.export()
          })
           // 第5步：设置定时器到指定时候后，执行第二组动画  
        setTimeout(function () {
            // 执行第二组动画  
            animation.opacity(1).rotateX(0).step();
            // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
            this.setData({
              animationData: animation
            })
            //关闭  
            if (currentStatu == "close") {
              this.setData(
                {
                  showModalStatus: false
                }
              );
            }
          }.bind(this), 200)
      
          // 显示  
          if (currentStatu == "open") {
            this.setData(
              {
                showModalStatus: true
              }
            );
          }
  }
})



