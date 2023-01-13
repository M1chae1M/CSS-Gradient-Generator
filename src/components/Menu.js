import React from 'react';

class Menu extends React.Component{
    render(){
        const styles={
            Menu:{
                display:'grid',
                gridTemplateColumns:'auto 20% 10% 50%',
                // border:'solid yellow 1px',
                // gridGap:'-2px',
            },
        }
        return(
            <div id='Menu' style={styles.Menu}>
                    <input style={styles.inputs} type="color" onChange={this.props.changeColorInput} value={this.props.inputColorValue}/>
                    <input style={styles.inputs} type="number" onChange={this.props.changeNumberInput} value={this.props.inputNumberValue}/>
                    <input style={styles.inputs} type="button" value="%"/>
                    <input style={styles.inputs} type="button" value="Dodaj nowy kolor" onClick={this.props.addNewColor}/>
            </div>
        );
    }
}

export default Menu;