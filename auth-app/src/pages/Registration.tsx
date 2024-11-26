import { useForm } from '@refinedev/core';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

interface RegistrationFormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const Registration = () => {
    const navigate = useNavigate();
    useForm();

    const handleFinish = async (values: RegistrationFormValues) => {
        try {
            console.log('Registration Data:', values);
            message.success('Registration successful!');
            navigate('/login');
        } catch (error) {
            message.error('Registration failed.');
        }
    };

    return (
        <div className="registration-page">
            <div className="container mt-5">
                <h2 className="mb-4 text-center">Register</h2>
                <Form onFinish={handleFinish} className="border p-4 rounded shadow">
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input id="email" className="form-control" />
                        </Form.Item>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password id="password" className="form-control" />
                        </Form.Item>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match!'));
                                    },
                                }),
                            ]}>
                            <Input.Password id="confirmPassword" className="form-control" />
                        </Form.Item>
                    </div>

                    <Button type="primary" htmlType="submit" className="btn btn-primary w-100">
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Registration;
