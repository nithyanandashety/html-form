
const nameInput = document.getElementById("name")
const ageInput = document.getElementById("age")
const mobileInput = document.getElementById("mobile")
const emailInput = document.getElementById("mail")
const phnoRadio = document.querySelectorAll('input[name=yes_no]')
const phnoInput = document.getElementById("secondary-mobile")
const genderInput = document.querySelectorAll('input[name="gender"]')
const technologyInput = document.getElementById("tech")
const errors = document.getElementsByClassName("error")
const secondaryGroup = document.getElementsByClassName("phnumber-container");

let isSecondaryPhonechecked = false

const patterns = {
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    phno: /^\d{10}$/,
    name: /^[a-zA-z]+$/,
    age: /^[1-9]?[0-9]{1}$|^100$/
}

function getData(){
    let gender;

    genderInput.forEach(e => {
        if (e.checked) gender = e.value;
    })

    const formData={
        name:nameInput.value,
        age:ageInput.value,
        mobile:mobileInput.value,
        email:emailInput.value,
        phoneno: phnoInput.value,
        phnoRadioValue:isSecondaryPhonechecked,
        gender,
        technology:technologyInput.value
    }
    return formData;
}

const errorMessageVisibility = () => {
    for (let i = 0; i < errors.length; i++) {
        errors[i].style.display = 'none'
    }
};

const errorVisibility = (ElementId, value) => {
    const errors = document.getElementById(ElementId)
    errors.style.display = value
};


const nameValidation = () => {
    const valid = patterns.name.test(nameInput.value)
    if (valid) errorVisibility("name-error-message", "none")
    else errorVisibility("name-error-message", "block")
    return valid;
}

const ageValidation = () => {
    const valid = patterns.age.test(ageInput.value)
    if (valid) errorVisibility("age-error-message", "none")
    else errorVisibility("age-error-message", "block")
    return valid;

}

const mobileValidation = () => {
    const valid = patterns.phno.test(mobileInput.value)
    if (valid) errorVisibility("mobile-error-message", "none")
    else errorVisibility("mobile-error-message", "block")
    return valid;
}

const isSecondaryPhoneValid = () => {
    if (!isSecondaryPhonechecked) return true;
    const valid = patterns.phno.test(phnoInput.value)
    if (valid) errorVisibility("phno-error-message", "none")
    else errorVisibility("phno-error-message", "block")
    return valid;
}

const emailValidation = () => {
    const valid = patterns.email.test(emailInput.value)
    if (valid) errorVisibility("email-error-message", "none")
    else errorVisibility("email-error-message", "block")
    return valid;
}

const validateGender = () => {
    let selected = false;

    genderInput.forEach(e => {
        if (e.checked) selected = true;
    })


    if (!selected) {
        errorVisibility("gender-error-message", "block");
    } else {
        errorVisibility("gender-error-message", "none");
    }

    return selected;
}

const secondaryMobileChecked = (radioButton) => {
    isSecondaryPhonechecked = radioButton.value === 'yes' ? true : false
    if (isSecondaryPhonechecked) secondaryGroup[0].style.display = "block"
    else
        secondaryGroup[0].style.display = "none"

}



nameInput.addEventListener(
    "input", () => {
        nameValidation()
    }
)

ageInput.addEventListener(
    "input", () => {
        ageValidation()
    }
)

mobileInput.addEventListener(
    "input", () => {
        mobileValidation()
    }
)

emailInput.addEventListener(
    "input", () => {
        emailValidation()
    }
)

phnoInput.addEventListener(
    "input", () => {
        isSecondaryPhoneValid()
    }
)

const isValidForm = () => {
    errorMessageVisibility()

    if (!nameValidation()) return false;
    if (!ageValidation()) return false
    if (!mobileValidation()) return false;
    if (!emailValidation()) return false;
    if (!isSecondaryPhoneValid()) return false;
    if (!validateGender()) return false;

    return true;
}


const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isValidForm()) return;

    const data = getData();
    localStorage.setItem('formData', JSON.stringify(data));
    alert("form submitted sucessfully")
})

