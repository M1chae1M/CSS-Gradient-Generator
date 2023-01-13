import React from 'react';
class DisplayGradient extends React.Component{
render(){
const {displayedGradient}=this.props;
return(<div id='DisplayGradient' Style={displayedGradient}></div>);
}}
export default DisplayGradient;