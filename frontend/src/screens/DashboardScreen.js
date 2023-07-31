import AdminNavbar from '../components/AdminNavbar.js';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from '../components/LineChart.js';
import Button from 'react-bootstrap/esm/Button.js';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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

  const [chartType, setChartType] = useState('');

  const [arr, setArr] = useState([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const orderData = await axios.get('/api/orders/');

      if (orderData) {
        const result = orderData.data;
        const newArr = [];
        for (let i = 0; i <= result.length - 1; i++) {
          const ordersPaid = orderData.data[i].paidAt;
          const ordersId = orderData.data[i]._id;
          const date = ordersPaid.split('T')[0];
          const totalPrice = orderData.data[i].totalPrice;

          newArr.push({
            id: ordersId,
            orderDate: date,
            totalPrice: totalPrice,
          });
        }

        setArr(newArr);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Simulate a click on the button when the component is mounted
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, [arr]);

  function getCurrentDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  const doughnutData = () => {
    let sum = 0;
    let goal = 350;

    const filterTodaySales = arr.filter(
      (el) => el.orderDate === getCurrentDate()
    );

    for (let i = 0; i < filterTodaySales.length; i++) {
      sum += filterTodaySales[i].totalPrice;
    }

    const percentage = sum / goal;

    const wholePercentage = Math.trunc(percentage * 100);

    const remainder = 100 - wholePercentage;

    return [wholePercentage, remainder];
  };

  const [chartData, setChartData] = useState({
    labels: ['Earnings', 'Rest Of Goal'],
    datasets: [
      {
        label: 'Percentage',
        data: [0, 100],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  });

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

  const chartWeekLabel = () => {
    const date = new Date();
    const chartWeekArr = [];
    let dayNumber = date.getDay();
    let remainder = 6 - dayNumber;

    for (dayNumber; dayNumber >= 0; dayNumber--) {
      chartWeekArr.push(daysOfWeek[dayNumber]);
    }

    const startNum = 6 - remainder;

    for (let i = 6; i > startNum; i--) {
      chartWeekArr.push(daysOfWeek[i]);
    }

    return chartWeekArr.reverse();
  };

  const chartWeekData = () => {
    const filteredDates = arr.filter((item) => {
      const orderDate = new Date(item.orderDate);
      const currDate = new Date();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(currDate.getDate() - 7);
      return orderDate >= oneWeekAgo && orderDate <= currDate;
    });

    const labels = chartWeekLabel();
    const daysObj = {};

    for (let i = 0; i < labels.length; i++) {
      daysObj[labels[i]] = 0;
    }

    filteredDates.forEach((order) => {
      const orderDate = new Date(`${order.orderDate}T12:30:00`);
      let dayOfWeek = orderDate.getDay();

      daysObj[daysOfWeek[dayOfWeek]] += order.totalPrice;
    });

    const valueArray = Object.values(daysObj);

    return valueArray;
  };

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
        labels: chartWeekLabel(),
        datasets: [
          {
            label: 'Sales',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: chartWeekData(),
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
    } else if (timeSpan === 'day') {
      setChartData({
        labels: ['Earnings', 'Rest Of Goal'],
        datasets: [
          {
            label: 'Percentage',
            data: doughnutData(),
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
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
            <Button
              ref={buttonRef}
              onClick={() => {
                changeChartData('day');
                setChartType('pie');
              }}
            >
              Day
            </Button>
            <Button
              onClick={() => {
                changeChartData('week');
                setChartType('line');
              }}
            >
              Week
            </Button>
            <Button
              onClick={() => {
                changeChartData('month');
                setChartType('line');
              }}
            >
              Month
            </Button>
          </div>

          <LineChart data={chartData} chartType={chartType} />
        </div>
      </Col>
    </Row>
  );
}
