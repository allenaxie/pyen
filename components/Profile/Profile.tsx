import classes from './Profile.module.scss';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Row, Col, Modal, Table, Button, Tabs, DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import { AddAccountForm, EditAccountForm, AccountLineChart } from '../index';

const Profile = ({
  userAccountItems,
  setUserAccountItems,
  setUpdateAccountItems,
  updateAccountItems,
  setCurrentAccountItem,
  editForm,
  currentAccountItem,
  netWorth,
  lineChartData
}: any) => {
  const { data: session } = useSession();
  const [accountFormModalVisible, setAccountFormModalVisible] = useState(false);
  const [editFormModalVisible, setEditFormModalVisible] = useState(false);
  const { TabPane } = Tabs;
  const [activeMonth, setActiveMonth] = useState('Jul');
  const [activeYear, setActiveYear] = useState('2022');

  const handleAddAccountBtn = () => {
    // open modal with form
    setAccountFormModalVisible(true);
  }

  const onModalCancel = () => {
    setAccountFormModalVisible(false);
  }

  const onEditModalCancel = () => {
    setEditFormModalVisible(false);
  }

  const handleAccountItemEdit = async (item: any) => {
    try {
      const updateCurrentAccount = () => {
        setCurrentAccountItem(item);
      }
      updateCurrentAccount();
      setEditFormModalVisible(true);
    } catch (err) {
      console.log(err);
    }
  }

  const handleAccountItemDelete = async (item: any) => {
    try {
      const deletedAccountItem = await fetch(`/api/accountItem/${item._id}`, {
        method: 'DELETE',
      })
      setUpdateAccountItems(updateAccountItems * -1);

    } catch (err) {
      console.log(err);
    }
  }

  const accountListColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      sorter: (a: any, b: any) => a.value - b.value,
      render: (value: number) => (
        <>
          <span>${value.toLocaleString()}</span>
        </>
      )
    },
    // {
    //   title: 'Date',
    //   dataIndex: 'date',
    //   key: 'date',
    //   render: (value: any) => (
    //     <>
    //       <span>{value.toLocaleString('en-US', { month: 'short' })}</span>
    //     </>
    //   )
    // },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: {}) =>
        <>
          <Button
            className={classes.editBtn}
            type="primary"
            onClick={() => handleAccountItemEdit(record)}
          >
            Edit
          </Button>
          <Button
            className={classes.deleteBtn}
            type="primary"
            danger
            onClick={() => handleAccountItemDelete(record)}
          >
            Delete
          </Button>
        </>
    }
  ]

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const handleMonthTabsChange = (key: string) => {
    console.log(key);
  }

  const handleYearChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(dateString)
  }

  return (
    <>
      <Row className={classes.container}>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          className={classes.statsContainer}
        >
          <div className={classes.netWorthTitle}>
            <h1>Net worth:</h1>
            <span>${netWorth.toLocaleString()}</span>
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
            <AccountLineChart lineChartData={lineChartData} />
          </div>
        </Col>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 11 }}
          className={classes.accountListContainer}
        >
          <Row className={classes.accountListHeader}>
            <Col
              span={6}
              className={classes.accountListYear}
            >
              <DatePicker onChange={handleYearChange} picker="year" allowClear={false}
              />
            </Col>
            <Col
              span={15}
              className={classes.accountListMonthsTabs}
            >
              <Tabs
                defaultActiveKey='Jul'
                tabPosition='top'
                className={classes.monthTabs}
                onChange={handleMonthTabsChange}
                moreIcon={false}
              >
                {months.map((item, index) => (
                  <TabPane
                    key={item}
                    tab={item}
                    className={classes.monthsTabPane}
                  >
                    <div>
                      <h2>Net worth: ${netWorth.toLocaleString()}</h2>
                    </div>
                    <Table
                      columns={accountListColumns}
                      dataSource={userAccountItems}
                      pagination={{ pageSize: 5 }}
                      rowKey={(item) => item.id}
                    />
                    {/* <div className={classes.accountsList}>
                    </div> */}

                  </TabPane>
                ))}
              </Tabs>
            </Col>
            <Col
              span={3}
              className={classes.accountListAddBtn}
            >
              <button onClick={handleAddAccountBtn}>+</button>
            </Col>
          </Row>
        </Col>
      </Row>
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
        <AddAccountForm setAccountFormModalVisible={setAccountFormModalVisible} setUserAccountItems={setUserAccountItems} userAccountItems={userAccountItems} setUpdateAccountItems={setUpdateAccountItems} updateAccountItems={updateAccountItems} session={session} />
      </Modal>
      <Modal
        title={
          <div>
            <h2>Update Account</h2>
          </div>
        }
        visible={editFormModalVisible}
        className={classes.editFormModal}
        onCancel={onEditModalCancel}
        footer={null}
      >
        <EditAccountForm
          setEditFormModalVisible={setEditFormModalVisible}
          currentAccountItem={currentAccountItem}
          setUpdateAccountItems={setUpdateAccountItems}
          updateAccountItems={updateAccountItems}
          editForm={editForm}
        />
      </Modal>
    </>
  )
}

export default Profile;