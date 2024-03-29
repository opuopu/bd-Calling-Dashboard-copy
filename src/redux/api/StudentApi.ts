/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "./baseApi";
import { tagTypes } from "../../types/tags";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getAllStudent: builder.query({
      query: (data: any) => ({
        url: "/students/all",
        method: "GET",
      }),
      providesTags: [tagTypes.student, tagTypes.user],
    }),
    getSingleStudent: builder.query({
      query: (data: any) => ({
        url: `/admins/students/show/${data.id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student, tagTypes.user],
    }),
    approveStudent: builder.query({
      query: (id: any) => ({
        url: `/account/approve/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student, tagTypes.user],
    }),
    disapproveStudent: builder.query({
      query: (id: number) => ({
        url: `/account/unapprove/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student, tagTypes.user],
    }),
  }),
});

export const {
  useGetAllStudentQuery,
  useGetSingleStudentQuery,
  useApproveStudentQuery,
  useDisapproveStudentQuery,
} = studentApi;
