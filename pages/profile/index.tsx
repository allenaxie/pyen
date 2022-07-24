import { Profile } from '../../components/index';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Form } from 'antd';

interface ProfilePageProps {
    accounts: {
        name: string,
        value: number,
    }
}

const ProfilePage = (props: ProfilePageProps) => {
    const { accounts } = props;
    const { data: session } = useSession();
    const [userAccountItems, setUserAccountItems] = useState([]);
    const [updateAccountItems, setUpdateAccountItems] = useState(-1);
    const [currentAccountItem, setCurrentAccountItem] = useState({});
    const [netWorth, setNetWorth] = useState(0);
    const [editForm] = Form.useForm();
    const [lineChartLabels, setLineChartLabels] = useState<string[]>([]);
    const [lineChartData, setLineChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Account Value',
            data: [],
            backgroundColor: ["rgba(75,192,192,1"]
        }],
    });
    const [activeMonth, setActiveMonth] = useState(7);
    const [activeYear, setActiveYear] = useState('2022');

    useEffect(() => {
        const getUserAccountItems = async () => {
            try {
                // get new data
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/accountItem?user=${session?.user?.id}`,);
                const { data } = await res.json();


                // table data
                let filteredTableData = data.filter((item:any) => 
                {
                    if(item.month == activeMonth && item.year == activeYear) {
                    return item
                }}
                )
                setUserAccountItems(filteredTableData);

                // calculate net worth
                let netWorth = filteredTableData.reduce(function (acc: number, item: any) {
                    return acc + item.value;
                }, 0);
                setNetWorth(netWorth);

                // update chart
                // make copy of data to sort array by date
                const dataCopy = data.filter((item:any) => item.year == activeYear)
                dataCopy.sort((a:any,b:any) => a.month - b.month || a.year - b.year);
                // get date from data
                let labels = dataCopy?.map((item: any) => {
                    return `${item.month}/${item.year}`
                });
                // update chart label and data
                setLineChartLabels(labels);
                setLineChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Account Value',
                        data: dataCopy.map((item: any) => item.value),
                        backgroundColor: ["rgba(75,192,192,1"]
                    }],
                })
            } catch (err) {
                console.log(err);
            }
        }
        getUserAccountItems();
    }, [updateAccountItems])

    console.log('userAccountItems', userAccountItems);
    useEffect(() => {
        // reset form initial values
        editForm.resetFields();
    }, [currentAccountItem])

    return (
        <>
            <Profile
                userAccountItems={userAccountItems}
                setUserAccountItems={setUserAccountItems}
                setUpdateAccountItems={setUpdateAccountItems}
                updateAccountItems={updateAccountItems}
                setCurrentAccountItem={setCurrentAccountItem}
                editForm={editForm}
                currentAccountItem={currentAccountItem}
                netWorth={netWorth}
                lineChartData={lineChartData}
                activeMonth={activeMonth}
                setActiveMonth={setActiveMonth}
                activeYear={activeYear}
                setActiveYear={setActiveYear}
            />
        </>
    )
}

export default ProfilePage;