import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages, currentChannelId } = state;
  const props = {
    currentChannelId,
    messages,
  };
  return props;
};

const Messages = ({ messages, currentChannelId }) => (
  <>
    {messages
      .filter((message) => message.channelId === currentChannelId)
      .map(({ body, id, author }) => (
        <div key={id} className="text-break">
          <b>
            {author}
          </b>
          :
          {body}
        </div>
      ))}
  </>
);

export default connect(mapStateToProps)(Messages);
