import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAllQuizQuery } from "../../redux/features/quiz/quizApi";
import { Loading } from '../../components/shared';


const Exercises = () => {
    const { data: { data = [] } = {}, isLoading, error } = useGetAllQuizQuery(undefined);
    const navigate = useNavigate();

    if (isLoading) {
        return <Loading />
    }
    if (error) {
        console.log({ error });
    }

    return (
        <section className="mt-20 px-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.map((quiz, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center bg-white rounded-sm shadow-sm p-4">
                            <div>
                                <h3 className="font-semibold text-lg">{quiz.blockName}</h3>
                                <h5 className="font-semibold text-base">A total of {quiz?.quizList?.length} questions.</h5>
                                <p className="font-normal">You must answer at least {quiz.requiredQuiz} questions correctly.</p>
                            </div>
                            <Button onClick={() => navigate(`/exercise/${quiz._id}`)} type="primary">Begin</Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Exercises;