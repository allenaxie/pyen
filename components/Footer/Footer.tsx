import classes from './Footer.module.scss';
import { Row, Col } from 'antd';
import Image from 'next/image';

const Footer = () => {

    return (
        <Row className={classes.container}>
            <Col
                xs={{ span: 24}}
                lg={{ span: 16 }}
                className={classes.footerMainContent}
            >
                <span className={classes.logo}>
                Pyen
                </span>
                
                <p className={classes.footerCopyright}>Copyright Pyen 2022. All Rights Reserved.</p>
            </Col>
        </Row>
    )
}

export default Footer;