var jsonServices = new Array();

function addService(id){
  
  const elm = document.getElementById('s'+id);
  var serviceObj = {
    "service": elm.querySelector('h2').textContent,
    "price": elm.querySelector('.price').textContent,
    "id" : id
  };
  jsonServices.push(serviceObj);

 
  localStorage.setItem("services",JSON.stringify(jsonData));
  
        

  
  
}
const jsonData = {
  services: jsonServices
};












