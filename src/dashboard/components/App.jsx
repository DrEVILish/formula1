const activeCondition = document.getElementById("condition");
// const repPeople = nodecg.Replicant("LowerThirdsPeople", { defaultValue: [] });
// const repActiveID = nodecg.Replicant("repActiveID", { defaultValue: null });

// const speakersArea = document.querySelector(".people");

// var people = [];
// var activeID;

function setCondition(cond) {
    nodecg.sendMessage("setCondition", cond);
    activeCondition.innerText = cond;
    console.log(cond);
    // render();
}

// function hide() {
//     nodecg.sendMessage("hideLowerthird");
//     repActiveID.value = null;
//     render();
// }

// function add() {
//     const newPerson = {
//         name: name.value
//     };
//     if (name.value === "") {
//         name.invalid = true;
//     } else {
//         if (!people) {
//             people = [newPerson];
//         } else {
//             people.push(newPerson);
//         }
//         repPeople.value = people;
//         name.value = "";
//     }
// }

// function remove(id) {
//     if (people.length == 1) {
//         people = [];
//     } else {
//         people.splice(id, 1);
//     }
//     repPeople.value = people;
// }

// repPeople.on("change", (value) => {
//     people = value;
//     render();
// });

// repActiveID.on("change", (value) => {
//     activeID = value;
//     render();
// });

// const render = () => {
//     if (people) {
//         renderList(people);
//     }
// };

// const renderList = (people) => {
//     // Clear element contents every re-render
//     while (speakersArea.firstChild) {
//         speakersArea.removeChild(speakersArea.firstChild);
//     }

//     if (people.length > 0) {
//         people.forEach((person, index) => {
//             // Creating person nodes
//             const containerNode = document.createElement("div");
//             containerNode.classList.add("row");

//             const showButton = document.createElement("button");
//             showButton.classList.add("btn");
//             showButton.classList.add("col-3");

//             if (activeID == index) {
//                 showButton.appendChild(document.createTextNode("Hide"));
//                 showButton.classList.add("btn-warning");
//                 showButton.addEventListener("click", () => {
//                     hide();
//                 });
//             }
//             if (activeID == null) {
//                 showButton.appendChild(document.createTextNode("Show"));
//                 showButton.classList.add("btn-success");
//                 showButton.addEventListener("click", () => {
//                     show(index);
//                 });
//             }

//             const personData = document.createElement("button");
//             personData.classList.add("btn");
//             personData.classList.add("btn-dark");
//             personData.classList.add("col");
//             personData.classList.add("no-click");
//             personData.appendChild(document.createTextNode(person.name));

//             const removeButton = document.createElement("button");
//             removeButton.classList.add("btn");
//             removeButton.classList.add("btn-danger");
//             removeButton.classList.add("col-2");
//             removeButton.appendChild(document.createTextNode("X"));

//             containerNode.appendChild(showButton);
//             containerNode.appendChild(personData);
//             containerNode.appendChild(removeButton);
//             speakersArea.appendChild(containerNode);

//             // Binding a removal to every button
//             removeButton.addEventListener("click", () => {
//                 remove(index);
//             });
//         });
//     }
// };
