// Get the selected services and prices from the page
const selectedServices = document.querySelectorAll('.service.selected');
const jsonServices = [];

// Loop through each selected service
selectedServices.forEach(service => {
  const serviceName = service.querySelector('h2').textContent;
  const servicePrice = service.querySelector('.price').textContent;

  // Extract the numeric value from the price string
  const priceValue = parseFloat(servicePrice.match(/\d+/)[0]);

  // Create an object for the service
  const serviceObj = {
    service: serviceName,
    price: priceValue
  };

  // Add the service object to the JSON array
  jsonServices.push(serviceObj);
});

// Create a JSON object
const jsonData = {
  services: jsonServices
};

// Convert the JSON object to a string
const jsonString = JSON.stringify(jsonData, null, 2);

// Download the JSON file
const filename = 'selected_services.json';
const blob = new Blob([jsonString], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = filename;
link.click();
