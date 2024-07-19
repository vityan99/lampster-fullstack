export function createElement(template) {
  const div = document.createElement("div");
  div.insertAdjacentHTML("beforeend", template);
  return div.firstElementChild;
}
