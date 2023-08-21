import { api } from '../../api/apiSlice';

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuiz: builder.query({
            query: () => '/quiz',
        }),

    }),
});

export const { useGetAllQuizQuery } = userApi;