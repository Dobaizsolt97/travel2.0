import "./styles/styles.scss";
import "./styles/loader.scss";

import { handleSubmit, updateUi } from "./js/eventhandler";

const submitBtn = document.getElementById("submit");
const img = document.querySelector(".image-holder");
const textBox = document.querySelector(".text-holder");
const loadAnimation = document.querySelector(".lds-roller");

window.onload = () => {
  console.log("loaded");
  let search = JSON.parse(localStorage.getItem("search"));
  if (search) {
    updateUi(search);
  }
};
export { handleSubmit };
