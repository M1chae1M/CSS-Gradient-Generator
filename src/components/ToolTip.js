import React from 'react';

class ToolTip extends React.Component{
    render(){
        const styles={
            ToolTip:{
                position:'absolute',
                left:'0px',
                width:'40px',
                textAlign:'center',
                backgroundColor:'var(--background-color)',
                color:'black',
                borderRadius:'5px',
                border:'solid 3px var(--borderColor)',
                zIndex:1410,
                top:document.querySelector('#inputRange').getBoundingClientRect().top+30,
                transform:'translateX('+(this.props.ToolTipTranslateX-20)+'px)',
            },
        }
        return(
            <div id='ToolTip' style={styles.ToolTip}>
                {this.props.inputRangeValue}
            </div>
        );
    }
}

export default ToolTip;