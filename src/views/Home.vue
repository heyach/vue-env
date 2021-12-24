<template>
    <div class="home">
        <h-header></h-header>
        <div class="content">
            <div class="side-menu">
                <el-menu
                    default-active="2"
                    background-color="#add8e6"
                    text-color="#0000ff"
                    class="el-menu-vertical-demo"
                    :router="true"
                >
                    <el-submenu v-for="(item, index) in menuList" :key="index" :index="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item
                                v-for="(item1, index1) in item.children"
                                :key="index1"
                                :index="item1.index"
                                :route="item1.route"
                                >{{ item1.name }}</el-menu-item
                            >
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="container">
                <router-view />一个没啥用的首页
                <div class="fa" @click.self="fa">
                    <div class="son" @click="son"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { Button, Menu, Submenu, MenuItemGroup, MenuItem } from "element-ui";
import Header from "@/components/Header";
import m from "@/mock/menu";
export default {
    name: "Home",
    components: {
        "el-button": Button,
        "el-menu": Menu,
        "el-sub-menu": Submenu,
        "el-menu-item-group": MenuItemGroup,
        "el-menu-item": MenuItem,
        "h-header": Header,
    },
    data() {
        return {
            msg: "1234567890",
            menuList: m,
            firstName: "aaa",
            lastName: "bbb"
        };
    },
    computed: {
        ...mapState({
            totalCount: (state) => state.Home.totalCount,
        }),
        ...mapGetters("Home", ["getTenCount"]),
        fullName: {
            get() {
                return this.firstName + this.lastName
            },
            set(v) {
                // 如果一个人的全名被改成v了，那么就要根据v值去重设firstName和lastName，这就是set的意义
                console.log(v, 222)
                this.firstName = v.slice(0,2)
                this.lastName = v.slice(3,5)
                return v
            }
        }
    },
    created() {},
    mounted() {
        let that = this;
    },
    methods: {
        ...mapActions("Home", ["addCount"]),
        ...mapActions("Auth", ["getMenus"]),
        axios2() {
            this.$store
                .dispatch("Home/getIndexInfo", {
                    name: "aaa",
                })
                .then((res) => {
                    console.log(2, res, this.getCounter);
                })
                .then((res) => {
                    console.log(3, res);
                });
        },
        fa() {
            console.log(this.fullName);
            this.fullName = "bbbaaa"
            console.log(this.fullName,333)
        },
        son() {},
    },
};
</script>

<style lang="less" scoped>
.home {
    position: absolute;
    width: 100%;
    height: 100%;

    .fa {
        position: relative;
        width: 200px;
        height: 200px;
        background: red;
        .son {
            position: relative;
            width: 100px;
            height: 100px;
            background: black;
        }
    }
    .content {
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        top: 0;
        display: flex;
        flex-direction: row;

        .side-menu {
            flex-basis: 200px;
            background: lightblue;
            max-width: 200px;
        }
        .container {
            flex-grow: 1;
        }
    }
}
.login-wrap {
    background: #ccc;
    color: red;

    img {
        width: 120px;
    }
}
</style>
