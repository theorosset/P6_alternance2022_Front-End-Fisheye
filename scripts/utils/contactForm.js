//disabled eslint because i use function in html files

// eslint-disable-next-line no-unused-vars
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

// eslint-disable-next-line no-unused-vars
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

document.querySelector(".closeForm")
  .addEventListener("keydown", (e) => {
    if (e.key === "Enter") { 
      closeModal();
    }
});

// eslint-disable-next-line no-unused-vars
function submitContainForm() {
  const form = document.querySelector("form");
  const formData = new FormData(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    emailValid(form.email);
    firstNameValid(form.firstName);
    lastNameValid(form.lastName);
    messageValid(form.message);

    if (
      emailValid(form.email) === true &&
      firstNameValid(form.firstName) === true &&
      lastNameValid(form.lastName) === true &&
      messageValid(form.message) === true &&
      emailValid(form.email) === true
    ) {
      console.log(Object.fromEntries(formData.entries()));
    } else {
      alert("Certain champs sont mal remplis");
    }
  });
}

/**
 *
 * @param {HtmlInputElement} inputEmail
 * @returns errors if email are not valid
 */
function emailValid(inputEmail) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,15}$"
  );
  let emailTest = emailRegExp.test(inputEmail.value);

  /**
   * if false error messsage for email are add
   */
  if (emailTest === false) {
    return (document.querySelector("#errorEmail").innerText =
      "Veuillez entrer un email valide"),false;
  }

  //else nothing are add
  return (document.querySelector("#errorEmail").innerText = ""), true;
}

//show error if firstName has < 2
function firstNameValid(inputFirstName) {
  const firstNameTrim = inputFirstName.value.trim();
  if (firstNameTrim.length < 2) {
    return (document.querySelector("#errorFirstName").innerText =
      "Votre Prénom doit faire minimum 2 caratères"), false;
  }
  return (document.querySelector("#errorFirstName").innerText = ""), true;
}

//show error if lastName has < 2
function lastNameValid(inputLastName) {
  const lastNameTrim = inputLastName.value.trim();

  if (lastNameTrim.length < 2) {
    return (document.querySelector("#errorLastName").innerText =
      "Votre Nom doit faire minimum 2 caratères"), false;
  }
  return (document.querySelector("#errorLastName").innerText = ""), true;
}

function messageValid(inputMessage) {
  const messageValueTrim = inputMessage.value.trim();

  if (messageValueTrim.length < 5) {
    return (document.querySelector("#errorMessage").innerText =
      "Votre message doit faire minimum 5 caratères"), false;
  }
  return (document.querySelector("#errorMessage").innerText = ""), true;
}