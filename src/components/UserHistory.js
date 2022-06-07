import React from "react";
import { withRouter } from "react-router";
import UserHistoryCard from "./UserHistoryCard";
import axios from "axios";


class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDatas:[]
    };
  }

  componentWillMount() {
    const getUserDataUrl = `http://localhost:8080/projectTracking/userRequestHistory/${this.props.match.params.id}`;
    axios.get(getUserDataUrl).then((res) => {
      this.setState({
        projectDatas:res.data
      })
})
  }

 

  render() {
    return (
      <div className="h-screen flex flex-col  flex-1">
        <div style={{background:'linear-gradient(90.05deg, rgb(9, 17, 37) -2.5%, rgb(33, 61, 133) 100.83%)',color:'rgb(0, 179, 122)'}} className="flex justify-between items-center h-16 shadow-xl sticky top-0 px-3">
          <div className="font-semibold text-4xl flex-1 flex justify-center">User History</div>
        </div>
        <div className='m-6 flex flex-wrap'>
        {this.state.projectDatas.map((projectData,index) => {
          return(
              <UserHistoryCard projectData={projectData} key={index}/>
              );
        })}
        </div>

      </div>
    );
  }
}

export default withRouter(UserHistory);
