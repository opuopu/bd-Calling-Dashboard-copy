import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import CustomPaginations from "../UI/Pagination/Pagination";

export default function Notification() {
  const [notifications, setnotifications] = useState([]);
  const [page, setCurrentPage] = useState(1);
  console.log(page);
  useEffect(() => {
    fetch("/notification.json")
      .then((res) => res.json())
      .then((data) => setnotifications(data));
  }, []);

  return (
    <div>
      <h1 className="text-[24px] font-semibold mb-4">Notification</h1>
      <div>
        {notifications?.map((notification, index) => (
          <NotificationCard key={index} notification={notification} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p>SHOWING 1-10 OF {notifications.length}</p>
        <CustomPaginations
          pageSize={10}
          total={notifications.length}
          size="large"
          handleOnChange={(page: number) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
}