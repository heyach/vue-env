<template>
    <div class="highcharts">
        <div class="block-item">
            <div class="intro">
                <p @click="updateChart">添加一条曲线</p>
                <p @click="updateChart2">删除刚才添加的曲线</p>
            </div>
            <div class="com-item">
                <div id="container"></div>
            </div>
        </div>
    </div>
</template>
<script>
import HighCharts from "highcharts";
export default {
    data() {
        return {
            chart: ""
        }
    },
    methods: {
        updateChart(){
            var n = {
                    name: "2008-2009 冬",
                    data: [
                        [Date.UTC(1970, 9, 18), 0],
                        [Date.UTC(1970, 9, 26), 0.2],
                        [Date.UTC(1970, 11, 1), 0.47],
                        [Date.UTC(1970, 11, 11), 0.55],
                        [Date.UTC(1970, 11, 25), 1.38],
                        [Date.UTC(1971, 0, 8), 1.38],
                        [Date.UTC(1971, 0, 15), 1.38],
                        [Date.UTC(1971, 1, 1), 1.38],
                        [Date.UTC(1971, 1, 8), 1.48],
                        [Date.UTC(1971, 1, 21), 1.5],
                        [Date.UTC(1971, 2, 12), 1.89],
                        [Date.UTC(1971, 2, 25), 2.0],
                        [Date.UTC(1971, 3, 4), 1.94],
                        [Date.UTC(1971, 3, 9), 1.91],
                        [Date.UTC(1971, 3, 13), 1.75],
                        [Date.UTC(1971, 3, 19), 1.6],
                        [Date.UTC(1971, 4, 25), 0.6],
                        [Date.UTC(1971, 4, 31), 0.35],
                        [Date.UTC(1971, 5, 7), 0],
                    ],
                }
            
            this.chart.addSeries(n)
        },
        updateChart2() {
            this.chart.series[1].remove();
        },
    },
    mounted() {
        this.chart = HighCharts.chart("container", {
            chart: {
                type: "spline",
            },
            title: {
                text: "某地积雪厚度监测",
            },
            subtitle: {
                text: "非规律性时间内的变化",
            },
            xAxis: {
                type: "datetime",
                title: {
                    text: null,
                },
            },
            colors: ["#6CF", "#39F", "#06C", "#036", "#000"],
            yAxis: {
                title: {
                    text: "积雪 厚度 (m)",
                },
                min: 0,
            },
            tooltip: {
                headerFormat: "<b>{series.name}</b><br>",
                pointFormat: "{point.x:%e. %b}: {point.y:.2f} m",
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true,
                    },
                },
            },
            series: [
                {
                    name: "2007-2008 冬",
                    data: [
                        [Date.UTC(1970, 9, 27), 0],
                        [Date.UTC(1970, 10, 10), 0.6],
                        [Date.UTC(1970, 10, 18), 0.7],
                        [Date.UTC(1970, 11, 2), 0.8],
                        [Date.UTC(1970, 11, 9), 0.6],
                        [Date.UTC(1970, 11, 16), 0.6],
                        [Date.UTC(1970, 11, 28), 0.67],
                        [Date.UTC(1971, 0, 1), 0.81],
                        [Date.UTC(1971, 0, 8), 0.78],
                        [Date.UTC(1971, 0, 12), 0.98],
                        [Date.UTC(1971, 0, 27), 1.84],
                        [Date.UTC(1971, 1, 10), 1.8],
                        [Date.UTC(1971, 1, 18), 1.8],
                        [Date.UTC(1971, 1, 24), 1.92],
                        [Date.UTC(1971, 2, 4), 2.49],
                        [Date.UTC(1971, 2, 11), 2.79],
                        [Date.UTC(1971, 2, 15), 2.73],
                        [Date.UTC(1971, 2, 25), 2.61],
                        [Date.UTC(1971, 3, 2), 2.76],
                        [Date.UTC(1971, 3, 6), 2.82],
                        [Date.UTC(1971, 3, 13), 2.8],
                        [Date.UTC(1971, 4, 3), 2.1],
                        [Date.UTC(1971, 4, 26), 1.1],
                        [Date.UTC(1971, 5, 9), 0.25],
                        [Date.UTC(1971, 5, 12), 0],
                    ],
                },
            ],
        });
    },
};
</script>
<style lang="less" scoped></style>
