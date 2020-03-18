import "./styles/styles.scss";
import "./styles/loader.scss";
import { startDataHandling } from "./js/startDataHandling";
import { dateChecker } from "./js/datechecker";
//import { recoverData } from "./js/recoverdata";

const submitBtn = document.getElementById("submit");
const city = document.getElementById("city").value;
const date = document.getElementById("date").value;
const img = document.querySelector(".image-holder");
const textBox = document.querySelector(".text-holder");
const loadAnimation = document.querySelector(".lds-roller");
submitBtn.addEventListener("click", event => {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const date = document.getElementById("date").value;
  if (city && dateChecker(date)) {
    startDataHandling(city, date);
    showLoad();
    setTimeout(stopLoad, 2400);
    setTimeout(recoverData, 2401);
  }
});

async function recoverData(url = "http://localhost:8081/travel-info") {
  const data = await fetch(url);
  const response = await data.json();
  console.log(response);
  updateUi(response);
}

function updateUi(data = localInfo) {
  const { city, country, image, response, days, when } = data;
  img.style.backgroundImage = `url("${image.imageLink}")`;
  textBox.innerHTML = `<h4>${city}, ${country}</h4>
  <p>${when == "this week" ? "this week" : `${when}`}</p>
  <p>Expected weather</p>
  <p>High: <strong>${response.high}</strong>  Low:<strong>${
    response.low
  }</strong> </p>
  <p>${response.summary} </p>`;
}
function showLoad() {
  textBox.innerHTML = "";
  loadAnimation.style.display = "inline-block";
}
function stopLoad() {
  loadAnimation.style.display = "none";
}
