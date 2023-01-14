import React from 'react';
import AddedColorDisplay from './AddedColorDisplay';

class DisplayColorListArea extends React.Component{
    render(){
        const styles={
            DisplayColorListArea:{

            },
        }
        return(
            <div id='DisplayColorListArea' style={styles.DisplayColorListArea}>
                {
                    this.props.colorsList.map((x,i)=>
                        <AddedColorDisplay
                            ID={i}
                            color={x.color}
                            startOnPercents={x.startOnPercents}
                            addedColors={this.props.addedColors}
                            delColor={this.props.delColor}
                            changeColorsListState={this.props.changeColorsListState}
                        />
                    )
                }
            </div>
        );
    }
}

export default DisplayColorListArea;