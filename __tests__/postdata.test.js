import "regenerator-runtime";
import { postData } from "../src/client/js/postData";
let url = "http://localhost:8081/travel-info";
const objectData = {
  city: "Madrid",
  date: "03 - 03 - 2020"
};

test("it should post data from the website to the server", () => {
  postData(url, objectData).then(result => {
    expect(result).toMatch("added");
  });
});
