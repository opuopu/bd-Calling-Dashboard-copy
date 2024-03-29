/* eslint-disable @typescript-eslint/no-explicit-any */

import { Col, Row } from "antd";
import DashboardSurvery from "../../component/Survey/DashboardSurvey/DashboardSurvery";
import StudentEnrollmentChart from "../../component/Chart/surveyChart";
import Table from "../../component/UI/Table/Table";

import { useGetallmentorsQuery } from "../../redux/api/mentorApi";
import { useGetAllStudentQuery } from "../../redux/api/StudentApi";
import { IMAGE_BASE_URL } from "../../utils/Common";

export default function Dashboard() {
  const { data: mentorData, isLoading: mentorLoading }: any =
    useGetallmentorsQuery(undefined);
  const { data: studentData, isLoading: studentLoading }: any =
    useGetAllStudentQuery(undefined);
  const tablethemes = {
    Table: {
      lineHeight: 1,
      borderRadius: 8,
    },
  };

  const mentorColumn = [
    {
      title: "#sl",
      dataIndex: "index",
    },
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Image",
      dataIndex: "image",
    },

    {
      title: "Designation",
      dataIndex: "designation",
    },

    // {
    //   title: "Actions",
    //   render: function (data: any) {
    //     return (
    //       <div className="flex gap-x-2">
    //         <BsThreeDotsVertical
    //           className="cursor-pointer"
    //           onClick={() => console.log(data)}
    //         />
    //       </div>
    //     );
    //   },
    // },
  ];
  const studentColumn = [
    {
      title: "#sl",
      dataIndex: "serial",
    },
    {
      title: "Student Id",
      dataIndex: "id",
    },
    {
      title: "Student Image",
      dataIndex: "image",
    },
    {
      title: "Student Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "mobileNumber",
    },

    {
      title: "Course name",
      dataIndex: "category_name",
    },
    {
      title: "Batch No",
      dataIndex: "batchNo",
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
    },
  ];
  const mentors = mentorData?.data?.map((mentor: any, index: number) => {
    return {
      index: index + 1,
      id: mentor?.id,
      fullName: mentor?.fullName,
      image:
        (
          <img className="w-[30px] h-[30px] rounded-full" src={mentor?.image} />
        ) ?? "N/A",
      email: mentor?.email ?? "N/A",
      designation: mentor?.designation,
    };
  });

  const students = studentData?.data?.data?.map((data: any, index: number) => {
    return {
      serial: index + 1,
      id: data?.id,
      image:
        (
          <img
            className="w-[30px] h-[30px] rounded-full"
            src={`${IMAGE_BASE_URL}/${data?.image}`}
          />
        ) || "N/A",
      fullName: data?.fullName || "N/A",
      category_name: data?.category?.category_name || "N/A",
      batchNo: data?.batchNo || "N/A",
      registrationDate: data?.registrationDate || "N/A",
      approve: data?.approve,
      email: data?.email,
      mobileNumber: data?.mobileNumber,
    };
  });

  return (
    <div className="">
      <h1 className="text-2xl font-semibold  mb-[30px] text-customHeader">
        Overview
      </h1>

      <div>
        <DashboardSurvery />
      </div>
      <div className="mt-6">
        <Row gutter={16}>
          <Col lg={14}>
            <div>
              <StudentEnrollmentChart />
            </div>
          </Col>
          <Col lg={10}>
            {/* mentor table */}
            <div>
              <Table
                style="bg-[white]"
                theme={tablethemes}
                title="Mentors List"
                page={5}
                seeAll="seeAll"
                link="/SUPER_ADMIN/mentors"
                needPagination={false}
                total={mentors?.length}
                columns={mentorColumn}
                data={mentors}
                loading={mentorLoading}
              />
            </div>
          </Col>
        </Row>
      </div>
      <div className="mt-6">
        <Row>
          <Col lg={24}>
            <Table
              style="bg-[white]"
              title="Student List"
              seeAll="seeAll"
              link="/SUPER_ADMIN/students"
              loading={studentLoading}
              data={students}
              columns={studentColumn}
              page={6}
              total={students?.length}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
