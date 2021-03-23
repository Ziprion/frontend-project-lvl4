import React from 'react';
import { connect } from 'react-redux';
import NewMessageForm from './NewMessageForm.jsx';

const mapStateToProps = (state) => {
  const { messages, currentChannelId } = state;
  const props = {
    currentChannelId,
    messages,
  };
  return props;
};

const Messages = ({ messages, nickname, currentChannelId }) => (
  <div className="col h-100">
    <div className="d-flex flex-column h-100">
      <div id="messages-box" className="chat-messages overflow-auto mb-3">
        {messages
          .filter((message) => message.channelId === currentChannelId)
          .map(({ body, id, author }) => (
            <div key={id} className="text-break">
              <b>{author}</b>
              :
              {body}
            </div>
          ))}
      </div>
      {}
      <div className="mt-auto">
        <NewMessageForm author={nickname} />
      </div>
    </div>
  </div>
);
export default connect(mapStateToProps)(Messages);
