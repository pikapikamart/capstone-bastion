import * as yup from "yup";


export const articleCreateSchema = yup.object({
  body: yup.object({
    title: yup.string().required("Article title is required."),
    content: yup.string().required("Article content is required."),
    image: yup.string().required("Article image is required."),
    type: yup.string().required("Article type is required.")
  })
})