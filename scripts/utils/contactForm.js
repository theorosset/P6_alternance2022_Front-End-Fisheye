function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function submitContainForm() {
  const form = document.querySelector("form");
  const formData = new FormData(form);
  console.log(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    emailValid(form.email);
    firstNameValid(form.firstName);
    lastNameValid(form.lastName);

    console.log(Object.fromEntries(formData.entries()));
  });
}

/**
 * enlever les return inutile
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
      "Veuillez entrer un email valide");
  }

  //else nothing are add
  return (document.querySelector("#errorEmail").innerText = ""), true;
}

//show error if firstName has < 2
function firstNameValid(inputFirstName) {
  const firstNameTrim = inputFirstName.value.trim();
  if (firstNameTrim.length < 2) {
    return (document.querySelector("#errorFirstName").innerText =
      "Votre Prénom doit faire minimum 2 caratères");
  }
  return (document.querySelector("#errorFirstName").innerText = ""), true;
}

//show error if lastName has < 2
function lastNameValid(inputLastName) {
  const lastNameTrim = inputLastName.value.trim();

  if (lastNameTrim.length < 2) {
    return (document.querySelector("#errorLastName").innerText =
      "Votre Nom doit faire minimum 2 caratères");
  }
  return (document.querySelector("#errorLastName").innerText = ""), true;
}
