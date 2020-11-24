import React from 'react'
import './SortingVisualizer.css'
import './../Algorithms/algorithms'
import { bubbleSort, quickSort, heapSort, selectionSort, insertionSort, mergeSort } from './../Algorithms/algorithms';
import Slider, {Range} from 'rc-slider'
import 'rc-slider/assets/index.css';

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
            width: 0,
            speed: 1,
            arraySize: 150,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    }

    resetArray(){
        const array = [];
        
        if(this.state.arraySize > getMaxElements(this.state.width)){
            this.setState({arraySize: getMaxElements(this.state.width)})
        }

        for(let i = 0; i < this.state.arraySize; i++){
            array.push(randomIntFromInterval(5,700));
        }
        this.setState({array});

        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < arrayBars.length; i++){
            arrayBars[i].style.backgroundColor='olive';
        }
    }

    componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.resetArray();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth});
        this.resetArray();
      }
    
    bubbleSort() {
        const animations = bubbleSort(this.state.array);
        const newAnimations = [];
        console.log(this.state.array)
        console.log(animations)
        for(const animation of animations){
            newAnimations.push(animation.compare);
            newAnimations.push(animation.compare);
            newAnimations.push(animation.swap);
        }
        let target = 3 * this.state.array.length - 3;
        let dist = 9 + (this.state.array.length - 5)*3;
        let lastElem = this.state.array.length - 1;

        for(let i = 0; i < newAnimations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [oneIdx, twoIdx] = newAnimations[i];
                const oneStyle = arrayBars[oneIdx].style;
                const twoStyle = arrayBars[twoIdx].style;
                const color = i % 3 === 0 ? 'crimson' : 'olive';
                setTimeout(() => {
                    oneStyle.backgroundColor = color;
                    twoStyle.backgroundColor = color;
                }
                , i * (1/this.state.speed));
            } else{
                setTimeout(() => {  
                    if (typeof newAnimations[i] !== 'undefined'){
                        const [oneIdx, twoIdx] = newAnimations[i];
                        const oneStyle = arrayBars[oneIdx].style;
                        const twoStyle = arrayBars[twoIdx].style;
                        const temp = oneStyle.height;
                        oneStyle.height = twoStyle.height;
                        twoStyle.height = temp;
                    }
                }
                , i * (1/this.state.speed))
            }
            if(i + 1 === target){
                console.log("Target: ", target, " Distance: ", dist, " Elem: ", lastElem);
                target = target + dist;
                dist = dist - 3;
                const currElem = lastElem;
                lastElem = lastElem - 1;
                setTimeout(() => {      
                    arrayBars[currElem].style.backgroundColor='teal';
                }
                , i * (1/this.state.speed))
            }
        }
        const arrayBars = document.getElementsByClassName('array-bar');
        setTimeout(() => {   
            arrayBars[0].style.backgroundColor='teal';
        }
        , newAnimations.length * (1/this.state.speed))
    }

    quickSort() {
        const animations = quickSort(this.state.array);
        const newAnimations = [];
        console.log(this.state.array)
        console.log(animations)
        for(const animation of animations){
            newAnimations.push(animation.compare);
            newAnimations.push(animation.compare);
            newAnimations.push(animation.swap);
        }
        console.log(newAnimations);
        for(let i = 0; i < newAnimations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [oneIdx, twoIdx] = newAnimations[i];
                const oneStyle = arrayBars[oneIdx].style;
                const twoStyle = arrayBars[twoIdx].style;
                const color = i % 3 === 0 ? 'crimson' : 'olive';
                setTimeout(() => {
                    oneStyle.backgroundColor = color;
                    twoStyle.backgroundColor = color;
                }
                , i * 20 * (1/this.state.speed));
            } else{
                setTimeout(() => {  
                    if (typeof newAnimations[i] !== 'undefined'){
                        const [oneIdx, twoIdx] = newAnimations[i];
                        const oneStyle = arrayBars[oneIdx].style;
                        const twoStyle = arrayBars[twoIdx].style;
                        const temp = oneStyle.height;
                        oneStyle.height = twoStyle.height;
                        twoStyle.height = temp;
                    }
                }
                , i * 20 * (1/this.state.speed));
            }
        }
        setTimeout(() => {   
            this.finishArray();
        }
        , newAnimations.length * 20 * (1/this.state.speed))
    }

    heapSort(){
        const animations = heapSort(this.state.array);
        const newAnimations = [];
        for(const animation of animations){
            newAnimations.push(animation.compareL);
            newAnimations.push(animation.compareL);
            newAnimations.push(animation.compareR);
            newAnimations.push(animation.compareR);
            newAnimations.push(animation.swap);
        }
        let lastElem = this.state.array.length - 1;
        for(let i = 0; i < newAnimations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 5 !== 4;
            if (isColorChange) {
                if(typeof newAnimations[i] !== 'undefined'){
                    const [oneIdx, twoIdx] = newAnimations[i];
                    if(typeof arrayBars[oneIdx] === 'undefined' || typeof arrayBars[twoIdx] === 'undefined'){
                        console.log("Array size: ", this.state.array.length, "id1: ", oneIdx, " id2:", twoIdx)
                        this.resetArray()
                        return;
                    }
                    const oneStyle = arrayBars[oneIdx].style;
                    const twoStyle = arrayBars[twoIdx].style;
                    const color = i % 5 === 0 ? 'crimson' : 'olive';
                    setTimeout(() => {
                        if(oneStyle.backgroundColor !== 'teal'){
                            oneStyle.backgroundColor = color;
                        }
                        if(twoStyle.backgroundColor !== 'teal'){
                            twoStyle.backgroundColor = color;
                        }
                    }
                    , i * 10 * (1/this.state.speed));
                }
            } else{
                // eslint-disable-next-line no-loop-func
                setTimeout(() => {  
                    if (typeof newAnimations[i] !== 'undefined'){
                        const [oneIdx, twoIdx] = newAnimations[i];
                        const oneStyle = arrayBars[oneIdx].style;
                        const twoStyle = arrayBars[twoIdx].style;
                        const temp = oneStyle.height;
                        oneStyle.height = twoStyle.height;
                        twoStyle.height = temp;
                        if(twoIdx === lastElem && oneIdx === 0){
                            twoStyle.backgroundColor='teal';
                            lastElem = lastElem - 1;
                        }
                    }
                }
                , i * 10 * (1/this.state.speed));
            }
        }
        const arrayBars = document.getElementsByClassName('array-bar');
        setTimeout(() => {   
            arrayBars[0].style.backgroundColor='teal';
        }
        , newAnimations.length * 10 * (1/this.state.speed))
    }

    selectSort(){
        const animations = selectionSort(this.state.array);
        const newAnimations = [];
        console.log(this.state.array)
        console.log(animations)
        for(const animation of animations){
            newAnimations.push(animation.compare);
            newAnimations.push(animation.compare);
            newAnimations.push(animation.swap);
        }
        console.log(newAnimations);
        for(let i = 0; i < newAnimations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                if(typeof newAnimations[i] !== 'undefined'){
                    const [oneIdx, twoIdx] = newAnimations[i];
                    const oneStyle = arrayBars[oneIdx].style;
                    const twoStyle = arrayBars[twoIdx].style;
                    const color = i % 3 === 0 ? 'crimson' : 'olive';
                    setTimeout(() => {
                        oneStyle.backgroundColor = color;
                        twoStyle.backgroundColor = color;
                    }
                    , i * 2 * (1/this.state.speed));
                }
            } else{
                setTimeout(() => {  
                    if (typeof newAnimations[i] !== 'undefined'){
                        const [oneIdx, twoIdx] = newAnimations[i];
                        const oneStyle = arrayBars[oneIdx].style;
                        const twoStyle = arrayBars[twoIdx].style;
                        const temp = oneStyle.height;
                        oneStyle.height = twoStyle.height;
                        oneStyle.backgroundColor = 'teal'
                        twoStyle.height = temp;
                    }
                }
                , i * 2 * (1/this.state.speed));
            }
        }
        const arrayBars = document.getElementsByClassName('array-bar');
        setTimeout(() => {   
            arrayBars[this.state.array.length - 1].style.backgroundColor='teal';
        }
        , newAnimations.length * 2 * (1/this.state.speed))
    }

    insertSort(){
        const animations = insertionSort(this.state.array);
        const newAnimations = [];
        console.log(this.state.array)
        console.log(animations)
        for(const animation of animations){
            newAnimations.push(animation.compare);
            newAnimations.push(animation.compare);
            newAnimations.push(animation.update);
        }
        console.log(newAnimations);
        for(let i = 0; i < newAnimations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [oneIdx, twoIdx] = newAnimations[i];
                const oneStyle = arrayBars[oneIdx].style;
                const twoStyle = arrayBars[twoIdx].style;
                const color = i % 3 === 0 ? 'crimson' : 'olive';
                setTimeout(() => {
                    oneStyle.backgroundColor = color;
                    twoStyle.backgroundColor = color;
                }
                , i * 5 * (1/this.state.speed));
            } else{
                setTimeout(() => {  
                    if (typeof newAnimations[i] !== 'undefined'){
                        if(newAnimations[i].length > 2){
                            const [oneIdx, twoIdx, value] = newAnimations[i];
                            const oneStyle = arrayBars[oneIdx].style;
                            oneStyle.height = `${value}px`;
                        }
                        else{
                            const [oneIdx, twoIdx] = newAnimations[i];
                            const oneStyle = arrayBars[oneIdx].style;
                            const twoStyle = arrayBars[twoIdx].style;
                            oneStyle.height = twoStyle.height;
                        }
                    }
                }
                , i * 5 * (1/this.state.speed));
            }
        }
        setTimeout(() => {   
            this.finishArray();
        }
        , newAnimations.length * 5 * (1/this.state.speed))
    }

    mergeSort(){
        const animations = mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'crimson' : "olive";
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 10 * (1/this.state.speed));
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * 10 * (1/this.state.speed));
            }
        }
        setTimeout(() => {   
            this.finishArray();
        }
        , animations.length * 10 * (1/this.state.speed))
    }

    finishArray(){
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i = 0; i < this.state.array.length; i++){
            setTimeout(() => {   
                arrayBars[i].style.backgroundColor='teal';
            }
            , i * 10 * (1/this.state.speed))
        }
    }

    onSliderChange = value => {
        this.setState({speed: value});
    }
    onSliderArrayChange = value => {
        if (value < getMaxElements(this.state.width)){
            this.setState({arraySize: value});
            this.resetArray()
        }
    }

    render()  {
        const {array} = this.state;
        const width = getBarWidth(this.state.width, this.state.array.length)
        return(
            <>
                <div className="container">
                    {array.map((value, idx) => (
                        <div className="array-bar"
                        key={idx}
                        style={{height: `${value}px`, width:`${width}px`}}></div>
                    ))}
                </div>
                <div className="controls">
                    <a>Speed: {this.state.speed}</a>
                        <br />
                        <Slider 
                            min={0.01}
                            max={4}
                            step={0.01}
                            value={this.state.speed}
                            onChange={this.onSliderChange}
                        />
                    <a>Array Size: {this.state.arraySize}</a>
                    <br />
                    <Slider 
                        min={5}
                        max={getMaxElements(this.state.width)}
                        step={1}
                        value={this.state.arraySize}
                        onChange={this.onSliderArrayChange}
                    />    
                    <br></br>
                    <button onClick={() => this.resetArray()}> Generate New Array</button>
                    <br></br>
                    <div className="grid-container">
                        <button onClick={() => this.bubbleSort()}> Bubble Sort</button>
                        <button onClick={() => this.quickSort()}> Quick Sort</button>
                        <button onClick={() => this.heapSort()}> Heap Sort</button>
                        <button onClick={() => this.selectSort()}> Selection Sort</button>
                        <button onClick={() => this.insertSort()}> Insertion Sort</button>
                        <button onClick={() => this.mergeSort()}> Merge Sort</button>
                    </div>
                </div>
            </>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) +  min);
}

function getMaxElements(width){
   return Math.floor((width/100*90)/6)
}

function getBarWidth(width, amount){
    if (typeof width !== 'undefined'){
        width = Math.floor(width * 0.88);
        let newWidth = Math.floor(width/amount)
        return newWidth - 2;
    }
    else return 7;

}
