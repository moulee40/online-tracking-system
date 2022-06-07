import React from "react";
import { withRouter } from "react-router";
import Card from "./Card";

class AdminMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // if (localStorage.getItem("username") === null) {
    //   const {
    //     history: { push },
    //   } = this.props;
    //   push("/");
    // }
  }

  handleLogout = () => {
    localStorage.removeItem("username");
    const {
      history: { push },
    } = this.props;
    push("/");
  };

  render() {
    return (
<div className="h-screen flex flex-col bg-white flex-1">
        <div style={{background:'linear-gradient(90.05deg, rgb(9, 17, 37) -2.5%, rgb(33, 61, 133) 100.83%)',color:'rgb(0, 179, 122)'}} className="flex justify-between items-center h-16 shadow-xl sticky top-0 px-3">
          <div className="font-semibold text-4xl flex-1 flex justify-center">Online Tracking System</div>
          <div className='flex font-bold space-x-4'>
            {/* <div className='underline cursor-pointer'>User History</div> */}
            <div className='underline cursor-pointer' onClick={this.handleLogout}>Logout</div>
          </div>
        </div>

        <div className='m-6 flex flex-wrap'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
        {/* <div className="flex justify-between items-center">
          <h2 className="text-4xl font-semibold text-blue-800">
            Food Ordering System
          </h2>
          <button
            class="bg-blue-800 hover:bg-blue text-white font-bold py-2 px-4 rounded mr-2 mt-2"
            onClick={this.handleLogout}
          >
            Logout
          </button>
        
        </div> */}
      </div>
    );
  }
}

export default withRouter(AdminMain);
