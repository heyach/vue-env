<template>
    <div class="three-demo" ref="stage"></div>
</template>
<script>
import Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    TextureLoader,
    DoubleSide,
} from "three";

var rt = require("../../assets/skybox/rt.png");
var lf = require("../../assets/skybox/lf.png");
var up = require("../../assets/skybox/up.png");
var dn = require("../../assets/skybox/dn.png");
var bk = require("../../assets/skybox/bk.png");
var ft = require("../../assets/skybox/ft.png");
var box = require("../../assets/skybox/box.jpg");
export default {
    data() {
        return {
            scene: "",
            camera: "",
            renderer: "",
            stats: "",
        };
    },
    mounted() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.$refs.stage.appendChild(this.renderer.domElement);
        window.addEventListener("resize", () => this.onWindowResize());

        let textureLoader = new TextureLoader();

        let boxTexture = textureLoader.load(box);

        let boxGeometry = new BoxGeometry(1, 1, 1);
        let meshBasicMaterial = new MeshBasicMaterial({ map: boxTexture, side: DoubleSide });
        let mesh = new Mesh(boxGeometry, meshBasicMaterial);
        mesh.name = "box";

        let skyboxGeometry = new BoxGeometry(200, 200, 200);
        let skyboxMaterials = [
            new MeshBasicMaterial({ map: textureLoader.load(rt), side: DoubleSide }),
            new MeshBasicMaterial({ map: textureLoader.load(lf), side: DoubleSide }),
            new MeshBasicMaterial({ map: textureLoader.load(up), side: DoubleSide }),
            new MeshBasicMaterial({ map: textureLoader.load(dn), side: DoubleSide }),
            new MeshBasicMaterial({ map: textureLoader.load(bk), side: DoubleSide }),
            new MeshBasicMaterial({ map: textureLoader.load(ft), side: DoubleSide }),
        ];
        let skyboxMesh = new Mesh(skyboxGeometry, skyboxMaterials);
        skyboxMesh.name = "skyboxMesh";

        this.camera.position.set(0, 0, 5);

        this.scene.add(mesh);
        this.scene.add(skyboxMesh);

        this.stats = new Stats();
        this.stats.showPanel(0);
        this.$refs.stage.appendChild(this.stats.dom);

        new OrbitControls(this.camera, this.renderer.domElement);

        this.render();
    },
    methods: {
        render() {
            this.stats.begin();
            window.requestAnimationFrame(() => this.render());
            const skyboxMesh = this.scene.getObjectByName("skyboxMesh");

            skyboxMesh.rotation.y += 0.001;

            this.renderer.render(this.scene, this.camera);
            this.stats.end();
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
