import { useRouter } from "next/router";
import { GithubIcon, GoogleIcon } from "@/project-icons/ReactIcons";
import { useContext, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { LoginData, loginUser } from "@/queries/userQueries";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "@/hooks/UserContext";
import Link from "next/link";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [manualSignin, setManualSignin] = useState<boolean>(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(
    "loginUser",
    (data: LoginData) => loginUser(data),
    {
      onSuccess: (data) => {
        // handle success
        setUser(data);
        router.push("/");
        queryClient.invalidateQueries("loginUser");
      },
      onError: (error: any) => {
        // handle error
        console.log("An error occured", error.message);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: (values: LoginData) => {
      mutate(values);
    },
  });

  return (
    <main className="h-screen flex items-center justify-center bg-background">
      <div className="w-full bg-foreground p-4 space-y-3 lg:w-1/3">
        <div className="space-y-3">
          <h1 className="text2xl font-semibold">Login using:</h1>
          <div className="flex items-center gap-3">
            <div className="w-full flex items-center gap-2 bg-cardColor p-4 rounded-md cursor-pointer hover:bg-cardColor/80 transition-all duration-75">
              <GoogleIcon /> Google
            </div>
            <div className="w-full flex items-center gap-2 bg-cardColor p-4 rounded-md cursor-pointer hover:bg-cardColor/80 transition-all duration-75">
              <GithubIcon /> Github
            </div>
          </div>
          {!manualSignin && (
            <div
              onClick={() => setManualSignin(!manualSignin)}
              className="w-full p-4 bg-background rounded-md cursor-pointer"
            >
              Sign in using email
            </div>
          )}
        </div>
        {manualSignin && (
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="johndoe@gmail.com"
                className={
                  formik.errors.email && formik.touched.email
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
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
                className={
                  formik.errors.password && formik.touched.password
                    ? "border-red-500"
                    : ""
                }
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary p-4 hover:bg-primary/70 transition-all"
            >
              Login
            </button>
          </form>
        )}
        <div className="w-full flex flex-end">
          <span className="text-sm text-slate-500">
            New to Dev.int?{" "}
            <Link href="/signup" className="text-white text-slate-300">
              sign up
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Login;
