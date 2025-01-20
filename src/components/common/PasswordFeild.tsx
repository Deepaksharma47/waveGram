import { Field, ErrorMessage } from "formik"
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


interface Option {
    label: string;
    value: string;
}

interface inputField {
    labelName: string;
    fieldName: string;
    placeholder: string;
    isRequired: boolean;
    options?: Array<Option>;
}

const PasswordFeild = ({ fieldName, placeholder, labelName, isRequired }: inputField) => {
    const [inputType, setInputType] = useState("password");

    const toggleInputType = () => {
        setInputType((prevType) => (prevType === "password" ? "text" : "password"));
    };
    return (
        <div className="flex flex-col gap-1 text-start m-0 w-full">
            {/* Label */}
            <label htmlFor={fieldName} className="text-sm font-medium text-gray-500">
                {labelName}
                {isRequired && <span className="text-red-500 font-medium">*</span>}
            </label>

            {/* Password Field with Eye Button */}
            <div className="relative w-full">
                <Field
                    type={inputType}
                    name={fieldName}
                    placeholder={placeholder}
                    className="p-4 border hover:border-black rounded transition-all duration-200 text-base text-gray-500 w-full pr-12"
                />
                <button
                    type="button"
                    onClick={toggleInputType}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
                >
                    {inputType === "password" ? (
                        <FaRegEyeSlash className="text-xl" />
                    ) : (
                        <FaRegEye className="text-xl" />
                    )}
                </button>
            </div>

            {/* Error Message */}
            <ErrorMessage
                className="text-red-500 text-sm"
                name={fieldName}
                component="div"
            />
        </div>
    )
}

export default PasswordFeild


