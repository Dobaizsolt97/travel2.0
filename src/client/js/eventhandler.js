import { startDataHandling } from "./startDataHandling";
import { dateChecker } from "./datechecker";

const img = document.querySelector(".image-holder");
const textBox = document.querySelector(".text-holder");
const loadAnimation = document.querySelector(".lds-roller");

function handleSubmit(event) {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const date = document.getElementById("date").value;
  if (city && dateChecker(date)) {
    startDataHandling(city, date);
    showLoad();
    //time necesaty for a smooth animation and also to recive the data, better UX
    setTimeout(stopLoad, 2400);
    setTimeout(recoverData, 2401);
  }
}
//make a call to our server for the stored data
async function recoverData(url = "http://localhost:8081/travel-info") {
  const data = await fetch(url);
  const response = await data.json();

  updateUi(response);
  sendToStorrage(response);
}
//update the Ui with the recived data drom the backend
function updateUi(data) {
  const { city, country, image, response, when } = data;
  img.style.backgroundImage = `url("${image.imageLink}")`;
  textBox.innerHTML = `<h4>${city}, ${country}</h4>
  <p>${when == "this week" ? "~this week~" : `~${when}~`}</p>
  <p>Expected weather:</p>
  <p>highest temperature: <strong>${
    response.high
  }</strong>    Lowest: <strong>${response.low}</strong> </p>
  <p>${response.summary} </p>`;
}
//start the animation
function showLoad() {
  textBox.innerHTML = "";
  loadAnimation.style.display = "inline-block";
}
//stop the animation
function stopLoad() {
  loadAnimation.style.display = "none";
}
//store localy the response
function sendToStorrage(object) {
  localStorage.setItem("search", JSON.stringify(object));
}

export { handleSubmit, updateUi };
