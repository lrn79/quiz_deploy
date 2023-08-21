import { Button } from 'antd';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/images/error.jpg';

const NotFound = () => {

    return (
        <div className='w-full h-[70vh] sm:h-screen flex justify-center items-center'>
            <div className='bg-white p-4 rounded-sm shadow-sm'>
                <img className='w-[300px] block m-auto' src={errorImage} alt="error-img" />
                <div className='text-center'>
                    <Button className='inline-block' type='primary'>
                        <Link replace to='/'>Back To Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;