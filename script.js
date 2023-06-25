
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

let checkoutItems = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', function() {
    const addButtons = document.getElementsByClassName('add');
    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', addToCheckout);
    }
});

function addToCheckout(event) {
    const serviceElement = event.target.parentNode;
    const serviceName = serviceElement.querySelector('h2').innerText;
    const price = getPrice(serviceElement.querySelector('.price').innerText);

    checkoutItems.push({ serviceName, price });
    totalPrice += price;

    updateCheckout();
}

function updateCheckout() {
    const checkoutList = document.getElementById('checkout-list');
    const totalPriceElement = document.getElementById('total-price');

    checkoutList.innerHTML = '';
    checkoutItems.forEach((item) => {
        const li = document.createElement('li');
        li.innerText = `${item.serviceName} - AED ${item.price}`;
        checkoutList.appendChild(li);
    });

    totalPriceElement.innerText = 'Total: AED ' + totalPrice;
}

function getPrice(priceString) {
    return parseInt(priceString.replace('AED ', ''), 10);
}
