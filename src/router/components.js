
// common
const Home = () => import("@/views/Home");
const Login = () => import("@/views/Login");
const Error404 = () => import("@/views/404");

// algorithm
const Shuffle = () => import("@/views/algorithm//shuffle/Shuffle");
const BubbleSort = () => import("@/views/algorithm/sort/BubbleSort");
const QuickSort = () => import("@/views/algorithm/sort/QuickSort");

// practice
const MyExport = () => import("@/views/practices/export/MyExport");
const AliIcon = () => import("@/views/practices/aliicon/AliIcon");
const ThreeDemo = () => import("@/views/practices/three/ThreeDemo");
const ThreeDemo2 = () => import("@/views/practices/three/ThreeDemo2");
const Slot = () => import("@/views/practices/slot/Slot");
const VuexAxios = () => import("@/views/practices/axios/VuexAxios");
const Keyframes = () => import("@/views/practices/keyframes/Keyframes");
const Trix = () => import("@/views/practices/trix/Trix");
const Bimface = () => import("@/views/practices/bimface/Bimface");
const TodoList = () => import("@/views/practices/todolist/TodoList");
const StyleClass = () => import("@/views/practices/styleclass/StyleClass");
const NumberBox = () => import("@/views/practices/numberbox/NumberBox");
const ElementUi = () => import("@/views/practices/elementui/ElementUi");
const ClearFloat = () => import("@/views/practices/clearfloat/ClearFloat");
const IviewPractice = () => import("@/views/practices/iview/IviewPractice");
const DragElm = () => import("@/views/practices/drag/DragElm");
const Echarts = () => import("@/views/practices/echarts/Echarts");
const DragList = () => import("@/views/practices/drag/DragList");
const GoodsList = () => import("@/views/practices/goodslist/GoodsList");

// article
const Article = () => import("@/views/article/Article");
const ArticleList = () => import("@/views/article/List");
const ReleaseArticle = () => import("@/views/article/Release");
const ArticleDetail = () => import("@/views/article/Detail");

// user
const User = () => import("@/views/user/User");
const MyArticle = () => import("@/views/user/MyArticle");
const UserInfo = () => import("@/views/user/UserInfo");

export default {
    // common
    Home,
    Login,
    Error404,
    
    // user
    User,
    MyArticle,
    UserInfo,

    // article
    Article,
    ArticleList,
    ReleaseArticle,
    ArticleDetail,

    // algorithm
    Shuffle,
    BubbleSort,
    QuickSort,

    // practice
    MyExport,
    AliIcon,
    ThreeDemo,
    ThreeDemo2,
    Slot,
    VuexAxios,
    Keyframes,
    Trix,
    Bimface,
    TodoList,
    StyleClass,
    ElementUi,
    NumberBox,
    ClearFloat,
    IviewPractice,
    DragElm,
    Echarts,
    DragList,
    GoodsList,
};
