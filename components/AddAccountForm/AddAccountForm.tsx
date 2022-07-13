import classes from './AddAccountForm.module.scss';
import {Form, Input, Modal} from 'antd';

const AddAccountForm = () => {

    const handleSubmit = (values:{}) => {
        console.log(values);
    }

    return (
        <Form
            className={classes.formContainer}
            name="addAccount"
            autoComplete='off'
            onFinish={handleSubmit}
            scrollToFirstError
        >
            {/* Title */}
            <Form.Item
                name="name"
                rules={[{required: true, message: 'Please enter an account name'}]}
            >
                <Input placeholder="Name" name="name"/>
            </Form.Item>
        </Form>
    )
}

export default AddAccountForm;