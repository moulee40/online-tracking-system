import React from "react";
import { withRouter } from "react-router";
import Card from "./Card";
import axios from "axios";

const getAllProjectUrl = "http://localhost:8080/projectTracking/projectDetails";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.location.userId,
      userRole: props.location.userRole,
      projectDatas : []
    };
  }

  componentWillMount() {
    axios.get(getAllProjectUrl).then((res) => {
      this.setState({
        projectDatas:res.data
      })
})
  }

  handleLogout = () => {
    localStorage.removeItem("username");
    const {
      history: { push },
    } = this.props;
    push("/");
  };

  handleUserHistory = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push(`/userHistory/${userId}`);

  }

  render() {
    const {userId,userRole,projectDatas} = this.state;
    return (
      <div className="h-screen flex flex-col bg-white flex-1">
        <div style={{background:'linear-gradient(90.05deg, rgb(9, 17, 37) -2.5%, rgb(33, 61, 133) 100.83%)',color:'rgb(0, 179, 122)'}} className="flex justify-between items-center h-16 shadow-xl sticky top-0 px-3">
          <div className="font-semibold text-4xl flex-1 flex justify-center">Online Tracking System</div>
          <div className='flex font-bold space-x-4'>
            <div className='underline cursor-pointer' onClick={this.handleUserHistory}>User History</div>
            <div className='underline cursor-pointer'>Add New Request</div>
            <div className='underline cursor-pointer' onClick={this.handleLogout}>Logout</div>
          </div>
        </div>

        <div className='m-6 flex flex-wrap'>
        {projectDatas.map((projectData,index) => {
          return(
              <Card  projectData={projectData} userRole={userRole} userId={userId} key={index} />
              );
        })}
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
