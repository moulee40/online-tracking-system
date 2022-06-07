import React from "react";
import { withRouter } from "react-router";
import Card from "./Card";
import ProjectCard from "./ProjectCard";

class AddNewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableEdit:false
    };
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

  enableEdit = () =>{
    this.setState({enableEdit:true});
  }

  render() {
    return (
      <div className="h-screen flex flex-col  flex-1">
        <div style={{background:'linear-gradient(90.05deg, rgb(9, 17, 37) -2.5%, rgb(33, 61, 133) 100.83%)',color:'rgb(0, 179, 122)'}} className="flex justify-between items-center h-16 shadow-xl sticky top-0 px-3">
          <div className="font-semibold text-4xl flex-1 flex justify-center">Add New Project</div>
        </div>
        <div className="flex flex-1 justify-center">
          <ProjectCard isEnableEdit={true} isNew/>
        </div>

      </div>
    );
  }
}

export default withRouter(AddNewProject);
