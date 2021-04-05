import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import * as actions from '../actions/index.js';
import NameContext from './NameContext';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  const props = {
    currentChannelId,
  };
  return props;
};
const actionCreators = {
  addMessage: actions.addMessage,
};
const SignupSchema = Yup.object().shape({
  body: Yup.string().required('Required'),
});
const myRef = React.createRef();

class NewMessageForm extends React.Component {
  componentDidMount() {
    myRef.current.focus();
  }

  componentDidUpdate() {
    myRef.current.focus();
  }

  render() {
    const { currentChannelId } = this.props;
    const CustomInputComponent = (props) => (
      <input ref={myRef} readOnly={props.readonly} type="text" aria-label="body" className={props.className} value={props.value} onChange={props.onChange} name="body" onBlur={props.onBlur} />
    );
    return (
      <NameContext.Consumer>
        {(author) => (
          <Formik
            initialValues={{ body: '' }}
            validationSchema={SignupSchema}
            validateOnBlur={false}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);
              const message = {
                data: {
                  attributes: {
                    author,
                    body: values.body,
                    channelId: currentChannelId,
                  },
                },
              };
              const res = await axios.post(routes.channelMessagesPath(currentChannelId), message);
              console.log(res);
              if (res.status === 201) {
                myRef.current.focus();
                resetForm();
              }
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form noValidate="" className="">
                <div className="input-group has-validation">
                  <Field
                    as={CustomInputComponent}
                    readonly={isSubmitting}
                    name="body"
                    aria-label="body"
                    className={errors.body && touched.body ? 'form-control is-invalid' : 'form-control'}
                  />
                  <div className="input-group-append">
                    <button
                      aria-label="submit"
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                  <div className="invalid-feedback">
                    {errors.body && touched.body ? 'Required' : null}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </NameContext.Consumer>
    );
  }
}
export default connect(mapStateToProps, actionCreators)(NewMessageForm);
