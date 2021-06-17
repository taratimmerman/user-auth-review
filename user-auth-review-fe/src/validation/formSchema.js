import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    username: Yup
        .string()
        .max(255)
        .required("Username is required."),
    password: Yup
        .string()
        .max(255)
        .required("Password is required"),
});