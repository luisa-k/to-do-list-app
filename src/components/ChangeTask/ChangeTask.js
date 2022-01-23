import React from 'react';
import {
    Link
} from "react-router-dom";

class ChangeTask extends React.Component {
    constructor(props) {
        super();
        this.state = {
            description: '',
            duedate: ''
        }
    }

    onDescriptionInput = (event) => {
        this.setState({description: event.target.value})
    }

    onDueDateInput = (event) => {
        this.setState({duedate: event.target.value})
    }

    onChangeTask = () => {
        fetch('http://localhost:5000/changetask', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.props.id,
            description: this.state.description,
            duedate: this.state.duedate
          })
        })
          .then(response => response.json())
          .then(res => {
              fetch('http://localhost:5000/tasks', {
                  method: 'post',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      createdby: this.props.createdby
                  })
              })
              .then(response => response.json())
              .then(tasks => {
                  this.props.loadTasks(tasks)
                })
          })
      }

      getDate = (date) => {
        let parseDate = new Date(date);
        let day = parseDate.getDate();
        let month = parseDate.getMonth();
        let year = parseDate.getFullYear();
        if(month < 10) {
            return `${year}-0${month}-${day}`
        } else {
            return `${year}-${month}-${day}`
        }
    }

    render() {
        let date = this.getDate(this.props.duedate);
        return (
            <div>
                {`Change task: ${this.props.id}!:)`}<br></br><br></br>
                <label htmlFor="todo">Change the description:</label><br></br>
                <input onChange={this.onDescriptionInput} type="text" id="todo" name="todo" value={this.props.description}></input><br></br>
                <label htmlFor="duedate">Change the date:</label><br></br>
                <input onChange={this.onDueDateInput} type="date" id="duedate" name="duedate" value={date}></input><br></br><br></br>
                <Link to="/tasks">
                    <button onClick={this.onChangeTask}>Change task</button>
                </Link><br></br>
                <Link to="/tasks">
                    <button>No change</button>
                </Link>
            </div>
        )
    }
}

export default ChangeTask;