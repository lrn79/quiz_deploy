import { useEffect, useState } from "react";
import { Button, Checkbox, Col, Row, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { GoogleAuth, Loading } from "../../components/shared";
import ForgetPasswordModal from "./ForgetPasswordModal";
import logo from '../../assets/logo.jpg';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../libs/firebase";
import { useToken } from '../../hooks';


const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [modalOpen, setModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);

    const navigate = useNavigate();
    const location = useLocation();
    const [token] = useToken(user);
    const from = location.state?.from?.pathname || "/";


    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from]);


    const loginUserHandler = ({ email, password }) => {
        // console.log(data);
        signInWithEmailAndPassword(email, password);
    };




    const forgetPasswordResetHandler = async ({ email }) => {
        const result = await sendPasswordResetEmail(email);
        if (result) {
            messageApi.success({
                type: 'success',
                content: 'Email sent',
                duration: 1.5,
            });

            new Promise(() => {
                setTimeout(() => {
                    setModalOpen(false);
                }, 1500);
            })
        }
    }




    return (
        <section className="w-full h-[70vh] sm:h-screen flex justify-center items-center">
            <div className="w-full sm:w-[400px] bg-white p-5 rounded-md mx-4 shadow-sm">
                <img className="w-12 block mx-auto" src={logo} alt="Logo" />
                <h4 className="text-base font-semibold sm:text-lg mb-3">Login</h4>
                <form onSubmit={handleSubmit(loginUserHandler)}>
                    <input className="block w-full px-2 py-2 focus:outline-none rounded-[4px] mb-3 border-0 bg-gray-100 placeholder-gray-500" type="email" placeholder="Email"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors?.email && <p className="w-full text-sm text-red-500 my-1">{errors?.email?.message}</p>}

                    <input className="block w-full px-2 py-2 focus:outline-none rounded-[4px] mb-3 border-0 bg-gray-100 placeholder-gray-500" type="password" placeholder="Password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors?.password && <p className="w-full text-sm text-red-500 my-1">{errors?.password?.message}</p>}

                    <Button loading={loading} className="font-semibold" block type="primary" htmlType="submit">Sign In</Button>
                    {error && <p className="w-full text-sm text-red-500 mt-1">{error?.message?.split(':')[1]}</p>}
                </form>
                <Row className="my-4 font-semibold" justify="space-between" align='middle'>
                    <Col span={12}> <Checkbox>Remember Me</Checkbox></Col>
                    <Col flex='none' span={12}>
                        <Button onClick={() => setModalOpen(true)} className="text-black font-semibold" type="link">Forgot password?</Button>
                    </Col>
                </Row>
                <GoogleAuth />
                <Button block type="link" className="cursor-default text-black" ><span className="text-black">Don't have an account? </span> <Link replace to='/sign-up'>Sign Up !</Link></Button>
            </div>
            <ForgetPasswordModal openModal={modalOpen} resetHandler={forgetPasswordResetHandler} resetCancel={() => setModalOpen(false)} sending={sending} resetError={resetError} />
            {contextHolder}
        </section>
    );
};

export default SignIn;