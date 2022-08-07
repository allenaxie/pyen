import classes from './Header.module.scss';
import { Row, Col } from 'antd';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {

    const { data: session } = useSession();

    return (
        <Row>
            <Col
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                className={classes.textContainer}
            >
                <div>Track all your assets <br /> in <span>one</span> place</div>
                {session ?

                    <button className={classes.ctaBtn}>
                        <Link href='/profile'>
                            My Profile
                        </Link>
                    </button>
                    :
                    <button className={classes.ctaBtn}>
                        <Link href='/login'>
                            Get started
                        </Link>
                    </button>
                }
                <p> #1 <span>personal</span> financial application</p>
            </Col>
            <Col
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                className={classes.imageContainer}
            >
                <Image src="/Images/headerImg.png" width={600} height={300} alt="financeImg" />
            </Col>
        </Row>
    )
}

export default Header;