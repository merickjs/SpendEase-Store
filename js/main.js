import { productsFunc } from "./products-cart.js";
import header from "./header.js";
import search from "./search.js";
document.addEventListener("DOMContentLoaded" ,() => {

window.onbeforeunload =  () => {
  const getData = (async () => {
    const response = await fetch("/js/data.json");
    const data = await response.json();
   data ? localStorage.setItem("products", JSON.stringify(data)) :[]
  })();

}

  productsFunc()
})