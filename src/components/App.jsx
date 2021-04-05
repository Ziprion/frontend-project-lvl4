import React from 'react';
import faker from 'faker';
import Cookies from 'js-cookie';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import NameContext from './NameContext';
import NewMessageForm from './NewMessageForm.jsx';

const randomName = faker.name.findName();
if (Cookies.get('name') === undefined) {
  Cookies.set('name', randomName, { expires: 1 });
}
const name = Cookies.get('name');

class App extends React.Component {
  componentDidMount() {
    const messageBox = document.getElementById('messages-box');
    messageBox.scrollTop = messageBox.scrollHeight;
  }

  render() {
    return (
      <div className="row h-100 pb-3">
        <Channels />
        <div className="col h-100">
          <div className="d-flex flex-column h-100">
            <div id="messages-box" className="chat-messages overflow-auto mb-3">
              <Messages />
            </div>
            <div className="mt-auto">
              <NameContext.Provider value={name}>
                <NewMessageForm />
              </NameContext.Provider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
