import { useState, useEffect } from "react"
import { Table, Form, Button, Row, Col, FormGroup } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { toast } from "react-toastify"
import { useProfileMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"

const ProfileScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, userInfo.name, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Password\'s do not match')
        } else {
            try {
                const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>

            <Form onSubmit={submitHandler}>
                <FormGroup controlId="name" className="my-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}></Form.Control>
                </FormGroup>
                
                <FormGroup controlId="email" className="my-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </FormGroup>
                
                <FormGroup controlId="password" className="my-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </FormGroup>
                
                <FormGroup controlId="confirmPassword" className="my-2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </FormGroup>

                <Button type="submit" variant="primary" className="my-2">
                    Update
                </Button>
                { loadingUpdateProfile && <Loader /> }
            </Form>
        </Col>
        <Col md={9}>Column</Col>
    </Row>
  )
}

export default ProfileScreen