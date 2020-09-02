const songs = document.querySelectorAll("ul > li");
console.log(songs);

for (const song of songs) {
  song.classList.add("green");
  // song.setAttribute("class", "green");
}
