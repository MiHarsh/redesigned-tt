import { Table } from "antd";
import React, { useState } from "react";

export const BookedSlotView = (props) => {
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
      title: "clashed_count",
      dataIndex: "clashed_count",
    },
    {
      key: "button",
      title: "email status",
      dataIndex: "email",
    },
  ];
  let flag = 0;

  const data1 = props.data;
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
  const sendEmail = (i, course_email) => {
    if (final_data[i].isemailSent) {
    } else {
      let x = final_data;
      let y = document.getElementsByClassName("hy");
      y[i].innerHTML = "sent";
      y[i].className = "hy btn btn-success";
      y[i].style = "width:60px;height:30px;font-size:13px";
      setFinal_Data(x);
    }
  };
  const sendEmailAll = (course_email) => {
    for (let i = 0; i < final_data.length; i++) {
      if (final_data[i].isemailSent) {
      } else {
        let x = final_data;
        let y = document.getElementsByClassName("hy");
        y[i].innerHTML = "sent";
        y[i].className = "hy btn btn-success";
        y[i].style = "width:60px;height:30px;font-size:13px";
        setFinal_Data(x);
      }
    }
  };

  return (
    <div className="" style={{ marginBottom: "0px", paddingBottom: "0px" }}>
      <Table
        dataSource={final_data}
        columns={columns}
        style={{ fontFamily: "Ubuntu" }}
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
