import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import * as actions from '../actions/index.js';

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

const NewMessageForm = ({ currentChannelId, addMessage, author }) => (
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
    {({ isSubmitting }) => (
      <Form noValidate="" className="">
        <div className="form-group">
          <div className="input-group">
            <Field
              type="text"
              name="body"
              aria-label="body"
              className="mr-2 form-control"
              placeholder="Enter your message"
            />
            <button
              aria-label="submit"
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Submit
            </button>
            <div className="d-block invalid-feedback">&nbsp;</div>
          </div>
        </div>
      </Form>
    )}
  </Formik>
);

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
