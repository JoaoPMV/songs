const aef2ep11 = document.getElementById("aef2ep11");
const aef2ep12 = document.getElementById("aef2ep12");
const aef2ep13 = document.getElementById("aef2ep13");
const textaef2ep11 = document.getElementById("textaef2ep11");
const textaef2ep12 = document.getElementById("textaef2ep12");
const textaef2ep13 = document.getElementById("textaef2ep13");

aef2ep11.addEventListener("click", function () {
  if (textaef2ep11.style.display === "none") {
    textaef2ep11.style.display = "block";
  } else {
    textaef2ep11.style.display = "none";
  }
});

aef2ep12.addEventListener("click", function () {
  if (textaef2ep12.style.display === "none") {
    textaef2ep12.style.display = "block";
  } else {
    textaef2ep12.style.display = "none";
  }
});

aef2ep13.addEventListener("click", function () {
  if (textaef2ep13.style.display === "none") {
    textaef2ep13.style.display = "block";
  } else {
    textaef2ep13.style.display = "none";
  }
});
