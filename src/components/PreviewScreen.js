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
                // backgroundColor:this.props.backgroundColorF,
                backgroundColor:backgroundColorF,
                display:'grid',
                width:'55vh',
                height:'55vh',
                // background:this.props.backgroundGradient,
                background:backgroundGradient,
                boxShadow:'grey 3px 3px',
            },
        }
        return(
            <div id='PreviewScreen' style={styles.PreviewScreen}></div>
        );
    }
}

export default PreviewScreen;