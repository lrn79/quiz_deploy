import { Quiz } from "../../components/shared";


const ExerciseQuiz = () => {
    return (
        <section className="w-full flex justify-center items-center mt-20">
            <div className="w-full sm:w-[700px] bg-white p-5 rounded-md mx-4 shadow-sm">
                <Quiz />
            </div>
        </section>
    );
};

export default ExerciseQuiz;