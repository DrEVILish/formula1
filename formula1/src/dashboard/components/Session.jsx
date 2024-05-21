import React, { useState } from "react";
import ReactDOM from "react-dom";

import { useReplicant } from "use-nodecg";

import Lap from "./Lap.jsx";
import Duration from "./Duration.jsx";

const Session = (props) => {
    const sessionActive = props.sessionActive;
    const setSessionActive = props.setSessionActive;
    const sessionTitle = props.sessionTitle;
    const setSessionTitle = props.setSessionTitle;

    const raceStart = useReplicant("raceStart", false)[1];

    const sessions = ["FP1", "FP2", "FP3", "", "Q1", "Q2", "Q3", "", "RACE", "", "SQ1", "SQ2", "SQ3", "", "SPRINT"];
    const lappedSessions = ["RACE", "SPRINT"];

    const sessionType = () => {
        if (lappedSessions.includes(sessionTitle)) {
            return (
                <Lap
                    sessionTitle={sessionTitle}
                    sessionActive={sessionActive}
                    setSessionActive={setSessionActive}
                ></Lap>
            );
        } else {
            return (
                <Duration
                    sessionTitle={sessionTitle}
                    sessionActive={sessionActive}
                    setSessionActive={setSessionActive}
                ></Duration>
            );
        }
    };

    const startAndStop = () => {
        setSessionActive(!sessionActive);
        if (lappedSessions.includes(sessionTitle)) {
            raceStart(true);
        }
    };

    return (
        <div>
            <h2>
                Session: {sessionTitle} {sessionType()}
            </h2>
            <button onClick={startAndStop}>{sessionActive ? "Stop" : "Start"} Session</button>
            <br />
            {sessions.map((session) => {
                if (session == "") {
                    return <br />;
                }
                return (
                    <button
                        onClick={() => {
                            setSessionTitle(session);
                        }}
                    >
                        {session}
                    </button>
                );
            })}
        </div>
    );
};

export default Session;
