var jsonServices = new Array();

function addService(id){
  
  const elm = document.getElementById('s'+id);
  var serviceObj = {
    "service": elm.querySelector('h2').textContent,
    "price": elm.querySelector('.price').textContent
  };
  jsonServices.push(serviceObj);

 
  localStorage.setItem("services",JSON.stringify(jsonData));
  console.log(localStorage.getItem("services"));
        

  
  
}
const jsonData = {
  services: jsonServices
};












