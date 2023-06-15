const header = () => {
  const OpenSearchBtn = document.querySelector(".header-search-button");
  const ModalSearch = document.querySelector(".modal-wrapper");
  const CLoseSearchBtn = document.querySelector(".search-close");
  const OpenSidebarBtn = document.querySelector(".header-mobile");
  const Sidebar = document.querySelector(".header-links");
  const CloseSidebarBtn = document.querySelector(".close-sidebar");
  const CartWrapper = document.querySelector(".cart");
  const OpenCartBtn = document.querySelector(".header-cart");
  const CloseCartBtn = document.querySelector(".cart-close");
  const LoginForm = document.querySelector(".login-register");
  const FormWrapper = document.querySelector(".form-wrapper");
  const OpenLoginForm = document.querySelector(".header-account-button");
  const CloseLoginForm = document.querySelector(".close-login-register");
  const headerLinks = document.querySelectorAll(".header-link");
  OpenSearchBtn.addEventListener("click", () => {
    ModalSearch.classList.remove("-translate-y-[149rem]");
  });

  CLoseSearchBtn.addEventListener("click", () => {
    ModalSearch.classList.toggle("-translate-y-[149rem]");
  });

  OpenSidebarBtn.addEventListener("click", () => {
    Sidebar.classList.add("translate-x-0");
  });

  CloseSidebarBtn.addEventListener("click", () => {
    Sidebar.classList.toggle("translate-x-0");
  });

  OpenCartBtn.addEventListener("click", () => {
    CartWrapper.classList.toggle("translate-x-[500px]");
  });

  CloseCartBtn.addEventListener("click", () => {
    CartWrapper.classList.add("translate-x-[500px]");
  });
  OpenLoginForm.addEventListener("click", () => {
    LoginForm.classList.remove("invisible");
  });
  CloseLoginForm.addEventListener("click", () => {
    LoginForm.classList.toggle("invisible");
  });

  document.addEventListener("click", (e) => {
    if (
      !e.composedPath().includes(ModalSearch) &&
      !e.composedPath().includes(OpenSearchBtn)
    ) {
      ModalSearch.classList.add("-translate-y-[149rem]");
    }
    if (
      !e.composedPath().includes(Sidebar) &&
      !e.composedPath().includes(OpenSidebarBtn)
    ) {
      Sidebar.classList.remove("translate-x-0");
    }
    if (
      !e.composedPath().includes(CartWrapper) &&
      !e.composedPath().includes(OpenCartBtn)
    ) {
      CartWrapper.classList.add("translate-x-[500px]");
    }
    if (
      !e.composedPath().includes(OpenLoginForm) &&
      !e.composedPath().includes(FormWrapper)
    ) {
      LoginForm.classList.add("invisible");
    }

    login_Register();
  });
};
const login_Register = () => {
  const createAccountBtn = document.getElementById("create-account");
  const loginBtn = document.getElementById("login-button");
  const FormWrapper = document.querySelector(".form-wrapper");
  const LoginForm = document.querySelector(".login-register");
  const OpenLoginForm = document.querySelector(".header-account-button");
  const CloseLoginForm = document.querySelector(".close-login-register");

  if (createAccountBtn) {
    createAccountBtn.addEventListener("click", () => {
      FormWrapper.innerHTML = `<h2 class="text-2xl mt-6">Create Account</h2>
  <input type="text"    class="w-[25rem] p-3  rounded-xl border outline-none border-gray-400 focus:border-black text-sm " placeholder="Firs Name*">
  <input type="text"    class="w-[25rem] p-3  rounded-xl border outline-none border-gray-400 focus:border-black text-sm " placeholder="Last Name*">
  <input type="email"    class="w-[25rem] p-3  rounded-xl border outline-none border-gray-400 focus:border-black text-sm " placeholder="Your email*">
  <input type="password" class="w-[25rem] p-3  rounded-xl border outline-none border-gray-400 focus:border-black text-sm "  placeholder="Password*">
  <button id="login-button" class="text-sm p-4 bg-black rounded-[2.5rem] w-[25rem] text-white" type="button">LOGIN</button>
  <button id="create-account" class="text-sm p-4 bg-white border uppercase rounded-[2.5rem] w-[25rem] hover:bg-black hover:text-white transition-colors duration-300" type="button">Create Account</button>
  <button class="close-login-register absolute right-5 text-2xl top-2 " type="button"><i class="bi bi-x"></i></button>
`;
    });
  }
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      FormWrapper.innerHTML = `
  <h2 class="text-2xl mt-8">Login</h2>
<input type="email"    class="w-[25rem] p-3  rounded-xl border outline-none border-gray-400 focus:border-black text-sm " placeholder="Your email*">
<input type="password" class="w-[25rem] p-3  rounded-xl border outline-none border-gray-400 focus:border-black text-sm "  placeholder="Password*">
<p class="forgot  text-[#555555] self-start mx-14 cursor-pointer">Forgot your password?</p>
<button id="login-button" class="text-sm p-4 bg-black rounded-[2.5rem] w-[25rem] text-white" type="button">LOGIN</button>
<button id="create-account" class="text-sm p-4 bg-white border uppercase rounded-[2.5rem] w-[25rem] hover:bg-black hover:text-white transition-colors duration-300" type="button">Create Account</button>
<button class="close-login-register absolute right-5 text-2xl top-2 " type="button"><i class="bi bi-x"></i></button>
  `;
    });
  }
  OpenLoginForm.addEventListener("click", () => {
    LoginForm.classList.remove("invisible");
  });
  CloseLoginForm.addEventListener("click", () => {
    LoginForm.classList.toggle("invisible");
  });
};

export default header();
