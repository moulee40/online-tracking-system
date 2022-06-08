import React from "react";
import { withRouter } from "react-router";
import Card from "./Card";
import axios from "axios";

const getAllProjectUrl = "http://localhost:8080/projectTracking/projectDetails";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId:  localStorage.getItem("userId"),
      userRole: localStorage.getItem("userRole"),
      projectDatas : [],
      projectDatasDefault : [],
      searchInputValue:''
    };
  }

  componentWillMount() {
    axios.get(getAllProjectUrl).then((res) => {
      this.setState({
        projectDatas:res.data,
        projectDatasDefault:res.data
      })
})
  }

  handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
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

  handleNewRequest = () =>{
    const {userId} = this.state;
    const {
      history: { push },
    } = this.props;
    push(`/addNew/${userId}`);

  }

  updateInProjectArray = (projectData) => {
    this.setState({projectDatas: 
      this.state.projectDatas.filter(function(data) { 
      return data.projectId !== projectData.projectId
    }),
    projectDatasDefault: 
      this.state.projectDatasDefault.filter(function(data) { 
      return data.projectId !== projectData.projectId
    })
  }
  );
  }

  updateProjectArrayStatus = (index,status) => {
    const {projectDatas,projectDatasDefault} = this.state
    const projectDatasDefaultIndex = projectDatasDefault.findIndex(data=> data.projectId === projectDatas[index].projectId);

    this.setState(({projectDatas,projectDatasDefault}) => ({
      projectDatas: [
          ...projectDatas.slice(0,index),
          {
              ...projectDatas[index],
              state: status,
          },
          ...projectDatas.slice(index+1)
      ],
      projectDatasDefault :[
        ...projectDatasDefault.slice(0,projectDatasDefaultIndex),
        {
            ...projectDatasDefault[projectDatasDefaultIndex],
            state: status,
        },
        ...projectDatasDefault.slice(projectDatasDefaultIndex+1)
    ] 
  }));

  }

  handleSearch =  (e) =>{
    const {projectDatasDefault} = this.state;
    const inputValue = e.target.value.trim();
    const lowerCaseInputValue = inputValue.toLowerCase();
    const filteredData = projectDatasDefault.filter(data => {
      return (data.projectName.toLowerCase().includes(lowerCaseInputValue)) || data.description.toLowerCase().includes(lowerCaseInputValue);
     }) 

    this.setState({searchInputValue:e.target.value,projectDatas:filteredData});

  }

  render() {
    const {userId,userRole,projectDatas,searchInputValue} = this.state;
    return (
      <div className="h-screen flex flex-col  flex-1">
        <div style={{background:'linear-gradient(90.05deg, rgb(9, 17, 37) -2.5%, rgb(33, 61, 133) 100.83%)',color:'rgb(0, 179, 122)'}} className="flex items-center h-16 shadow-xl sticky top-0 px-3">
          <div className="font-semibold text-4xl flex justify-center">Online Tracking System</div>
          <div className='flex font-bold space-x-4 flex-1 justify-center'>
            <div className='underline cursor-pointer' onClick={this.handleUserHistory}>User History</div>
            <div className='underline cursor-pointer' onClick={this.handleNewRequest}>Add New Request</div>
            <div className='underline cursor-pointer' onClick={this.handleLogout}>Logout</div>
          </div>
          <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="search-navbar" value={searchInputValue} class="block p-2 pl-10 w-72 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..." onChange={this.handleSearch}/>
      </div>
        </div>

        <div className='m-6 flex flex-wrap'>
        {projectDatas.map((projectData,index) => {
          return(
              <Card  projectData={projectData} userRole={userRole} userId={parseInt(userId)} key={index} index={index} updateInProjectArray={this.updateInProjectArray} updateProjectArrayStatus={this.updateProjectArrayStatus}/>
              );
        })}
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
