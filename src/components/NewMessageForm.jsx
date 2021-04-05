import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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

const NewMessageForm = ({ currentChannelId, addMessage }) => (
  <NameContext.Consumer>
    {(author) => (
      <Formik
        initialValues={{ body: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          const message = {
            data: {
              attributes: {
                author,
                body: values.body,
                channelId: currentChannelId,
              },
            },
          };
          addMessage(message);
          resetForm();
        }}
      >
        {({ errors, isSubmitting }) => (
          <Form noValidate="" className="">
            <div className="input-group has-validation">
              <Field
                name="body"
                aria-label="body"
                className={errors.body ? 'form-control is-invalid' : 'form-control'}
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
                {errors.body ? 'Required' : null}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    )}
  </NameContext.Consumer>
);

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
