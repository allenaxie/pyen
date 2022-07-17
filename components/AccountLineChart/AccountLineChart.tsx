import classes from './AccountLineChart.module.scss';
import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS } from 'chart.js/auto';

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
console.log(lineChartData);
    return (
        <>
            <Line
                data={lineChartData}
            />
        </>
    )
}

export default AccountLineChart;