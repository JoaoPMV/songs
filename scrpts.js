const lyricsButton = document.getElementById("lyricsButton");
const lyrics = document.getElementById("lyrics");
const vocabularyButton = document.getElementById("vocabularyButton");
const vocabulary = document.getElementById("vocabulary");

lyricsButton.addEventListener("click", function () {
  if (lyrics.style.display === "none") {
    lyrics.style.display = "block";
    vocabulary.style.display = "none";
  } else {
    lyrics.style.display = "none";
  }
});

vocabularyButton.addEventListener("click", function () {
  if (vocabulary.style.display === "none") {
    vocabulary.style.display = "block";
    lyrics.style.display = "none";
  } else {
    vocabulary.style.display = "none";
  }
});
