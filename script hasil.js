// Checkbox
const checkboxes = document.querySelectorAll('input[name="checked_enquiry_type"]:checked');

const values = [];

checkboxes.forEach((checkbox) => {
  values.push(checkbox.value);
});

console.log(values);

// Dropdown
const dropdown = document.querySelector('label[for="product"]');

const selectedValue = dropdown.textContent.trim();

console.log(selectedValue);

//Enquiry detail loop form
const elements = document.querySelectorAll('div.css-1uccc91-singleValue');

const values = [];

elements.forEach(element => {
  values.push(element.textContent.trim());
});

console.log(values[1]);

//comment 

const label = document.querySelector('textarea[name="comments"]');
const labelText = label.textContent.trim();
console.log(labelText);

//input
const inputEmail = document.querySelector('input[name="email"]');
const emailValue = inputEmail.value;

console.log(emailValue);


//temp
const companyInput = document.querySelector('input[name="company"]');
const companyValue = companyInput.value;

console.log(companyValue);

const inputAddress = document.querySelector('textarea[name="companyAddress"]');
const addressValue = inputAddress.value;

console.log(addressValue);