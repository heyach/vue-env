//使用node的path模块来处理项目路径
const path = require('path')

function webpackConfig() {
  return {
    //entry表示入口，webpack构建的第一步将从entry开始，是输入
    //类型可以是string array object
    entry: './app/main.js', //只有一个入口，入口只有一个文件
    entry: ['./app/main2.js', './app/main3.js'], //只有一个入口，入口有多个文件
    entry: {
      a: './app/main4.js',
      b: ['./app/main5.js', './app/main6.js']
      //有多个入口，入口有多个文件
    },
    //output配置webpack在一系列处理之后如何输出结果
    output: {
      //输出文件存放的目录，绝对路径，所以用path模块进行一次拼接
      //__dirname表示当前项目的根路径
      path: path.resolve(__dirname, 'dist'),
      //输出文件的名称
      filename: 'bundle.js', //完整静态名称
      filename: '[name].js', //不同的entry生成对应的文件名称
      filename: '[chunkhash:8].js', //根据文件内容生成的名称，长度为8位hash码
      //发布到线上的资源的url前缀，string类型
      publicPath: '/assets/', //放到指定目录下
      publicPath: '', //放到根目录下
      publicPath: 'https:cdn.xxx.com/', //放到cdn上
      //导出库的名称，string类型
      library: 'myLib',
      //导出库的类型，枚举类型，默认是var
      libraryTarget: 'umd',
      //是否包含有用的文件路径信息到代码里
      pathinfo: true,
      //chunk的文件信息
      chunkFilename: '[id].js',
      chunkFIlename: '[hash:8].js',
      //jsonp加载的回调函数名称
      jsonpFunction: 'myJsonpFunc',
      //生成sourceMap的名称
      sourceMapFilename: '[file].map',
      //异步加载跨域的资源使用方式
      crossOriginLoading: 'use-credentials',
      crossOriginLoading: 'anonymous',
      corssOriginLoading: false
    },
    //配置模块相关
    module: {
      //配置loader
      rules: [
        {
          test: /\.js$/, //正则匹配命中的文件
          //只会命中这里的文件，提升效率
          include: [
            path.resolve(__dirname, 'app')
          ],
          //忽略这里的文件
          exclude: [
            path.resolve(__dirname, 'node_modules')
          ],
          //使用哪些loader，从后向前执行，即从右向左
          use: [
            'style-loader', //直接使用名称
            {
              loader: 'css-loader',
              options: {}
            }, //对象方式，传参
          ]
        }
      ],
      //不解析和处理的模块
      noParse: [
        /special\.js/ //正则匹配
      ]
    },
    //devServer相关配置
    devServer: {
      //代理到后端服务接口
      proxy: {
        '/api': 'http: localhost:8080'
      },
      //配置devServer http服务器的文件根目录
      contentBase: false,
      //是否开启gzip压缩
      compress: true,
      //是否开发html5 history api网页
      historyApiFallback: true,
      //是否开启热更新
      hot: true,
      //是否开启https
      https: false,
      //是否启用缓存来提升构建速度
      cache: false,
      //是否开始
      watch: true,
      //监听模式选项
      watchOptions: {
        //不监听的文件，支持正则
        ignored: /node_nodules/,
        //监听到变化后，等300ms在执行动作，节流，防止文件更新太快，默认300ms
        aggregateTimeout: 300,
        //不停的询问文件是否有变化，默认1000
        poll: 1000
      }
    },
    //配置插件
    plugins: [
    ],
    //配置寻找模块的规则
    resolve: {
      //寻找模块的根目录，为array，默认为node_modules
      modules: [
        'node_modules',
        path.resolve(__dirname, 'app')
      ],
      //模块的后缀名
      extensions: ['.js', '.vue', '.json'],
      //模块别名
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.join(__dirname, './src/'),
      },
      //是否跟随文件的软连接去搜路径
      symlinks: true,
      //模块的描述文件
      descriptionFiles: ['package.json'],
      //模块的描述文件里描述入口文件的字段名
      mainFields: ['main'],
      //是否强制导入语句写明后缀
      enforceExtension: false
    }
  }
}
var webpackConfig = webpackConfig();
module.export = webpackConfig;

