import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { modalInfo } = state;
  const props = {
    modalInfo,
  };
  return props;
};

const actionCreators = {
  openModal: actions.openModal,
};

const ButtonAdd = ({ openModal }) => {
  const handleOpenModalAdd = () => {
    openModal({ data: { isOpened: true, type: 'add' } });
  };

  return (
    <Button variant="none" onClick={handleOpenModalAdd} type="button" className="ml-auto p-0 btn btn-link">
      +
    </Button>
  );
};

export default connect(mapStateToProps, actionCreators)(ButtonAdd);
