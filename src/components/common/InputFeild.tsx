import { Field, ErrorMessage } from "formik"


interface Option {
    label: string;
    value: string;
  }

interface inputField{
    labelName: string;
    fieldName:string;
    type: string;
    placeholder: string;
    isRequired:boolean;
    options?:Array<Option>;
    disabled?:boolean
    value?:string
}

const InputFeild = ({fieldName,placeholder,type,labelName,options =[],isRequired, disabled = false , value =""}:inputField) => {
  return (
    <div className="flex flex-col gap-1 text-start m-0 w-full">
        {/* Label */}
        <label htmlFor={fieldName} className=" text-sm font-medium text-gray-500">
        {labelName} 
        {isRequired && <span className="text-red-500 font-medium">*</span>}
        </label>

        {/* Conditional Field Rendering */}
        {type === "select" ? (
        <Field as="select" name={fieldName} value={value} className="p-4 border focus:ring-0 focus:border-black rounded-sm text-xs bg-white ">
            <option value="" disabled>
              {placeholder || "Select an option"}
            </option>
            {options.map((option, index) => (
            <option key={index} value={option.value}>
                {option.label}
            </option>
            ))}
        </Field>
        ) : (
        <Field
            type={type}
            name={fieldName}
            placeholder={placeholder}
            className=" p-4 border hover:border-black rounded transition-all duration-200 text-base text-gray-500 "
            disabled = {disabled}
        />
        )}

        {/* Error Message */}
        <ErrorMessage className="text-red-500 text-sm" name={fieldName} component="div" />
    </div>
  )
}

export default InputFeild


