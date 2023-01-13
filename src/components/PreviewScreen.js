import React from 'react';

class PreviewScreen extends React.Component{
    render(){
        let backgroundGradient;
            if(Array.from(this.props.colorsList).length>1){
                backgroundGradient='linear-gradient('+this.props.inputRangeValue+'deg';
                this.props.colorsList.map((x,i)=>backgroundGradient+=','+x.color+' '+x.startOnPercents+'%');
                backgroundGradient+=')';
            }
            else{
                backgroundGradient=this.props.inputColorValue;
            }
            
        let backgroundColorF=(Array.from(this.props.colorsList).length>0)?
            this.props.colorsList[0].color:
                this.props.inputColorValue;

        const styles={
            PreviewScreen:{
                backgroundColor:backgroundColorF,
                background:backgroundGradient,
                display:'grid',
                width:'55vh',
                height:'55vh',
                boxShadow:'var(--borderColor) var(--box-shadow-x) var(--box-shadow-y)',
                borderRadius:'5px',
                border:'var(--box-shadow-color) 3px solid',
                // backgroundColor:this.props.backgroundColorF,
                // background:this.props.backgroundGradient,
                // boxShadow:'grey 3px 3px',
                // border:'solid black 1px',
            },
        }
        return(
            <div id='PreviewScreen' style={styles.PreviewScreen}></div>
        );
    }
}

export default PreviewScreen;