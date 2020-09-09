const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

window.addEventListener('load', getTime);
window.addEventListener('load', getDate);

function getTime() {
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var session = "AM";

    if (hour == 0) {
        hour = 12;
    } else if (hour == 12) {
        hour = 12;
        session = "PM";
    } else if (hour > 12) {
        hour = hour - 12;
        session = "PM";
    }

    minute = (minute < 10) ? "0" + minute : minute;

    var time = hour + ":" + minute + " " + session;
    document.getElementById("clock").innerText = time;

    setTimeout(getTime, 1000);
}

function getDate() {
    var date = new Date();
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();

    var currentDate = months[month] + " " + day + ", " + year;
    document.getElementById("date").innerText = currentDate;
}
