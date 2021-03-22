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
}

const actionCreators = {
  addMessage: actions.addMessage,
}

const SignupSchema = Yup.object().shape({
  body: Yup.string().required('Required'),
});

const NewMessageForm = ({ currentChannelId, addMessage }) => {
  return (
    <Formik 
      initialValues={{ body: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { resetForm }) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));

        resetForm();
      }}
    >
    {({ isSubmitting }) => (
      <Form noValidate="" className="" >
        <div className="form-group">
          <div className="input-group">
            <Field type="text" name="body" aria-label="body" className="mr-2 form-control" placeholder="Enter your message"/>
            <button aria-label="submit" type="submit" className="btn btn-primary" disabled={isSubmitting} >Submit</button>
            <div className="d-block invalid-feedback">
              &nbsp;
            </div>
          </div>
        </div>
      </Form>
      )}
    </Formik>
  );
}

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
