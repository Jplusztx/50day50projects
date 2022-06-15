const createFormControl = (() => {
  const ids = new Set();
  return (id, inputType = "text", require = true) => {
    if (ids.has(id)) {
      return;
    }
    ids.add(id);
    const content = document.createElement("div");
    content.className = "form_control";
    const input = document.createElement("input");
    input.type = inputType;
    input.id = id;
    input.required = require;
    const label = document.createElement("label");
    label.htmlFor = id;
    content.appendChild(input);
    content.appendChild(label);
    let i = 0;
    for (const letter of id) {
      const span = document.createElement("span");
      span.style.setProperty("--i", ++i);
      span.textContent = i === 1 ? letter.toUpperCase() : letter.toLowerCase();
      label.appendChild(span);
    }
    return content;
  };
})();

document.body.appendChild(createFormControl("Email"));
document.body.appendChild(createFormControl("Password", "password"));
