import React from "react";
import { withRouter } from "react-router";
import FormDialog from "./FormDialog";
import ProjectCard from "./ProjectCard";

class StatusSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openConfirmationDialog: false,
      selectedStatus:'status'
    };
  }

  componentWillMount() {

  }

  handleSelectChange = (e) => {
    console.log(e);
    this.setState({openConfirmationDialog:true,selectedStatus:e.target.value});
  };

  handleClose = () => {
    this.setState({openConfirmationDialog:false,selectedStatus:'status'});
  }

  handleDone = () =>{
    //call api & disbale the status field
  }

  render() {
    const {openConfirmationDialog,selectedStatus} = this.state;
    return (
      <>
        <select id="small" class="block p-2 w-36 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " onChange={this.handleSelectChange} data-modal-toggle="popup-modal">
          <option value="status" selected = {selectedStatus ==='status'}>Choose a Status</option>
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
        </select>
        {/* {openConfirmationDialog &&  */}
        <FormDialog open={openConfirmationDialog} handleClose={this.handleClose} handleDone={this.handleDone}/>
        {/* } */}
      </>
    );
  }
}

export default withRouter(StatusSelect);
