import { productsFunc } from "./products-cart.js";
import header from "./header.js";
import { wishlistFunc } from "./wishlist.js";
import search from "./search.js";
window.onbeforeunload =  () => {
  const getData = (async () => {
    const response = await fetch("/js/data.json");
    const data = await response.json();
   data ? localStorage.setItem("products", JSON.stringify(data)) :[]
  })();

}

wishlistFunc()  
productsFunc()
