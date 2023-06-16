import { productsFunc } from "./products-cart.js";
import header from "./header.js";
import search from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
window.onbeforeunload = () =>{
  
  const getData =  () => {
    fetch('/js/data.json')
    .then(response => response.json())
    .then(data => localStorage.setItem("products",JSON.stringify(data))
    )
    .catch(error => console.error(error));
  }
  getData()
}

})
productsFunc()
