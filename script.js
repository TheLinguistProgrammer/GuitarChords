const output = document.getElementById("output");
const generateChordBtn = document.getElementById("generate-chord-btn");

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
    output.innerHTML += HTML;
}


const amChord = {
    "chordName": "Am",
    "fingering": "x02210"
};

const dmChord = {
    "chordName": "Dm",
    "fingering": "xx0231"
};

const dChord = {
    "chordName": "D",
    "fingering": "xx0232"
};

const aChord = {
    "chordName": "A",
    "fingering": "002220"
};

const fChord = {
    "chordName": "F",
    "fingering": "133211"
};

const bmChord = {
    "chordName": "Bm",
    "fingering": "x24432"
}

const allChords = [
    amChord, dmChord, dChord, aChord, fChord, bmChord
];

// console.log(array2HTML(chord2Matrix(dChord)));

function showRandomChord() {
    output.innerHTML = ``;
    const randInt = Math.floor(Math.random() * allChords.length);
    chord2Matrix2HTML(allChords[randInt]);
}

generateChordBtn.addEventListener("click", showRandomChord);