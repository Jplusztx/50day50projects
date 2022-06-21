function delay(time = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
async function notice(type, content = "Message") {
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
  div.classList.add("notice-item-enter");
  noticeContent.appendChild(div);
  await delay(500);
  div.classList.remove("notice-item-enter");
  setTimeout(async () => {
    div.classList.add("notice-item-leave");
    await delay(500);
    div.remove();
    if (!noticeContent.hasChildNodes()) {
      noticeContent.remove();
    }
  }, 2000);
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
