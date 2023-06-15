let products = JSON.parse(localStorage.getItem("products"));

let wishlist = []
const wishlistCount = document.querySelector(".wishlist-count")

const addToWishlist = () => {
    const addToWishlistBtn = document.querySelectorAll(".add-to-wishlist");
  wishlist = localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : []
    addToWishlistBtn.forEach((button) => {
      const id = button.dataset.id;
      const findWish = products.find((product) => product.id === Number(id));
      

        const incart =   wishlist.find((wish) => wish.id === Number(id)) 
        if (incart) {
          button.setAttribute("disabled", "disabled");
        } else {
          button.addEventListener("click", () => {
            wishlist.push(findWish);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            button.setAttribute("disabled", "disabled");
            wishlistCount.innerHTML = wishlist.length
          });
        }
      
      });
    
    removeFromWishlist()  
    displayWishlist()
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
wishlistCount && wishlist ?     wishlistCount.innerHTML = wishlist.length : "";

};

const displayWishlist = () => {
const wishlistWrapper = document.querySelector(".wishlist-wrapper")
const wishlistdesc= document.querySelector(".wishlist-desc")



wishlist = JSON.parse(localStorage.getItem("wishlist"));
let result ="";
if(wishlist){
wishlist.forEach((item) => {
  if(wishlistWrapper){
  result+= `
  <li
  class="  product-item flex flex-col w-[20rem] h-full relative"
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
      class=" remove-from-wishlist w-10 h-10 bg-white text-black rounded-full flex justify-center items-center hover:bg-black hover:text-white"
    >
      <i class="bi bi-x text-lg pointer-events-none"></i>
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

  wishlistWrapper.innerHTML = result;

  removeFromWishlist()
  }
  if(wishlistWrapper){
  wishlistdesc.innerHTML = `
  <div class="flex justify-center items-center gap-1">
  <a href="/" class="text-center">Home</a>
  <span>/</span>
  <a class="text-[#555555]">Wishlist</a>
  `}
})
}
}

const removeFromWishlist = () => {
const removeWishBtn = document.querySelectorAll(".remove-from-wishlist") 
const wishlistWrapper = document.querySelector(".wishlist-wrapper")
const wishlistdesc= document.querySelector(".wishlist-desc")


removeWishBtn.forEach((button) => {
  const id  = button.dataset.id
  button.addEventListener("click", () => {
  wishlist = wishlist = wishlist.filter((wish) => wish.id !== Number(id))
  
  localStorage.setItem("wishlist", JSON.stringify(wishlist))
  
wishlistCount ? wishlistCount.innerHTML = wishlist.length : "";

  displayWishlist()
    addToWishlist()
    if(wishlist.length === 0  && wishlistdesc){
      wishlistdesc.innerHTML = `
<div class="flex justify-center items-center gap-1">
      <a href="/" class="text-center">Home</a>
      <span>/</span>
      <a class="text-[#555555]">Wishlist</a>

    </div>
    <p class="text-center pt-12">No products were added to the wishlist page. <a href="/shop" class="underline hover:text-gray-500">Back to shopping</a></p>
`
;

wishlistWrapper.innerHTML = "";
    }
  })
})

}

export const wishlistFunc =() => {
  
  addToWishlist();
displayWishlist()
removeFromWishlist()
} 
