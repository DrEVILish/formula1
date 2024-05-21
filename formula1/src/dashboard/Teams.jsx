import React, { useState } from "react";
import ReactDOM from "react-dom";

import { useReplicant } from "use-nodecg";

const Teams = () => {
    const [teams, setTeams] = useReplicant("teams", []);

    const [teamName, setTeamName] = useState("");
    const [teamColor, setTeamColor] = useState("#001122");

    const addTeam = () => {
        let newTeams = [...teams];
        if (newTeams.findIndex((team) => team.name === teamName) !== -1) {
            alert("Team name already in use");
        } else {
            let team = {};
            team.id = crypto.randomUUID();
            team.name = teamName;
            team.color = teamColor;
            newTeams.push(team);
            setTeams(newTeams);
        }
    };

    const clearList = () => {
        setTeams([]);
    };

    const removeTeam = (id) => {
        let newTeams = [...teams];
        const i = newTeams.findIndex((team) => team.id === id);
        console.log(i);
        newTeams.splice(i, 1);
        setTeams(newTeams);
    };

    const colerInvert = {
        color: "white",
        mixBlendMode: "difference"
    };

    return (
        <div>
            <h1>Teams</h1>
            {teams.map((team, i) => {
                return (
                    <div style={{ backgroundColor: team.color }}>
                        <span style={colerInvert}>{team.name}</span>
                        <button
                            onClick={() => {
                                removeTeam(team.id);
                            }}
                        >
                            X
                        </button>
                    </div>
                );
            })}
            <input
                type='text'
                value={teamName}
                onChange={(e) => {
                    setTeamName(e.target.value);
                }}
            ></input>
            <input
                type='color'
                value={teamColor}
                onChange={(e) => {
                    setTeamColor(e.target.value);
                }}
            ></input>
            <button onClick={() => addTeam()}>Add</button>
            <button onClick={() => clearList()}>Clear</button>
        </div>
    );
};

const Drivers = () => {
    const [drivers, setDrivers] = useReplicant("drivers", []);
    const [teams, setTeams] = useReplicant("teams", []);

    const [driverFirstName, setDriverFirstName] = useState();
    const [driverLastName, setDriverLastName] = useState();
    const [driverTeamId, setDriverTeamId] = useState();
    const [driverNumber, setDriverNumber] = useState();

    const addDriver = () => {
        let newDrivers = [...drivers];
        if (
            newDrivers.findIndex(
                (driver) => driver.firstName + driver.lastName === driverFirstName + driverLastName
            ) !== -1
        ) {
            alert("Duplicate driver name");
        } else if (newDrivers.findIndex((driver) => driver.number === driverNumber) !== -1) {
            alert("Duplicate driver number");
        } else {
            let driver = {};
            driver.id = crypto.randomUUID();
            driver.firstName = driverFirstName;
            driver.lastName = driverLastName;
            driver.teamId = driverTeamId;
            driver.number = driverNumber;
            newDrivers.push(driver);
            setDrivers(newDrivers);
        }
    };

    const clearList = () => {
        setDrivers([]);
    };

    const removeDriver = (id) => {
        let newDrivers = [...drivers];
        const i = newDrivers.findIndex((driver) => driver.id === id);
        console.log(i);
        newDrivers.splice(i, 1);
        setDrivers(newDrivers);
    };

    const fullName = (driver) => {
        return driver.firstName + " " + driver.lastName;
    };

    return (
        <div>
            <h1>Drivers</h1>
            {drivers.map((driver) => {
                return (
                    <div className='driver'>
                        {fullName(driver)} driving for {driver.team}
                        <button
                            onClick={() => {
                                removeDriver(driver.id);
                            }}
                        >
                            X
                        </button>
                    </div>
                );
            })}

            <input
                type='text'
                placeholder='First Name'
                value={driverFirstName}
                onChange={(e) => {
                    setDriverFirstName(e.target.value);
                }}
            ></input>
            <input
                type='text'
                placeholder='Last Name'
                value={driverLastName}
                onChange={(e) => {
                    setDriverLastName(e.target.value);
                }}
            ></input>
            <input
                type='number'
                min='0'
                max='99'
                placeholder='Driver Number'
                value={driverNumber}
                onChange={(e) => {
                    setDriverNumber(e.target.value);
                }}
            ></input>
            <select name='team' value={driverTeamId} onChange={(e) => setDriverTeamId(e.target.value)}>
                {teams.map((team) => {
                    return <option value={team.id}>{team.name}</option>;
                })}
            </select>
            <button onClick={() => addDriver()}>Add</button>
            <button onClick={() => clearList()}>Clear</button>
            {/* 
            <label htmlFor={id}>Please specify:</label>
            <input type='text' id={id} value={input} onInput={(e) => setInput(e.target.value)}></input>
             */}
        </div>
    );
};

const App = () => {
    return (
        <div>
            <Teams></Teams>
            <Drivers></Drivers>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
