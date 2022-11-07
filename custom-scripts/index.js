// const getData = () => {
//   let data = document.getElementsByTagName("tr");
//   let obj = {};
//   for (let k = 1; k < data.length; ) {
//     let tag = data[k];
//     let temp_obj = {};
//     course_code = tag.getElementsByTagName("td")[1].innerHTML.substring(0, 6);
//     temp_obj.course_name = tag
//       .getElementsByTagName("td")[1]
//       .innerHTML.substring(11);
//     temp_obj.course_name = temp_obj.course_name.substring(
//       0,
//       temp_obj.course_name.length - 1
//     );
//     temp_obj.course_name.slice(0, -1);
//     temp_obj.department = tag.getElementsByTagName("td")[2].innerText;
//     temp_obj.program_name = tag.getElementsByTagName("td")[3].innerText;
//     temp_obj.branch_semester_offered =
//       tag.getElementsByTagName("td")[4].innerText;
//     temp_obj.ltp = tag.getElementsByTagName("td")[5].innerText;
//     let general_slots = [{}];
//     let slots = tag
//       .getElementsByTagName("td")[6]
//       .getElementsByTagName("table")[0].innerText;
//     slots = slots.substring(19);
//     let cntx=0;
//     let arr = slots.split("\t");
//     for (let i = 0; i < arr.length - 2; i += 2) {
//       let day = arr[i].slice(1);
//       let time = arr[i + 1].slice(0);
//       cntx++;
//       if(cntx>1){day = day.slice(9,);}
//     //  if(cntx>1){time=time.slice(8,);console.log(time);}
//       let dtcode = day.substring(0, 3) + "-" + time.substring(0, 5);
//       general_slots.push({ day, time, dtcode });
//     }
//     general_slots = general_slots.slice(1);
//     temp_obj.general_slots = general_slots;
//     temp_obj.booked_slots = "";
//     temp_obj.cancelled_slots = "";
//     temp_obj.instructor_mail = "";
//     obj[course_code] = temp_obj;
//     k += general_slots.length + 2;
//   }
//   console.log(obj);
// };

const getShortCode = (str) => {
  let res = "";
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i] != "" && words[i][0] === words[i][0].toUpperCase()) {
      res += words[i][0];
    }
  }
  return res;
};

const getData = () => {
  const body = document.getElementsByTagName("tbody")[0].children;
  let obj = {};

  for (let i = 0; i < body.length; i++) {
    let c = {};
    let course_code = body[i].children[1].innerHTML.split("<br>")[0].trim();
    c.course_name = body[i].children[1].innerHTML
      .split("<br>")[1]
      .replace("(", "")
      .replace(")", "")
      .replace("\n", "")
      .trim();
    c.short_code = getShortCode(c.course_name);
    c.department = body[i].children[2].innerHTML;
    c.program_name = body[i].children[3].innerHTML;
    c.branch_semester_offered = body[i].children[4].innerHTML;
    c.ltp = body[i].children[5].innerHTML;
    c.booked_slots = "";
    c.cancelled_slots = "";
    c.instructor_mail = "";
    let slot = [];
    let slotdata = body[i].children[6].children[0].children[1].children;
    for (let j = 0; j < slotdata.length; j++) {
      let slotdatachild = slotdata[j].children;
      slot.push({
        day: slotdatachild[0].innerHTML,
        time: slotdatachild[1].innerHTML,
        dtcode:
          slotdatachild[0].innerHTML.substring(0, 3).toLowerCase() +
          "-" +
          slotdatachild[1].innerHTML.substring(0, 5),
      });
    }
    c.general_slots = slot;
    obj[course_code] = c;
  }
  console.log(obj);
};
