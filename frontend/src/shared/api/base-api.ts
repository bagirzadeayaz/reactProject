import { createApi, type BaseQueryFn, type FetchArgs } from '@reduxjs/toolkit/query/react';

interface FirestoreError {
  status: 'CUSTOM_ERROR';
  error: string;
}
const firestoreBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FirestoreError> = async (
  args,
) => {
  try {
    const { runFirestoreRequest } = await import('../firestore/store');
    return { data: await runFirestoreRequest(args) };
  } catch (error) {
    return {
      error: {
        status: 'CUSTOM_ERROR',
        error: error instanceof Error ? error.message : 'Request failed',
      },
    };
  }
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: firestoreBaseQuery,
  tagTypes: ['Product', 'Review', 'Category'],
  endpoints: () => ({}),
});
