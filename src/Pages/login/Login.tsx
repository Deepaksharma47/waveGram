import { Formik, Form } from "formik"
import { useLocation, useNavigate } from "react-router-dom"
// import { useLogin } from "../../actions/user"
import InputFeild from "../../components/common/InputFeild"
import IconBtn from "../../components/common/IconBtn"
import { loginInterface } from "../../interfaces/interfaces"
import { loginValidationSchema } from "../../validations/adminValidations"
import PasswordFeild from "../../components/common/PasswordFeild"
import { useEffect, useState } from "react"
import { useLogin } from "../../actions/user"

const Login: React.FC = () => {
    const navigate = useNavigate();


    const location = useLocation();
    const { email } = location.state || ""; // Get email from location.state
    const [initialValue, setInitialValue] = useState({
        email: email,
        password: "",
    });

    const loginMutation = useLogin()

    useEffect(() => {
        // Update initialValue when email changes
        if (email) {
            setInitialValue((value) => ({ ...value, email: email }));
        }
    }, [email]);

    return (
        <div className=" text-start w-[100%] lg:p-16 py-2">
            <div className=" text-textColor font-sans font-medium  mb-8 ">
                <div className="text-4xl mb-5">Login Your Account</div>
                <div className=" bg-linkText rounded-full h-[4px] w-[40px]">
                </div>
            </div>
            <div className=" rounded-md bg-white flex flex-col gap-3 ">
                <Formik
                    initialValues={initialValue}
                    validationSchema={loginValidationSchema}
                    onSubmit={async (values: loginInterface) => {
                        loginMutation.mutate(values);
                    }}
                >
                    {({values}) => (
                        <Form className=" flex flex-col gap-y-3">

                            <InputFeild fieldName="email" placeholder="Enter Email" value={values?.email}  isRequired={true} labelName="Email Address" type="email"  />

                            {/* password */}
                            <PasswordFeild fieldName="password" placeholder="Password" isRequired={true} labelName="Password" />

                            <div className="text-sm text-gray-500 my-2  ">
                                <button type="button" className=" text-linkText font-bold   " onClick={() => {
                                    navigate("/")
                                }}>
                                    Sing up
                                </button>
                            </div>

                            <div className=" mt-6 ">
                                <IconBtn text="Login"
                                    type="submit"
                                    customClasses="px-14 bg-primary text-white"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Login