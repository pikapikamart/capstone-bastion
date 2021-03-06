import { ArticleData, DividedArticles, Writer } from "@/store/tracked";


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

export const getFullDate = ( createdAt: string ) =>{
  const date = new Date(createdAt);

  const [
    day,
    month,
    year
  ] = [
    date.getDate(),
    date.toLocaleDateString([], { month: "long" }),
    date.getFullYear()
  ]

  return [ month, day, year ].join(" ");
}

export const writerFullName = ( writer: Writer, spaced: boolean=true ) => {

  return spaced? writer.firstName + " " + writer.lastName : writer.firstName+writer.lastName;
}

export const isDividedArticles = ( articles: ArticleData[] | DividedArticles[] ): articles is DividedArticles[] =>{

  return ( articles as DividedArticles[] )[0].genre !== undefined;
}

export const sanitizeArticleLink = ( text: string ) => {

  return text.replace(/[^a-z]+/gi, " ").trim().toLowerCase().split(" ").join("-");
}