function notice(type, content = "Message") {
  let noticeContent = document.querySelector("#notice-content");
  if (!noticeContent) {
    const div = document.createElement("div");
    div.id = "notice-content";
    document.body.appendChild(div);
    noticeContent = div;
  }
  const div = document.createElement("div");
  div.className = "notice-item";
  div.classList.add(`notice-${type}`);
  div.textContent = content;
  noticeContent.appendChild(div);
  setTimeout(() => {
    div.remove();
    if (!noticeContent.hasChildNodes()) {
      noticeContent.remove();
    }
  }, 5000);
}

notice.success = (content) => createNotice("success", content);
notice.error = (content) => createNotice("error", content);
notice.warning = (content) => createNotice("warning", content);

const notification = document.querySelector("#notification");
notification.addEventListener(
  "click",
  () => {
    const types = ["success", "error", "warning"];
    const index = (Math.random() * 3) ^ 0;
    notice(types[index], `Message ${types[index]}`);
  },
  false
);
