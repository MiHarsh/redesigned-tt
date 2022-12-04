import { Table } from "antd";
import React, { useState } from "react";
import axios from "axios";

export const BookedSlotView = (props) => {
  console.log(props, "inside booked slot view");
  const columns = [
    {
      key: "course_code",
      title: "course_code",
      dataIndex: "course_code",
    },
    {
      key: "course_name",
      title: "course_name",
      dataIndex: "course_name",
    },
    {
      key: "prof",
      title: "prof",
      dataIndex: "prof",
    },
    {
      key: "students",
      title: "clashing students",
      dataIndex: "clashing_students",
    },
    {
      key: "button",
      title: "email status",
      dataIndex: "email",
    },
  ];

  const data1 = props.data;
  console.log("Data1[Harshit]: ", data1);

  if (data1) {
    for (let i = 0; i < data1.length; i++) {
      if (data1[i].isemailSent) {
        data1[i].email = (
          <button
            key={i}
            className="hy btn btn-success"
            style={{ width: "60px", height: "30px", fontSize: "13px" }}
            onClick={(e) => {
              sendEmail(i, data1[i].course_email);
            }}
          >
            sent
          </button>
        );
      } else
        data1[i].email = (
          <button
            key={i}
            className="hy btn btn-primary"
            style={{ width: "60px", height: "30px", fontSize: "13px" }}
            onClick={(e) => {
              sendEmail(i, data1[i].course_email);
            }}
          >
            email
          </button>
        );
    }
  }
  const [final_data, setFinal_Data] = useState(data1);
  for (const [key, val] in Object.entries(data1)) {
    if (data1[key].instructor_mail.length) {
      data1[key].prof = data1[key].instructor_mail.split('@')[0];
    } else {
      data1[key].prof = "Dr. Harshit"
    }
  }

  const sendEmail = (i, course_email) => {
    if (final_data[i].isemailSent) {
    } else {
      let x = final_data;
      let y = document.getElementsByClassName("hy");
      y[i].innerHTML = "sent";
      y[i].className = "hy btn btn-success";
      y[i].style = "width:60px;height:30px;font-size:13px";
      setFinal_Data(x);

      final_data[i].isemailSent = true;
      let slot_time = new Date(props.slot_time);
      slot_time = slot_time.toUTCString();
      console.log("Slot time: ", slot_time);

      axios.post("http://localhost:5000/api/requestMail", {
        subCode: final_data[i].course_code,
        userMail: "harshit2001411@gmail.com",
        requestedBy: `${props.present_subject.course_name} - ${props.present_subject.course_code}`,
        time: slot_time,
      }).then((res) => {
        console.log("Response object[Harshit]: ", res);
      });
    }
  };
  const sendEmailAll = (course_email) => {
    for (let i = 0; i < final_data.length; i++) {
      sendEmail(i, course_email);
    }
  };

  return (
    <div className="" style={{ marginBottom: "0px", paddingBottom: "0px" }}>
      <Table
        dataSource={final_data}
        columns={columns}
        style={{ fontFamily: " sans-serif" }}
      />
      <button
        className="btn btn-primary"
        style={{ fontSize: "15px" }}
        onClick={(e) => {
          sendEmailAll();
        }}
      >
        Email All
      </button>
    </div>
  );
};
