import * as yup from "yup";


const payload = {
  firstName: yup.string().required("First name is required."),
  lastName: yup.string().required("Last name is required."),
  email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is invalid."),
  password: yup.string().min(8, "Password length invalid.").max(20, "Password length invalid.").required("Password is required.")
}

export const userCreateSchema = yup.object({
  body: yup.object({
    ...payload
  })
});

export const writerCreateSchema = yup.object({
  body: yup.object({
    writerId: yup.string().required("Writer Id is required."),
    ...payload
  })
})

export const studentCreateSchema = yup.object({
  body: yup.object({
    studentId: yup.string().required("Student Id is required.")
  })
})

export const signInSchema = yup.object({
  body: yup.object({
    email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is invalid."),
    password: yup.string().required("Password is required.")
  })
})