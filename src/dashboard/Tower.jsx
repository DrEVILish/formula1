import React, { useState } from "react";
import ReactDOM from "react-dom";

import { useReplicant } from "use-nodecg";

import Condition from "./components/Condition.jsx";
import Timing from "./components/Timing.jsx";
import Session from "./components/Session.jsx";

const App = () => {
    const [sessionActive, setSessionActive] = useState(false);
    const [sessionTitle, setSessionTitle] = useReplicant("sessionTitle", []);

    return (
        <div>
            <h1>Timing Tower</h1>
            <Session
                sessionTitle={sessionTitle}
                setSessionTitle={setSessionTitle}
                sessionActive={sessionActive}
                setSessionActive={setSessionActive}
            ></Session>
            <Condition
                sessionTitle={sessionTitle}
                sessionActive={sessionActive}
                setSessionActive={setSessionActive}
            ></Condition>
            <Timing
                sessionTitle={sessionTitle}
                sessionActive={sessionActive}
                setSessionActive={setSessionActive}
            ></Timing>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
