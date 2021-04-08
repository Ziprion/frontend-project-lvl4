import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import routes from '../routes.js';
import NameContext from './NameContext';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  const props = {
    currentChannelId,
  };
  return props;
};

const NewMessageForm = ({ currentChannelId }) => {
  useEffect(() => {
    const myInput = document.querySelector('input');
    if (myInput !== null) {
      myInput.focus();
    }
  });

  const validate = (value) => (value.length === 0 ? 'Required' : null);

  return (
    <NameContext.Consumer>
      {(author) => (
        <Formik
          initialValues={{ body: '' }}
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
            try {
              await axios({
                method: 'post',
                url: routes.channelMessagesPath(currentChannelId),
                data: message,
                timeout: 4000,
              });
              resetForm();
              setSubmitting(false);
              const myInput = document.querySelector('input');
              if (myInput !== null) {
                myInput.focus();
              }
            } catch (e) {
              console.log(e);
              throw e;
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form noValidate="" className="">
              <div className="input-group has-validation">
                <Field
                  validate={validate}
                  readOnly={isSubmitting}
                  disabled={isSubmitting}
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
};

export default connect(mapStateToProps)(NewMessageForm);
