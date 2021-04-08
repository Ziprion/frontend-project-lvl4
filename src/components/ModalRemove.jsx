import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions/index.js';
import routes from '../routes.js';

const mapStateToProps = (state) => {
  const { channels, modalInfo, currentChannelId } = state;
  const props = {
    channels,
    modalInfo,
    currentChannelId,
  };
  return props;
};

const actionCreators = {
  closeModal: actions.closeModal,
  switchChannel: actions.switchChannel,
};

const ModalRemove = ({
  modalInfo, closeModal, switchChannel, currentChannelId,
}) => {
  const { type, extra } = modalInfo;
  const isCurrentModal = type === 'remove';
  const isCurrentChannel = currentChannelId === extra;

  const handleRemoveChannel = async () => {
    try {
      await axios({
        method: 'delete',
        url: routes.channelPath(extra),
        timeout: 4000,
      });
      closeModal();
      if (isCurrentChannel) {
        switchChannel({ id: 1 });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <Modal show={isCurrentModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure?
        <div className="d-flex justify-content-between">
          <button type="button" className="mr-2 btn btn-secondary" onClick={closeModal}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={handleRemoveChannel}>
            Confirm
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(ModalRemove);
