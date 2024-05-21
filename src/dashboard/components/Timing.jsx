import React from "react";
import ReactDOM from "react-dom";

import { useReplicant } from "use-nodecg";

const Timing = () => {
    const [timing, setTiming] = useReplicant("timing", []);
    const [drivers, setDrivers] = useReplicant("drivers", []);

    return (
        <div>
            <h2>Timing</h2>
            {drivers.map((driver) => {
                return <p>{driver.name}</p>;
            })}
        </div>
    );
};

export default Timing;
