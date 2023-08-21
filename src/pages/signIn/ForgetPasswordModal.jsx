import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";

// eslint-disable-next-line react/prop-types
const ForgetPasswordModal = ({ openModal = false, resetHandler = () => '', resetCancel = () => false, resetError, sending }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();


    return (
        <div>
            <Modal
                open={openModal}
                onCancel={resetCancel}
                closeIcon={false}
                width={500}
                footer={null}
            >
                <form onSubmit={handleSubmit(resetHandler)} className="text-center">
                    <h2 className="font-semibold text-lg">Reset Your Password</h2>
                    <p>Enter your e-mail address and we will sent a link to reset your password</p>

                    <input className="block w-full px-2 py-2 focus:outline-none rounded-[4px] my-3 border-0 bg-gray-100 placeholder-gray-500" type="email" placeholder="Email"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors?.email && <p className="w-full text-center text-sm text-red-500 my-1">{errors?.email?.message}</p>}
                    {resetError?.message &&
                        <p className="w-full text-center text-sm text-red-500 my-1">
                            {resetError?.message?.split(':')[1]}
                        </p>}

                    <div className="text-end space-x-2">
                        <Button disabled={sending} onClick={resetCancel}>Cancel</Button>
                        <Button disabled={sending} htmlType="submit" type="primary">Send Email</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ForgetPasswordModal;