const ingForm = document.querySelector("#ing-forms");
const addIngButton = document.querySelector("#add-ingredient-input");

ingForm.addEventListener("submit", event => {
  event.preventDefault();
  // const inputNum = ingForm.querySelectorAll('input').length;
  const div = document.createElement("div");
  const HTMLelement = `
    <fieldset>
    <label for=''>Name</label>
    <input type='text' name='name'>
    <label for=''>Qty</label>
    <input type='text' name='qty'>
    <label for=''>Unit</label>
    <input type='text' name='unit'>
    </fieldset>
    `;
  div.innerHTML = HTMLelement;
  ingForm.appendChild(div.children[0]);
});
