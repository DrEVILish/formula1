import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { useReplicant } from "use-nodecg";

const Lap = (props) => {
    const sessionTitle = props.sessionTitle;
    const sessionActive = props.sessionActive;

    const [lapCurrent, setLapCurrent] = useReplicant("lap", 1);
    const [lapTotal, setLapTotal] = useReplicant("lapTotal", 50);

    const setLap = (lap) => {
        if (lapTotal < lap) {
            setLapCurrent(lapTotal);
        } else {
            setLapCurrent(lap);
        }
    };

    return (
        <div>
            <div>
                Lap: {lapCurrent} Total Laps: {lapTotal}
            </div>
            <button
                onClick={() => {
                    setLap(lapCurrent + 1);
                }}
            >
                +
            </button>
            <button
                onClick={() => {
                    setLapCurrent(1);
                }}
            >
                Reset
            </button>
            <input
                type='number'
                min='10'
                max='80'
                value={lapTotal}
                onChange={(e) => {
                    setLapTotal(e.target.value);
                }}
            />
        </div>
    );
};

export default Lap;
