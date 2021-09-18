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
import TimeFormat from "@/utils/TimeFormat";
export default {
    data() {
        return {
            chartData: {
                items: [
                    {
                        unit: "",
                        curveYaxisLowerRange: "",
                        curveYaxisUpperRange: "",
                        mpointId: 95895,
                        mpointName: "单值测点",
                        siteName: "芒果农污运营中心",
                        datype: "State",
                        ring: null,
                        year: null,
                        data: [
                            {
                                dataDate: +new Date("2021-08-01 05:35:22"),
                                dataValue: "1",
                                tag: null,
                                shift: null,
                                shiftsType: null,
                                startDT: null,
                                endDT: null,
                            },
                            {
                                dataDate: +new Date("2021-08-31 15:35:22"),
                                dataValue: "2",
                                tag: null,
                                shift: null,
                                shiftsType: null,
                                startDT: null,
                                endDT: null,
                            },
                        ],
                        sectionTotalVal: null,
                    },
                ],
            },
            datatype: "month",
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            var chartDom = document.getElementById("alarm-container");
            var myChart = echarts.init(chartDom, "dark");
            var option;
            var color = [
                "rgba(39, 129, 234, 1)",
                "rgba(25, 151, 151, 1)",
                "rgba(240, 150, 125, 1)",
                "rgba(72, 189, 109, 1)",
                "rgba(249, 161, 15, 1)",
                "rgba(18, 180, 171, 1)",
            ];
            console.log(TimeFormat.getStartDayOfWeek());
            let tformat = {
                min: "",
                max: "",
            };
            switch (this.datatype) {
                case "day": {
                    var nextDay = +new Date(TimeFormat.getTimeByPattern(new Date(), "yyyy-MM-dd")) + 1000 * 60 * 60 * 24;
                    tformat = {
                        min: TimeFormat.getTimeByPattern(new Date(), "yyyy-MM-dd"),
                        max: TimeFormat.getTimeByPattern(nextDay, "yyyy-MM-dd"),
                        interval: 3600 * 6 * 1000,
                    };
                    break;
                }
                case "week": {
                    tformat = {
                        min: TimeFormat.getStartDayOfWeek(),
                        max: TimeFormat.getEndDayOfWeek(),
                        interval: 3600 * 24 * 1000 * 2,
                    };
                    break;
                }
                case "month": {
                    var fd = TimeFormat.getStartDayOfMonth();
                    let i = 0;
                    while (new Date(fd).getDay() != 1) {
                        fd = +new Date(fd) + 1000 * 60 * 60 * 24;
                        i++;
                    }
                    tformat = {
                        // min: TimeFormat.getTimeByPattern(new Date(fd), "yyyy-MM-dd"),
                        min: TimeFormat.getStartDayOfMonth(),
                        max: TimeFormat.getEndDayOfMonth(),
                        interval: 3600 * 24 * 1000 * 1,
                        index: i,
                    };
                    break;
                }
                case "year": {
                    tformat = {
                        min: TimeFormat.getStartDayOfYear(),
                        max: TimeFormat.getEndDayOfYear(),
                        interval: 3600 * 24 * 1000 * 93,
                    };
                    break;
                }
                default: {
                    tformat = {
                        min: "",
                        max: "",
                    };
                }
            }

            let fseriesItem = [];
            this.chartData.items.forEach((item, index) => {
                var seriesItem = {
                    name: "",
                    type: "line",
                    smooth: true,
                    lineStyle: {
                        width: 1,
                    },
                    symbol: "circle", //设定为实心点
                    symbolSize: 8, //设定实心点的大小
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
                                color: color[index].slice(0, color[index].length - 3) + " 0.5)",
                            },
                        ]),
                    },
                    emphasis: {
                        focus: "series",
                    },
                    data: [],
                };
                seriesItem.name = item.mpointName;
                let newdata = [];
                item.data.forEach((item2) => {
                    newdata.push([item2.dataDate, item2.dataValue]);
                });
                seriesItem.data = newdata;
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
                    top: "15px",
                    left: "15px",
                    right: "15px",
                    bottom: "15px",
                    containLabel: true,
                },
                // legend: {
                //     data: this.chartData.items.map((item) => item.mpointName),
                //     top: 5,
                // },

                xAxis: {
                    type: "time",
                    boundaryGap: false,
                    splitLine: { show: false },
                    axisTick: {
                        interval: 7,
                        length: 3,
                    },
                    axisLabel: {
                        formatter: (value, index) => {
                            var date = new Date(value);
                            var texts = [TimeFormat.getTimeByPattern(date, "MM"), TimeFormat.getTimeByPattern(date, "dd")];
                            var s = "-";
                            switch (this.datatype) {
                                case "day": {
                                    texts = [TimeFormat.getTimeByPattern(date, "hh"), TimeFormat.getTimeByPattern(date, "ss")];
                                    s = ":";
                                    if (index === 0 || index === 4) {
                                        s = "-";
                                        texts = [
                                            TimeFormat.getTimeByPattern(date, "MM"),
                                            TimeFormat.getTimeByPattern(date, "dd"),
                                        ];
                                    }
                                    break;
                                }
                                case "week": {
                                    break;
                                }
                                case "month": {
                                    if (index === 0) {
                                        texts = [];
                                    }
                                    if (index % 7 === tformat.index) {
                                        texts = [
                                            TimeFormat.getTimeByPattern(date, "MM"),
                                            TimeFormat.getTimeByPattern(date, "dd"),
                                        ];
                                    } else {
                                        texts = [];
                                    }
                                    break;
                                }
                                case "year": {
                                    texts = [
                                        TimeFormat.getTimeByPattern(date, "yyyy"),
                                        TimeFormat.getTimeByPattern(date, "MM"),
                                    ];
                                    break;
                                }
                            }
                            return texts.join(s);
                        },
                    },
                    interval: tformat.interval,
                    min: tformat.min,
                    max: tformat.max,
                },
                yAxis: [
                    {
                        type: "value",
                        splitLine: { show: false },
                        interval: 1,
                    },
                ],
                series: fseriesItem,
            };
            option && myChart.setOption(option, true);
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
        width: 492px;
        height: 120px;
    }
}
</style>
