const output = document.getElementById("output");
const generateChordBtn = document.getElementById("generate-chord-btn");
const timer = document.getElementById("timer");
const chordNameContainer = document.getElementById("chord-name-container");
const chordsInaRow = document.getElementById("chords-in-a-row");
const timePerChord = document.getElementById("time-per-chord");

function chord2Matrix2HTML (chordObject) {
    const {fingering, chordName} = chordObject;
    // String to Matrix //
    let allArrays = [];
    for (let i=0; i<fingering.length; i++) {
        let myArray = Array(6).fill("");
        if (fingering[i] === 'x') {
            myArray[0] = 'x';
        } else {
            for (let j=0; j<myArray.length; j++) {
                if (j === Number(fingering[i])) {
                    myArray[j] = fingering[i];
            }
        }
    }
        allArrays.push(myArray);
    }
    const allArraysT = allArrays[0].map((_, colIndex) => allArrays.map(row => row[colIndex]));
    
    // Matrix to HTML // 
    const matrix = allArraysT;
    let HTML = "";
    HTML = HTML.concat(`<div class="chord-container"><table class="chord"><caption>${chordName}</caption>`);
    arrayCounter = 0;
    // Itterating through the rows
    for (let array of matrix) {
        counter = 0;
        // First row (fret-board)
        if (arrayCounter === 0) {
            for (let cell of array) {
                if (counter === 5) {
                    if (cell === '0') {
                        HTML = HTML.concat(`<td class="invisible hollow"><p class="point"></p></td>`);
                    } else if (cell === 'x') {
                        HTML = HTML.concat(`<td class="invisible hollow"><p class="cross"></p></td>`);
                    }else {
                        HTML = HTML.concat(`<td class="invisible hollow"></td>`)
                    }
                    HTML = HTML.concat(`<td class="invisible bar-index"></td>`);
                } else {
                    if (cell === '0') {
                        HTML = HTML.concat(`<td class="hollow"><p class="point"></p></td>`);
                    } else if (cell === 'x') {
                        HTML = HTML.concat(`<td class="hollow"><p class="cross"></p></td>`);
                    }
                    else {
                    HTML = HTML.concat(`<td class="hollow"></td>`);
                }
                // console.log(counter);
                counter++;
            }
            }
    } else {
        for (let cell of array) {
            if (counter === 5) {
                if (cell !== "") {
                    HTML = HTML.concat(
                    `<td class="invisible"><p class="point"></p></td>`);
                } else {
                    HTML = HTML.concat(`<td class="invisible"></td>`);
                }
                HTML = HTML.concat(`<td class="invisible bar-index"></td>`);
            } else {
            if (cell !== "") {
                HTML = HTML.concat(`<td><p class="point"></p></td>`);
            } else {
                HTML = HTML.concat(`<td></td>`);
            }
            // console.log(counter);
            counter++;
            }
        }            
    }
        arrayCounter++;
        HTML = HTML.concat(`<tr>`);
        HTML = HTML.concat(`</tr>`);
    }
    HTML = HTML.concat(`</table class="chord"></div class="chord-container">`)
    // console.log(HTML);
    chordNameContainer.innerText = chordName;
    output.innerHTML += HTML;
}

// GET DATA FROM JSON FILE //
// all chords below
// https://d2xkd1fof6iiv9.cloudfront.net/images/guitar-chords/guitar-chord-chart.png
const fileLink = "https://raw.githubusercontent.com/TheLinguistProgrammer/datafiles/refs/heads/main/chordData.json";
let chordList = [];
try {
    fetch(fileLink)
    .then(res => res.json())
    .then((data) => {
        for (let item of data) {
            chordList.push(item);
        }
    });
} catch (e) {
    console.log(e);
}

function showRandomChord() {
    output.innerHTML = ``;
    const randInt = Math.floor(Math.random() * chordList.length);
    chord2Matrix2HTML(chordList[randInt]);
}


function countdown() {
    let countVal = Number(timePerChord.value);
    timer.innerText = countVal;
    countVal--;
    setInterval(
        () => {
        if (countVal >= 0) {
            timer.innerText = countVal;
            countVal--;
        } else {
            return;
        }
    }, 1000);
    showRandomChord();
}


function repeatCountdown() {
    let num = Number(chordsInaRow.value);
    setInterval(
        () => {
        if (num > 0) {
            //console.log(num);
            countdown();
            num--;
        } else {
            return;
        }
    }, (Number(timePerChord.value) * 1000))
    countdown();
    num--;
    }

// generateChordBtn.addEventListener("click", showRandomChord);
generateChordBtn.addEventListener("click", repeatCountdown);
