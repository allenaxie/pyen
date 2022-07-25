import classes from './Header.module.scss';
import {Row, Col} from 'antd';
import Image from 'next/image';

const Header = () => {
    return (
        <Row>
            <Col
            xs={{span:24}}
            lg={{span:12}}
            className={classes.textContainer}
            >
                <div>Track all your assets <br/> in <span>one</span> place</div>
                <button>Get started</button>
                <p>#1 personal financial application</p>
            </Col>
            <Col
                xs={{span:24}}
                lg={{span:12}}
                className={classes.imageContainer}
            >
                <Image src="/headerImg.png" width={600} height={300} alt="financeImg"/>
            </Col>
        </Row>
    )
}

export default Header;