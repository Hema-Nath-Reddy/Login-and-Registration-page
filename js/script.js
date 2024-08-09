const colorThemes = document.querySelector("select");

const storeTheme = function (theme) {
  localStorage.setItem("theme", theme);
};

colorThemes.addEventListener("change", (event) => {
  const selectedOption = event.target.options[event.target.selectedIndex];
  storeTheme(selectedOption.id);
});

const setTheme = function (theme) {
  document.documentElement.className = theme;
};

const retrieveTheme = function () {
  const activeTheme = localStorage.getItem("theme");
  if (activeTheme) {
    for (let i = 0; i < colorThemes.options.length; i++) {
      if (colorThemes.options[i].id === activeTheme) {
        colorThemes.options[i].selected = true;
        break;
      }
    }
  }
  setTheme(activeTheme);
};

window.onload = retrieveTheme;
const inputs = document.querySelectorAll(".wrapper input");
const reset = document.querySelector('button[type="reset"]');
inputs.forEach((input) => {
  const label = document.querySelector(`label[for="${input.id}"]`);

  input.addEventListener("focus", () => {
    if (label) {
      label.classList.add("label");
    }
  });

  input.addEventListener("blur", () => {
    if (label && input.value.trim() === "") {
      label.classList.remove("label");
    }
  });
});

let Name = document.getElementById("name");
let email = document.getElementById("email");
let pno = document.getElementById("number");
let correct = true;
let password1 = document.getElementById("password1");
let password2 = document.getElementById("password2");
let submit = document.querySelector(".submit");

function ValidateName() {
  let namex = /^[a-zA-Z\s]+$/;
  let img = document.getElementById("name-danger");
  if (!namex.test(Name.value)) {
    img.style.display = "block";
    correct = false;
  } else {
    img.style.display = "none";
    correct = true;
  }
  if (Name.value.trim() === "") {
    img.style.display = "none";
  }
  return correct;
}

function ValidateEmail() {
  let emailx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let img = document.getElementById("email-danger");
  if (!emailx.test(email.value)) {
    img.style.display = "block";
    correct = false;
  } else {
    img.style.display = "none";
    correct = true;
  }
  if (email.value.trim() === "") {
    img.style.display = "none";
  }
  return correct;
}

function ValidatePno() {
  let img = document.getElementById("phone-danger");
  if (pno.value.length < 10) {
    img.style.display = "block";
    correct = false;
    img.ariaLabel =
      "Phone number cannot be less than 10 digits long, Kindly enter a valid phone number.";
  } else if (pno.value.length > 10) {
    img.style.display = "block";
    correct = false;
    img.ariaLabel =
      "Phone number cannot be more than 10 digits long, Kindly enter a valid phone number.";
  } else {
    img.style.display = "none";
    correct = true;
  }
  if (pno.value.trim() === "") {
    img.style.display = "none";
  }
  return correct;
}

function ValidatePassword() {
  let pregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
  let img = document.getElementById("password1-danger");

  if (!pregex.test(password1.value)) {
    img.style.display = "block";
    img.ariaLabel =
      "Ensure that the password is at least 12 characters long, contains an uppercase letter, a lowercase letter, a number, and a special character.";
    return false;
  } else {
    img.style.display = "none";
    return true;
  }
}

function samePassword() {
  let img = document.getElementById("password2-danger");

  if (password1.value !== password2.value) {
    img.style.display = "block";
    img.ariaLabel = "The entered passwords do not match each other.";
    return false;
  } else {
    img.style.display = "none";
    return true;
  }
}
Name.addEventListener("input", ValidateName);
email.addEventListener("input", ValidateEmail);
pno.addEventListener("input", ValidatePno);
password1.addEventListener("input", () => {
  ValidatePassword();
  const svg = document.querySelector(`svg[data-target="password1"]`);
  svg.style.display = "block";
  if (password1.value.trim() === "") {
    svg.style.display = "none";
  }
});
password2.addEventListener("input", () => {
  samePassword();
  const svg = document.querySelector(`svg[data-target="password2"]`);
  svg.style.display = "block";
  if (password2.value.trim() === "") {
    svg.style.display = "none";
  }
});
let Inputs = document.querySelectorAll(".form input");
function checkInputs() {
  let allFilled = true;
  let allEmpty = true;
  let allValid =
    ValidateEmail() &&
    ValidateName() &&
    ValidatePno() &&
    ValidatePassword() &&
    samePassword();
  if (form.classList.contains("moveLeft")) {
    allValid = ValidateEmail() && ValidatePassword();
    Inputs = [email, password1];
  }
  Inputs.forEach((input) => {
    if (input.value.trim() === "") {
      allFilled = false;
    } else {
      allEmpty = false;
    }
  });

  reset.disabled = allEmpty;
  submit.disabled = !(allFilled && allValid);
}

reset.addEventListener("click", () => {
  let labels = document.querySelectorAll(".label");
  labels.forEach((label) => {
    label.classList.remove("label");
  });
  let tooltips = document.querySelectorAll(".tooltip");
  tooltips.forEach((tooltip) => {
    tooltip.style.display = "none";
  });
  submit.disabled = true;
  reset.disabled = true;
  inputs.forEach((input) => {
    input.value = "";
  });
  const svgs = document.querySelectorAll(".wrapper svg");
  svgs.forEach((svg) => {
    svg.style.display = "none";
  });
});
inputs.forEach((input) => {
  input.addEventListener("input", checkInputs);
});

const fp = document.querySelector(".fp");
let fpClicked = false;
let login = document.querySelector("form p");
const left = document.querySelector(".form .left");
const form = document.querySelector(".form form");
const Form = document.querySelector(".form");
fp.addEventListener("click", () => {
  left.classList.toggle("moveRight");
  form.classList.toggle("moveLeft");
  fpClicked = !fpClicked;

  if (fpClicked) {
    login.innerHTML = "Login";
    fp.innerHTML = "New user?";
    document.getElementById("name").value = "";
    document
      .getElementById("name")
      .nextElementSibling.classList.remove("label");
    document.getElementById("number").value = "";
    document
      .getElementById("number")
      .nextElementSibling.classList.remove("label");
    document.getElementById("password2").value = "";
    document
      .getElementById("password2")
      .nextElementSibling.classList.remove("label");
    password1.setAttribute("autocomplete", "current-password");
  } else {
    login.innerHTML = "Sign up";
    fp.innerHTML = "Already an user?";
    password1.setAttribute("autocomplete", "new-password");
  }

  checkInputs();
});
const svgs = document.querySelectorAll(".wrapper svg");
svgs.forEach((svg) => {
  let svgclicked = false;
  svg.addEventListener("click", () => {
    const targetId = svg.getAttribute("data-target");
    const inputField = document.getElementById(targetId);
    if (inputField) {
      inputField.type = inputField.type === "password" ? "text" : "password";
    }
    svgclicked = !svgclicked;
    if (svgclicked) {
      svg.viewbox = "0 0 640 512";
      svg.innerHTML = `<path
    d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
  />`;
    } else {
      svg.viewbox = "0 0 576 512";
      svg.innerHTML = `<path
              d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
            />`;
    }
  });
});
