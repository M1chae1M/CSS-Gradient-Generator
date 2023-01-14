import React from 'react';
import ReactDOM from 'react-dom/client';
import Menu from './components/Menu';
import ToolTip from './components/ToolTip';
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
                height:'80vh',
                justifyItems:'center',
                position:'relative',
                // border:'solid 2px var(--borderColor)',
                // border:'solid black 1px',
                // width:'55vh',
                // boxShadow:'var(--box-shadow-color) var(--box-shadow-x) var(--box-shadow-y)',
                // width:'fit-content',
            },
            colorListScrollabe:{
                overflowY:'scroll',
                width:'100%',
                boxShadow:'var(--borderColor) var(--box-shadow-x) var(--box-shadow-y)',
                borderRadius:'5px',
                paddingLeft:'5px',
                // height:'fit-content',
                // overflow:'hidden',
                // border:'solid black 1px',
            },
            menu:{
                display:'grid',
                width:'100%',
            },
            copyButton:{
                display:'grid',
                boxShadow:'var(--box-shadow-color) var(--box-shadow-x) var(--box-shadow-y)',
                borderRadius:'5px',
                border:'var(--box-shadow-color) 3px solid',
                // border:'yellow 1px solid'
            },
            inputs:{
                display:'grid',
                height:'100%',
                width:'auto',
                // border:'solid 2px var(--borderColor)',
                // border:'solid black 1px',
                // borderRadius:'15px',
            },
            inputRange:{
                width:'100%',
                appearance:'none',
                borderRadius:'5px',
                backgroundColor:'var(--background-color)',
                height:'20px',
                border:'var(--box-shadow-color) 3px solid',
                boxShadow:'var(--borderColor) var(--box-shadow-x) var(--box-shadow-y)',
                // border:'solid 2px var(--borderColor)',
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
            // console.log(e.target.value);

            // console.log(e.clientY)

            this.setState({inputRangeValue:e.target.value});
        }
        const newToolTipPosition=(e)=>{
            // console.log(e.clientX)
            let inputRangeData={
                left:document.querySelector('#inputRange').getBoundingClientRect().left,
                width:document.querySelector('#inputRange').getBoundingClientRect().width,
            }
            // console.log(e.clientY)
            console.log(document.querySelector('#inputRange').getBoundingClientRect().left)
            console.log('e.clientX: '+e.clientX)
            this.setState({ToolTipTranslateX:((-1)*(document.querySelector('#inputRange').getBoundingClientRect().left-e.clientX))})
            // console.log(inputRangeData.width)
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
                    addedColors.shift();
            }else{
                addedColors.splice(delIndex, 1);
            }

            console.log(addedColors);
            // this.setState({colorsList:['addedColors']});
            this.setState({colorsList:addedColors.slice(3,1)});
            setTimeout(()=>{
                this.setState({colorsList:addedColors});
            },10);
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



        const changeStateDragged=(target)=>{
            this.setState({dragged:target});
        }
        const changeStateDropped=(target)=>{
            this.setState({dropped:target});
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
                    onMouseOver={()=>{this.setState({showToolTip:true})}}
                    onMouseLeave={()=>{this.setState({showToolTip:false})}}
                />
                {
                    this.state.colorsList.length>0?
                    <div style={styles.colorListScrollabe} id='colorListScrollabe'>
                    {
                        this.state.colorsList.map((x,i)=>
                            <AddedColorDisplay
                                ID={i}
                                color={x.color}
                                startOnPercents={x.startOnPercents}
                                addedColors={addedColors}
                                delColor={delColor}
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



                {
                // this.state.showToolTip===true?
                    <ToolTip
                        inputRangeValue={this.state.inputRangeValue}
                        ToolTipTranslateX={this.state.ToolTipTranslateX}
                    />
                    // :null
            }



            </div>

            </React.Fragment>
        );
    }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);