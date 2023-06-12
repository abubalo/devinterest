import { GithubIcon, GoogleIcon } from "@/project-icons/ReactIcons";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { addUser, UserData } from "@/queries/userQueries";
import { useFormik } from "formik";
import * as Yup from "yup"
import Link from "next/link";
const Signup = () => {
  const [manualSignup, setManualSignUp] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    "addUser",
    (data: UserData) => addUser(data),
    {
      onSuccess: (data) => {
        // handle success
        console.log("User added successfully", data);
        queryClient.invalidateQueries("addUser");
      },
      onError: (error: any) => {
        // handle error
        console.log("An error occured", error.message);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPass: "",
    },

    validationSchema: Yup.object({
        name: Yup.string().min(6, "Name is to short").required("Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().min(6, "password length must be greater than 5").required("Password is required"),
        confirmPass: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    }),

    onSubmit: (values) => {
      const {name, email, password} = values
      mutate({name, email, password});
    },
  });

  return (
    <main className="h-screen flex items-center justify-center bg-background">
      <div className="w-full bg-foreground p-4 space-y-3 lg:w-1/3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-full flex items-center gap-2 bg-cardColor p-4 rounded-md cursor-pointer hover:bg-cardColor/80 transition-all duration-75">
              <GoogleIcon /> Google
            </div>
            <div className="w-full flex items-center gap-2 bg-cardColor p-4 rounded-md cursor-pointer hover:bg-cardColor/80 transition-all duration-75">
              <GithubIcon /> Github
            </div>
          </div>
          {!manualSignup && (
            <div
              onClick={() => setManualSignUp(!manualSignup)}
              className="w-full p-4 bg-background rounded-md cursor-pointer"
            >
              Sign up using email
            </div>
          )}
        </div>
        {manualSignup && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <div className="flex flex-col space-y-1">
              <label htmlFor="fullname">Full name:</label>
              <input
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="name"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="password"
                placeholder=""
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="password">Confirm Password:</label>
              <input
                type="password"
                value={formik.values.confirmPass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="confirmPass"
                placeholder=""
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary p-4 hover:bg-primary/70 transition-all"
            >
              Sign up
            </button>
          </form>
        )}
        <div className="w-full flex flex-end">
        <span className="text-sm text-slate-500">Already a user? <Link href="/login" className="text-white text-slate-300">Login</Link></span>
      </div>
      </div>
    </main>
  );
};

export default Signup;
