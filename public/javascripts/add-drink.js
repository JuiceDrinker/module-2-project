const ingForm = document.querySelector("#main-form #ing-forms");
const addIngButton = document.querySelector("#add-ingredient-input");
console.log(ingForm);
addIngButton.addEventListener("click", event => {
  event.preventDefault();
  console.log("hellooooooooooooooooooo :");
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
