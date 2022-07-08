import classes from './Profile.module.scss';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { Row, Col } from 'antd';

const Profile = () => {
  const { data: session } = useSession();

  return (
    <>
      <Row>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          className={classes.statsContainer}
        >
          <h1>Net worth:</h1>
          <Row>
            <Col
              xs={{ span: 24 }}
              md={{ span: 12 }}
            >
              <div>Last month:</div>
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 12 }}
            >
              <div>Average per month:</div>
            </Col>
          </Row>
        </Col>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          className={classes.profileInfoContainer}
        >
          <Row>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 12 }}
            >
              <h2>{session?.user?.name}</h2>
              <h2>{session?.user?.email}</h2>
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 12 }}
            >
              <Image src={session ? `${session?.user?.image}` : 'https://joeschmoe.io/api/v1/random'} width={100} height={100} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          className={classes.chartContainer}
        >
          chart
        </Col>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 11 }}
          className={classes.accountListContainer}
        >
          <Row className={classes.accountListHeader}>
            <Col
              span={18}
              className={classes.accountListHeaderTitle}
            >
              <h1>Accounts</h1>
            </Col>
            <Col
              span={6}
              className={classes.accountListAddBtn}
            >
              <button>+</button>
            </Col>
          </Row>
          <div className={classes.accountsList}>
            <div className={classes.accountsListItem}>
              <span>Account name</span>
              <span>Value</span>
            </div>
            <div className={classes.accountsListItem}>
              <span>Account name</span>
              <span>Value</span>
            </div>
            <div className={classes.accountsListItem}>
              <span>Account name</span>
              <span>Value</span>
            </div>
            <div className={classes.accountsListItem}>
              <span>Account name</span>
              <span>Value</span>
            </div>
            <div className={classes.accountsListItem}>
              <span>Account name</span>
              <span>Value</span>
            </div>
          </div>
        </Col>
      </Row>




      {/* Signed in as {session?.user?.email} <br />
        <Image src={`${session?.user?.image}`} width={200} height={200} />
        <h2>{session?.user?.name}</h2>
        <button onClick={() => signOut({
          callbackUrl: `${window.location.origin}/login`
        })}>Sign out</button> */}
    </>
  )
}

export default Profile;