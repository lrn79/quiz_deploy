import { Button, Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { ArrowRightOutlined } from '@ant-design/icons';
import { GoogleAuth } from "../../components/shared";
import logo from '../../assets/logo.jpg';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "../../libs/firebase";
import { useEffect, useState } from "react";
import { useToken } from '../../hooks';

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const [token] = useToken(user);


    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);




    const createNewUserHandler = async ({ firstName = 'Mr/Mrs.', email, password, confirmPassword }) => {
        if (password === confirmPassword) {
            setErrorMessage(null)
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: firstName });
        } else {
            setErrorMessage('Password must be match.')
        }

    };



    return (
        <section className="w-full h-[70vh] sm:h-screen flex justify-center items-center">
            <div className="w-full sm:w-[400px] bg-white p-5 rounded-md mx-4 shadow-sm">
                <img className="w-12 block mx-auto" src={logo} alt="Logo" />
                <Row justify="space-between" align='middle'>
                    <Col>
                        <h4 className="text-base font-semibold sm:text-lg mb-3">Sign Up</h4>
                    </Col>
                    <Col>
                        <Button type="link" className="space-x-2 text-black">
                            <Link to='/sign-in'>I have an account</Link>
                            <ArrowRightOutlined />
                        </Button>
                    </Col>
                </Row>
                <form onSubmit={handleSubmit(createNewUserHandler)} className="mb-3">
                    <Row justify='space-between' align='middle' gutter={16}>
                        <Col span={12}>
                            <input className="block w-full px-2 py-2 focus:outline-none rounded-[4px] mb-3 border-0 bg-gray-100 placeholder-gray-500" type="text" placeholder="First Name"
                                {...register('firstName')}
                            />
                        </Col>
                        <Col span={12}>
                            <input className="block w-full px-2 py-2 focus:outline-none rounded-[4px] mb-3 border-0 bg-gray-100 placeholder-gray-500" type="text" placeholder="Last Name"
                                {...register('lastName')}
                            />
                        </Col>
                    </Row>
                    <input className="block w-full px-2 py-2 focus:outline-none rounded-[4px] mb-3 border-0 bg-gray-100 placeholder-gray-500" type="email" placeholder="Email"
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && <p className="w-full text-sm text-red-500 mb-1">{errors.email.message}</p>}

                    <input className="block w-full px-2 py-2 focus:outline-none rounded-[4px] mb-3 border-0 bg-gray-100 placeholder-gray-500" type="password" placeholder="Password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p className="w-full text-sm text-red-500 mb-1">{errors.password.message}</p>}

                    <input className="block w-full px-2 py-2 focus:outline-none rounded-[4px] mb-3 border-0 bg-gray-100 placeholder-gray-500" type="password" placeholder="Confirm Password"
                        {...register('confirmPassword', { required: 'confirmPassword is required' })}
                    />
                    {errors.confirmPassword && <p className="w-full text-sm text-red-500 mb-1">{errors.confirmPassword.message}</p>}
                    {errorMessage && <p className="w-full text-sm text-red-500 mb-1">{errorMessage}</p>}

                    <Button loading={loading || updating} className="font-semibold" block type="primary" htmlType="submit">Sign Up</Button>
                    {error && <p className="w-full text-center text-sm text-red-500 mt-1">{error?.message?.split(':')[1]}</p>}
                </form>
                <p className="text-sm font-normal mt-2 text-center sm:text-justify">By signing up I agree to the <Link to='/'>Privacy Policy</Link> and <Link to='/'>Terms of Service</Link>.</p>
                <GoogleAuth />
            </div>
        </section>
    );
};

export default SignUp;