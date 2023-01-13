
import React from "react";
import ReactDOM from "react-dom";

const tab=['3','4','5'];
class App extends React.Component{
state={
tab:tab,
}
render(){
return(<div>

{
tab.map((x,i)=><input type="number" value={x} className={i} onChange={(e)=>{
console.log('ID: '+e.target.className);
tab[e.target.className]=e.target.value;
this.setState({tab:tab});
console.log(tab);
console.log(this.state.tab);
}}/>)
}

</div>);
}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);