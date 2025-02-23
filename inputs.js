const myName = document.getElementById("myName");
const months = document.getElementById("months");
const visited = document.getElementById("visited");
const meetings = document.getElementById("meetings");
const writers = document.getElementById("writers");
const sightseeing = document.getElementById("sightseeing");
const punctual = document.getElementById("punctual");
const coming = document.getElementById("coming");

myName.addEventListener("input", function () {
  if (this.value === "name") {
    this.style.border = "2px solid green";
    this.style.backgroundColor = "#ADFF2F";
    this.style.color = "green";
  } else {
    this.style.border = "2px solid red";
    this.style.color = "red";
  }
});

months.addEventListener("input", function () {
  if (this.value === "months") {
    this.style.border = "2px solid green";
    this.style.backgroundColor = "#ADFF2F";
    this.style.color = "green";
  } else {
    this.style.border = "2px solid red";
    this.style.color = "red";
  }
});

visited.addEventListener("input", function () {
  if (this.value === "visited") {
    this.style.border = "2px solid green";
    this.style.backgroundColor = "#ADFF2F";
    this.style.color = "green";
  } else {
    this.style.border = "2px solid red";
    this.style.color = "red";
  }
});

meetings.addEventListener("input", function () {
  if (this.value === "meetings") {
    this.style.border = "2px solid green";
    this.style.backgroundColor = "#ADFF2F";
    this.style.color = "green";
  } else {
    this.style.border = "2px solid red";
    this.style.color = "red";
  }
});

writers.addEventListener("input", function () {
  if (this.value === "writers") {
    this.style.border = "2px solid green";
    this.style.backgroundColor = "#ADFF2F";
    this.style.color = "green";
  } else {
    this.style.border = "2px solid red";
    this.style.color = "red";
  }
});

sightseeing.addEventListener("input", function () {
  if (this.value === "sightseeing") {
    this.style.border = "2px solid green";
    this.style.backgroundColor = "#ADFF2F";
    this.style.color = "green";
  } else {
    this.style.border = "2px solid red";
    this.style.color = "red";
  }
});

punctual.addEventListener("input", function () {
  if (this.value === "punctual") {
    this.style.border = "2px solid green";
    this.style.backgroundColor = "#ADFF2F";
    this.style.color = "green";
  } else {
    this.style.border = "2px solid red";
    this.style.color = "red";
  }
});

coming.addEventListener("input", function () {
  if (this.value === "coming") {
    this.style.border = "2px solid green";
    this.style.backgroundColor = "#ADFF2F";
    this.style.color = "green";
  } else {
    this.style.border = "2px solid red";
    this.style.color = "red";
  }
});
