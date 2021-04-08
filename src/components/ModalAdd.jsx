import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as actions from '../actions/index.js';
import routes from '../routes.js';

const mapStateToProps = (state) => {
  const { channels, modalInfo } = state;
  const props = {
    channels,
    modalInfo,
  };
  return props;
};

const actionCreators = {
  closeModal: actions.closeModal,
  switchChannel: actions.switchChannel,
};

const ModalAdd = ({
  channels, modalInfo, closeModal, switchChannel,
}) => {
  useEffect(() => {
    const myInput = document.querySelector('.addModalInput');
    if (myInput !== null) {
      myInput.focus();
    }
  });

  const { type } = modalInfo;
  const isCurrentModal = type === 'add';
  const validate = (value) => {
    if (!value) {
      return 'Required';
    }
    if (value.length < 3 || value.length > 20) {
      return 'Must be 3 to 20 characters';
    }
    const channelsName = channels.map((channel) => channel.name);
    const isSameName = channelsName.includes(value);
    if (isSameName) {
      return 'Must be unique';
    }
    return '';
  };

  return (
    <Modal show={isCurrentModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ body: '' }}
          validateOnBlur={false}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            const message = {
              data: {
                attributes: {
                  name: values.body,
                },
              },
            };
            try {
              const response = await axios({
                method: 'post',
                url: routes.channelsPath(),
                data: message,
                timeout: 4000,
              });
              const newChannelId = response.data.data.id;
              resetForm();
              setSubmitting(false);
              closeModal();
              switchChannel({ id: newChannelId });
            } catch (error) {
              console.log(error);
              throw error;
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="">
              <div className="form-group">
                <Field
                  name="body"
                  validate={validate}
                  readOnly={isSubmitting}
                  disabled={isSubmitting}
                  aria-label="body"
                  className={errors.body && touched.body ? 'mb-2 form-control is-invalid addModalInput' : 'mb-2 form-control addModalInput'}
                />
                <div className="d-block mb-2 invalid-feedback addModal">
                  {errors.body && touched.body ? `${errors.body}` : null}
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    aria-label="cancel"
                    className="mr-2 btn btn-secondary"
                    disabled={isSubmitting}
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    aria-label="submit"
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(ModalAdd);
