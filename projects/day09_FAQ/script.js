const faqs = document.querySelectorAll(".faq");
faqs.forEach((faq) => {
  faq.querySelector(".faq_toggle").addEventListener(
    "click",
    () => {
      faq.classList.toggle("faq__active");
    },
    false
  );
});
