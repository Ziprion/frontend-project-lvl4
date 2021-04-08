import React from 'react';
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
};

const ModalRename = ({ channels, modalInfo, closeModal }) => {
  const { type, extra } = modalInfo;
  const isCurrentModal = type === 'rename';
  const currentChannel = channels.filter((channel) => channel.id === extra);
  const currentChannelName = currentChannel.length === 0 ? '' : currentChannel[0].name;
  setTimeout(() => {
    const myInput = document.querySelector('.renameModalInput');
    if (myInput !== null) {
      myInput.focus();
    }
  }, 1);

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
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ body: `${currentChannelName}` }}
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
              await axios({
                method: 'patch',
                url: routes.channelPath(extra),
                data: message,
                timeout: 4000,
              });
              resetForm();
              setSubmitting(false);
              closeModal();
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
                  className={errors.body && touched.body ? 'mb-2 form-control is-invalid renameModalInput' : 'mb-2 form-control renameModalInput'}
                />
                <div className="d-block mb-2 invalid-feedback renameModalInput">
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

export default connect(mapStateToProps, actionCreators)(ModalRename);
