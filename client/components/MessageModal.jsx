import React, {Component} from 'react';
import {InlineIcon} from '@iconify/react';
import xIcon from '@iconify/icons-bi/x';
import axios from 'axios';

class MessageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessage: '',
      messages: this.props.selectedAssignment.messages
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      newMessage: e.target.value
    });
  }

  addMessage(e, selectedAssignment, newMessage) {
    e.preventDefault();
    const {id} = selectedAssignment;
    const message_id = new Date().valueOf();
    const messageObj = {
      id,
      message_id,
      admin: true,
      content: newMessage
    }

    axios.post('/api/assignments', messageObj)
      .then(() => {
        axios.get(`/api/assignments/${id}`)
          .then((results) => {
            this.setState({
              newMessage: '',
              messages: results.data[0].messages
            });
          });
      })
      .catch((err) => {
        console.log('Unable to send message. Error: ', err);
      })
  }

  render() {
    const {toggleMessageModal, selectedAssignment} = this.props;
    let {newMessage, messages} = this.state;

    const messageItems = [];
    messages.forEach((m) => {
      const date = new Date(m.message_id).toLocaleString().split(' ').slice(0, 5).join(' ');
      messageItems.unshift((
        <div className="chat-msg">
          <div className={m.admin ? "admin-msg" : "employee-msg"}>{m.content}</div>
          <div className="chat-timestamp">{date}</div>
        </div>
      ));
    });

    return (
      <div className="form-overlay">
        <div className="form-container">
          <h2 className="staff-form-title">Send a Message to {selectedAssignment.name}</h2>
          <div className="message-area">
            {messageItems}
          </div>
          <form className="staff-form" onSubmit={(e) => this.addMessage(e, selectedAssignment, newMessage)}>
            <div className="message-input-and-submit">
              <textarea className="message-input" onChange={this.onChange} value={newMessage} required></textarea>
              <input className="message-submit-btn" type="submit" value="Send" />
            </div>
          </form>
          <span onClick={toggleMessageModal} className="staff-form-close"><InlineIcon icon={xIcon} width="2em" /></span>
        </div>
      </div>
    );
  }
}

export default MessageModal;