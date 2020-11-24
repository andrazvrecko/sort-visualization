export const bubbleSort = array => {
    const animations = []
    if (array.length <= 1) return array;

    for (let i = 0; i < array.length - 1; i++) {
		for (let j = 0; j < array.length - 1 - i; j++) {
            let animation = {}
            animation.compare = [j, j+1]
            if (array[j] > array[j + 1]) {
                animation.swap = [j, j+1]
				let temp = array[j];
				array[j] = array[j + 1];
				array[j + 1] = temp;
            }
            animations.push(animation)
		}
	}
	return animations;
}

export const quickSort = array => {
    if (array.length <= 1) return array;
    
    const animations = []
    const newArr = quickSortAlgorithm(array, 0, array.length - 1, animations)
    
    console.log(newArr);
    return animations;
}


const partition = (array, left, right, animations) => {
    var pivot = array[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        let animation = {}
        animation.compare = [i, j]
        if (i <= j) {
            animation.swap = [i, j]
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;   
            i++;
            j--;
        }
        animations.push(animation)
    }
    return i;
}

const quickSortAlgorithm = (array, left, right, animations) => {
    var index = partition(array, left, right, animations);
    
    if (left < index - 1) {
        quickSortAlgorithm(array, left, index - 1, animations);
    }
    if (index < right) {
        quickSortAlgorithm(array, index, right, animations);
    }
    return array;
}

const heapify = (array, n, i, animations) =>{
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;
    let animation = {};
    animation.compareL = [l, largest];
    if(l < n && array[l] > array[largest]){
        largest = l;
    }
    animation.compareR = [r, largest]
    if(r < n && array[r] > array[largest]){
        largest = r;
    }
    if(largest != i){
        animation.swap = [i, largest]
        const temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;
        
        animations.push(animation);

        heapify(array, n, largest, animations);
    }

}

export const heapSort =  array => {
    const n = array.length;
    const animations = []
    //Create max heap
    console.log("Starting first max heap")
    for(let i=Math.floor(n/2)-1;i>=0;i--){
        heapify(array, n, i, animations);
    }
    console.log("First max heap complete")
    //Swap
    for(let i = n - 1; i > 0; i--){
        let animation = {}
        const temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        animation.swap = [0,i]
        animations.push(animation)
        heapify(array, i, 0, animations);
    }
    return animations;
}

export const selectionSort = array => {
    let n = array.length;          
    const animations = [];
    for(let i = 0; i < n; i++) {
        let min = i;
        for(let j = i+1; j < n; j++){
            let animation = {};
            animation.compare = [j, min]
            if(array[j] < array[min]) {
                min=j; 
            }
            animations.push(animation)
        }
        if (min != i) {
            let animation = {};
            animations.compare = [i, min]
            animation.swap = [i, min]
            let tmp = array[i]; 
            array[i] = array[min];
            array[min] = tmp; 
            animations.push(animation)     
        }
    }
    return animations;
}

export const insertionSort = array => {
    const animations = []
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let animation = {}
        let current = array[i]; //current = i
        let j = i-1; 
        while ((j > -1) && (current < array[j])) {
            let animation = {}
            animation.compare = [i, j];
            animation.update = [j+1, j];
            array[j+1] = array[j];
            j--;
            animations.push(animation)
        }
        animation.compare = [i, j+1]
        animation.update = [j+1, i, current]
        array[j+1] = current;
        animations.push(animation)
    }
    return animations;
}

export const mergeSort = array => {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }

const mergeSortHelper = (mainArray, startIdx, endIdx, auxiliaryArray, animations,) => {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
const doMerge = (mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations,) => {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i]);
      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }