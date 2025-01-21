import { Formik, Form } from 'formik';
import InputFeild from './InputFeild';
import { BasicDetailInterface, RootState } from '../../interfaces/interfaces';
import { basicDetailValidation } from '../../validations/adminValidations';
import { basicDetailAdminList } from '../../utils/adminlists';
import { useSelector } from 'react-redux';
import IconBtn from './IconBtn';
import { useUpdateProfile } from '../../actions/user';


const BasicDetail = () => {
    const { user } = useSelector((state: RootState) => state.Auth);

    const updateDetail = useUpdateProfile()
    
    const initialValue = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
    };
    // const navigate = useNavigate;

    return (
        <div className=' '>
            <Formik
                initialValues={initialValue}
                validationSchema={basicDetailValidation}
                onSubmit={async (values: BasicDetailInterface) => {
                    console.log(values)
                    updateDetail.mutate(values)
                }}
            >
                {() => (
                    <Form className=" grid grid-cols-2 gap-x-4 gap-y-2 ">
                        {
                            basicDetailAdminList.map((feild, index) => {
                                return (
                                    <InputFeild fieldName={feild.fieldName} key={index} placeholder={feild.placeholder} type={feild.type}
                                        labelName={feild.label} isRequired={feild.required} disabled={feild.disabled} />
                                )
                            })
                        }
                        <div className="flex justify-end col-span-2 mt-4">
                            <IconBtn type="submit" text="Update" customClasses='text-white bg-primary' />
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default BasicDetail