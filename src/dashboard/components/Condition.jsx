import React from "react";
import ReactDOM from "react-dom";

import { useReplicant } from "use-nodecg";

const Condition = (props) => {
    const setSessionActive = props.setSessionActive;
    const [condition, setCondition] = useReplicant("activeCondition", "");
    const [endingCondition, setEndingCondition] = useReplicant("endingCondition", false);

    return (
        <div>
            <h2>Current Condition: {condition}</h2>
            <button
                onClick={(e) => {
                    setCondition("redflag");
                    setSessionActive(false);
                }}
            >
                Red Flag
            </button>
            <button
                onClick={(e) => {
                    setCondition("yellowflag");
                }}
            >
                Yellow Flag
            </button>
            <button
                onClick={(e) => {
                    setCondition("greenflag");
                }}
            >
                Green Flag
            </button>
            <button
                onClick={(e) => {
                    setCondition("safetycar");
                }}
            >
                Safety Car
            </button>
            <button
                onClick={(e) => {
                    setCondition("vsc");
                }}
            >
                VSC
            </button>
            <button
                onClick={(e) => {
                    setCondition("");
                }}
            >
                Clear
            </button>
        </div>
    );
};

export default Condition;
