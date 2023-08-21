import { useEffect, useState } from 'react';
import { Button, Progress, Radio, Space } from 'antd';
import logo from '../../assets/logo.jpg';
import formatTime from '../../utils/formatTime';
import percentCal from '../../utils/percentCal';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCategoryQuizQuery } from '../../redux/features/quiz/quizApi';
import Loading from './Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../libs/firebase';


const Quiz = () => {

    const [user] = useAuthState(auth);
    const [percent, setPercent] = useState(0);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading, isError } = useGetCategoryQuizQuery(id);
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [myQuizSubmitInfo, setMyQuizSubmitInfo] = useState({
        quizList: [],
        score: 0,
        percentage: 0,
        status: '',
    })


    useEffect(() => {
        const interval = setInterval(() => {
            if (timeInSeconds > 0) {
                setTimeInSeconds(prevTime => prevTime - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeInSeconds]);

    useEffect(() => {
        if (data) {
            const mainData = data.data;
            setTimeInSeconds((mainData?.time || 0) * 60)
            setMyQuizSubmitInfo({
                ...myQuizSubmitInfo,
                blockName: mainData?.blockName || '',
                totalQuiz: Number(mainData?.totalQuiz || 0),
                requiredQuiz: Number(mainData?.requiredQuiz || 0),
                email: user?.email
            })
        }

    }, [data, id])



    const percentageProgress = () => {
        const percentCalc = parseFloat(100 / data?.data?.quizList.length);
        let newPercent = percent + percentCalc;
        if (newPercent > 100) {
            newPercent = 100;
        }
        setPercent(newPercent);
    };



    const handleQuiz = (event, quiz) => {
        const { value } = event.target;
        setCurrentQuiz(value)
        console.log(quiz);

        if (!currentQuiz) {
            percentageProgress();

            quiz.selectedAnswer = value;
            setMyQuizSubmitInfo({
                ...myQuizSubmitInfo,
                score: data?.data?.quizList[currentIndex]?.correct == value ? myQuizSubmitInfo?.score + 1 : myQuizSubmitInfo?.score,
                quizList: [...myQuizSubmitInfo.quizList, quiz],
            })
        }

    }


    const nextQuizHandler = () => {

        if (data?.data?.quizList?.length === (currentIndex + 1)) {

            myQuizSubmitInfo.percentage = percentCal(myQuizSubmitInfo.score, myQuizSubmitInfo.totalQuiz);

            if (myQuizSubmitInfo.score >= myQuizSubmitInfo.requiredQuiz) {
                myQuizSubmitInfo.status = 'passed'
            } else {
                myQuizSubmitInfo.status = 'failed'
            }

            fetch('https://quiz-app-server-yo5r.onrender.com/api/v1/result/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(myQuizSubmitInfo)
            })
                .then(res => res.json())
                .then(result => {
                    console.log(result)
                    navigate('/result')

                })
                .catch(er => {
                    console.log(er);
                })

        } else {
            setCurrentQuiz(null)
            setCurrentIndex(prevState => prevState + 1)
            console.log('next');
        }
    }



    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        console.log('error log');
    }

    return (
        <>
            <div className='flex justify-between items-center mb-2'>
                <h3 className='text-base sm:text-lg font-semibold'>{data?.data?.blockName}</h3>
                <img className='w-10' src={logo} alt="logo" />
            </div>
            <Progress showInfo={false} percent={percent} status="active" />
            <form >
                <div className='flex justify-between items-start flex-col-reverse sm:flex-row gap-2'>
                    <div className='flex justify-between items-center flex-col-reverse sm:flex-row gap-4 my-8 sm:mt-14'>

                        <div className='w-full'>
                            <h4 className='font-normal text-base mb-1'>{data?.data?.quizList[currentIndex]?.question}</h4>
                            <Radio.Group onChange={(event) => handleQuiz(event, data?.data?.quizList[currentIndex])}>
                                <Space direction="vertical">
                                    {data?.data?.quizList[currentIndex]?.questionList?.map((quiz, index) => <Radio key={index} value={quiz}>{quiz}</Radio>)}
                                </Space>
                            </Radio.Group>
                        </div>
                        {data?.data?.quizList[currentIndex]?.imageUrl &&
                            <img className='w-40 sm:w-48 h-auto inline-block' src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=2000" alt="logo" />
                        }
                    </div>
                    <h2 className='bg-blue-500 text-base text-white px-3 py-1 rounded-md shadow-sm w-16  font-semibold '>{formatTime(timeInSeconds)}</h2>
                </div>
                <div className='text-end'>
                    <Button disabled={!currentQuiz || !timeInSeconds} onClick={nextQuizHandler} type='primary'>{data?.data?.quizList?.length === (currentIndex + 1) ? 'Submit' : 'Next'}</Button>
                </div>
            </form>
        </>
    );
};

export default Quiz;

