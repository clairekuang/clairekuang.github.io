var d = new Date();
document.getElementById("year").innerHTML = d.getFullYear();
document.getElementById("time").innerHTML = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

