const m = [
    {
        index: "0",
        name: "首页",
        route: "/",
        disabled: false,
        children: [],
    },
    {
        index: "1",
        name: "文章列表",
        route: "/article",
        disabled: false,
        children: [],
    },
    {
        index: "2",
        name: "练习",
        icon: "el-icon-location",
        children: [
            {
                index: "10",
                name: "export",
                route: "/export",
                disabled: false,
            },
            {
                index: "11",
                name: "ali-icon",
                route: "/aliicon",
                disabled: false,
            },
            {
                index: "12",
                name: "three demo",
                route: "/threedemo",
                disabled: false,
            },
            {
                index: "13",
                name: "three demo2",
                route: "/threedemo2",
                disabled: false,
            },
            {
                index: "14",
                name: "slot",
                route: "/slot",
                disabled: false,
            },
            {
                index: "15",
                name: "vuexaxios",
                route: "/vuexaxios",
                disabled: false,
            },
            {
                index: "16",
                name: "keyframes",
                route: "/keyframes",
                disabled: false,
            },
            {
                index: "17",
                name: "trix",
                route: "/trix",
                disabled: false,
            },
            {
                index: "18",
                name: "bimface",
                route: "/bimface",
                disabled: false,
            },
            {
                index: "19",
                name: "todolist",
                route: "/todolist",
                disabled: false,
            },
            {
                index: "20",
                name: "styleclass",
                route: "/styleclass",
                disabled: false,
            },
            {
                index: "21",
                name: "numberbox",
                route: "/numberbox",
                disabled: false,
            },
            {
                index: "22",
                name: "elementui",
                route: "/elementui",
                disabled: false,
            },
            {
                index: "23",
                name: "clearfloat原理",
                route: "/clearfloat",
                disabled: false,
            },
            {
                index: "24",
                name: "iviewpractice",
                route: "/iviewpractice",
                disabled: false,
            },
            {
                index: "25",
                name: "draglist",
                route: "/draglist",
                disabled: false,
            },
            {
                index: "26",
                name: "dragelm",
                route: "/dragelm",
                disabled: false,
            },
            {
                index: "27",
                name: "highcharts",
                route: "/highcharts",
                disabled: false,
            },
            {
                index: "28",
                name: "formvalidate",
                route: "/formvalidate",
                disabled: false,
            },
            {
                index: "29",
                name: "echarts",
                route: "/echarts",
                disabled: false,
            },
        ],
    },
    {
        index: "3",
        name: "算法",
        icon: "el-icon-help",
        children: [
            {
                index: "21",
                name: "洗牌算法",
                route: "/shuffle",
                disabled: false,
            },
            {
                index: "22",
                name: "冒泡排序",
                route: "/bubblesort",
                disabled: false,
            },
            {
                index: "23",
                name: "快速排序",
                route: "/quicksort",
                disabled: false,
            },
        ],
    },
    {
        index: "4",
        name: "一个被禁用的菜单",
        route: "/",
        disabled: true,
        children: [],
    },
];
export default m;
