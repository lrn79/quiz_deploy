import { api } from '../../api/apiSlice';

const quizApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuiz: builder.query({
            query: () => '/quiz',
        }),
        getCategoryQuiz: builder.query({
            query: (id) => `/quiz/${id}`,
        }),

    }),
});

export const { useGetAllQuizQuery, useGetCategoryQuizQuery } = quizApi;