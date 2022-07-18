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

const AccountLineChart = ({lineChartData}:any) => {

    const options = {
        maintainAspectRatio: false	// Don't maintain w/h ratio
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