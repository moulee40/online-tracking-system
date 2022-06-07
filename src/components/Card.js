import React from "react";
import { withRouter } from "react-router";
import StatusSelect from "./StatusSelect";
import FormDialog from './FormDialog';
import axios from "axios";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openCancelDailog: false
    };
  }

  handleCardClick = (e) =>{
    e.preventDefault();
      const {
        history: { push } , projectData
      } = this.props;
      push({
        pathname: `/project/${projectData.projectId}`,
        projectData: projectData
      });
  }

  handleCancel = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:true})

  }

  handleCancelClose = (e) =>{
    e.stopPropagation();
    this.setState({openCancelDailog:false})
  }

  handleCancelDone = (e) =>{
    e.stopPropagation();
    let reqUrl = `http://localhost:8080/projectTracking/cancelRequest/${this.props.projectData.projectId}`;
    axios.delete(reqUrl).then((res) => {
          this.setState({openCancelDailog:false})
          console.log("Data Deleted Successfully")
          this.props.updateInProjectArray(this.props.projectData);
    })

  }




  render() {
    const {userId,userRole,projectData,index} = this.props;
    const {openCancelDailog} = this.state;
    return (

          <div style={{minWidth:'320px'}} class="flex flex-col p-6 max-h-72  max-w-xs bg-white rounded-lg border border-gray-200 shadow-md mr-4 mb-4 cursor-pointer transition ease-in-out hover:bg-gray-100 duration-300"  >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" onClick={this.handleCardClick}>{projectData.projectName}</h5>
          <p id='card_desc' class="flex-1 mb-3 font-normal text-gray-700 dark:text-gray-400" onClick={this.handleCardClick}>{projectData.description}</p>
          <div className="flex justify-between">
               { (userRole === 'Approver' && projectData.state === 'InProcess' && userId !== projectData.userId)? <StatusSelect projectData={projectData} index={index} updateProjectArrayStatus={this.props.updateProjectArrayStatus}/> : 
                <div id='status' class="inline-flex items-center py-2 px-3 text-sm font-bold text-centerrounded-lg rounded-lg uppercase">{projectData.state}</div>
                }
              {(projectData.state === 'InProcess' && userId === projectData.userId) && <div id='button_color' class="inline-flex items-center py-2 px-3 text-sm font-medium text-centerrounded-lg rounded-lg" onClick={this.handleCancel}>Cancel</div>}
          </div>
          <FormDialog open={openCancelDailog} handleClose={this.handleCancelClose} handleDone={this.handleCancelDone} isCancel/>
          </div>

    );
  }
}

export default withRouter(Card);
