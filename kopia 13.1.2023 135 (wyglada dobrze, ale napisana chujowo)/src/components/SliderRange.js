import React from 'react';
class SliderRange extends React.Component{
render(){
const {showToolTip,onMouseDownSlider,onMouseUpSlider,onChangeSlider}=this.props;
return(

<input id='rotateDeg' type="range" name="rotateDeg" min="0" max="360"
    onMouseMove={showToolTip}
    onMouseDown={onMouseDownSlider}
    onMouseUp={onMouseUpSlider}
    onChange={onChangeSlider}
/>

)}}
export default SliderRange;