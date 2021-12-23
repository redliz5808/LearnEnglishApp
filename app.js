const numberInput = document.getElementById("numOfNums");
const submitBtn = document.getElementById("submitBtn");
const errorMsg = document.getElementById("errorMsg");
const resultsContainer = document.getElementById("resultsContainer");
const lettersToStudyDiv = document.getElementById("lettersToStudy");
const currentLetterContainer = document.getElementById("currentLetterContainer");
const randomImageLetter = document.getElementById("randomImageLetter");
const randomizeBtn = document.getElementById("randomizeImageBtn");
const currentLetterSpan = document.getElementById("currentLetter");
const currentImageNameSpan = document.getElementById("currentImageName");
const image = document.getElementById("displayedImage");
let allLetters = [];
let allImages = {};

class EventData {
  constructor(eventType, eventTarget, eventTime) {
    this.eventType = eventType;
    this.eventTarget = eventTarget;
    this.eventTime = eventTime;
  }
}

let windowLoadObject = new EventData([], [], []);
let windowUnloadObject = new EventData([], [], []);
let generateEventData = new EventData([], [], []);
let letterEventData = new EventData([], [], []);

function storeLoadData(e) {
  windowLoadObject.eventType.push(e.type);
  windowLoadObject.eventTarget.push(e.target);
  windowLoadObject.eventTime.push(e.timeStamp);
  localStorage.setItem("windowLoad", JSON.stringify(windowLoadObject));
}

function storeUnloadData(e) {
  windowUnloadObject.eventType.push(e.type);
  windowUnloadObject.eventTarget.push(e.target);
  windowUnloadObject.eventTime.push(e.timeStamp);
  localStorage.setItem("windowUnload", JSON.stringify(windowUnloadObject));
}

function retrieveAlphabetData() {
  fetch("./utils/alphabet.json")
    .then((results) => results.json())
    .then((data) => {
      allLetters = data;
    });
}

function retrieveImageData() {
  fetch("./utils/images.json")
    .then((results) => results.json())
    .then((data) => {
      allImages = data;
    });
}

function initiateData(event) {
  retrieveAlphabetData();
  retrieveImageData();
  storeLoadData(event);
}

window.addEventListener("load", (e) => {
  initiateData(e);
});
window.addEventListener("unload", (e) => {
  storeData(e);
});

function showError() {
  errorMsg.style.display = "block";
}

function removeError() {
  setTimeout(() => {
    errorMsg.style.display = "none";
  }, 300);
}

function clearResults() {
  currentLetterContainer.style.display = "none";
  resultsContainer.style.display = "none";
  lettersToStudyDiv.textContent = "";
  image.src = "";
}

submitBtn.addEventListener("click", (e) => {
  clearResults();
  e.preventDefault();
  let numValue = numberInput.value;
  if (numValue < 1 || numValue > 26) {
    showError();
    setTimeout(removeError, 6000);
  } else {
    pickLetters(numValue);
  }
  generateEventData.eventType.push(e.type);
  generateEventData.eventTarget.push(e.target);
  generateEventData.eventTime.push(e.timeStamp);
  localStorage.setItem("generateData", JSON.stringify(generateEventData));
});

function pickLetters(num) {
  let randomLetters = [];

  if (num == allLetters.length) {
    randomLetters = allLetters;
  } else {
    for (let i = 0; i < num; i++) {
      let newLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
      while (randomLetters.includes(newLetter)) {
        newLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
      }
      randomLetters.push(newLetter);
    }
  }

  generateResults(randomLetters);
}

function generateResults(lettersArray) {
  let currentLetter = "";
  resultsContainer.style.display = "flex";

  generateButtons(lettersArray);

  function generateButtons(lettersArrayCopy) {
    lettersToStudyDiv.textContent = "";
    currentLetterSpan.innerHTML = currentLetter + "(" + currentLetter.toLowerCase() + ")";
    randomImageLetter.innerHTML = currentLetter + currentLetter.toLowerCase();
    for (let i = 0; i < lettersArrayCopy.length; i++) {
      let newBtn = document.createElement("button");
      newBtn.id = lettersArrayCopy[i];
      newBtn.innerHTML = lettersArrayCopy[i] + lettersArrayCopy[i].toLowerCase();
      newBtn.addEventListener("click", (e) => {
        changeCurrentLetter(lettersArrayCopy[i]);
        letterEventData.eventType.push(e.type);
        letterEventData.eventTarget.push(e.target);
        letterEventData.eventTime.push(e.timeStamp);
        localStorage.setItem("buttonData", JSON.stringify(letterEventData));
      });
      lettersToStudyDiv.appendChild(newBtn);
    }
  }

  function changeCurrentLetter(replacementLetter) {
    currentLetterContainer.style.display = "flex";
    currentLetter = replacementLetter;
    generateButtons(lettersArray);
    generateImage(currentLetter);
  }

  function generateImage(currentLetter) {
    let currentImagesArray = allImages[currentLetter];
    let currentImage = currentImagesArray[Math.floor(Math.random() * currentImagesArray.length)];
    
    if (currentImage.includes(".jpg")) {
      let imageName = currentImage.replace(".jpg", "");
      let imageNameCombined = imageName + " (" + imageName + ")";
      let imageNameCapitalized = imageNameCombined.charAt(0).toUpperCase() + imageNameCombined.slice(1);
      currentImageNameSpan.innerHTML = imageNameCapitalized;
    } else if (currentImage.includes(".png")) {
      let imageName = currentImage.replace(".png", "");
      let imageNameCombined = imageName + " (" + imageName + ")";
      let imageNameCapitalized = imageNameCombined.charAt(0).toUpperCase() + imageNameCombined.slice(1);
      currentImageNameSpan.innerHTML = imageNameCapitalized;
    }

    image.src = "./images/" + currentImage;
    image.alt = currentImage;
  }

  randomizeBtn.addEventListener("click", () => generateImage(currentLetter));
}
