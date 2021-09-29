<template>
    <div class="number-box" desc="数字控件" :style="bgColor">
        <button :class="['btn-reduce', { disabled: value <= minValue }]" :disabled="value < minValue" @click="reduce">-</button>
        <input :placeholder="placeholderText" v-model="value" class="ipt-number" />
        <button :class="['btn-add', { disabled: value >= maxValue }]" :disabled="value > maxValue" @click="add">+</button>
    </div>
</template>
<script>
export default {
    props: {
        bgColor: {
            type: String,
            default: "",
        },
        defaultValue: {
            type: Number,
            default: 0,
        },
        placeholderText: {
            type: String,
        },
        stepLength: {
            type: Number,
            required: true,
        },
        minValue: {
            type: Number,
            required: true,
        },
        maxValue: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            value: this.defaultValue,
        };
    },
    watch: {
        maxValue: {
            immediate: true,
            handler(val) {
                this.maxValue = val;
            },
            deep: true,
        },
        value(val) {
            val = parseInt(val);
            if (val < this.minValue) {
                this.value = this.minValue;
            } else if (val > this.maxValue) {
                this.value = this.maxValue;
            } else {
                this.value = val ? val : this.minValue;
            }
            this.$emit("getNumber", this.value);
        },
    },
    methods: {
        reduce() {
            this.value -= this.stepLength;
        },
        add() {
            this.value += this.stepLength;
        },
    },
};
</script>
<style lang="less" scoped>
.number-box {
    display: flex;
    height: 40px;
    line-height: 40px;
    width: 160px;
    background: #f7f7f7;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .ipt-number {
        padding: 0;
        margin: 0;
        background: none;
        border: 1px #666 solid;
        height: 20px;
        line-height: 20px;
        padding: 0 5px;
        border-radius: 2px;
        text-align: center;
        min-width: 40px;
        max-width: 70px;
        outline: none;
    }

    .btn-reduce,
    .btn-add {
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 2px;
        border: 1px #333 solid;
        color: #333;
        cursor: pointer;
    }
    .disabled {
        color: #999;
        border: 1px #999 solid;
    }
}
</style>
