import React from 'react';
import ReactDOM from 'react-dom/client';
import PreviewScreen from './components/PreviewScreen';
import AddedColors from './components/objects/AddedColors';
import AddedColorDisplay from './components/AddedColorDisplay';
import './index.css';

var addedColors=[
    new AddedColors(0, "#ffcfaa", 10),
    new AddedColors(1, "#afffbb", 30),
    new AddedColors(2, "#fbffcc", 60),
    new AddedColors(3, "#afcadd", 80),
    new AddedColors(4, "#aaffee", 90),
    // new AddedColors(5, "#ffffef", 95),
    // new AddedColors(6, "#ddffff", 100),
];

class App extends React.Component{
    state={
        colorsList:addedColors,
        addNewStyleOnPercents:0,
        // inputNumberValue:this.state.addNewStyleOnPercents,
        inputNumberValue:0,
        inputRangeValue:0,
        inputColorValue:'#ffffff',
    }
    render(){
        const styles={
            App:{
                display:'grid',
                border:'solid black 1px',
                width:'55vh',
                height:'80%',
                justifyItems:'center',
            },
        }
        const changeColorsListState=(temp)=>{
            this.setState({colorsList:temp});
        }
        const changeColorInput=(e)=>{
            console.log(e.target.value);
            this.setState({inputColorValue:e.target.value});
        }
        const changeNumberInput=(e)=>{
            console.log(parseInt(e.target.value));
            this.setState({inputNumberValue:parseInt(e.target.value)});
        }
        const changeRangeInput=(e)=>{
            console.log(e.target.value);
            this.setState({inputRangeValue:e.target.value});
        }
        const addNewColor=(e)=>{
            console.log('add')
            console.log(this.state.inputNumberValue)
            console.log(this.state.inputRangeValue)
            console.log(this.state.inputColorValue)
            addedColors.push(new AddedColors(addedColors.length,this.state.inputColorValue,this.state.inputNumberValue));
            this.setState({colorsList:addedColors});
            console.log(addedColors)
        }
        // [...tab.slice(0,3),...tab.slice(4)]
        const delColor=(e)=>{
            let delIndex=parseInt(e.target.parentElement.className);
            console.log(delIndex);
            console.log(addedColors);
            addedColors=addedColors.splice(1, 1);
            // if(Array.from(addedColors).length===2){
            //     delIndex===1?addedColors.pop():addedColors.shift()
            // }else{
            // }
            this.setState({colorsList:addedColors});
        }
        return(
            <div id='App' style={styles.App}>
                <PreviewScreen
                    colorsList={this.state.colorsList}
                    inputRangeValue={this.state.inputRangeValue}
                    inputColorValue={this.state.inputColorValue}
                />
                <div>
                    {
                        this.state.colorsList.map((x,i)=>
                            <AddedColorDisplay
                                ID={i}
                                color={x.color}
                                startOnPercents={x.startOnPercents}
                                delColor={delColor}
                                addedColors={addedColors}
                                changeColorsListState={changeColorsListState}
                            />
                        )
                    }
                </div>
                <div>
                    <input type="range" onChange={changeRangeInput} min="0" max="360" step="1" value={this.state.inputRangeValue}/>
                    <input type="button" value="Copy styles"/>
                    <input type="color" onChange={changeColorInput} value={this.state.inputColorValue}/>
                    <input type="number" onChange={changeNumberInput} value={this.state.inputNumberValue}/>
                    <input type="button" value="%"/>
                    <input type="button" value="Dodaj nowy kolor" onClick={addNewColor}/>
                </div>
            </div>
        );
    }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);