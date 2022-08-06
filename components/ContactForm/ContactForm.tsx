import classes from './ContactForm.module.scss';
import { useForm } from '@formspree/react';
import { Form, Input, Result } from 'antd';

const ContactForm = () => {
    
    const { TextArea } = Input;
    const [state, handleSubmit] = useForm("mvoypnwa");
    if (state.succeeded) {
        return (
            <Result
                status="success"
                title='Thanks for your message!'
            />
        );
    }

    const validateMessages = {
        types: {
            email: `is not a valid email!`
        }
    }

    return (
        <>
            <div className={classes.title}>
                <h1>Contact Us</h1>
            </div>
            <Form
                name='contact-form'
                onFinish={handleSubmit}
                className={classes.form}
                wrapperCol={{
                    xs: { span: 18 },
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your name' }]}
                    className={classes.formItem}
                >
                    <Input placeholder="Your name" className={classes.nameInput}/>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Please enter a valid email address", type: 'email' }]}
                    className={classes.formItem}

                >
                    <Input placeholder="Your email" />
                </Form.Item>
                <Form.Item
                    name="message"
                    rules={[
                        { required: true, message: "Please enter your message" }]}
                    className={`${classes.formItem}`}
                >
                    <TextArea rows={4} placeholder="Your message" />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24 },
                    }}
                    className={classes.btnContainer}
                >
                    <button type="submit" className={classes.submitBtn}>
                        Get In Touch
                    </button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ContactForm;