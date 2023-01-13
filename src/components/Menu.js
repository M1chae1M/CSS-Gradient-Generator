import React from 'react';

class Menu extends React.Component{
    render(){
        const styles={
            Menu:{
                display:'grid',
                gridTemplateColumns:'20% 20% 10% 50%',
                // gridTemplateColumns:'1fr 1fr 0.5fr 2.5fr',
                // border:'solid yellow 1px',
                // gridGap:'-2px',
            },
            inputs:{
                boxShadow:'var(--box-shadow-color) var(--box-shadow-x) var(--box-shadow-y)',
                borderRadius:'5px',
                width:'auto',
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