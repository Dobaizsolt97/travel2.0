export function dateChecker(date) {
  let d = new Date();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  //converting data to an accepted format
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  let currDate = d.getFullYear() + "-" + month + "-" + day;
  let unixTimestampnow = (new Date(`${currDate}`).getTime() / 1000).toFixed(0);
  let unixTimestampfuture = (new Date(`${date}`).getTime() / 1000).toFixed(0);
  if (unixTimestampfuture - unixTimestampnow < 0) {
    return false;
  } else {
    return true;
  }
}
