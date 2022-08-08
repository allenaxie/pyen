import { Row, Col, Input, Menu, Dropdown } from 'antd';
import { useState, useEffect } from 'react';
import classes from '../../styles/stocks.module.scss';

const StocksPage = () => {
    const { Search } = Input;

    const [symbolData, setSymbolData] = useState([]);

    // everytime symbol data changes
    useEffect(() => {
        console.log(symbolData);
    }, [symbolData])

    const handleSymbolSearch = async (e: any) => {
        // if input greater than 2 characters, fetch best match symbol
        const input = e.target.value;
        if (input.length > 2) {
            try {
                const res = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`);
                const { bestMatches } = await res.json();
                if (bestMatches) {
                    // filter only USA and Equity matches
                    const filteredMatches = bestMatches.filter((item: any) => {
                        if (item['4. region'] === 'United States' && item['3. type'] === 'Equity') {
                            return item;
                        }
                    });
                    console.log('filteredMatches: ', filteredMatches);
                    setSymbolData(filteredMatches);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            setSymbolData([]);
        }
    }

    const tickerDropdown = (
        <Row justify='center'>
            <Col
                xs={{span:24}}
                lg={{span:12}}
            >
                <Menu
                    items={symbolData.map((item: any, index: number) => (
                        {
                            label: (
                                <div className={classes.dropdownItemsContainer} key={index}>
                                    <span className={classes.symbol}>{item['1. symbol']}</span>
                                    <span className={classes.name}>{item['2. name']}</span>
                                </div>
                            ),
                            key: `${index}-${item['1. symbol']}`,
                        }
                    ))}
                />
            </Col>
        </Row>
    )

    return (
        <>
            Stocks
            <Dropdown
                overlay={tickerDropdown}
                placement="bottomLeft"
                arrow
                visible={symbolData.length > 0 ? true : false}
            >
                <Row
                    justify='center'
                >
                    <Col
                        xs={{ span: 24 }}
                        lg={{ span: 16 }}
                    >
                        <Search placeholder="Search ticker symbol" onChange={handleSymbolSearch} />
                    </Col>
                </Row>
            </Dropdown>
            <span>
                {symbolData && symbolData.length}
            </span>
        </>
    )
}

export default StocksPage;