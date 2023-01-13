import React from 'react';
import AddNewColorOrEdit from './AddNewColorOrEdit';

class ColorsList extends React.Component{

state={newPercent:0, copied:'',dropZone:''}

render(){
const {gradientInfo,gradientInfoState,NewColor,addNewColor,displayedGradient,editColor,inputsControl,inputsValueControlledState,inputsValueControlled,dispColor}=this.props;

const delColor=(e)=>{
    let IdO=parseInt(e.target.parentElement.className.split(" ")[0])
    gradientInfoState.splice(IdO,1);
    this.setState({gradientInfoState:gradientInfo, gradientInfo:gradientInfo});
    inputsValueControlled.splice(IdO,1);
    this.setState({inputsValueControlledState:inputsValueControlled})
    dispColor();
}

const changePercents=(e)=>{this.setState({newPercent:parseInt(e.target.value)});}

const dragObject=(e)=>{
    this.setState({copied:e.target});
}
const dragOverObject=(e)=>{
    this.setState({dropZone:e.target});
}
const dropObject=(e)=>{
let colorFrom,
colorTo;

colorFrom=parseInt(this.state.copied.parentElement.className.split(" ")[0])
colorTo=parseInt(this.state.dropZone.parentElement.className.split(" ")[0])
let temp=gradientInfo[colorTo].color;
gradientInfo[colorTo].color=gradientInfo[colorFrom].color;
gradientInfo[colorFrom].color=temp;
dispColor();
this.setState({gradientInfo:gradientInfo});
}

return(
<div>
<div id='ColorsList'>
{
gradientInfoState.map((x,i)=>
<AddNewColorOrEdit
    name={i}
    canEdit={true}
    delColor={delColor}
    inputsControl={inputsControl}
    noColors={gradientInfoState}
    value={inputsValueControlledState[i]}
    pickedColor={x.color}
    editColor={editColor}
    dragObject={dragObject}
    dropObject={dropObject}
    dragOverObject={dragOverObject}
/>)
}
</div>
<AddNewColorOrEdit
    addNewColor={addNewColor}
    displayedGradient={displayedGradient}
    changePercents={changePercents}
    value={parseInt(this.state.newPercent)}
    gradientInfo={gradientInfo}
    NewColor={NewColor}
    canEdit={false}
    noColors={gradientInfoState}
/>
</div>);}}
export default ColorsList;