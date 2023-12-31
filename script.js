const fileInput = document.getElementById("file-input");
const availableFieldsSelect = document.getElementById("available-fields");
const selectedFieldsSelect = document.getElementById("selected-fields");
const productTable = document.getElementById("product-table");
const addFieldButton = document.getElementById("add-field-button");
const removeFieldButton = document.getElementById("remove-field-button");
let person = {};
let field = [];
selectedFieldsSelect.addEventListener("change", displayDataInTable);

fileInput.addEventListener("change", (event) => {
  availableFieldsSelect.innerHTML = "";
  selectedFieldsSelect.innerHTML = "";
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = (event) => {
    const parsedData = JSON.parse(event.target.result);

    const availableFields = Object.keys(parsedData.products[12]); 
    availableFields.forEach((field) => {
      const option = document.createElement("option");
      option.text = field;
      option.value = field;
      availableFieldsSelect.add(option);
    });


    addFieldButton.addEventListener("click", () => {
      const selectedOptions = availableFieldsSelect.selectedOptions;
      for (const option of selectedOptions) {
        availableFieldsSelect.remove(option);
        selectedFieldsSelect.add(option);
        field.push(option);
      }
    });

    removeFieldButton.addEventListener("click", () => {
      const selectedOptions = selectedFieldsSelect.selectedOptions;
      for (const option of selectedOptions) {
        selectedFieldsSelect.remove(option);
        availableFieldsSelect.add(option);
        field = field.filter((kp) => kp !== option);
      }
    });


    const productsArray = Object.values(parsedData.products);


    productsArray.sort((a, b) => b.popularity - a.popularity);

    person = productsArray;

    displayDataInTable(productsArray);
  };
  reader.readAsText(file);
});

function displayDataInTable(data) {

  data = person;
  productTable.innerHTML = "";


  if (selectedFieldsSelect.selectedOptions) {
    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");

    for (const option of selectedFieldsSelect.selectedOptions) {
      const headerCell = document.createElement("th");
      headerCell.textContent = option.text;
      headerRow.appendChild(headerCell);
    }
    tableHeader.appendChild(headerRow);
    productTable.appendChild(tableHeader);


    const tableBody = document.createElement("tbody");


    for (const productKey in data) {
      const product = data[productKey];
      const tableRow = document.createElement("tr");


      for (const optionKey in selectedFieldsSelect.selectedOptions) {

        const option = selectedFieldsSelect.selectedOptions[optionKey];
        console.log(typeof product["title"]);
        const tableCell = document.createElement("td");
        tableCell.textContent = product[String(option.value)];
        tableRow.appendChild(tableCell);
      }

      tableBody.appendChild(tableRow);
    }

    productTable.appendChild(tableBody);
  }
}
