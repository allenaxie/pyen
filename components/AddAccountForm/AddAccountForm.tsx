import classes from './AddAccountForm.module.scss';
import { Form, Input, InputNumber, Button } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import {useRouter} from 'next/router';

interface AddAcountFormProps {
    setAccountFormModalVisible: Dispatch<SetStateAction<boolean>>,
    session: any,
    setUserAccountItems: any,
    userAccountItems: [],
}

const AddAccountForm = (props: AddAcountFormProps) => {

    const {setAccountFormModalVisible, session, setUserAccountItems, userAccountItems} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    const router = useRouter();


    const handleSubmit = async (values: any) => {
        setIsLoading(true);
        // add current session user to req.body
        values.userId = session?.user?.id;
        const res = await fetch('/api/accountItem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
        const {data} = await res.json();
        setIsLoading(false);
        // close modal
        setAccountFormModalVisible(false);
        // update state to rerender
        setUserAccountItems([...userAccountItems, data])
        // reset form
        form.resetFields();
        // refresh profile page
        router.push('/profile');
    }

    const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            className={classes.formContainer}
            form={form}
            name="addAccount"
            autoComplete='off'
            onFinish={handleSubmit}
            onFinishFailed={onFinishFailed}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span:16
            }}
            scrollToFirstError
        >
            {/* Name */}
            <Form.Item
                label={<span className={classes.formLabel}>Name</span>}
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please enter an account name'
                    }
                ]}
            >
                <Input placeholder="Name" name="name" />
            </Form.Item>
            {/* Name */}
            <Form.Item
                label={<span className={classes.formLabel}>Value</span>}
                name="value"
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
            >
                <Button type="primary" htmlType="submit">Create Account</Button>
            </Form.Item>
        </Form>
    )
}

export default AddAccountForm;