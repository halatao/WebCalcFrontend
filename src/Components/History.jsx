export default function(props){
    return (<div>
        History:
        {props.results.map((value) => (
            <div key={value.id}>{value.firstNumber} {value.operation} {value.secondNumber} = {value.result}</div>
        ))}
    </div>);
}