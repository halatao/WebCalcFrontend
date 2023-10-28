import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Display from "./Components/Display.jsx";
import ToggleButton from "./Components/ToggleButton.jsx";
import History from "./Components/History.jsx";

function App() {
    const API = "https://localhost:7177/api/Example";
    const [firstNumber, setFirstNumber] = useState("0");
    const [firstNumberSet, setFirstNumberSet] = useState(false);
    const [secondNumber, setSecondNumber] = useState("");
    const [operator, setOperator] = useState("");
    const [decimalInserted, setDecimalInserted] = useState(false);
    const [operatorInserted, setOperatorInserted] = useState(false);
    const [result, setResult] = useState("");
    const [results, setResults] = useState([]);
    const [resultShown, setResultShown] = useState(false);
    const [toggleRealNum, setToggleRealNum] = useState(true);

    const handleNumberClick = (text) => {
        if(resultShown){
            setResultShown(false);
            setFirstNumber(text);
        }
        else{
            if(!firstNumberSet){
                if(firstNumber === "0"){
                    setFirstNumber(text);
                }
                else{
                    setFirstNumber(firstNumber+ text);
                }
            }
            else{
                setSecondNumber(secondNumber+text);
            }
        }
    };
    const handleCommaClick = () => {
            if (decimalInserted) {
                return;
            }
            if(!firstNumberSet){
                setFirstNumber(firstNumber + ".");
                setDecimalInserted(true);
            }
            else if(firstNumberSet){
                setSecondNumber(secondNumber + ".");
                setDecimalInserted(true);
            }
    }
    const handleOperationClick = (text) => {

        if (text === "+" || text === "-" || text === "*" || text === "/") {
            if (operatorInserted) {
                return;
            }
            setOperator(text);
            setOperatorInserted(false);
            setFirstNumberSet(true);
            setDecimalInserted(false);
        }
    }
    const resetExample = (resetFirstNumber) => {
        setResultShown(false);
        if(resetFirstNumber){
            setFirstNumber("0");
        }
        setFirstNumberSet(false);
        setSecondNumber("");
        setOperator("");
        setOperatorInserted(false);
        setDecimalInserted(false);
    }
    const calculate = () => {
        axios.post(API + "/CreateExample", {
            firstNumber: firstNumber,
            secondNumber: secondNumber,
            operation: operator,
            realNum: toggleRealNum
        }).then((response) => {
            setResult(response.data.result);
            fetchResults();
            setResultShown(true);
        });
    }

    const fetchResults = () => {
        axios.get(API + "/GetLastTenCalculations", {
            firstNumber: firstNumber,
            secondNumber: secondNumber,
            operation: operator
        }).then((response) => {
            console.log(response);
            setResults(response.data);
        });
    }

    function toggleRealNumber(){
        setToggleRealNum(!toggleRealNum);
    }

    useEffect(() => {
        if(!resultShown){
            resetExample(false);
        }
    }, [resultShown]);

    useEffect(() => {
        fetchResults();
    }, []);

    return (
        <>
            <div className="window">
                <div>
                    <div className="cell">
                        <History results={results}/>
                    </div>
                    <div className="cell">
                        <div className="BgWithOutline padding font-size">
                            <Display resultShown={resultShown} result={result} firstNumber={firstNumber} secondNumber={secondNumber} operator={operator} />
                        </div>
                        <div className="bg-blue padding asButton toggleButton border-radius font-size">
                            <ToggleButton toggle={toggleRealNumber} value={toggleRealNum}/>
                        </div>
                        <div className="grid-container">
                            <div className="grid-item" onClick={() => handleNumberClick("1")}>1</div>
                            <div className="grid-item" onClick={() => handleNumberClick("2")}>2</div>
                            <div className="grid-item" onClick={() => handleNumberClick("3")}>3</div>
                            <div className="grid-item" onClick={() => handleOperationClick("+")}>+</div>
                            <div className="grid-item" onClick={() => handleNumberClick("4")}>4</div>
                            <div className="grid-item" onClick={() => handleNumberClick("5")}>5</div>
                            <div className="grid-item" onClick={() => handleNumberClick("6")}>6</div>
                            <div className="grid-item" onClick={() => handleOperationClick("-")}>-</div>
                            <div className="grid-item" onClick={() => handleNumberClick("7")}>7</div>
                            <div className="grid-item" onClick={() => handleNumberClick("8")}>8</div>
                            <div className="grid-item" onClick={() => handleNumberClick("9")}>9</div>
                            <div className="grid-item" onClick={() => handleOperationClick("*")}>*</div>
                            <div className="grid-item" onClick={() => handleNumberClick("0")}>0</div>
                            <div className="grid-item" onClick={() => handleCommaClick(".")}>.</div>
                            <div className="grid-item bg-red" onClick={() => resetExample(true)}>C</div>
                            <div className="grid-item" onClick={() => handleOperationClick("/")}>/</div>
                        </div>
                        <div className="bg-blue padding asButton text-center border-radius font-size" onClick={()=>calculate() }>
                            Calculate
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
