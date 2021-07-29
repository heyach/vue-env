const Home = () => import("@/pages/Home")
const Login = () => import("@/pages/Login")
const Error404 = () => import("@/pages/404")
const TodoList = () => import("@/pages/practices/TodoList")
const StyleClass = () => import("@/pages/practices/StyleClass")
const VuexAxios = () => import("@/pages/practices/VuexAxios")
const NumberBox = () => import("@/pages/practices/NumberBox")
const Slot = () => import("@/pages/practices/Slot")
const ElementUi = () => import("@/pages/practices/ElementUi")
const AliIcon = () => import("@/pages/practices/AliIcon")
const Shuffle = () => import("@/pages/algorithm/Shuffle")
const BubbleSort = () => import("@/pages/algorithm/BubbleSort")
const QuickSort = () => import("@/pages/algorithm/QuickSort")
const ClearFloat = () => import("@/pages/practices/ClearFloat")
const IviewPractice = () => import("@/pages/practices/IviewPractice")
const Trix = () => import("@/pages/practices/Trix")
const Export = () => import("@/pages/practices/Export")
const ThreeDemo = () => import("@/pages/practices/ThreeDemo")
const ThreeDemo2 = () => import("@/pages/practices/ThreeDemo2")
const DragElm = () => import("@/pages/practices/DragElm")
const Keyframes = () => import("@/pages/practices/Keyframes")
const Echarts = () => import("@/pages/practices/Echarts")
const DragList = () => import("@/pages/practices/DragList")
const Bimface = () => import("@/pages/practices/Bimface")

// article
const Article = () => import("@/pages/article/Article")
const ArticleList = () => import("@/pages/article/List")
const ReleaseArticle = () => import("@/pages/article/Release")
const ArticleDetail = () => import("@/pages/article/Detail")

// user
const User = () => import("@/pages/user/User")
const MyArticle = () => import("@/pages/user/MyArticle")
const UserInfo = () => import("@/pages/user/UserInfo")


export default {
  Home,
  Login,
  Error404,
  TodoList,
  StyleClass,
  VuexAxios,
  Slot,
  ElementUi,
  NumberBox,
  AliIcon,
  Shuffle,
  BubbleSort,
  QuickSort,
  ClearFloat,
  Article,
  ArticleList,
  ReleaseArticle,
  ArticleDetail,
  User,
  MyArticle,
  UserInfo,
  IviewPractice,
  Trix,
  ThreeDemo,
  ThreeDemo2,
  Export,
  DragElm,
  Keyframes,
  Echarts,
  DragList,
  Bimface
}