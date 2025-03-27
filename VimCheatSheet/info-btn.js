document.addEventListener("DOMContentLoaded", function() {
  const infoButton = document.getElementById("infoButton");
  const infoContent = infoButton.querySelector(".info-content");
  let hideTimeout;

  // 防止鼠标悬停时隐藏
  infoContent.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
  });

  infoContent.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      infoContent.classList.remove("show");
    }, 10000);
  });
}); 