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
                        // this.state.colorLenght>0?

                        // ID={i}
                        // color={x.color}
                        // startOnPercents={x.startOnPercents}
                        // addedColors={addedColors}
                        // delColor={delColor}
                        // changeColorsListState={changeColorsListState}

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
                        // :null

                    }
            </div>
        );
    }
}

export default DisplayColorListArea;