import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/shared';

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default RootLayout;