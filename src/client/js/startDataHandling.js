import { postData } from "./postData";

export function startDataHandling(city, date) {
  const objectData = {
    city: city,
    date: date
  };
  postData("http://localhost:8081/travel-info", objectData);
}
