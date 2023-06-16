import  wishlistFunc  from "./wishlist.js";
let cart = [];
const products =localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")): []

const productFunc = () => {
  const productWrapper = document.querySelectorAll(".products-list");

  let result = "";
  products.forEach((item) => {
    result += `
    <li
    class="splide__slide splide-slide product-item flex flex-col w-1/4 h-full relative"
  >
    <div class="product-img cursor-pointer bg-white">
      <img
        src=${item.img}
        class="w-[28rem] h-[23.6875rem] bg-[#f3f3f3] object-contain"
      />
      <img
        src=${item.hoverimg}
        class="w-[28rem] h-[23.6875rem] bg-[#f3f3f3] object-contain absolute top-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
    <div
      class="discount w-12 h-6 bg-red-600 top-3 text-sm left-5 text-white rounded-full flex justify-center items-center absolute"
    >
      -${item.discount}%
    </div>

    <div
      class="product-links   absolute opacity-0 -right-12  top-12 gap-y-2 flex flex-col"
>
      <button data-id="${item.id}"
        class="add-to-wishlist disabled:opacity-50 disabled:cursor-no-drop w-10 h-10 bg-white text-black rounded-full flex justify-center items-center hover:bg-black hover:text-white"
      >
        <i class="bi bi-heart text-lg pointer-events-none"></i>
      </button>

      <button
        class="open-single w-10 h-10 bg-white text-black rounded-full flex justify-center items-center hover:bg-black hover:text-white"
      data-id=${item.id} >
        <i class="bi bi-eye text-lg pointer-events-none"></i>
      </button>

      <button
        class="add-to-cart disabled:opacity-50 disabled:cursor-no-drop  w-10 h-10 bg-white text-black rounded-full flex justify-center items-center hover:bg-black hover:text-white"
      data-id=${item.id} >
        <i class="bi bi-cart text-lg pointer-events-none"></i>
      </button>
    </div>

    <div
      class="product-info flex flex-col items-center justify-center border-2 border-[#f2f2f2]"
    >
      <p class="product-name text-left font-semibold py-2">${item.name}</p>
      <div class="product-star text-xs text-gray-800 py-2">
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i>
      </div>
      <p class="product-price py-3 text-red-500">$${item.price.toFixed(2)}</p>
    </div>
  </li>

    `;
    productWrapper.forEach((element) => {
      element.innerHTML = result;
    });
  });
  wishlistFunc();
};

 const productRoute = () => {
  const productItem = document.querySelectorAll(".product-item");
  const products = JSON.parse(localStorage.getItem("products"));
  const SingleProduct = document.querySelector(".single-product");
  const SingleProductWrapper = document.querySelector(
    ".single-product .wrapper"
  );
  let cart = JSON.parse(localStorage.getItem("cart"));

  productItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      const productid = e.target.dataset.id;
      localStorage.setItem("productId", JSON.stringify(productid));
      let result = "";

      Array.from(products).find((product) => {
        if (product.id == productid) {
          result += `
   

<div class="product-image flex items-center bg-[#f2f2f2] w-max">
<img src=${product.img} class="lg:w-[90rem] w-80">
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
        }
      });
      const OpenSingleProductBtn = document.querySelectorAll(".open-single");
      OpenSingleProductBtn.forEach((button) => {
        button.addEventListener("click", () => {
          SingleProduct.classList.remove("invisible");
        });
      });
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
        const incart = cart.find((item) => item.id === Number(productid));

        if (productid) {
          if (incart) {
            button.setAttribute("disabled", "disabled");
          } else {
            button.addEventListener("click", (e) => {
              quantityInput.forEach((input) => {
                let value = input.value;
                const findProduct = products.find(
                  (product) => product.id === Number(productid)
                );
                cart.push({ ...findProduct, quantity: value });
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
};

export const addToCart = () => {
  const products = JSON.parse(localStorage.getItem("products"));
  const cartContainer = document.querySelector(".cart-container");
  const addToCartBtn = document.querySelectorAll(".add-to-cart");
  const fastCargo = document.querySelector(".fast-cargo-bar");
  const fastCargoText = document.querySelector(".fast-cargo-text");
  const cartCount = document.querySelector(".cart-count")

  addToCartBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      const incart = cart.find((item) => item.id === id);

      if (incart) {
        button.setAttribute("disabled", "disabled");
      } else {
        const findProduct = products.find((product) => product.id === id);
        cart.push({ ...findProduct, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        button.setAttribute("disabled", "disabled");
        generateCartHTML();
        cartSubtotal();
      }
    });
  });

  const deleteCart = () => {
    const deleteCartBtn = document.querySelectorAll(".delete-cart");

    deleteCartBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.id);
        cart = cart.filter((item) => item.id !== id);
        generateCartHTML();
        localStorage.setItem("cart", JSON.stringify(cart));
        cartSubtotal();
      });
    });
  };

  const checkCart = () => {
    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="flex flex-col items-center">
          <h2 class="text-lg font-medium py-5">Your Cart is empty</h2>
          <a href="/shop" class="p-2 rounded-[40px] text-sm my-4 w-40 bg-black text-white capitalize text-center">Return to shop</a>
        </div>
      `;

      fastCargo.classList.remove("w-80");
      fastCargoText.classList.remove("animate-bounce");
      fastCargoText.innerHTML = `
Free Shipping for all orders over $100.00!`;
    }
  };

  const generateCartHTML = () => {
    let result = "";
    cart.forEach((item) => {
      result += `
        <div class="cart-product flex gap-x-4 px-6 items-center border-b border-gray-300 py-3 relative">
          <div class="product-img bg-[#f2f2f2] w-40 h-full">
            <img src=${item.img} class="w-40">
          </div>
          <div class="product-info flex flex-col gap-2">
            <p class="product-name text-sm">${item.name}</p>
            <div class="price text-sm text-red-500">$${item.price.toFixed(
              2
            )}</div>
            <input type="number" id="product-quantity" readonly class="w-16 p-2 border outline-none" min="1" value=${
              item.quantity
            }>
          </div>
          <button class="delete-cart absolute right-4 text-xl" data-id=${
            item.id
          }>
            <i class="bi bi-trash pointer-events-none"></i>
          </button>
        </div>
      `;
    });

    result += `
      <div class="subtotal bg-white h-0 border-t border-gray-300 absolute bottom-0 w-full mt-8">
        <div class="subtotal-header flex justify-between mx-4 mb-8">
          <h1 class="p-5 font-medium text-lg">Subtotal</h1>
          <p class="subtotal-price text-lg p-5"></p>
        </div>

        <div class="term-conditions flex flex-col gap-5">
          <div class="flex gap-2 ml-12 items-center">
            <input type="checkbox" id="term" class="h-4 w-4 accent-black">
            <label for="term">I agree with <a href="/" class="underline">Term & Conditions</a></label>
          </div>
          <button class="w-[25rem] p-4 opacity-50 bg-black text-sm text-white uppercase rounded-[2.5rem] mx-8 mb-6 self-center">Proceed to checkout</button>
        </div>
      </div>
    `;

    cartContainer.innerHTML = result;
    cartCount.innerHTML = cart.length
    deleteCart();
    checkCart();
  };

  let cart = [];
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }

  generateCartHTML();
  cartSubtotal();
};
export const cartSubtotal = () => {
  const subtotal = document.querySelector(".subtotal-price");
  const fastCargo = document.querySelector(".fast-cargo-bar");
  const fastCargoText = document.querySelector(".fast-cargo-text");
  const termConditions = document.querySelector(".term-conditions input");
  const proceedBtn = document.querySelector(".term-conditions button");
  const quantity = document.querySelectorAll("#product-quantity");
  let cart = JSON.parse(localStorage.getItem("cart"));
  let totalPrice = 0;

  quantity.forEach((button, index) => {
    const productQuantity = button.value;
    const productPrice = cart[index].price;
    totalPrice += productQuantity * productPrice;
  });
  if (subtotal) {
    subtotal.innerHTML = `$${totalPrice.toFixed(2)}`;
  }
  if (totalPrice >= 100) {
    fastCargo.classList.add("w-80");
    fastCargoText.innerHTML = "Congratulations, your shipping is free!";
    fastCargoText.classList.add("animate-bounce");
  } else {
    fastCargo.classList.remove("w-80");
    fastCargoText.classList.remove("animate-bounce");
    fastCargoText.innerHTML = "Free Shipping for all orders over $100.00!";
  }

  if (termConditions) {
    termConditions.addEventListener("change", (e) => {
      if (e.target.checked && cart.length !== 0) {
        proceedBtn.classList.remove("opacity-50");
        proceedBtn.removeAttribute("disabled");
      } else {
        proceedBtn.classList.add("opacity-50");
        proceedBtn.setAttribute("disabled", "disabled");
      }

      proceedBtn.addEventListener("click", () => {
        alert("Thanks for looking at my site.");
      });
    });
  }
};
  const  productsFunc = () => {
  productFunc();
  addToCart();
  productRoute();
  cartSubtotal();
};

  export default productFunc()