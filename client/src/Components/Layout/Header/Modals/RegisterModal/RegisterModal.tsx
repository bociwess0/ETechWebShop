import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import "./RegisterModal.css"
import { registerUser } from "../../../../../DatabaseRequests/Requests";

interface Props {
    modalShow: boolean;
    showHideBsModal: Function;
    showLoginModal: Function;
}

function RegisterModal({ modalShow, showHideBsModal, showLoginModal }: Props) {
    const [validated, setValidated] = useState<boolean>(false);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

    const handleShowHideModal = () => {
        showHideBsModal();
    };

    const handleLoginModal = () => {
        showLoginModal();
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    async function handleSubmit (event: any) {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;

        let registeredUser: boolean = false;

        if (password !== repeatedPassword) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        } 
        
        if (form.checkValidity() === true && password === repeatedPassword) {
            let formData = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                phone: phone,
            };

            registeredUser = (await registerUser(formData)).success;
        }

        setValidated(true);
        if(registeredUser) {
            showHideBsModal(false);
            window.location.reload();
        }
        
    };

    function handeCheckPasswords(target: EventTarget & (HTMLInputElement | HTMLTextAreaElement)): void {
        
        if (target.value !== password) {
            setPasswordsMatch(false);
            target.classList.add("is-invalid")
        } else {
            setPasswordsMatch(true);
            target.classList.remove("is-invalid");
        }

    }

    return (
        <Modal show={modalShow} onHide={handleShowHideModal} centered size="lg">
            <Modal.Header closeButton style={{ padding: "10px 20px", border: "none", textAlign: "center" }}>
                <Modal.Title style={{ margin: "0 auto" }}>REGISTER</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Container>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="firstName">
                                <Form.Label style={{ color: "#1D1E21" }}>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter First Name" required onChange={(text) => setFirstName(text.target.value)} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please provide a valid first name.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="lastName">
                                <Form.Label style={{ color: "#1D1E21" }}>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" required onChange={(text) => setLastName(text.target.value)} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please provide a valid last name.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="email">
                                <Form.Label style={{ color: "#1D1E21" }}>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" required onChange={(text) => setEmail(text.target.value)} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="phone">
                                <Form.Label style={{ color: "#1D1E21" }}>Phone</Form.Label>
                                <Form.Control type="number" placeholder="Phone" required onChange={(text) => setPhone(text.target.value)} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please provide a valid phone.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridAddress1">
                                <Form.Label style={{ color: "#1D1E21" }}>Address</Form.Label>
                                <Form.Control placeholder="Kneza Mihaila" required onChange={(text) => setAddress(text.target.value)} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please provide a valid address.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label style={{ color: "#1D1E21" }}>City</Form.Label>
                                <Form.Control placeholder="Belgrade" required onChange={(text) => setCity(text.target.value)} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="password">
                                <Form.Label style={{ color: "#1D1E21" }}>Password</Form.Label>
                                <Form.Control type="password" required onChange={(text) => setPassword(text.target.value)} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="repeatPassword">
                                <Form.Label style={{ color: "#1D1E21" }}>Repeat Password</Form.Label>
                                <Form.Control className="repeatPassword" required type="password" onChange={(text) => {
                                    handeCheckPasswords(text.target)
                                    setRepeatedPassword(text.target.value);
                                }} isInvalid={!passwordsMatch} />
                                {passwordsMatch && <Form.Control.Feedback>Looks good!</Form.Control.Feedback>}
                                <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: 'center', border: "none", gap: "40px" }}>
                    <Button style={{ textTransform: "uppercase", background: "linear-gradient(#DA0047, #7E002C)", border: "none", borderRadius: "20px", padding: "5px 30px" }} variant="primary" type="submit">
                        REGISTER
                    </Button>
                    <Button style={{ textTransform: "uppercase", border: "none", borderRadius: "20px", padding: "5px 30px" }} variant="secondary" onClick={handleLoginModal}>
                        LOG IN
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default RegisterModal;
