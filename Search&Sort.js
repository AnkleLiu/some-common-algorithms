/**
 * Created by Uncle Liu on 2017/12/20.
 */
// 二分查找
const binarySearch = (array, item) => {
    let lo = 0
    let hi = array.length - 1
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        const guess = array[mid]
        if (guess === item) {
            return mid
        } else if (guess > item) {
            hi = mid - 1
        } else {
            lo = mid + 1
        }
    }
    return false
}
// 递归版本二分查找
const binarySearchRecursive = (array, item) => {
    if (array.length === 0) {
        return false
    } else {
        let lo = 0
        let hi = array.length - 1
        const mid = Math.floor((lo + hi) / 2)
        const guess = array[mid]
        if (guess === item) {
            return true
        } else if (guess > item) {
            return binarySearchRecursive(array.slice(0, mid), item)
        } else {
            return binarySearchRecursive(array.slice(mid + 1), item)
        }
    }

}
// 冒泡排序
// 就是一遍又一遍地遍历，每一遍都比较相邻的两个元素，
// 大的靠右（下沉），小的靠左（上浮），每一遍比较交换之后
// 都敲定了一个最大、第二大、第三大。。。的元素
// 所以 n - 1 次遍历之后，就排好序了
const bubbleSort = (alist) => {
    const listLength = alist.length
    for(let i = listLength - 1; i > 0; i--) {
        for(let j = 0; j < i; j++) {
            if(alist[j] > alist[j + 1]) {
                [alist[j], alist[j + 1]] = [alist[j + 1], alist[j]]
            }
        }
        console.log('遍历一次之后', alist)
    }
}
// 选择排序
// 也是一遍又一遍地遍历，每遍历一次就把最大、第二大等等选出来
// 相比于冒泡排序，选择排序每遍历一次只交换一次
// 遍历 n - 1 次
const selectionSort = (alist) => {
    const alistLength = alist.length
    for(let i = alistLength - 1; i > 0; i--) {
        let positionOfMax = 0
        for(let j = 1; j < i + 1; j++) {
            if(alist[j] > alist[positionOfMax]) {
                positionOfMax = j
            }
        }
        [alist[i], alist[positionOfMax]] = [alist[positionOfMax], alist[i]]
        console.log('遍历一次之后', alist)
    }
}
// 插入排序
// 仍然遍历 n - 1 次，假设前面 k - 1 个元素已经排好序了
// 把第 k 个元素依次和前面 k - 1 个元素比较，放到正确的位置
const insertionSort = (alist) => {
    const listLength = alist.length
    // 从 1 开始，假设元素 0 已经排好序了
    for(let i = 1; i < listLength; i++) {
        let currentValue = alist[i]
        let position = i
        while(position > 0 && alist[position - 1] > currentValue) {
            alist[position] = alist[position - 1]
            position -= 1
        }
        alist[position] = currentValue
    }
}
// 希尔排序
// 把序列分成若干子序列，每个子序列是有序的。关键在如何分割子序列
// 通常是不连续的分割，比如相隔 i 个为一个子序列
const shellSort = (alist) => {
    let sublistcount = Math.floor(alist.length / 2)
    while(sublistcount > 0) {
        for(let startpositon = 0; startpositon < sublistcount; startpositon++) {
            gapInsertionSort(alist, startpositon, sublistcount)
        }
        console.log("After increments of size", sublistcount, "The list is", alist)
        sublistcount = Math.floor(sublistcount / 2)
    }
}
const gapInsertionSort = (alist, start, gap) => {
    const listLength = alist.length
    for(let i = start + gap; i < listLength; i += gap) {
        let currentValue = alist[i], position = i
        while(position >= gap && alist[position - gap] > currentValue) {
            alist[position] = alist[position - gap]
            position -= gap
        }
        alist[position] = currentValue
    }
}
// 归并排序 nlogn
const mergeSort = (alist) => {
    console.log('Splitting', alist)
    const listLength = alist.length
    if(listLength > 1) {
        const mid = Math.floor(listLength / 2)
        const leftHalf = alist.slice(0, mid)
        const rightHalf = alist.slice(mid)
        //
        mergeSort(leftHalf)
        mergeSort(rightHalf)
        //
        let i = 0, j = 0, k = 0
        while(i < leftHalf.length && j < rightHalf.length) {
            if(leftHalf[i] < rightHalf[j]) {
                alist[k] = leftHalf[i]
                i++
            } else {
                alist[k] = rightHalf[j]
                j++
            }
            k += 1
        }
        //
        while(i < leftHalf.length) {
            alist[k] = leftHalf[i]
            i += 1
            k += 1
        }
        while(j < rightHalf.length) {
            alist[k] = rightHalf[j]
            j += 1
            k += 1
        }
    }
    console.log('merging', alist)
}
// 快速排序
// 首先选出一个 pivot（通常是第一个），协助拆分待排序列的
// 遍历一次的目标是找到小于 pivot 和 大于 pivot 的，
// 放在正确的位置，并且把 pivot 放在正确的位置
// 分别从序列收尾遍历，和 pivot 比较，
// leftmark 找到一个大于 pivot，rightmark 找到一个小于 pivot
// 此时交换 leftmark 和 rightmark
// 直到 rightmark > leftmark，此时交换 pivot 和 rightmark
// 这样算遍历一遍。nlogn，最坏情况 n2
const quickSort = (alist) => {
    const listLength = alist.length
    quickSortHelper(alist, 0, listLength - 1)
}
const quickSortHelper = (alist, first, last) => {
    // 长度为 1 时候相当于已经排好序了
    if(first < last) {
        const splitpoint = partition(alist, first, last)
        console.log('splitpoint', splitpoint)
        quickSortHelper(alist, first, splitpoint - 1)
        quickSortHelper(alist, splitpoint + 1, last)
    }
}
const partition = (alist, first, last) => {
    const pivotvalue = alist[first]
    let leftmark = first + 1, rightmark = last, done = false
    //
    while(!done) {
        while(leftmark <= rightmark && alist[leftmark] <= pivotvalue) {
            leftmark += 1
        }
        while(rightmark >= leftmark && alist[rightmark] >= pivotvalue) {
            rightmark -= 1
        }
        if(rightmark < leftmark) {
            done = true
        } else {
            [alist[leftmark], alist[rightmark]] = [alist[rightmark], alist[leftmark]]
        }
    }
    [alist[first], alist[rightmark]] = [alist[rightmark], alist[first]]
    return rightmark
}
// 行数更少的一个版本
const quickSortVersionTwo = (alist) => {
    if (alist.length <= 1) {
        return alist
    }

    var pivot = alist[0], left = [], right = []

    for (var i = 1; i < alist.length; i++) {
        alist[i] < pivot ? left.push(alist[i]) : right.push(alist[i])
    }

    return quickSortVersionTwo(left).concat(pivot, quickSortVersionTwo(right))
}
const __main = () => {
    const alist = [54, 26, 93, 17, 77, 31, 44, 55, 20]
    // const testlist = [0, 1, 2, 8, 13, 17, 19, 32, 42,]
    // console.log('binary search recursive')
    // console.log(binarySearchRecursive(testlist, 0))
    // console.log(binarySearchRecursive(testlist, 55))
    // console.log('bubble sort')
    // bubbleSort(alist)
    // console.log(alist)
    // console.log('selection sort')
    // selectionSort(alist)
    // console.log(alist)
    // console.log('insertion sort')
    // insertionSort(alist)
    // console.log(alist)
    // console.log('shell sort')
    // shellSort(alist)
    // console.log(alist)
    // console.log('mergesort')
    // mergeSort(alist)
    // console.log(alist)
    console.log('quicksort')
    quickSort(alist)
    console.log(alist)
    // console.log('quicksort version two')
    // console.log(quickSortVersionTwo(alist))
}

__main()