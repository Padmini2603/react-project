import { useForm } from '@refinedev/core';
import { Button, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    useForm(); 

    // WebSocket state for connection
    const [socket, setSocket] = useState<WebSocket | null>(null);

    // Initialize WebSocket connection and set up notification listener
    useEffect(() => {
        const ws = new WebSocket('wss://echo.websocket.org'); // Replace with your WebSocket server URL
        setSocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'notification') {
                    // Display incoming notifications
                    message.info(`Notification: ${data.message}`);
                }
            } catch (err) {
                console.error('Error parsing WebSocket message:', err);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Cleanup on component unmount
        return () => {
            ws.close();
        };
    }, []);

    const handleFinish = (values: { email: string; password: string }) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const loginData = {
                type: 'login-request',
                payload: values,
            };
            socket.send(JSON.stringify(loginData)); // Send login data via WebSocket
        } else {
            message.error('WebSocket connection not established. Please try again later.');
        }
    };

    return (
        <div className="login-page">
            <div className="container">
                <h2>Login</h2>
                <Form layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
