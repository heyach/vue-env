<template>
    <div class="goodslist">
        <div class="search">
            <input type="text" v-model="filterKey" placeholder="请输入关键词" />
        </div>
        <div class="goods-container">
            <div class="goods-item" v-for="item in filterGoodsList" :key="item.id">
                <div class="goods-img">
                    <img :src="item.image" alt="" />
                </div>
                <div class="goods-info">
                    <div class="goods-name">{{ item.name }}</div>
                    <div class="goods-price">
                        <span>{{ item.unit }}</span
                        >{{ item.price }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import g from "@/mock/getGoodsList";
export default {
    data() {
        return {
            filterKey: "",
            goodsList: [],
        };
    },
    computed: {
        filterGoodsList() {
            return this.goodsList.filter((item) => item.name.indexOf(this.filterKey) != -1);
        },
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            this.goodsList = g;
        },
    },
};
</script>
<style lang="less" scoped>
.goodslist {
    width: 320px;
    height: 568px;
    border: 1px #eee solid;
    margin: 100px auto;
    overflow: auto;
    .search {
        height: 40px;
        width: 300px;
        margin: 10px auto;
        border: 1px #eee solid;
        input {
            height: 40px;
            width: 290px;
            padding: 0;
            margin: 0;
            outline: none;
            border: 0;
            padding-left: 10px;
        }
    }
    .goods-container {
        position: relative;
        .goods-item {
            margin: 0 10px;
            height: 100px;
            border-bottom: 1px #eee solid;
            display: flex;
            align-items: center;
            .goods-img {
                width: 80px;
                height: 80px;
                margin-left: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .goods-info {
                margin-left: 10px;
                height: 80px;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                flex-grow: 1;
                align-items: flex-start;
                .goods-price {
                    span {
                        font-size: 10px;
                    }
                }
            }
        }
    }
}
</style>
