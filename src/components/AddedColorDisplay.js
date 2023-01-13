import React from 'react';

class AddedColorDisplay extends React.Component{
    state={
        inputNumberValue:this.props.startOnPercents,
        inputColorValue:this.props.color,
    }
    render(){
        const styles={
            AddedColorDisplay:{
                borderBottom:'solid var(--borderColor) 1px',
                maxHeight:'100px',
                minHeight:'30px',
                height:'35px',
                display:'grid',
                gridTemplateColumns:'10% 20% 40% 10%',
                alignItems:'center',
                justifyContent:'center',
                // justifyItems:'center',
                // padding:'3px',
                // verticalAlign:'middle',
                // boxShadow:'var(--borderColor) 2px 2px',
            },
            inputs:{
                height:'25px',
                width:'auto',
            },
        }
        const changeColorInput=(e)=>{
            let changePercentsIndex=parseInt(e.target.parentElement.className);
            this.props.addedColors[changePercentsIndex].color=e.target.value;
            this.props.changeColorsListState(this.props.addedColors);
            this.setState({inputColorValue:e.target.value});
        }
        const changeNumberInput=(e)=>{
            let changePercentsIndex=parseInt(e.target.parentElement.className);
            this.setState({inputNumberValue:parseInt(e.target.value)});
            this.props.addedColors[changePercentsIndex].startOnPercents=e.target.value;
            this.props.changeColorsListState(this.props.addedColors);
        }
        return(
            <div id='AddedColorDisplay' style={styles.AddedColorDisplay} className={this.props.ID}>
                <input
                    style={styles.inputs}
                    type="button"
                    value="="
                />
                <input
                    style={styles.inputs}
                    type="color"
                    value={this.state.inputColorValue}
                    onChange={changeColorInput}/>
                <input
                    style={styles.inputs}
                    type="number"
                    value={this.state.inputNumberValue}
                    onChange={changeNumberInput}
                />
                <input
                    style={styles.inputs}
                    type="button"
                    value="del"
                    onClick={this.props.delColor}
                />
            </div>
        );
    }
}

export default AddedColorDisplay;