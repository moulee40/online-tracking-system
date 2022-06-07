import React from "react";
import { withRouter } from "react-router";
import StatusSelect from "./StatusSelect";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCardClick = () =>{
      const {
        history: { push }
      } = this.props;
      push(`/project`);
  }



  render() {
    const {userId,userRole,projectData} = this.props;
    return (

          <div class="p-6 max-h-72 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md mr-4 mb-4 cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300" >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{projectData.projectName}</h5>
          <p id='card_desc' class="mb-3 font-normal text-gray-700 dark:text-gray-400">{projectData.description}</p>
          <div className="flex justify-between">
               { (userRole === 'Approver' && userId !== projectData.userId)? <StatusSelect/> : 
                <div id='status' class="inline-flex items-center py-2 px-3 text-sm font-bold text-centerrounded-lg rounded-lg uppercase">{projectData.state}</div>
                }
              {userId === projectData.userId && <div style={{background:'rgb(23 43 93)',color:'rgb(0, 210, 144)'}} class="inline-flex items-center py-2 px-3 text-sm font-medium text-centerrounded-lg rounded-lg">Cancel</div>}
          </div>
          </div>

    );
  }
}

export default withRouter(Card);
