/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = "❚ ❚";
  } else {
    video.pause();
    toggle.textContent = "►";
  }
}
function buttonSkip(e) {
  if (this.dataset.skip == -10) {
    video.currentTime -= 10;
  } else if (this.dataset.skip == 25) {
    video.currentTime += 25;
  }
}
function barUpdate(e) {
  progressBar.style.flexBasis = `${(this.currentTime / this.duration) * 100}%`;
  if (progressBar.style.flexBasis == "100%") {
    video.pause();
    toggle.textContent = "►";
  }
}
function volumeChanger(e) {
  // console.log(this.name);
  if (this.name == "volume") {
    video.volume = this.value;
  } else {
    video.playbackRate = this.value;
  }
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
skipButtons.forEach((button) => button.addEventListener("click", buttonSkip));
ranges.forEach((range) => {
  range.addEventListener("click", volumeChanger);
  range.addEventListener("mousemove", volumeChanger);
});
toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", barUpdate);

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
