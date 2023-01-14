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
            },
            inputs:{
                height:'25px',
                width:'auto',
                cursor:'move',
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
        const onDragStartF=(e)=>{
            console.log(this.props.ID);
            this.props.changeStateDragged(this.props.ID)
        }
        const onDragOverF=(e)=>{
            console.log(this.props.ID);
            this.props.changeStateDropped(this.props.ID)
        }
        const onDropF=(e)=>{
            let temporary=this.props.addedColors[this.props.dragged].color
            this.props.addedColors[this.props.dragged].color=this.props.addedColors[this.props.dropped].color;
            this.props.addedColors[this.props.dropped].color=temporary;
            this.props.changeColorsListState(this.props.addedColors.slice(3,1));
            setTimeout(()=>{
                this.props.changeColorsListState(this.props.addedColors);
            },0);
        }
        const delColor=(e)=>{
            let delIndex=parseInt(e.target.parentElement.className);
            if(delIndex===0){
                this.props.addedColors.shift();
            }else{
                this.props.addedColors.splice(delIndex, 1);
            }
            this.props.changeColorsListState(this.props.addedColors.slice(3,1));
            setTimeout(()=>{
                this.props.changeColorsListState(this.props.addedColors);
            },0);
        }
        return(
            <div id='AddedColorDisplay' style={styles.AddedColorDisplay} className={this.props.ID}>
                <input
                    style={styles.inputs}
                    type="button"
                    value="="
                    draggable="true"
                    onDragStart={onDragStartF}
                    onDragOver={onDragOverF}
                    onDragEnd={onDropF}
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
                    onClick={delColor}
                    />
            </div>
        );
    }
}

export default AddedColorDisplay;