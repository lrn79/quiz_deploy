import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/rootLayout';
import { Home, SignIn, SignUp, NotFound, TestExam, Result, Exercises, ResultProgress, ExerciseQuiz, SolutionPage, Dashboard } from '../pages';
import RequireAuth from './RequireAuth';


const routes = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth><RootLayout /></RequireAuth>,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/test-exam',
                element: <TestExam />,
            },
            {
                path: '/exercises',
                element: <Exercises />,
            },
            {
                path: '/exercise/:id',
                element: <ExerciseQuiz />,
            },
            {
                path: '/result',
                element: <Result />,
            },
            {
                path: '/result/:id',
                element: <ResultProgress />,
            },
            {
                path: '/result/solution/:id',
                element: <SolutionPage />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: <RequireAuth><Dashboard /></RequireAuth>,
        children: [
            {
                index: true,
                element: <p>dashboard page</p>,
            }
        ],
    },

    {
        path: '/sign-in',
        element: <SignIn />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default routes;