import React from 'react';
import { Modal, Image, Row, Column } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import config from '../../config';
import axios from 'axios';
import dataSrc from '../../dataSrc';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isSignin: false,
        }
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidUpdate(preProps) {

        if (preProps != this.props)
        this.setState({
            show: this.props.show,
        })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    render() {

        const style = {
            input: {
                padding: 10
            }
        }

        const { show } = this.state;
        return (
            <Modal show={show} size="md" onHide={this.handleClose}>
                <Modal.Body>
                    <Row className='d-flex justify-content-center'>
                        <Image src={config.image.logo} rounded width={72} height={72} ></Image>
                    </Row>
                    <Row className='d-flex justify-content-center'>
                        <h5>Sign In</h5>
                    </Row>
                    <Formik
                        initialValues = {{
                            username: '',
                            password: ''
                        }}

                        validationSchema = {
                            Yup.object().shape({
                            username: Yup.string().required('Username is required'),
                            password: Yup.string().required('Password is required')
                        })}

                        onSubmit={({ username, password }, { setStatus, setSubmitting }) => {

                            axios.post(dataSrc.login, {
                                auth: {
                                    username: username,
                                    password: password
                                }
                            }).then(res => {
                                this.props.handleSignin();
                            }).catch(error => {

                                console.log(error)
                            })


                        }}

                        render={({ errors, status, touched, isSubmitting }) => (
                            <Form>
                                <div className="form-group">
                                    {/* <label htmlFor="username">Username</label> */}
                                    <Field name="username" type="text" style={style.input} className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} placeholder='Username'/>
                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                </div>
                                <br/>
                                <div className="form-group">
                                    {/* <label htmlFor="password">Password</label> */}
                                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} placeholder='Password' />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                                <br/>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                                    {isSubmitting &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </div>
                                {status &&
                                    <div className={'alert alert-danger'}>{status}</div>
                                }
                            </Form>
                        )}
                    />
                </Modal.Body>
            </Modal>
        )
    }


}

export default SignupPage