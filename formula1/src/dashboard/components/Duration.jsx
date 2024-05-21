import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import { useReplicant } from "use-nodecg";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value; //assign the value of ref to the argument
    }, [value]); //this code will run when the value of 'value' changes
    return ref.current; //in the end, return the current ref value.
}

const Duration = (props) => {
    const sessionTitle = props.sessionTitle;
    const sessionActive = props.sessionActive;
    const setSessionActive = props.setSessionActive;

    const [remainingTime, setRemainingTime] = useReplicant("remainingTime", 3600);

    if (sessionTitle != usePrevious(sessionTitle)) {
        switch (sessionTitle) {
            case "FP1":
            case "FP2":
            case "FP3":
                setRemainingTime(60 * 60);
                break;
            case "Q1":
                setRemainingTime(18 * 60);
                break;
            case "Q2":
                setRemainingTime(15 * 60);
                break;
            case "Q3":
                setRemainingTime(12 * 60);
                break;
            case "SQ1":
                setRemainingTime(12 * 60);
                break;
            case "SQ2":
                setRemainingTime(10 * 60);
                break;
            case "SQ3":
                setRemainingTime(8 * 60);
                break;
        }
    }

    const minutes = Math.floor(remainingTime / 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    const seconds = (remainingTime - minutes * 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
    });

    useEffect(() => {
        if (sessionActive) {
            const timer = setTimeout(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
        if (remainingTime === 0) {
            setSessionActive(false);
        }
    }, [sessionActive, remainingTime]);

    return <div>Remaining: {minutes + ":" + seconds}</div>;
};

export default Duration;
