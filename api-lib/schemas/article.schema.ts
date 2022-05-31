import * as yup from "yup";


export const articleCreateSchema = yup.object({
  body: yup.object({
    title: yup.string().required(),
    
  })
})