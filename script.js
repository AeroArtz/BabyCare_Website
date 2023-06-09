
const selectedServices = document.querySelectorAll('.service.selected');
const jsonServices = [];

selectedServices.forEach(service => {
  const serviceName = service.querySelector('h2').textContent;
  const servicePrice = service.querySelector('.price').textContent;

  const priceValue = parseFloat(servicePrice.match(/\d+/)[0]);

 
  const serviceObj = {
    service: serviceName,
    price: priceValue
  };

  
  jsonServices.push(serviceObj);
});


const jsonData = {
  services: jsonServices
};


const jsonString = JSON.stringify(jsonData, null, 2);


const filename = 'selected_services.json';
const blob = new Blob([jsonString], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = filename;
link.click();
