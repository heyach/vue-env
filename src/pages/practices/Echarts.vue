<template>
    <div class="echarts-container">
        <div class="block-item">
            <div class="intro">
                <p>22</p>
            </div>
            <div class="com-item">
                <div id="alarm-container"></div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
import testd from "../../mock/echartsdata.json";
export default {
    data() {
        return {};
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            var chartDom = document.getElementById("alarm-container");
            var myChart = echarts.init(chartDom, "dark");
            var option;
            console.log(testd);
            var color = [
                "rgba(39, 129, 234)",
                "rgba(25, 151, 151)",
                "rgba(240, 150, 125)",
                "rgba(72, 189, 109)",
                "rgba(249, 161, 15)",
                "rgba(18, 180, 171)",
            ];

            let fseriesItem = [];
            testd.items.forEach((item, index) => {
                var seriesItem = {
                    name: "",
                    type: "line",
                    smooth: true,
                    lineStyle: {
                        width: 1,
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: color[index],
                            },
                            {
                                offset: 1,
                                color: color[index],
                            },
                        ]),
                    },
                    emphasis: {
                        focus: "series",
                    },
                    data: [],
                };
                seriesItem.name = item.mpointName;
                seriesItem.areaStyle.opacity = Math.random();
                let newdata = [];
                item.data.forEach((item2) => {
                    newdata.push([item2.dataDate, item2.dataValue]);
                });
                // seriesItem.data = newdata;
                seriesItem.data = [];
                fseriesItem.push(seriesItem);
            });
            option = {
                color: color,
                backgroundColor: "rgba(255, 255, 255, 0)", // 背景色透明
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                    },
                },
                // title: {
                //     text: '暂无数据',
                //     left: 'center',
                //     top: 'center',
                //     textStyle: {
                //         color: '#fff',
                //         fontSize: 16,
                //         fontWeight: 400
                //     }
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    data: testd.items.map((item) => item.mpointName),
                    top: 20,
                },

                xAxis: {
                    type: "time",
                    boundaryGap: false,
                    splitLine: { show: false },
                },
                yAxis: [
                    {
                        type: "value",
                        splitLine: { show: false },
                    },
                ],
                series: fseriesItem,
            };
            option && myChart.setOption(option);
        },
    },
};
</script>
<style lang="less" scoped>
.echarts-container {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;

    .com-item {
        background: #000;
    }
    #alarm-container {
        width: 950px;
        height: 200px;
    }
}
</style>
