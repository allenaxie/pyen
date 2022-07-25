import classes from './AccountLineChart.module.scss';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
    
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

const AccountLineChart = ({lineChartData, activeMonth, activeYear}:any) => {

    const options = {
        maintainAspectRatio: false,	// Don't maintain w/h ratio
        // plugins: {
        //     title: {
        //         display: true,
        //         align: "start",
        //         text: `${activeYear}`,
        //         padding: {
        //             top: 10,
        //             bottom: 30
        //         },
        //         font: {
        //             size: 30,
        //             weight: 'bold',
        //         },
        //     }
        // }
      }
  
    return (
        <div className={classes.container}>
            <h1 className={classes.yearTitle}>{activeYear}</h1>
            <Line
                data={lineChartData}
                options={options}
                className={classes.chart}
            />
        </div>
    )
}

export default AccountLineChart;