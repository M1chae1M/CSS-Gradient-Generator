import React from 'react';
class AddNewColorOrEdit extends React.Component{
render(){
const {changePercents,value,canEdit,addNewColor,pickedColor,editColor,name,inputsControl,delColor,dragObject,dropObject,dragOverObject,noColors}=this.props;

let classes=name!==undefined?(name+' '):'';
classes+= 'AddNewColorOrEdit ';
classes+=Array.from(noColors).length>0?'':'noColors static';
return(

<div id='AddNewColorOrEdit' className={classes}>
{canEdit===true?
<input type="button" value="=" draggable="true"
onDragStart={dragObject}
onDragOver={dragOverObject}
onDragEnd={dropObject}
/>:
<input type="button" Style="opacity:0;"/>
}

<input type="color" className='pickedColor'
value={canEdit===true?pickedColor:null}
onChange={canEdit===true?editColor:null}/>

<input type="number" min="0" max="100" id='percent' className='percent'
value={value}
onChange={canEdit===true?inputsControl:changePercents}/>

<input type="button" value="%"/>

{canEdit===false?
<input type="button" value="Dodaj nowy kolor" onClick={addNewColor}/>:
<input type="button" value="Del" onClick={delColor}/>}

</div>);
}}
export default AddNewColorOrEdit;