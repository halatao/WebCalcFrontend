export default function (props){
    if(props.value){
        return (
            <div onClick={()=>props.toggle()}>
                Real
            </div>
        );
    }
    else{
        return (
            <div onClick={()=>props.toggle()}>
                Complex
            </div>
        );
    }
}