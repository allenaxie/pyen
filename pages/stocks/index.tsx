import { Row, Col, Input, Menu, Dropdown, Card } from 'antd';
import { useState, useEffect } from 'react';
import classes from '../../styles/stocks.module.scss';

const StocksPage = () => {
    const { Search } = Input;

    const [symbolData, setSymbolData] = useState([]);
    const [activeSymbol, setActiveSymbol] = useState<any>({});
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [symbolInput, setSymbolInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log(activeSymbol)
    }, [activeSymbol])


    const handleSymbolSearch = async (e: any) => {
        // if input greater than 2 characters, fetch best match symbol
        const input = e.target.value;
        setSymbolInput(input);
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
                    setSymbolData(filteredMatches);
                    filteredMatches.length > 0 ? setDropdownVisible(true) : setDropdownVisible(false);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            setSymbolData([]);
            setActiveSymbol({});
            setDropdownVisible(false);
        }
    }

    const handleMenuClick = async (e: any) => {
        try {
            const ticker = e.keyPath[0].split('-')[1];
            setIsLoading(true);
            const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`)
            const data = await res.json();
            setActiveSymbol(data["Global Quote"]);
            // close menu
            setDropdownVisible(false);
            setSymbolInput('');
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const tickerDropdown = (
        <Row justify='center'>
            <Col
                xs={{ span: 24 }}
                lg={{ span: 12 }}
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
                    onClick={handleMenuClick}
                />
            </Col>
        </Row>
    )

    return (
        <div className={classes.container}>
            <Dropdown
                overlay={tickerDropdown}
                placement="bottomLeft"
                arrow
                visible={dropdownVisible}
            >
                <Row
                    justify='center'
                >
                    <Col
                        xs={{ span: 24 }}
                        lg={{ span: 16 }}
                    >
                        <Search placeholder="Search ticker symbol" onChange={handleSymbolSearch} maxLength={6} value={symbolInput} />
                    </Col>
                </Row>
            </Dropdown>

            {activeSymbol && Object.keys(activeSymbol).length > 0 &&
                <Row justify='center' className={classes.cardContainer}>
                    <Col
                        xs={{ span: 22 }}
                        lg={{ span: 16 }}
                    >
                        <Card>
                            <Row>
                                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                    <div className={classes.statsItem}>
                                        <span className={classes.statsLabel}>
                                            Symbol:
                                        </span>
                                        <div>
                                            {activeSymbol['01. symbol']} <br />
                                        </div>
                                    </div>
                                    <div className={classes.stats2ndRow}>
                                        <span className={classes.statsLabel}>
                                            Latest Trading Day:
                                        </span>
                                        <div>
                                            {activeSymbol['07. latest trading day']}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                    <div className={classes.statsItem}>
                                        <span className={classes.statsLabel}>
                                            Price:
                                        </span>
                                        <div>
                                            ${parseFloat(activeSymbol['05. price']).toFixed(2)} <br />
                                        </div>
                                    </div>
                                    <div className={classes.stats2ndRow}>
                                        <span className={classes.statsLabel}>
                                            Volume:
                                        </span>
                                        <div>
                                            {parseInt(activeSymbol['06. volume']).toLocaleString()}
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                    <div className={classes.statsItem}>
                                        <span className={classes.statsLabel}>
                                            Previous Close:
                                        </span>
                                        <div>
                                            ${parseFloat(activeSymbol['08. previous close']).toFixed(2)} <br />
                                        </div>
                                    </div>
                                    <div className={classes.stats2ndRow}>
                                        <span className={classes.statsLabel}>
                                            Change:
                                        </span>
                                        <div >
                                            {parseFloat(activeSymbol['09. change']).toFixed(2)} <br />
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                                    <div className={classes.statsItem}>
                                        <span className={classes.statsLabel}>
                                            Percent Change:
                                        </span>
                                        <div >
                                            {parseFloat(activeSymbol['10. change percent']).toFixed(2)}% <br />
                                        </div>
                                    </div>
                                    
                                </Col>
                            </Row>



                        </Card>
                    </Col>
                </Row>

            }
        </div>
    )
}

export default StocksPage;