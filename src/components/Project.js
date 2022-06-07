import React from "react";
import { withRouter } from "react-router";
import Card from "./Card";
import ProjectCard from "./ProjectCard";
import axios from "axios";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableEdit:false,
      projectData:{}
    };
  }

  componentWillMount() {
    const getUserDataUrl = `http://localhost:8080/projectTracking/projectDetail/${this.props.match.params.id}`;
    axios.get(getUserDataUrl).then((res) => {
      let projectData = {};
      projectData.description = res.data.description;
      projectData.lastUpdatedTime = res.data.lastUpdatedTime;
      projectData.license = res.data.license;
      projectData.projectId = res.data.projectId;
      projectData.projectName = res.data.projectName;
      projectData.state = res.data.state;
      projectData.url = res.data.url;
      projectData.userId = res.data.userId;
      this.setState({
        projectData:projectData
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

  enableEdit = () =>{
    this.setState({enableEdit:true});
  }

  render() {
    const {projectData} = this.state;
    return (
      <div className="h-screen flex flex-col  flex-1">
        <div style={{background:'linear-gradient(90.05deg, rgb(9, 17, 37) -2.5%, rgb(33, 61, 133) 100.83%)',color:'rgb(0, 179, 122)'}} className="flex justify-between items-center h-16 shadow-xl sticky top-0 px-3">
          <div className="font-semibold text-4xl flex-1 flex justify-center">Project Details</div>
        </div>
        {(parseInt(localStorage.getItem('userId'))=== projectData.userId && projectData.state === "InProcess") && <button type="button" id='button_color' class=" font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-2 self-end" onClick={this.enableEdit}>Edit</button>}
        <div className="flex flex-1 justify-center">
          {Object.keys(projectData).length > 0 &&<ProjectCard isEnableEdit={this.state.enableEdit} projectData={projectData}/>}
        </div>

      </div>
    );
  }
}

export default withRouter(Project);
