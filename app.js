//test worten ((erstelle meh worter fur das ep))
const commonWords = [
"time",
"year",
"people",
"way",
]; //https://the-unl.com/100-most-common-nouns-in-english-93 benutzte chatgpt um "" und , zwischen worten enzufugen.



const typedKeys = [];
const matchedWords = [];
let prevMatchedWords = [];


function animationEndHandler(e) {
  if (matchedWords.includes(e.target)) {
    matchedWords.splice(matchedWords.indexOf(e.target), 1);
  }
  e.target.remove();
}//animation aufraumen


function createWord() {
  const container = document.querySelector(".container");
  const word = document.createElement("div");
  word.style.left = Math.random() * 100 + "px"; 
  word.style.marginTop = "10px"; //ist das erlaubt????
  word.className = "type-word";
  word.innerText = commonWords[Math.floor(Math.random() * commonWords.length)];
  word.addEventListener("animationend", animationEndHandler);
  container.appendChild(word);

  return word;
}//holt worter und platziert sie zufallig im container


function displayTypedKeys(typedKeys) {
  let str = typedKeys.join("");
  const display = document.querySelector(".display");
  display.innerHTML = `<h1>${str}<h1>`;
}//zeigt die eingabe im element .display an und mach sie fett

function highlightWord(e) {
  console.log("matched words");
  matchedWords.forEach((word) => {
    console.log(word.innerText); 
  }); 
  if (e.key === "Backspace") { 
    typedKeys.pop();
  } else if (e.key === "Enter") {
    matchedWords.forEach((word) => {
      if (word.innerText === typedKeys.join("")) {
        word.remove();
      }
    }); //arrays
    
    //so viele else if aaaa schnief schnieff

    matchedWords.length = 0;
    typedKeys.length = 0;
  } else if (/^[a-zA-Z]$/.test(e.key)) {
    typedKeys.push(e.key);
  } //nur buchstaben erlaubt!!! und leert die arrays

  displayTypedKeys(typedKeys); 

  const words = document.querySelectorAll(".type-word");
  matchedWords.length = 0;
  words.forEach((word) => {
    const regex = new RegExp("^" + typedKeys.join(""), "i"); //loopdieloop
    word.innerHTML = word.innerText.replace(
      regex,
      `<span class="highlight">${typedKeys.join("")}</span>`
    );
    if (
      regex.test(word.innerText) &&
      !matchedWords.includes(word) &&
      typedKeys.length !== 0
    ) {
      matchedWords.push(word);
    }
  });
  console.log(typedKeys);
} //updating ich weis kaum was ich hier mache, RESEARCH!! STOPPEN SIE DAS KOPIEREN VON STACK OVERFLOW

window.addEventListener("keyup", highlightWord); //rufende funktion


const myInterval = setInterval(() => {
  createWord();
}, Math.random() * 1000 + 2000); //erzeuge worter in zufallingen intervallen

setTimeout(() => {
  clearInterval(myInterval);
  console.log("game stopped");
}, 15000); //verlangere es zet im endprodukt


//todo
//Verhindern sie das auftreten von duplikaten (veilleicht fugen sie einfach mehr worther hinzu, um mein unfahigkeiten zu verberger schniefff)
//fugen sie interessante funktionen hinzu wie das loschen des gesamten bretts oder dan einfrieren der zeit