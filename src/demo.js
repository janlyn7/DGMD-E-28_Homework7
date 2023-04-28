import { useState } from 'react';
import { useEffect } from 'react';
//import App from "./App";


function Form() {
    const [n1, setn1] = useState(0);
    const [n2, setn2] = useState(0);

    return (<div>
        <input type='text' name='num1' value={n1} onChange={ (e)=> setn1(e.target.value) }> </input>
        <input type='text' name='num2' value={n2} onChange={ (e)=> setn2(e.target.value) }> </input>
    </div>);

}

function Result() {
    return (<div> result </div>);
}

export function MyApp(){

    return (<div>
        <Form />
        <Result />
        </div>);

}
