import classes from './Profile.module.scss';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import { Row, Col, Modal } from 'antd';
import AddAccountForm from '../AddAccountForm/AddAccountForm';

const Profile = ({ userAccountItems, setUserAccountItems }: any) => {
  const { data: session } = useSession();
  const [accountFormModalVisible, setAccountFormModalVisible] = useState(false);

  const handleAddAccountBtn = () => {
    // open modal with form
    setAccountFormModalVisible(true);
  }

  const onModalCancel = () => {
    setAccountFormModalVisible(false);
  }

  return (
    <>
      <Row>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          className={classes.statsContainer}
        >
          <div className={classes.netWorthTitle}>
            <h1>Net worth:</h1>
            <span>$55,000</span>
          </div>
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
              lg={{ span: 18 }}
            >
              <h2>{session?.user?.name}</h2>
              <h2>{session?.user?.email}</h2>
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 6 }}
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
          <div>
            chart
          </div>
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
              <button onClick={handleAddAccountBtn}>+</button>
              <Modal
                visible={accountFormModalVisible}
                className={classes.accountFormModal}
                onCancel={onModalCancel}
                title={
                  <div className={classes.modalHeading}>
                    <h2>
                      Create Account
                    </h2>
                  </div>
                }
                footer={null}
              >
                <AddAccountForm setAccountFormModalVisible={setAccountFormModalVisible} setUserAccountItems={setUserAccountItems} userAccountItems={userAccountItems} session={session}/>
              </Modal>
            </Col>
          </Row>
          <div className={classes.accountsList}>
            <div className={classes.listTitle}>
              <span>Name</span>
              <span>Value</span>
            </div>
            {userAccountItems?.length > 0 ? 
            userAccountItems?.map((account: { name: string, value: number }, index: number) =>
              <div className={classes.accountsListItem} key={`${account.name}-${index}`}>
                <span>{account.name}</span>
                <span>${account.value.toLocaleString()}</span>
              </div>
            )
          :
          <h1>no accounts yet</h1>
          }

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