import classes from './Profile.module.scss';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import { Row, Col, Modal, Table } from 'antd';
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

  const accountListColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value:number) => (
        <>
          <span>${value.toLocaleString()}</span>
        </>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => 
        <>
          <button>Edit</button>
          <button>Delete</button>
        </>
      
    }
  ]

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
            <Table columns={accountListColumns} dataSource={userAccountItems}/>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Profile;