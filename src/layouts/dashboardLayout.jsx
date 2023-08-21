import { Outlet } from 'react-router-dom';


const DashboardLayout = () => {
    return (
        <>
            <h2>Sidebar Dashboard</h2>
            <Outlet />
        </>
    );
};

export default DashboardLayout;