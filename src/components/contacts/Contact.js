import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Consumer } from "../../context";
import axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  getOut = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  render() {
    const { id, name, phone, email } = this.props.myContact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  className="fa fa-caret-down"
                  style={{ cursor: "pointer " }}
                ></i>
                <i
                  className="fa fa-trash"
                  style={{ float: "right", color: "red", cursor: "pointer" }}
                  onClick={this.getOut.bind(this, id, dispatch)}
                ></i>

                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fa fa-pencil"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem"
                    }}
                  ></i>
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group ">
                  <li
                    className="list-group-item bg-primary"
                    style={{ color: "white" }}
                  >
                    Phone: {phone}
                  </li>
                  <li className="list-group-item bg-secondary">
                    Email: {email}
                  </li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  myContact: PropTypes.object.isRequired
};

export default Contact;
