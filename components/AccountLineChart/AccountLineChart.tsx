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
        plugins: {
            title: {
                display: true,
                text: `${activeYear}`,
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
      }
  
    return (
        <div className={classes.container}>
            <Line
                data={lineChartData}
                options={options}
                className={classes.chart}
            />
        </div>
    )
}

export default AccountLineChart;