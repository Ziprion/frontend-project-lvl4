import React from "react";
import NewMessageForm from "./NewMessageForm.jsx";
import { connect } from "react-redux";
import { io } from 'socket.io-client';

const mapStateToProps = (state) => {
  const { messages, currentChannelId } = state;
  const props = {
    currentChannelId,
    messages,
  };
  return props;
};

const Messages = ({ messages, author, currentChannelId }) => {
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
        {messages
          .filter((message) => message.channelId === currentChannelId)
          .map(({ body, id, author }) => (
            <div key={id} className="text-break">
              <b>{author}</b>: {body}
            </div>
        ))}
    </div>
        <div className="mt-auto">
          <NewMessageForm author={author}/>
        </div>
      </div>
    </div>
  );
};

const socket = io();
socket.on('newMessage', (msg) => {
  const { data: { attributes: { id, author, body } } } = msg;
  const messagesBox = document.querySelector('#messages-box')
  const newMessage = document.createElement('div');
  newMessage.classList.add('text-break');
  newMessage.innerHTML = `<b>${author}</b>: ${body}`
  messagesBox.appendChild(newMessage);
});

export default connect(mapStateToProps)(Messages);
