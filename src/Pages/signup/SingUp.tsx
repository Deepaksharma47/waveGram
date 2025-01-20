import React from "react";
import { Formik, Form } from "formik";
import { signUpValidationSchema } from "../../validations/adminValidations";
import IconBtn from "../../components/common/IconBtn";
import { signupInterface } from "../../interfaces/interfaces";
import InputFeild from "../../components/common/InputFeild";
import {  useNavigate } from "react-router-dom";
import { useSingUp } from "../../actions/user";
import PasswordFeild from "../../components/common/PasswordFeild";

const SingUp: React.FC = () => {
    const navigate = useNavigate();
    // const baseUrl = import.meta.env.VITE_API_URL
    const signUpMutataion = useSingUp();

    return (
        <div className=" text-start lg:mx-16 lg:my-8 mx-2 sm:p-2">
            <div className=" text-textColor font-sans font-medium  mb-8 ">
                <div className="text-4xl mb-5">Sign Up</div>
                <div className=" bg-linkText rounded-full h-[4px] w-[40px]">
                </div>
            </div>
            <div className=" " >
                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={signUpValidationSchema}
                    onSubmit={async (values: signupInterface) => {
                        // console.log("dsdsdsdsdds")
                        console.log("valuesvalues", values);
                        await signUpMutataion.mutate(values);
                    }}
                >
                    {() => (
                        <Form className="flex flex-col gap-4 ">
                            <div className="flex lg:flex-row  flex-col gap-3 w-full">
                                <div className="lg:w-1/2 w-full">
                                    <InputFeild
                                        fieldName="firstName"
                                        placeholder="First Name"
                                        isRequired={true}
                                        labelName="First Name"
                                        type="text"
                                    />
                                </div>

                                <div className="lg:w-1/2 w-full">
                                    <InputFeild
                                        fieldName="lastName"
                                        placeholder="Last Name"
                                        isRequired={true}
                                        labelName="Last Name"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <InputFeild fieldName="email" placeholder="Enter email" isRequired={true} labelName="Enter Email" type="email" />

                            {/* password */}
                            <PasswordFeild fieldName="password" placeholder="Enter  password" isRequired={true} labelName="Password" />

                            {/* confirm password */}
                            <PasswordFeild fieldName="confirmPassword" placeholder="Enter confirm password" isRequired={true} labelName="Confirm Password" />
                            <div className="text-sm text-gray-500 my-2  ">
                                <button type="button" className=" text-linkText font-bold   " onClick={() => {
                                    navigate("/login")
                                }}>
                                    Login
                                </button>
                            </div>

                            <div className=" my-2 ">
                                <IconBtn text="Sign Up"
                                    type="submit"
                                    customClasses="w-fit px-14 bg-primary  text-white"
                                    onClick={() => { console.log("Clicked") }}
                                />
                            </div>


                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default SingUp;
