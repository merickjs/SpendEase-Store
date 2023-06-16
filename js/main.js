import { productsFunc } from "./products-cart.js";
import { wishlistFunc } from "./wishlist.js";
window.onbeforeunload =  () => {
  const getData = (async () => {
    const response = await fetch("/js/data.json");
    const data = await response.json();
   data ? localStorage.setItem("products", JSON.stringify(data)) :[]
  })();

}

wishlistFunc()  
setTimeout(() => {
  productsFunc()
  
}, 2000);
import header from "./header.js";
import search from "./search.js";
