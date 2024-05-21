"use strict";
import * as ReactDOM from "react-dom";
import React, { Component, useState, useEffect } from "react";
import _, { map, pluck } from "underscore";

require("babel-core");

import { Flipper, Flipped } from "react-flip-toolkit";

const sessionTitle = "P3";
const currentLap = 37;
const totalLap = 52;
const activeCondition = "";
const ending = false;

let conditionName;

function Title() {
    return (
        <div className='title'>
            <img src='img/f1_logo.svg' alt='F1' className='f1Logo' />
            <span className='sessionTitle'>{sessionTitle}</span>
        </div>
    );
}

function LapCounter() {
    return (
        <div className='lapCounter'>
            <p>
                LAP
                <span className='currentLap'>{currentLap}</span> / <span className='totalLap'>{totalLap}</span>
            </p>
        </div>
    );
}

function Conditions({ newConditionColor }) {
    switch (activeCondition) {
        case "greenflag":
            conditionName = "GREEN FLAG";
            newConditionColor("green");
            break;
        case "yellowflag":
            conditionName = "YELLOW FLAG";
            newConditionColor("yellow");
            break;
        case "redflag":
            conditionName = "RED FLAG";
            newConditionColor("red");
            break;
        case "safetycar":
            conditionName = "SAFETY CAR";
            newConditionColor("yellow");
            break;
        case "vsc":
            conditionName = "Virtual Safety Car";
            newConditionColor("yellow");
            break;
        default:
            newConditionColor("default");
            break;
    }

    let condition = (
        <div className='conditions'>
            <div className={activeCondition} data-ending={ending}>
                {conditionName}
            </div>
        </div>
    );

    return condition;
}

function PositionRank() {
    const [drivers, setDrivers] = useState([
        { abbr: "HAM", team: "mer", tyre: "M", timeDelta: 0.1 },
        { abbr: "ALO", team: "ast", tyre: "H", timeDelta: 1.262 },
        { abbr: "PER", team: "rbr", tyre: "S", timeDelta: 1.262 },
        { abbr: "VER", team: "rbr", tyre: "M", timeDelta: 1.262 },
        { abbr: "ALB", team: "wil", tyre: "H", timeDelta: 1.262 },
        { abbr: "BOT", team: "alf", tyre: "S", timeDelta: 1.262 },
        { abbr: "GAS", team: "alp", tyre: "M", timeDelta: 1.262 },
        { abbr: "HUL", team: "has", tyre: "S", timeDelta: 1.262 },
        { abbr: "LEC", team: "fer", tyre: "H", timeDelta: 1.262 },
        { abbr: "MAG", team: "has", tyre: "W", timeDelta: 1.262 },
        { abbr: "NOR", team: "mcl", tyre: "S", timeDelta: 0.1 },
        { abbr: "OCO", team: "alp", tyre: "H", timeDelta: 1.262 },
        { abbr: "PIA", team: "mcl", tyre: "M", timeDelta: 1.262 },
        { abbr: "RIC", team: "tau", tyre: "S", timeDelta: 1.262 },
        { abbr: "RUS", team: "mer", tyre: "I", timeDelta: 1.262 },
        { abbr: "SAI", team: "fer", tyre: "I", timeDelta: 1.262, cond: "IN PIT" },
        { abbr: "STR", team: "ast", tyre: "M", timeDelta: 1.262 },
        { abbr: "TSU", team: "tau", tyre: "H", timeDelta: 1.262 },
        { abbr: "ZHO", team: "alf", tyre: "S", timeDelta: 1.262 },
        { abbr: "SAR", team: "wil", tyre: "M", timeDelta: 1.262, cond: "OUT" }
    ]);

    const teams = {
        mer: { color: "#6CD3BF" },
        ast: { color: "#358C75" },
        rbr: { color: "#3671C6" },
        wil: { color: "#37BEDD" },
        fer: { color: "#F91536" },
        mcl: { color: "#F58020" },
        alp: { color: "#2293D1" },
        alf: { color: "#C92D4B" },
        tau: { color: "#5E8FAA" },
        has: { color: "#B6BABD" }
    };

    function swapPosition(i) {
        if (i == 0) return;
        var newDrivers = [...drivers];
        const temp = newDrivers[i];
        newDrivers[i] = newDrivers[i - 1];
        newDrivers[i - 1] = temp;
        setDrivers(newDrivers);
    }

    var timeDelta = 0;

    return (
        <Flipper flipKey={_.pluck(drivers, "abbr").join("")} className='drivers'>
            {drivers.map((driver, i) => {
                let d = Object.create(driver);
                console.log(d);
                if (i == 0) {
                    d.timeDelta = "LEADER";
                } else {
                    timeDelta += d.timeDelta;
                    d.timeDelta = "+" + timeDelta.toFixed(3);
                }
                let cond = null;
                if (driver.hasOwnProperty("cond")) {
                    cond = d.cond;
                    d.timeDelta = d.cond;
                    d.tyre = null;
                }
                d.teamColor = teams[d.team].color;
                var condColor;
                if (cond == "IN PIT") {
                    condColor = d.teamColor;
                }

                return (
                    <Flipped key={d.abbr} flipId={d.abbr}>
                        <div className='driver' onClick={(e) => swapPosition(i)} data-cond={cond}>
                            <span className='position'>{i + 1}</span>
                            <span className='teamLogo' style={{ color: d.teamColor }}>
                                {d.team}
                            </span>
                            <span className='driverAbbriv'>{d.abbr}</span>
                            <span className='timeDelta' style={{ color: condColor }}>
                                {d.timeDelta}
                            </span>
                            <span className={"tyres " + d.tyre}>{d.tyre}</span>
                        </div>
                    </Flipped>
                );
            })}
        </Flipper>
    );
}

function Tower() {
    const [conditionColor, setConditionColor] = React.useState("default");
    const newConditionColor = (color) => {
        setConditionColor(color);
    };

    return (
        <div className='root-elm'>
            <div className='tower' data-condition-color={conditionColor}>
                <header>
                    <Title />
                    <LapCounter />
                    <Conditions newConditionColor={newConditionColor} />
                </header>
                <main>
                    <PositionRank />
                </main>
            </div>
        </div>
    );
}

var app = document.getElementById("app");
ReactDOM.render(<Tower />, app);

// const lowerthird = document.getElementById("lowerthird");
// const name = document.getElementById("name");
// const helper = document.getElementById("helper");

// nodecg.listenFor("showLowerthird", (newVal) => {
//     name.innerHTML = newVal.name;
//     helper.innerHTML = newVal.name;
// });

// nodecg.listenFor("hideLowerthird", () => {
//     setTimeout(() => {
//         name.innerHTML = "|";
//         helper.innerHTML = "|";
//     }, 2000);
// });
