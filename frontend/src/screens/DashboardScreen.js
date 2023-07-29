import AdminNavbar from '../components/AdminNavbar.js';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from '../components/LineChart.js';
import Button from 'react-bootstrap/esm/Button.js';
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';

export default function DashboardScreen() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [25, 32, 30, 40, 35, 45],
        fill: true, // Enable the fill option to add the background color under the line
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }
          const gradient = ctx.createLinearGradient(
            chartArea.left,
            chartArea.bottom, // The gradient will start from the bottom
            chartArea.left,
            chartArea.top // And extend to the top
          );
          gradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)');
          gradient.addColorStop(0, 'rgb(255, 255, 255)');
          return gradient;
        },
      },
    ],
  });

  const { isLoading: isLoadingOrders, data: orderData } = useQuery(
    'orders',
    async () => {
      return await axios.get('/api/orders/');
    }
  );

  if (isLoadingOrders) {
    return (
      <div className="d-flex justify-content-center mb-5 mt-5">
        <LoadingBox />
      </div>
    );
  }

  let obj = {};
  const arr = [];

  if (orderData) {
    //const result = orderData.data[0].paidAt
    const result = orderData.data;
    //const date = result.split('T')[0]
    //console.log(date)
    for (let i = 0; i <= result.length - 1; i++) {
      const ordersPaid = orderData.data[i].paidAt;
      const ordersId = orderData.data[i]._id;
      const date = ordersPaid.split('T')[0];
      const totalPrice = orderData.data[i].totalPrice;

      //console.log(ordersId)

      obj['id'] = ordersId;
      obj['orderDate'] = date;
      obj['totalPrice'] = totalPrice;

      arr.push(obj);

      obj = {};
    }
  }

  const currentMonthLabel = () => {
    const dateString = Date.now();

    const dateObject = new Date(dateString);

    const monthNumber = dateObject.getMonth();

    const filterMonthsArr = months.filter((el, index) => index <= monthNumber);

    return filterMonthsArr;
  };

  const monthChartArrData = () => {
    const dataArr = [];
    const lgMonthArr = [];

    for (let i = 0; i <= arr.length - 1; i++) {
      const orderDate = arr[i].orderDate;
      const largestMonth = orderDate.split('-')[1];
      lgMonthArr.push(largestMonth);
    }

    const monthDataLength = Math.max(...lgMonthArr);

    for (let i = 0; i <= monthDataLength - 1; i++) {
      dataArr.push(0);
    }

    let sum = 0;
    for (let i = 0; i <= arr.length - 1; i++) {
      const orderDate = arr[i].orderDate;
      const months = orderDate.split('-')[1];
      const findMonths = arr
        .filter((el, index) => el.orderDate.split('-')[1] === months)
        .map((el) => el.totalPrice);

      for (let i = 0; i < findMonths.length; i++) {
        sum += findMonths[i];
      }

      dataArr[Number(months) - 1] = sum;

      sum = 0;
    }
    return dataArr;
  };

  console.log(arr);

  //const date = new Date();
  const date = new Date('2023-07-25');
  const chartWeekArr = [];
  let dayNumber = date.getDay() + 1;
  let remainder = 6 - dayNumber
  //console.log(dayNumber)
  //console.log(remainder)

  for (let i = 0; i < dayNumber; i++) {
    //console.log(daysOfWeek[i])
    console.log(i)

    }

    for (let i = 0; 0 <= 6; i++) {
      //console.log(daysOfWeek[remainder], 'r')
      console.log(i)
  
      }

    
  

  //console.log(chartWeekArr)

  const changeChartData = (timeSpan) => {
    if (timeSpan === 'month') {
      setChartData({
        labels: currentMonthLabel(),
        datasets: [
          {
            label: 'Sales',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: monthChartArrData(),
            fill: true, // Enable the fill option to add the background color under the line
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) {
                // This case happens on initial chart load
                return null;
              }
              const gradient = ctx.createLinearGradient(
                chartArea.left,
                chartArea.bottom, // The gradient will start from the bottom
                chartArea.left,
                chartArea.top // And extend to the top
              );
              gradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)');
              gradient.addColorStop(0, 'rgb(255, 255, 255)');
              return gradient;
            },
          },
        ],
      });
    } else if (timeSpan === 'week') {
      setChartData({
        labels: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        datasets: [
          {
            label: 'Sales',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: [30, 42, 30, 40, 35, 75, 58],
            fill: true, // Enable the fill option to add the background color under the line
            backgroundColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) {
                // This case happens on initial chart load
                return null;
              }
              const gradient = ctx.createLinearGradient(
                chartArea.left,
                chartArea.bottom, // The gradient will start from the bottom
                chartArea.left,
                chartArea.top // And extend to the top
              );
              gradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)');
              gradient.addColorStop(0, 'rgb(255, 255, 255)');
              return gradient;
            },
          },
        ],
      });
    }
  };

  return (
    <Row>
      <Col className="" md={3} sm={4} xs={3}>
        <div className="admin-navbar-wrapper">
          <AdminNavbar />
        </div>
      </Col>
      <Col md={9} sm={8} xs={9} className="">
        <Row className="mt-4 w-100 d-flex justify-content-center">
          <Col lg={4} md={11} className="">
            <div className="d-flex justify-content-center">
              <Card className="shadow p-2 mt-3 w-100 p-3 bg-gradient-cosmic text-white">
                <div className="font-weight-light">Total Orders</div>
                <div className="d-flex justify-content-between mt-2">
                  <h3 className="stat">865</h3>
                  <span className=" fs-3 material-symbols-outlined">
                    shopping_cart
                  </span>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="" lg={4} md={11}>
            <div className="d-flex justify-content-center">
              <Card className="shadow p-2 mt-3 w-100 p-3 bg-gradient-burning text-white">
                <div className="font-weight-light">Total Income</div>
                <div className="d-flex justify-content-between mt-2">
                  <h3 className="stat">$52,945</h3>
                  <span className=" fs-3 material-symbols-outlined">
                    credit_card
                  </span>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="" lg={4} md={11}>
            <div className="d-flex justify-content-center">
              <Card className="shadow p-2 mt-3 w-100 p-3 bg-gradient-Ohhappiness text-white">
                <div className="font-weight-light">Total Users</div>
                <div className="d-flex justify-content-between mt-2">
                  <h3 className="stat">24.5K</h3>
                  <span className=" fs-3 material-symbols-outlined">
                    person
                  </span>
                </div>
              </Card>
            </div>
          </Col>
        </Row>

        <div className="pe-2 mt-3 mb-3">
          <div className="btn-group shadow">
            <Button>Day</Button>
            <Button
              onClick={() => {
                changeChartData('week');
              }}
            >
              Week
            </Button>
            <Button
              onClick={() => {
                changeChartData('month');
              }}
            >
              Month
            </Button>
          </div>

          <LineChart data={chartData} />
        </div>
      </Col>
    </Row>
  );
}
