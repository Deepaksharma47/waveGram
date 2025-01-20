import React from "react";
// import { useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";

import BackpageHeading from "../../components/common/BackpageHeading";
import { inviteFriendSchema } from "../../validations/adminValidations";
import InputFeild from "../../components/common/InputFeild";
import IconBtn from "../../components/common/IconBtn";



const InviteFriend: React.FC = () => {
    //   const navigate = useNavigate();



    //   const inviteFriend = async(friend:any)=>{
    //     try{
    //       const response = await api.post(`${Local.INVITE_FRIEND}`, friend, {
    //         headers: {
    //           "Authorization": `Bearer ${localStorage.getItem('token')}`
    //         }
    //       });
    //       toast.success(`${response.data.message}`);
    //       navigate('/app/dashboard')
    //     }
    //     catch(err:any){
    //       toast.error(`${err.response.data.message}`);
    //     }
    //     return;
    //   }

    //   const inviteMutation = useMutation({
    //     mutationFn: inviteFriend
    //   })

    const initialValues = {
        friends: [{ name: "", email: "", message: "" }],
    };

    //   const handleSubmit = (values: any) => {
    //     inviteMutation.mutate(values.friends);
    //     // console.log("Submitted Data:", values);
    //   };

    return (
        <div className="flex flex-col gap-2 mx-6 mt-5 overflow-visible" >
            <BackpageHeading heading='Friends' />
            <span className=" font-semibold text-base text-gray-700 ">
                Invite some friends, show them your Waves and let's see what they can do!
            </span>

            <div className=" bg-white rounded-lg">
                <Formik
                    initialValues={initialValues}
                    validationSchema={inviteFriendSchema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {({ values }) => (
                        <Form className="p-4 rounded-lg bg-white">
                            <FieldArray name="friends">
                                {({ remove, push }) => (
                                    <div>
                                        {values.friends.map((_, index) => (
                                            <div key={index} className="mb-4">
                                                <div className="text-secondary fw-semibold small " >
                                                    Friend #{index + 1}{" "}
                                                    {index > 0 && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-link text-danger ms-2 p-0"
                                                            onClick={() => remove(index)}
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-2 my-2 ">
                                                    <div className=" flex flex-row gap-3">
                                                        <InputFeild labelName="Full Name" type="text" placeholder="Name" fieldName={`friends.${index}.name`} isRequired={true} />
                                                        <InputFeild labelName="Email" type="email" placeholder="Email" fieldName={`friends.${index}.email`} isRequired={true} />
                                                    </div>
                                                    <div>
                                                        <InputFeild labelName="Message" type="text" placeholder="Message" fieldName={`friends.${index}.message`} isRequired={false} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className=" flex  justify-end">
                                            <button
                                                type="button"
                                                className=" text-primary font-semibold my-2"
                                                onClick={() =>
                                                    push({ name: "", email: "", message: "" })
                                                }
                                            >
                                                + Add More
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </FieldArray>
                            <div className="flex justify-end" >
                                    <IconBtn text="Friends" type="submit" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default InviteFriend;