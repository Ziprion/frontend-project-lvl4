import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import ModalAdd from './ModalAdd.jsx';
import ModalRename from './ModalRename.jsx';
import ModalRemove from './ModalRemove.jsx';
import ButtonAdd from './ButtonAdd';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;
  const props = {
    channels,
    currentChannelId,
  };
  return props;
};

const actionCreators = {
  switchChannel: actions.switchChannel,
  openModal: actions.openModal,
};

const Channels = ({
  channels, currentChannelId, switchChannel, openModal,
}) => {
  useEffect(() => {
    const messageBox = document.getElementById('messages-box');
    messageBox.scrollTop = messageBox.scrollHeight;
    const input = document.querySelector('input');
    input.focus();
  });

  const handleSwitchChannel = (id) => () => {
    switchChannel({ id });
  };
  const handleOpenModalRename = (id) => () => {
    openModal({ data: { isOpened: true, type: 'rename', extra: id } });
  };
  const handleOpenModalRemove = (id) => () => {
    openModal({ data: { isOpened: true, type: 'remove', extra: id } });
  };
  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <ButtonAdd />
        <ModalAdd />
        <ModalRename />
        <ModalRemove />
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name, removable }) => {
          const isCurrentChannel = id === currentChannelId;
          const channelBtnClass = cn({
            'nav-link': true,
            'btn-block': !removable,
            'mb-2': !removable,
            'text-left': true,
            btn: true,
            'btn-primary': isCurrentChannel,
            'btn-light': !isCurrentChannel,
            'flex-grow-1': removable,
          });
          const toggleVariant = cn({
            primary: isCurrentChannel,
            light: !isCurrentChannel,
          });
          if (removable === true) {
            return (
              <li key={id} className="nav-item">
                <Dropdown className="d-flex mb-2 btn-group" role="group">
                  <button type="button" className={channelBtnClass} onClick={handleSwitchChannel(id)}>{name}</button>
                  <Dropdown.Toggle variant={toggleVariant} id="dropdown-basic" className="flex-grow-0 dropdown-toggle-split" />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleOpenModalRemove(id)}>Remove</Dropdown.Item>
                    <Dropdown.Item onClick={handleOpenModalRename(id)}>Rename</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            );
          }
          return (
            <li key={id} className="nav-item">
              <button
                onClick={handleSwitchChannel(id)}
                type="button"
                className={channelBtnClass}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Channels);
