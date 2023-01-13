import React from 'react';
import ReactDOM from 'react-dom/client';
import ColorsList from './components/ColorsList';
import DisplayGradient from './components/DisplayGradient';
import ToolTip from './components/ToolTip';
import SliderRange from './components/SliderRange';
import NewColor from './components/classWithObjects/NewColor';
import './index.css';

var gradientInfo=[],
inputsValueControlled=[];

class App extends React.Component{
    state={
        gradientInfo:gradientInfo,
        showToolTipS:false,
        rotateDeg:0,
        displayedGradient:'background:white;',
        toolTipX:0,
        toolTipY:0,
        inputsValueControlledState:inputsValueControlled,
    }
    // componentDidMount(){
    //     this.setState({showToolTipS:false});
    // }
    render(){
        const dispColor=()=>{
            let sendColor='background-color:'+gradientInfo[0].color+';background:linear-gradient('+this.state.rotateDeg+'deg';
            gradientInfo.map((x,i)=>sendColor+=','+x.color+' '+x.startsOnPercent);sendColor+=');';
            this.setState({displayedGradient:sendColor});
        }
        const addNewColor=(e)=>{
            let pickedColor=e.target.parentElement.querySelector('.pickedColor').value,
            newPercent=e.target.parentElement.querySelector('.percent').value;
            gradientInfo.push(new NewColor(gradientInfo.length, pickedColor, newPercent+"%"));
            inputsValueControlled.push(newPercent);
            dispColor();
        }
        const editColor=(e)=>{
            let IDo=e.target.parentElement.className;
            IDo=IDo.split(" ");
            IDo=IDo[0];
            if(e.target.type==="number"){
                inputsValueControlled[IDo]=e.target.value;
                gradientInfo[IDo].startsOnPercent=e.target.value+'%';
                this.setState({inputsValueControlledState:inputsValueControlled});
            }
            else if(e.target.type==="color"){
                gradientInfo[IDo].color=e.target.value;
            }
            this.setState({gradientInfo:gradientInfo});
            dispColor();
        }
        const copyText=(e)=>{
            let toCopy=document.querySelector('#stylesToCopy');
            toCopy.classList.remove('hidden');
            toCopy.focus();
            toCopy.select();
            document.execCommand('copy');
            toCopy.classList.add('hidden');
        }
        const showToolTip=(e)=>{
            let x=e.clientX,
            y=document.querySelector('#rotateDeg').getBoundingClientRect().top-55;
            this.setState({toolTipX:x,toolTipY:y});
        }
        const onMouseDownSlider=()=>{
            this.setState({showToolTipS:true});
        }
        const onMouseUpSlider=()=>{
            this.setState({showToolTipS:false});
        }
        const onChangeSlider=(e)=>{
            this.setState({rotateDeg:e.target.value});dispColor();
        }
        return(<div id='App'>
        <DisplayGradient displayedGradient={this.state.displayedGradient}/>
        <SliderRange
            showToolTip={showToolTip}
            dispColor={dispColor}
            onMouseDownSlider={onMouseDownSlider}
            onMouseUpSlider={onMouseUpSlider}
            onChangeSlider={onChangeSlider}
        />
        <input type="text" id="stylesToCopy" value={this.state.displayedGradient} className='hidden'/>
        <input type="button" value="Copy styles" onClick={copyText} id="copyStylesButton"/>
        <ColorsList
            inputsValueControlledState={this.state.inputsValueControlledState}
            inputsValueControlled={inputsValueControlled}
            dispColor={dispColor}
            editColor={editColor}
            inputsControl={editColor}
            addNewColor={addNewColor}
            gradientInfo={gradientInfo}
            gradientInfoState={this.state.gradientInfo}
            NewColor={NewColor}
            displayedGradient={this.state.displayedGradient}
        />
        <ToolTip x={this.state.toolTipX} y={this.state.toolTipY} deg={this.state.rotateDeg} show={this.state.showToolTipS}/>
    </div>);
    }
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);