import Common from "@/utils/Common";
// 快速排序
const QuickSort = function(arr) {
    arr = Common.isArray(arr) ? arr : [];
    if (arr.length <= 1) {
        return arr;
    }
    // 取数组中间值为基数，并从数组中去除
    // 如不出去会导致递归溢出，该值会在结束时合并进数组
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    // 遍历数组，与基数比较，分别放入左右数组
    arr.forEach((item) => {
        if (item < pivot) {
            left.push(item);
        } else {
            right.push(item);
        }
    });
    // 递归处理
    // 合并基数和左右数组
    return QuickSort(left).concat([pivot], QuickSort(right));
};

// 快速排序
const QuickSort2 = function(arr, left, right) {
    arr = Common.isArray(arr) ? arr : [];
    // 结束递归的条件
    if (left >= right) {
        return arr;
    }
    var i = left,
        j = right,
        base = arr[left]; // 将排序范围内的第一个数选为基数
    while (i < j) {
        // 从右边起，寻找比基数小的数
        // 如果没有，则下标会运算到最后，j为i，就是0
        while (i < j && arr[j] >= base) {
            j--;
        }
        // 基数的存在就是为了跟每个值比较，再进行交换
        // 从左边起，寻找比基数大的数
        // 如果没有，则下标会运算到最后的j，要结合上面j的运算结果
        // 因为上一步会找到离基数最远的比基数小的值
        // 这一步在控制范围后找到一个比基数大的数
        while (i < j && arr[i] <= base) {
            i++;
        }
        // 如果i<j，且a[i] > base > a[j]
        // 直接交换ij
        if (i < j) {
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        // 如果最后i=j了，说明没有同时找到比基数大的数和比基数小的数，结束遍历
    }
    // 因为i的运算规则会结合j，
    // j最后为一个比基数小的下标
    // 结束遍历i=j，a[i]必定小于等于a[left]即base，进行交换
    arr[left] = arr[i];
    arr[i] = base;

    // 递归处理
    QuickSort2(arr, left, i - 1);
    QuickSort2(arr, i + 1, right);
    return arr;
};
export default {
    // 洗牌
    Shuffle(arr) {
        arr = Common.isArray(arr) ? arr : [];
        for (let i = 0, a = arr.length - 1; i < a; i++) {
            // 随机范围一直为[0, a - i];
            let r = Common.RandomRange(0, a - i);
            // 将当前随机的值与随机范围最后的一个值交换
            let tmp = arr[r];
            arr[r] = arr[a - i];
            arr[a - i] = tmp;
            // this.$set(arr, r, arr[a - i]);
            // this.$set(arr, a - i, tmp);
        }
        // 得到最终的全随机数组
        return arr;
    },
    // 冒泡排序
    BubbleSort(arr) {
        arr = Common.isArray(arr) ? arr : [];
        let a = arr.length;
        let tmp;
        // 从头开始遍历直到终点
        for (let i = 0; i < a - 1; i++) {
            for (let j = i + 1; j < a; j++) {
                // 将a[i]依次与后面的值比较，进行交换
                if (arr[i] > arr[j]) {
                    tmp = arr[j];
                    arr[j] = arr[i];
                    arr[i] = tmp;
                }
            }
        }
        return arr;
    },
    BubbleSort2(arr) {
        arr = Common.isArray(arr) ? arr : [];
        let a = arr.length;
        // 从起点开始遍历
        for (let i = 0; i < a - 1; i++) {
            // 从终点开始遍历，交换位置，保证a[i]始终是最小的
            for (let j = a - 1; j > i; j--) {
                if (arr[j] < arr[j - 1]) {
                    var tmp = arr[j - 1];
                    arr[j - 1] = arr[j];
                    arr[j] = tmp;
                }
            }
        }
        return arr;
    },
    // 快速排序
    QuickSort(arr) {
        return QuickSort(arr);
    },
    QuickSort2(arr) {
        // 初始调用范围为整个数组的范围
        return QuickSort2(arr, 0, arr.length - 1);
    },
};
