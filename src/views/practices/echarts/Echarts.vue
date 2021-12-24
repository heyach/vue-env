<template>
    <div class="echarts-container">
        <div class="block-item">
            <div class="intro">
                <p>堆叠柱状图</p>
            </div>
            <div class="com-item">
                <div id="zhu-container"></div>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>时间轴格式自定义</p>
            </div>
            <div class="com-item">
                <div id="alarm-container"></div>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>环形嵌套比例图</p>
            </div>
            <div class="com-item">
                <div id="pie-container"></div>
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
            zhuData: [
                {
                    total: 1,
                    complete: 2,
                    abnormal: 0,
                    incidence: "0",
                    xname: "2021-07",
                    equTypeId: null,
                    processId: null,
                    executor: null,
                    inComplete: 0,
                },
                {
                    total: 2,
                    complete: 1,
                    abnormal: 0,
                    incidence: "0",
                    xname: "2021-08",
                    equTypeId: null,
                    processId: null,
                    executor: null,
                    inComplete: 0,
                },
                {
                    total: 3,
                    complete: 2,
                    abnormal: 0,
                    incidence: "0",
                    xname: "2021-09",
                    equTypeId: null,
                    processId: null,
                    executor: null,
                    inComplete: 0,
                },
                {
                    total: 4,
                    complete: 1,
                    abnormal: 0,
                    incidence: "0",
                    xname: "2021-10",
                    equTypeId: null,
                    processId: null,
                    executor: null,
                    inComplete: 0,
                },
                {
                    total: 2,
                    complete: 1,
                    abnormal: 0,
                    incidence: "0",
                    xname: "2021-11",
                    equTypeId: null,
                    processId: null,
                    executor: null,
                    inComplete: 0,
                },
                {
                    total: 1,
                    complete: 2,
                    abnormal: 0,
                    incidence: "0",
                    xname: "2021-12",
                    equTypeId: null,
                    processId: null,
                    executor: null,
                    inComplete: 0,
                },
            ],
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
                                dataDate: +new Date("2021-10-11 15:35:22"),
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
            datatype: "year",
        };
    },
    mounted() {
        this.init();
        this.initPie();
        this.initZhu(this.zhuData);
    },
    methods: {
        initZhu(data) {
            var chartDom = document.getElementById("zhu-container");
            var myChart = echarts.init(chartDom, "dark");
            var option = {
                backgroundColor: "rgba(255, 255, 255, 0)", // 背景色透明
                grid: {
                    left: "10px",
                    right: "10px",
                    bottom: "10px",
                    containLabel: true,
                },
                xAxis: {
                    type: "value",
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        length: 3
                    },
                },
                yAxis: {
                    type: "category",
                    splitLine: {
                        show: false,
                    },
                    axisTick: {
                        length: 3
                    },
                    data: data.map((item) => item.xname),
                },
                series: [
                    {
                        type: "bar",
                        stack: "total",
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    1,
                                    0,
                                    0,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(36, 143, 230, 0.8)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(36, 143, 230, 0.26)",
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                        // showBackground: true,
                        // backgroundStyle: {
                        //     color: "rgba(255, 255, 255, 0)",
                        //     borderWidth: 1,
                        //     borderColor: "rgba(36, 143, 230, 0.3)"
                        // },
                        emphasis: {
                            focus: "series",
                        },
                        data: data.map((item) => item.total),
                    },
                    {
                        type: "bar",
                        stack: "total",
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    1,
                                    0,
                                    0,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: "rgba(253, 162, 61, 0.7)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(253, 162, 61, 0.24)",
                                        },
                                    ],
                                    false
                                ),
                            },
                        },
                        // showBackground: true,
                        // backgroundStyle: {
                        //     color: "rgba(255, 255, 255, 0)",
                        //     borderWidth: 1,
                        //     borderColor: "rgba(253, 162, 61, 0.24)"
                        // },
                        emphasis: {
                            focus: "series",
                        },
                        data: data.map((item) => item.complete),
                    },
                ],
            };
            option && myChart.setOption(option, true);
        },
        initPie() {
            var chartDom = document.getElementById("pie-container");
            var myChart = echarts.init(chartDom, "dark");
            var data1 = [
                {
                    name: "本科",
                    value: 754,
                },
                {
                    name: "硕士",
                    value: 611,
                },
                {
                    name: "大专",
                    value: 400,
                },
                {
                    name: "博士",
                    value: 200,
                },
            ];
            var colorList2 = [
                {
                    c1: "rgba(46, 149, 246, 1)",
                    c2: "rgba(26, 85, 145, 1)",
                },
                {
                    c1: "rgba(249, 203, 25, 1)",
                    c2: "rgba(116, 92, 0, 1)",
                },
                {
                    c1: "rgba(0, 175, 121, 1)",
                    c2: "rgba(0, 95, 66, 1)",
                },
                {
                    c1: "rgba(237, 72, 94, 1)",
                    c2: "rgba(120, 0, 16, 1)",
                },
            ];
            var arrName = getArrayValue(data1, "name");
            var arrValue = getArrayValue(data1, "value");
            var sumValue = getsumValue(data1, "value");
            var optionData = getData(data1);

            function getsumValue(array, key) {
                let sum = 0;
                for (let i = 0; i < array.length; i++) {
                    sum = sum + array[i].value;
                }
                return sum;
            }

            function getArrayValue(array, key) {
                var key = key || "value";
                var res = [];
                if (array) {
                    array.forEach(function(t) {
                        res.push(t[key]);
                    });
                }
                return res;
            }

            function getData(data1) {
                var res = {
                    series: [],
                    yAxis: [],
                    formatter: [],
                };
                for (let i = 1; i <= data1.length; i++) {
                    res.series.push({
                        name: "设备",
                        type: "pie",
                        clockWise: true,
                        z: 2,
                        hoverAnimation: false,
                        radius: [73 - i * 15 + "%", 66 - i * 15 + "%"],
                        center: ["30%", "55%"],
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false,
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                    {
                                        offset: 0,
                                        color: colorList2[i - 1].c2,
                                    },
                                    {
                                        offset: 1,
                                        color: colorList2[i - 1].c1,
                                    },
                                ]),
                            },
                        },
                        data: [
                            {
                                value: data1[i - 1].value,
                                name: data1[i - 1].name,
                            },
                            {
                                value: sumValue - data1[i - 1].value,
                                name: "",
                                itemStyle: {
                                    color: "rgba(0,0,0,0)",
                                    borderWidth: 0,
                                },
                                tooltip: {
                                    show: false,
                                },
                                label: {
                                    show: false,
                                },
                                hoverAnimation: false,
                            },
                        ],
                    });
                    res.series.push({
                        name: "背景线",
                        type: "pie",
                        silent: true,
                        z: 1,
                        clockWise: true,
                        hoverAnimation: false,
                        radius: [73 - i * 15 + "%", 66 - i * 15 + "%"],
                        center: ["30%", "55%"],
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                            borderWidth: 5,
                        },
                        data: [
                            {
                                value: 100,
                                itemStyle: {
                                    color: "RGB(12,64,128)",
                                    borderWidth: 0,
                                },
                                tooltip: {
                                    show: false,
                                },
                                hoverAnimation: false,
                            },
                        ],
                    });
                    res.yAxis.push(data1[i - 1].name);
                }
                return res;
            }

            var option = {
                backgroundColor: "rgba(255, 255, 255, 0)", // 背景色透明
                grid: {
                    top: "15px",
                    left: "25px",
                    right: "25px",
                    bottom: "15px",
                    containLabel: true,
                },
                legend: {
                    bottom: 6,
                    icon: "rect",
                    orient: "vertical",
                    itemHeight: 10,
                    itemWidth: 10,
                    left: 800,
                    top: 200,
                    show: true,
                    data: arrName,
                    selectedMode: false,
                    textStyle: {
                        color: "#96F5F6",
                        fontSize: 16,
                    },
                    formatter: function(name) {
                        let tarValue;
                        for (var i = 0; i < 4; i++) {
                            if (data1[i].name == name) {
                                tarValue = data1[i].value;
                                break;
                            }
                        }
                        var p = Math.round((tarValue / sumValue) * 1000) / 10;
                        return `${name}     ${p}%`;
                    },
                },
                yAxis: [
                    {
                        type: "category",
                        inverse: true,
                        z: 3,
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                            interval: 0,
                            inside: false,
                            textStyle: {
                                color: "RGB(78,184,252)",
                                fontSize: 25,
                            },
                        },
                        data: optionData.yAxis,
                    },
                ],
                xAxis: [
                    {
                        show: false,
                        splitLine: {
                            show: false,
                        },
                    },
                ],
                series: optionData.series,
            };
            option && myChart.setOption(option, true);
        },
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
    #pie-container {
        width: 492px;
        height: 492px;
    }
    #zhu-container {
        width: 492px;
        height: 200px;
    }
}
</style>
