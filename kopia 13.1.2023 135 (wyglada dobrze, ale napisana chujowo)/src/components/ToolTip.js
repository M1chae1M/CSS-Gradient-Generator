import React from 'react';
class ToolTip extends React.Component{
render(){
const {x,y,deg,show}=this.props;
let allstyles, z, NAME=show===false?'hidden':'', toolW=document.querySelector('#ToolTip')?document.querySelector('#ToolTip').getBoundingClientRect().width:null,maxX=document.querySelector('#rotateDeg')?document.querySelector('#rotateDeg').getBoundingClientRect().left:null,maxX2=document.querySelector('#rotateDeg')?document.querySelector('#rotateDeg').getBoundingClientRect().right:null;

    if(x>maxX&&x<maxX2){
        allstyles='left:'+x+'px;top:'+(y+20)+'px;'
    }
    else if(x<maxX&&x<maxX2){
        z=maxX-(toolW/2)
        allstyles='left:'+z+'px;top:'+(y+20)+'px;'  
    }
    else if(x>maxX&&x>maxX2){
        z=maxX2-(toolW/2)
        allstyles='left:'+z+'px;top:'+(y+20)+'px;'  
    }


return(<div id='ToolTip' Style={allstyles} className={NAME}>{deg}</div>);
}}
export default ToolTip;