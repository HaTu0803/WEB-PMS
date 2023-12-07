import { Typography } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

function Dashboard() {
  // const [text, setText] = useState('');

  // useEffect(() => {
  //   async function fetchData() {
  //       const token = Cookies.get('authToken');
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:4000/address/nation`,
  //       {
           
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     setText("ok");
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  //   }
  //   fetchData();
  // }, [text]);

  return (
    <div>
      <Typography.Text> Dashboard </Typography.Text>
    </div>
  );
}

export default Dashboard;
