
// userType = admin writer student
export interface UserDocument {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export const userBaseModel = {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}