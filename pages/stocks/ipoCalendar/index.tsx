import { Table, Row, Col } from "antd";
import classes from '../../../styles/ipoCalendar.module.scss';

const IPOCalendarPage = ({ upcomingIPO }: any) => {

    const columns = [
        {
            title: 'IPO Date',
            dataIndex: 'ipoDate',
            key: 'ipoDate',
        },
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: 'Company Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Exchange',
            dataIndex: 'exchange',
            key: 'exchange',
        },
        {
            title: 'Price Range',
            dataIndex: 'ipoPriceLow',
            key: 'priceRange',
            render: (text: string, item: any) => (
                <div>
                    {text ?
                        <div>
                            ${text} - ${item.ipoPriceHigh}
                        </div>
                        :
                        <div>N/A</div>
                    }

                </div>
            )
        },
        {
            title: 'Shares Offered',
            dataIndex: 'sharesOffered',
            key: 'sharesOffered',
            render: (text: number) => <span>{text.toLocaleString()}</span>
        },
        {
            title: 'Market Cap',
            dataIndex: 'marketCap',
            key: 'marketCap',
            render: (text: number) => (
                <div>
                    {text ?
                        <div>
                            ${text.toLocaleString()}
                        </div>
                        :
                        <div>N/A</div>
                    }

                </div>
            )
        }
    ]

    return (
        <Row>
            <Col
                xs={{ span: 24 }}
                className={classes.container}
            >
                <h1>IPO Calendar</h1>
                <Table
                    columns={columns}
                    dataSource={upcomingIPO}
                    rowKey={item => item.symbol}
                />
            </Col>
        </Row>
    )
}

export default IPOCalendarPage;

export async function getStaticProps() {

    const res = await fetch('https://upcoming-ipo-calendar.p.rapidapi.com/ipo-calendar', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${process.env.X_RapidAPI_Key}`,
            'X-RapidAPI-Host': `${process.env.X_RapidAPI_Host}`,
        }
    });
    const { data } = await res.json();

    return {
        props: {
            upcomingIPO: data,
        }
    }
}