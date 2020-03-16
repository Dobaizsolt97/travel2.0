import "./styles/styles.scss";
import { startDataHandling } from "./js/startDataHandling";
//import { recoverData } from "./js/recoverdata";
const submitBtn = document.getElementById("submit");
const city = document.getElementById("city").value;
const date = document.getElementById("date").value;
const img = document.querySelector(".image-holder");
submitBtn.addEventListener("click", event => {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const date = document.getElementById("date").value;
  if ((city, date)) {
    startDataHandling(city, date);
    setTimeout(recoverData, 1500);
  }
});

async function recoverData(url = "http://localhost:8081/travel-info") {
  const data = await fetch(url);
  const response = await data.json();
  console.log(response);
  updateUi(response);
}

function updateUi(data) {
  img.style.backgroundImage = `url("${data.image.imageLink}")`;
}
