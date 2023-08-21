import { Button, Space, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../libs/firebase';


const columns = [
    {
        title: 'Surname',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Result',
        dataIndex: 'age',
        key: 'age',
        render: () => (<Button className='cursor-default' type='primary'>Passed</Button>),
    },


    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <p>75%</p>
                <Button type='link'><Link to='/result/3'>Details</Link></Button>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
];

const Result = () => {
    const [user] = useAuthState(auth);
    return (
        <div className='w-ful mt-20'>
            <div className='bg-white mx-4 rounded-sm'>
                <h1 className='text-sm sm:text-base text-start py-3 ml-4 text-blue-500'>Result by {user?.displayName || ''}</h1>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
};

export default Result;

