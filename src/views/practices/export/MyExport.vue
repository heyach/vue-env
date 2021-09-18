<template>
    <div class="export">
        <div class="block-item">
            <div class="intro">
                <p>直接导出一个变量，export var name = "hello"</p>
                <p>import {name} from "../../utils/Export"，需要用对象+key的方式（key值要对应）引入</p>
                <p>也可以用此方式导出多个变量，一起引入</p>
                <p>如果没有用export default，会自动将多个export组合成一个object，所以要用{key}的形式导入</p>
            </div>
            <div class="com-item">{{ name }}-{{ name2 }}-{{ name3 }}-{{ name4 }}-{{ log }}</div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>export default xxx直接导出一个值，引入的时候可以取名为任意值</p>
                <p>通常的写法都是 export default { a, b, c, ...}， 然后引入import x from "xxx"，通过x.a方式调用</p>
                <p>
                    因为非default方式会将所有的export组合成一个对象，反而要用{key}的形式，default方式直接导出整个值，导入的时候直接接收即可
                </p>
            </div>
            <div class="com-item">{{ defaultName.name5 }}</div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>
                    组合使用，import的方式完全取决于export的形式，当export有多种形式的时候，import可以组合使用，用逗号形式分隔
                </p>
            </div>
            <div class="com-item">{{ defaultName2.name5 }}-{{ name7 }}</div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>通过*和as自定义使用</p>
            </div>
            <div class="com-item">{{ myExport.name2 }}</div>
        </div>
    </div>
</template>
<script>
import { name, name2, name3, name4, log } from "./me";
import defaultName from "./me";
import defaultName2, { name7 } from "./me";
import * as myExport from "./me";
export default {
    data() {
        return {
            name: name,
            name2: name2,
            name3: name3,
            name4: name4,
            log: "",

            defaultName: defaultName,
            name7: name7,
            defaultName2: defaultName2,
            myExport: myExport,
        };
    },
    mounted() {
        this.log = log();
    },
};
</script>
<style lang="less" scoped>
.export {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
}
</style>
