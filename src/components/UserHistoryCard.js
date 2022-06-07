import React from "react";
import { withRouter } from "react-router";


class UserHistoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {projectData} = this.props;
    return (

          <div style={{minWidth:'320px'}} class="flex flex-col p-6 max-h-72  max-w-xs bg-white rounded-lg border border-gray-200 shadow-md mr-4 mb-4 cursor-pointer transition ease-in-out hover:bg-gray-100 duration-300"  >
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >{projectData.projectName}</h5>
          <p id='card_desc' class="flex-1 mb-3 font-normal text-gray-700 dark:text-gray-400" >{projectData.description}</p>
          <div className="flex justify-between">
                <div id='status' class="inline-flex items-center py-2 px-3 text-sm font-bold text-centerrounded-lg rounded-lg uppercase">{projectData.state}</div>
          </div>
          </div>

    );
  }
}

export default withRouter(UserHistoryCard);
