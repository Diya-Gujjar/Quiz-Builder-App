import * as Yup from "yup"

export const registerSchema = Yup.object ({
    name: Yup.string().min(3).max(25).matches(/^[A-Za-z]+([ ]?[A-Za-z]+)*$/,"Name should be alphabet !!").required("** Please Enter Name !!"),
    email: Yup.string().email().required("** Please Enter Email !!"),
    password: Yup.string().min(6).required("** Please Enter Password !!"),
})