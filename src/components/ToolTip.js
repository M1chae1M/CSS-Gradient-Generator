import React from 'react';

class ToolTip extends React.Component{
    render(){
        const styles={
            ToolTip:{
                position:'absolute',
                left:'0px',
                transform:'translateX('+this.props.ToolTipTranslateX+'px)',
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