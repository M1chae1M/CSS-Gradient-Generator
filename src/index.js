import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from './components/Menu';
import PreviewScreen from './components/PreviewScreen';
import AddedColors from './components/objects/AddedColors';
import AddedColorDisplay from './components/AddedColorDisplay';
import './index.css';

var addedColors=[
    new AddedColors("#ffcfaa", 10),
    new AddedColors("#afffbb", 30),
    new AddedColors("#fbffcc", 60),
    new AddedColors("#afcadd", 80),
    new AddedColors("#aaffee", 90),
];

class App extends React.Component{
    state={
        colorsList:addedColors,
        addNewStyleOnPercents:0,
        inputNumberValue:0,
        inputRangeValue:0,
        inputColorValue:'#ffffff',
        stylesReadyToCopy:'background-color:#ffffff;',
    }
    render(){
        const styles={
            App:{
                display:'grid',
                width:'fit-content',
                backgroundColor:'var(--background-color)',
                height:'80%',
                justifyItems:'center',
                border:'solid 2px var(--borderColor)',
                // border:'solid black 1px',
                // width:'55vh',
            },
            colorListScrollabe:{
                overflowY:'scroll',
            },
            menu:{
                display:'grid',
                width:'100%',
            },
            copyButton:{
                display:'grid',
            },
            inputs:{
                display:'grid',
                height:'100%',
                width:'auto',
                // border:'solid 2px var(--borderColor)',
                // border:'solid black 1px',
            },
            inputRange:{
                width:'100%',
                appearance:'none',
                borderRadius:'3px',
                backgroundColor:'var(--background-color)',
                border:'solid 2px var(--borderColor)',
                height:'20px',
            },
        }
        const changeStylesToCopy=()=>{
            let backgroundColorF=Array.from(addedColors).length>0?addedColors[0].color:this.state.inputColorValue;
            let backgroundGradient='';
            if(Array.from(this.state.colorsList).length>1){
                backgroundGradient='linear-gradient('+this.state.inputRangeValue+'deg';
                this.state.colorsList.map((x,i)=>backgroundGradient+=','+x.color+' '+x.startOnPercents+'%');
                backgroundGradient+=');';
            }
            else{
                backgroundGradient='';
                // backgroundGradient=this.state.inputColorValue;
            }
            this.setState({stylesReadyToCopy:'background-color:'+backgroundColorF+';'+backgroundGradient});
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
            addedColors.push(new AddedColors(
                // addedColors.length,
                this.state.inputColorValue,this.state.inputNumberValue));
            this.setState({colorsList:addedColors});
            console.log(addedColors)
        }
        // [...tab.slice(0,3),...tab.slice(4)]
        const delColor=(e)=>{

            let delIndex=parseInt(e.target.parentElement.className);


            if(delIndex===0){
                addedColors.splice(delIndex, 1);
                // addedColors.unshift('3');
                // addedColors.shift();
                // e.target.parentElement.remove();
                // addedColors.reverse().pop();
                // addedColors.reverse();

            }else{
                addedColors.splice(delIndex, 1);
            }

            this.setState({colorsList:['addedColors']});

            setTimeout(()=>{
                this.setState({colorsList:addedColors});

            },0);
        }
        const copyStyles=(e)=>{
            changeStylesToCopy()
            setTimeout(()=>{
                document.querySelector('#stylesToCopy').classList.remove('hidden');
                document.querySelector('#stylesToCopy').select();
                document.execCommand('copy');
                document.querySelector('#stylesToCopy').classList.add('hidden');
            },0);
        }
        return(
            <div id='App' style={styles.App}>
                <PreviewScreen
                    colorsList={this.state.colorsList}
                    inputRangeValue={this.state.inputRangeValue}
                    inputColorValue={this.state.inputColorValue}
                />
                <input style={styles.inputRange} type="range" onChange={changeRangeInput} min="0" max="360" step="1" value={this.state.inputRangeValue}/>
                <div style={styles.colorListScrollabe}>
                    {
                        this.state.colorsList.map((x,i)=>
                            <AddedColorDisplay
                                ID={i}
                                color={x.color}
                                startOnPercents={x.startOnPercents}
                                addedColors={addedColors}
                                delColor={delColor}
                                changeColorsListState={changeColorsListState}
                            />
                        )
                    }
                </div>
                <div style={styles.menu}>
                <input type="button" value="Copy styles" onClick={copyStyles} style={styles.copyButton}/>
                <Menu
                    changeColorInput={changeColorInput}
                    changeNumberInput={changeNumberInput}
                    addNewColor={addNewColor}
                    inputColorValue={this.state.inputColorValue}
                    inputNumberValue={this.state.inputNumberValue}
                />
                </div>
                <input type="text" value={this.state.stylesReadyToCopy} id='stylesToCopy' className='hidden'/>
            </div>
        );
    }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);