var registrationId = window._cdpEventFunction.md5(new Date().toString());
  
var inputEmail = document.querySelector('input[name="email"]');
var emailValue = inputEmail.value;
  
var inputName = document.querySelector('input[name="name"]');
var nameValue = inputName.value;

var inputPhone = document.querySelector('input[name="phone"]');
var phoneValue = inputPhone.value;
  
var companyInput = document.querySelector('input[name="company"]');
var companyValue = companyInput.value;
  
var country = document.querySelector('div.css-1uccc91-singleValue');
var countryValue = country.textContent.trim();


var props = {
  extra: {
       identify_event: "staging_antsomi_registration_success",
       identify_time: window._cdpEventFunction._cdpGetLeadTime()
       },
  items: [],
  dims: {
       customers: {
          id: registrationId,
          name: nameValue,
          phone: phoneValue,
          company: companyValue,
          country: countryValue,
          }                                                   
       }
};

web_event.track("test_action - Aris", "test category - Aris", props);