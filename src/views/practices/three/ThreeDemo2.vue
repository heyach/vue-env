<template>
    <div class="three-demo" ref="stage"></div>
</template>
<script>
import Stats from "stats.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    PlaneBufferGeometry,
    Mesh,
    MeshBasicMaterial,
    DoubleSide,
    GridHelper,
    AmbientLight,
    AnimationMixer,
    Clock,
    Raycaster,
    Vector2,
    Object3D,
} from "three";

var rt = require("@/assets/skybox/rt.png");
var lf = require("@/assets/skybox/lf.png");
var up = require("@/assets/skybox/up.png");
var dn = require("@/assets/skybox/dn.png");
var bk = require("@/assets/skybox/bk.png");
var ft = require("@/assets/skybox/ft.png");
var box = require("@/assets/skybox/box.jpg");

export default {
    data() {
        return {
            scene: "",
            clock: "",
            camera: "",
            renderer: "",
            stats: "",
            gltfLoader: "",
            walkAction: "",
            orbitControls: "",
            animationMixer: "",
            // 动画是否暂停
            paused: false,
        };
    },
    mounted() {
        this.scene = new Scene();
        this.clock = new Clock();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer({ antialias: true });
        this.gltfLoader = new GLTFLoader();
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.animationMixer = new AnimationMixer(this.scene);

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.$refs.stage.appendChild(this.renderer.domElement);
        window.addEventListener("resize", () => this.onWindowResize());

        this.camera.position.set(5, 5, 5);

        this.stats = new Stats();
        this.stats.showPanel(0);
        this.$refs.stage.appendChild(this.stats.dom);

        const planeBufferGeometry = new PlaneBufferGeometry(100, 100);
        const plane = new Mesh(planeBufferGeometry, new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide }));
        plane.name = "plane";
        plane.rotation.x = -Math.PI / 2;
        this.scene.add(plane);
        this.scene.add(new GridHelper(100, 100));

        this.gltfLoader.load("/assets/Soldier.glb", (gltf) => {
            gltf.scene.name = "Soldier";
            gltf.scene.rotation.y = Math.PI;
            this.scene.add(gltf.scene);
            this.scene.add(new AmbientLight(0xffffff, 2));

            this.orbitControls.target.set(0, 1, 0);

            const animationClip = gltf.animations.find((animationClip) => animationClip.name === "Walk");
            this.walkAction = this.animationMixer.clipAction(animationClip);
            this.walkAction.play();
        });

        this.renderer.domElement.addEventListener("click", (event) => {
            const { offsetX, offsetY } = event;
            const x = (offsetX / window.innerWidth) * 2 - 1;
            const y = -(offsetY / window.innerHeight) * 2 + 1;
            const mousePoint = new Vector2(x, y);
            const raycaster = new Raycaster();
            // 设置鼠标位置和参考相机
            raycaster.setFromCamera(mousePoint, this.camera);
            // 鼠标点击对应的物体（所有鼠标映射到的物体，包括被遮挡的）
            const intersects = raycaster.intersectObjects(this.scene.children, true);
            // 过滤网格和地面
            const intersect = intersects.filter(
                (intersect) => !(intersect.object instanceof GridHelper) && intersect.object.name !== "plane"
            )[0];
            if (intersect && this.isClickSoldier(intersect.object)) {
                // 停止动画
                // this.walkAction.stop();
                // 暂停动画
                this.$Message.info(this.walkAction.paused ? "action" : "pause");
                this.walkAction.paused = !this.walkAction.paused;
            }
        });

        this.render();
    },
    methods: {
        isClickSoldier(object) {
            if (object.name === "Soldier") {
                return object;
            } else if (object.parent) {
                return this.isClickSoldier(object.parent);
            } else {
                return null;
            }
        },

        render() {
            this.animationMixer.update(this.clock.getDelta());

            this.renderer.render(this.scene, this.camera);

            this.orbitControls.update();
            window.requestAnimationFrame(() => this.render());
            this.stats.update();
        },

        onWindowResize() {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        },
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
