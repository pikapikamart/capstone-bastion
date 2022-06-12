

const validateEmail = ( email: string )=>{
  let re = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  return re.test(email);
}

export const addErrors = ( element: HTMLInputElement ) =>{
  element.setAttribute("aria-invalid", "true");
  element.setAttribute("aria-describedby", element.name + "-error");
}

export const removeErrors = ( element: HTMLInputElement ) =>{
  element.removeAttribute("aria-invalid");
  element.removeAttribute("aria-describedby");
}

export const validateInput = ( element: HTMLInputElement ) =>{
  if ( element.name==="email" ) {
    return validateEmail(element.value);
  }

  if ( element.name==="password" ) {
    return element.value.length >= 8;
  }

  return element.value!=="";
}