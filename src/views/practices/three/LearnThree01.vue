<template>
    <div class="three-demo" ref="stage"></div>
</template>
<script>
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Color,
    AxesHelper,
    PlaneGeometry,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    AmbientLight,
    SpotLight,
    SphereGeometry,
} from "three";

export default {
    data() {
        return {
        };
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            // 初始化场景
            var scene = new Scene()
            // 初始化相机
            var camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
            // 初始化渲染器
            var renderer = new WebGLRenderer()

            // 将背景色设置为黑色
            renderer.setClearColor(new Color(0x000000))
            // 渲染场景设置为窗口大小
            renderer.setSize(window.innerWidth, window.innerHeight)
            // 开启阴影效果
            renderer.shadowMap.enabled = true

            // 坐标轴辅助线
            // var axes = new AxesHelper(20)
            // scene.add(axes)

            // 创建一个平台，用基础材质设为灰色，宽高60*20，开启阴影效果
            var planeGeometry = new PlaneGeometry(60, 20)
            var planeMaterial = new MeshBasicMaterial({ color: 0xAAAAAA })
            var plane = new Mesh(planeGeometry, planeMaterial)
            plane.receiveShadow = true
            plane.rotation.x = -0.5 * Math.PI
            plane.position.set(15, 0, 0)
            scene.add(plane)
            
            // 创建一个正方体，设置材质，位置和颜色
            var cubeGeometry = new BoxGeometry(4, 4, 4)
            var cubeMaterial = new MeshBasicMaterial({
                color: 0xFF0000,
                wireframe: true
            })
            var cube = new Mesh(cubeGeometry, cubeMaterial)
            cube.castShadow = true
            cube.position.set(-4, 3, 0)
            scene.add(cube)

            // 创建一个球体，设置材质，位置和颜色
            var sphereGeometry = new SphereGeometry(4, 20, 20)
            var sphereMaterial = new MeshBasicMaterial({
                color: 0x7777FF,
                wireframe: true
            })
            var sphere = new Mesh(sphereGeometry, sphereMaterial)
            sphere.castShadow = true
            sphere.position.set(20, 4, 2)
            scene.add(sphere)

            // 设置相机位置和瞄准点，默认是瞄向(0, 0, 0)
            camera.position.set(-30, 40, 30)
            camera.lookAt(scene.position)

            // 添加光源和阴影
            // 环境光源
            var ambientLight = new AmbientLight(0x353535)
            scene.add(ambientLight)

            // 聚光光源
            var spotLight = new SpotLight(0xffffff)
            spotLight.position.set(-10, 20, -5)
            spotLight.castShadow = true
            scene.add(spotLight)

            // 输出渲染结果
            this.$refs.stage.appendChild(renderer.domElement);
            
            // renderer.render(scene, camera)

            var step = 0

            render()

            // 用requestAnimationFrame完成动画，改变物体位置，实时更新
            function render() {
                cube.rotation.x += 0.02
                cube.rotation.y += 0.02
                cube.rotation.z += 0.02

                step += 0.03
                sphere.position.x = 20 + (10 * (Math.cos(step)))
                sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)))

                window.requestAnimationFrame(render)

                renderer.render(scene, camera)
            }
            
            // 窗口调整后，实时更新相机渲染比
            window.addEventListener('resize', function() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }, false);
        }
    },
};
</script>
<style lang="less">
.three-demo {
    position: absolute;
    top: 0;
    width: 100%;
    margin: 0;
    height: 100%;
    padding: 0;
    overflow: hidden;
}
</style>
