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