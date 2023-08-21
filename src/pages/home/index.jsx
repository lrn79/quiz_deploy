import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../libs/firebase';

const Home = () => {
    const [user] = useAuthState(auth);


    return (
        <section className="w-full flex justify-center items-center">
            <div className="w-full sm:w-[500px] bg-white p-5 rounded-md mx-4 shadow-sm mt-10 sm:mt-20 text-justify">
                <h1 className="font-semibold text-base sm:text-2xl">Hello {user.displayName}</h1>
                <p className="text-sm sm:text-base">You have <span className="text-white bg-green-500 inline-block px-3 rounded-sm my-2">137 credits</span> for the exam.</p>
                <p className="text-sm sm:text-base">The exercises for you <span className="text-white bg-blue-500 inline-block px-3 rounded-sm">67 days</span> available.</p>
            </div>
        </section>
    );
};

export default Home;