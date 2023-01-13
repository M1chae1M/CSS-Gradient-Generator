import React from 'react';

class AddedColorDisplay extends React.Component{
    state={
        inputNumberValue:this.props.startOnPercents,
        inputColorValue:this.props.color,
    }
    // componentDidUpdate(){
    //     this.setState({inputColorValue:this.props.startOnPercents,
    //         inputNumberValue:this.props.color
    //     })
    // }
    render(){
        const styles={
            AddedColorDisplay:{

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
                    type="color"
                    value={this.state.inputColorValue}
                    onChange={changeColorInput}/>
                <input
                    type="number"
                    value={this.state.inputNumberValue}
                    onChange={changeNumberInput}
                    // onClick={()=>{this.forceUpdate()}}
                />
                <input
                    type="button"
                    value="del"
                    onClick={this.props.delColor}
                />
            </div>
        );
    }
}

export default AddedColorDisplay;