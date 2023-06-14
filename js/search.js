import { addToCart, cartSubtotal } from "./products-cart.js";
let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));
const searchFunc = () => {
  const searchInput = document.querySelector(".search-input");
  const ModalSearch = document.querySelector(".modal-wrapper");
  const searchProductWrapper = document.querySelector(".search-product-list");
  const SingleProductWrapper = document.querySelector(
    ".single-product .wrapper"
  );
  const SingleProduct = document.querySelector(".single-product");

  let filtered = [];
  let value = "";
  searchInput.addEventListener("input", (e) => {
    value = e.target.value;
    value = value.trim().toLowerCase();
    filtered = products.filter((item) =>
      item.name.trim().toLowerCase().includes(value)
    );

    if (filtered.length < 1) {
      searchProductWrapper.innerHTML = `<p class="text-2xl p-4">No products found</p>`;
    } else {
      filtered.forEach((product) => {
        let result = "";
        result += `
  <li
class="search-product-item flex relative justify-center items-center flex-col gap-y-1 w-1/4  mb-9"
data-id=${product.id}>
<a class="border border-[#f2f2f2]">
<img src=${product.img} class="w-[50.75rem] bg-[#f3f3f3] object-contain" />
<img
src=${product.hoverimg}
class="w-[50.75rem] object-contain absolute top-0 opacity-0 hover:opacity-100 transition-opacity bg-[#f3f3f3] duration-200"
/>
<p class="product-name p-4 text-center font-medium">${product.name}</p>
<p class="product-price p-2 text-center text-red-500">$${product.price.toFixed(
          2
        )}</p>
</a>
</li>
  `;
        searchProductWrapper.innerHTML = result;
      });
    }
    if (filtered.length > 0) {
      const productItem = document.querySelectorAll(".search-product-item");

      productItem.forEach((productItem) => {
        const id = productItem.dataset.id;
        productItem.addEventListener("click", (e) => {
          let findFiltered = filtered.find((item) => item.id === Number(id));
          console.log(filtered.length);

          let product = findFiltered;

          let result = "";
          result += `
      <div class="product-image flex items-center bg-[#f2f2f2] w-max">
      <img src=${product.img} class="lg:w-[90rem] w-80 pointer-events-none">
      </div>
      <div class="product-info flex flex-col ">
      <div class="product-name text-3xl pt-3">${product.name}</div>
      
      <div class="product-reviews text-xs py-2">
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star"></i>
      </div>
      <span class="text-xs">2 reviews</span>
      <div class="product-price text-2xl font-medium py-5">$${product.price.toFixed(
        2
      )}</div>
      <div class="product-description text-sm text-[#555555] pr-4 py-2 w-60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse aliquam totam quis modi consequatur, voluptates sint excepturi.</div>
      <div class="quantity-addtocart py-3 flex gap-4">
      <input type="number"  id="" class="quantity w-20 p-2 border outline-none" min="1" value="1">
      <button  class=" single-addToCart disabled:opacity-50 disabled:cursor-no-drop uppercase bg-black text-sm text-white p-4 w-48 rounded-[40px]">add to cart</button>
      
      <button class="single-product-close text-3xl text-[#555555] hover:text-black pr-1 absolute lg:right-3 md:right-[115px] right-[585px] md:top-2 top-auto"><i class="bi bi-x pointer-events-none"></i></button>
      
      </div>
      </div>
          `;

          SingleProductWrapper.innerHTML = result;

          ModalSearch.classList.toggle("-translate-y-[149rem]");
          SingleProduct.classList.remove("invisible");
          const CloseSingleProductBtn = document.querySelector(
            ".single-product-close"
          );
          if (CloseSingleProductBtn) {
            CloseSingleProductBtn.addEventListener("click", () => {
              SingleProduct.classList.add("invisible");
            });
          }
          const addToCartBtn = document.querySelectorAll(".single-addToCart");
          const quantityInput = document.querySelectorAll(".quantity");
          cart = JSON.parse(localStorage.getItem("cart"));
          addToCartBtn.forEach((button) => {
            const incart = cart.find((item) => item.id === Number(id));
            if (id) {
              if (incart) {
                button.setAttribute("disabled", "disabled");
              } else {
                button.addEventListener("click", () => {
                  quantityInput.forEach((input) => {
                    let value = input.value;
                    cart.push({ ...findFiltered, quantity: value });
                  });
                  localStorage.setItem("cart", JSON.stringify(cart));
                  button.setAttribute("disabled", "disabled");
                  addToCart();
                  cartSubtotal();
                });
              }
            }
          });
        });
      });
    }
  });
};
export default searchFunc();
