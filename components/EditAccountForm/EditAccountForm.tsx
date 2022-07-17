import classes from './EditAccountForm.module.scss';
import { Form, Input, InputNumber, Button } from 'antd';
import { useState, Dispatch, SetStateAction } from 'react';
import {useRouter} from 'next/router';

interface EditAccountFormProps {
    setEditFormModalVisible : Dispatch<SetStateAction<boolean>>,
    currentAccountItem: any,
    setUpdateAccountItems: any,
    updateAccountItems: number,
    editForm: any,
}

const EditAccountForm = (props: EditAccountFormProps) => {

    const {setEditFormModalVisible, currentAccountItem, updateAccountItems,setUpdateAccountItems, editForm } = props;
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    console.log('currentAccount', currentAccountItem);

    const handleSubmit = async (values: any) => {
        try {
            setIsLoading(true);
            console.log('edit', values)
            const account = await fetch(`/api/accountItem/${currentAccountItem._id}`, {
              method: 'PUT',
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values)
            })
          } catch (err) {
            console.log(err);
          }
        setIsLoading(false);
        // close modal
        setEditFormModalVisible(false);
        // update state to rerender
        setUpdateAccountItems(updateAccountItems * -1);

        // reset form
        editForm.resetFields();
        // refresh profile page
        router.push('/profile');
    }

    const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            className={classes.formContainer}
            form={editForm}
            name="editAccount"
            autoComplete='off'
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span:16
            }}
            initialValues = {{
                name: `${currentAccountItem.name}`,
                value: currentAccountItem.value,
            }}
            scrollToFirstError
        >
            {/* Name */}
            <Form.Item
                label={<span className={classes.formLabel}>Name</span>}
                name="name"
                key="name"
                rules={[
                    {
                        required: true,
                        message: 'Please enter an account name'
                    }
                ]}
            >
                <Input placeholder="Name" name="name" />
            </Form.Item>
            {/* Value */}
            <Form.Item
                label={<span className={classes.formLabel}>Value</span>}
                name="value"
                key="value"
                rules={[
                    {
                        required: true,
                        message: 'Please enter the value'
                    }
                ]}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    placeholder="Enter value"
                    min={1}
                    step="10"
                    prefix={"$"}
                    precision={2}
                    required
                />
            </Form.Item>
            <Form.Item
                className={classes.submitBtn}
                key="submitBtn"
            >
                <Button type="primary" htmlType="submit">Update Account</Button>
            </Form.Item>
        </Form>
    )
}

export default EditAccountForm;