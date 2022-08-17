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
      console.log(activeSymbol);
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

    console.log('symbolInput: ', symbolInput);

    const handleMenuClick = async (e: any) => {
        try {
            const ticker = e.keyPath[0].split('-')[1];
            setIsLoading(true);
            const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`)
            const data = await res.json();
            console.log(data);
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

    console.log('activeSymbol:', activeSymbol);

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
                            {activeSymbol['01. symbol']} <br/>
                            {activeSymbol['07. latest trading day']} <br/>
                            ${activeSymbol['05. price']} <br/>
                            {parseInt(activeSymbol['06. volume']).toLocaleString()} <br/>
                            {activeSymbol['08. previous close']} <br/>
                            {activeSymbol['10. change percent']} <br/>
                            {activeSymbol['09. change']} <br/>
                        </Card>
                    </Col>
                </Row>
                
            }
        </div>
    )
}

export default StocksPage;