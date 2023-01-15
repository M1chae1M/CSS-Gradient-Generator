import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from './components/Menu';
import ToolTip from './components/ToolTip';
import PreviewScreen from './components/PreviewScreen';
import AddedColors from './components/objects/AddedColors';
import AddedColorDisplay from './components/AddedColorDisplay';
import './index.css';

var addedColors=[
    // new AddedColors("#ffcfaa", 10),
    // new AddedColors("#afffbb", 30),
    // new AddedColors("#fbffcc", 60),
    // new AddedColors("#afcadd", 80),
    // new AddedColors("#aaffee", 90),
];

class App extends React.Component{
    state={
        colorsList:addedColors,
        addNewStyleOnPercents:0,
        inputNumberValue:0,
        inputRangeValue:0,
        inputColorValue:'#ffffff',
        stylesReadyToCopy:'background-color:#ffffff;',

        dragged:0,
        dropped:0,

        showToolTip:false,
        ToolTipTranslateX:0,
    }
    render(){
        const styles={
            App:{
                display:'grid',
                width:'55vh',
                backgroundColor:'var(--background-color)',
                maxHeight:'80vh',
                height:'fit-content',
                justifyItems:'center',
                position:'relative',
            },
            colorListScrollabe:{
                overflowY:'scroll',
                width:'100%',
                boxShadow:'var(--borderColor) var(--box-shadow-x) var(--box-shadow-y)',
                borderRadius:'5px',
                paddingLeft:'5px',
                maxHeight:'100px',
            },
            controlPanel:{
                display:'grid',
                width:'100%',
            },
            copyButton:{
                display:'grid',
                boxShadow:'var(--box-shadow-color) var(--box-shadow-x) var(--box-shadow-y)',
                borderRadius:'5px',
                border:'var(--box-shadow-color) 3px solid',
            },
            inputs:{
                display:'grid',
                height:'100%',
                width:'auto',
            },
            inputRange:{
                display:'grid',
                width:'100%',
                appearance:'none',
                borderRadius:'5px',
                backgroundColor:'var(--background-color)',
                height:'20px',
                border:'var(--box-shadow-color) 3px solid',
                boxShadow:'var(--borderColor) var(--box-shadow-x) var(--box-shadow-y)',
            },
        }
        const changeColorsListState=(temp)=>{
            this.setState({colorsList:temp});
        }
        const changeColorInput=(e)=>{
            this.setState({inputColorValue:e.target.value});
        }
        const changeNumberInput=(e)=>{
            this.setState({inputNumberValue:parseInt(e.target.value)});
        }
        const changeRangeInput=(e)=>{
            this.setState({inputRangeValue:e.target.value,showToolTip:true});
        }
        const changeStateDragged=(target)=>{
            this.setState({dragged:target});
        }
        const changeStateDropped=(target)=>{
            this.setState({dropped:target});
        }
        const changeStylesToCopy=()=>{
            let backgroundColorF=Array.from(addedColors).length>0?addedColors[0].color:this.state.inputColorValue;
            let backgroundGradient='';
            if(Array.from(this.state.colorsList).length>1){
                backgroundGradient='background:linear-gradient('+this.state.inputRangeValue+'deg';
                this.state.colorsList.map((x,i)=>backgroundGradient+=','+x.color+' '+x.startOnPercents+'%');
                backgroundGradient+=');';
            }
            else{
                backgroundGradient='';
            }
            //background:
            this.setState({stylesReadyToCopy:'background-color:'+backgroundColorF+';'+backgroundGradient});
        }
        const newToolTipPosition=(e)=>{
            let inputRangeData={
                left:document.querySelector('#inputRange').getBoundingClientRect().left,
                width:document.querySelector('#inputRange').getBoundingClientRect().width,
            }
            if(e.clientX>inputRangeData.left && e.clientX<(inputRangeData.left+inputRangeData.width)){
                this.setState({ToolTipTranslateX:e.clientX});
            }
        }
        const addNewColor=(e)=>{
            addedColors.push(new AddedColors(this.state.inputColorValue,this.state.inputNumberValue));
            this.setState({colorsList:addedColors,inputNumberValue:this.state.inputNumberValue+10});
        }
        const copyStyles=(e)=>{
            changeStylesToCopy();
            setTimeout(()=>{
                document.querySelector('#stylesToCopy').classList.remove('hidden');
                document.querySelector('#stylesToCopy').select();
                document.execCommand('copy');
                document.querySelector('#stylesToCopy').classList.add('hidden');
            },0);
        }
        return(
            <React.Fragment>
                <div id='App' style={styles.App}>
                    <PreviewScreen
                        colorsList={this.state.colorsList}
                        inputRangeValue={this.state.inputRangeValue}
                        inputColorValue={this.state.inputColorValue}
                    />
                    <input
                        style={styles.inputRange}
                        type="range"
                        id='inputRange'
                        onChange={changeRangeInput}
                        onMouseMove={newToolTipPosition}
                        min="0"
                        max="360"
                        step="1"
                        value={this.state.inputRangeValue}
                        onMouseLeave={()=>{this.setState({showToolTip:false})}}
                    />
                    {
                        this.state.colorsList.length>0?
                            <div style={styles.colorListScrollabe} id='colorListScrollabe'>
                                {
                                    this.state.colorsList.map((x,i)=>
                                        <AddedColorDisplay
                                            ID={i}
                                            key={i}
                                            color={x.color}
                                            startOnPercents={x.startOnPercents}
                                            addedColors={addedColors}
                                            changeColorsListState={changeColorsListState}
                                            changeStateDragged={changeStateDragged}
                                            changeStateDropped={changeStateDropped}
                                            dragged={this.state.dragged}
                                            dropped={this.state.dropped}
                                        />
                                    )
                                }
                            </div>:
                                null
                    }
                    <div style={styles.controlPanel}>
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
                {
                    this.state.showToolTip===true?
                        <ToolTip
                            inputRangeValue={this.state.inputRangeValue}
                            ToolTipTranslateX={this.state.ToolTipTranslateX}
                        />:
                            null
                }
            </React.Fragment>
        );
    }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);