// const ul = document.getElementById("course-item-list");
// const lis = Array.from(ul.getElementsByTagName("li")).filter(li => {
//   return li.hasAttribute("data-id");
// });
// const pathname = location.href;
// const index = lis.findIndex(li => {
//   let href = li.firstElementChild.href;
//   return href === pathname;
// });
// const nextHref = lis[index + 1].firstElementChild.href;
window.onload = function () {
  const pathname = location.href;
  const nextPlayNum = parseInt(pathname.match(/\d{4}/)[0]) + 1;
  const nextHref = `https://course.itxueyuan.com/214/lesson/${nextPlayNum}/learn`;

  const video = document.getElementById("lesson-video-content_html5_api");
  console.log(pathname, video);
  video.addEventListener("canplay", function () {
    console.log(1);
    video.play();
    video.playbackRate = 2.0;
  });

  video.addEventListener("pause", function () {
    video.play();
  });

  video.addEventListener("ended", function () {
    location.href = nextHref;
  });
};
