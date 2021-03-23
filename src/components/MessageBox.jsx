import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  const { messages, currentChannelId } = state;
  const props = {
    messages,
    currentChannelId,
  };
  return props;
}

const MessageBox = ({ messages, currentChannelId }) => {
	return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages
        .filter((message) => message.channelId === currentChannelId)
        .map(({ body, id, channelId, author }) => (
          <div key={id} className="text-break">
            <b>{author}</b>: {body}
          </div>
      ))}
    </div>
  );
}

export default connect(mapStateToProps)(MessageBox);
