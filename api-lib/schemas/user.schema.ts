import * as yup from "yup";


const payload = {
  userType: yup.string().required("User type is needed"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is invalid"),
  password: yup.string().min(8, "Password length invalid").max(20, "Password length invalid")
}

export const accountCreateSchema = yup.object({ ...payload });

export const writerCreateSchema = yup.object({
  writerId: yup.string().required("Writer Id is required")
})

export const studentCreateSchema = yup.object({
  studentId: yup.string().required("Student Id is required")
})
