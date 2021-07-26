var form = document.getElementById("form");
var firstName = document.getElementById("firstname");
var lastName = document.getElementById("lastname");
var email = document.getElementById("email");
var confemail = document.getElementById("emailconfirm");
var message = document.getElementById("message");
var button = document.querySelector("button");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// highlight successful input
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check required input
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check email match
function checkEmailsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "email adresses don't match");
    return false;
  }
  return true;
}

confemail.addEventListener("paste", (e) => e.preventDefault());

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check email is valid
function checkEmail(input) {
  const reg =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

//form sent with AJAX
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (checkEmailsMatch(email, confemail)) {
    checkRequired([email, confemail, message]);
    checkEmail(email);
    fetch("contact.php", {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
