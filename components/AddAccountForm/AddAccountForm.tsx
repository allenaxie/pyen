import classes from './AddAccountForm.module.scss';
import { Form, Input, InputNumber, Button } from 'antd';

const AddAccountForm = () => {

    const handleSubmit = (values: {}) => {
        console.log(values);
    }

    const onFinishFailed = (errorInfo:any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            className={classes.formContainer}
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