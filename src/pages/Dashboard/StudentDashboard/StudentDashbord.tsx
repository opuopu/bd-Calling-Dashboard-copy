import StudentDashboardSurvey from "../../../component/StudentDashboardSurvey/StudentDashboardSurvey";
import { useState } from "react";
import style from "./studentDashboard.module.css";
import StudentCourses from "../../../component/StudentCourses/StudentCourses";
import NoEnrollMent from "../../../component/StudentCourses/NoEnrollment/Noenrollment";
import StudentCertificate from "../../../component/StudentCertificate/StudentCertificate";
export default function StudentDashbord() {
  const [selectedTab, setSelectedTab] = useState<"courses" | "certificates">(
    "courses"
  );
  const handleToggle = () => {
    setSelectedTab(selectedTab === "courses" ? "certificates" : "courses");
  };
  return (
    <div className="h-screen">
      <h1>Overview</h1>
      <StudentDashboardSurvey />
      <div
        className="flex gap-x-4 my-6  py-2.5 px-8 rounded-lg"
        style={{
          backgroundColor: "white",
          boxShadow: " 0px 0px 18px 0px rgba(0, 0, 0, 0.06)",
        }}
      >
        <button
          className={selectedTab === "courses" ? style.active : style.inactive}
          onClick={handleToggle}
        >
          My Course
        </button>
        <button
          className={
            selectedTab === "certificates" ? style.active : style.inactive
          }
          onClick={handleToggle}
        >
          Certificates
        </button>
      </div>
      <div>
        <h1 className="text-4xl font-medium	text-[#333]">
          States in which you are enrolling
        </h1>
        {selectedTab === "courses" ? (
          <StudentCourses />
        ) : (
          <StudentCertificate />
        )}
      </div>
    </div>
  );
}
