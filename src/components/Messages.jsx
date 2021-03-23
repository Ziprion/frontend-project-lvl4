import React from "react";
import NewMessageForm from "./NewMessageForm.jsx";
import MessageBox from "./MessageBox.jsx";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const { messages } = state;
  const props = {
    messages,
  };
  return props;
};

const Messages = ({ messages, author }) => {
  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <MessageBox />
        <div className="mt-auto">
          <NewMessageForm author={author}/>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Messages);
