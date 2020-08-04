import React from 'react';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { Auth } from 'aws-amplify';

class Day extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        allowDelete: false
    }
    
    componentDidMount() {
        Auth.currentSession()
        .then(data => {
            console.log(data);
            if(typeof data.accessToken.payload['cognito:groups'] == 'undefined') {
                this.setState({
                    allowDelete: false
                })
                return;
            }

           return this.setState({
                    allowDelete: true
                })
        })
    }
   render() {
    
    
    return (
        <React.Fragment>
         <VerticalTimelineElement
    className="vertical-timeline-element--work"
           date={this.props.label}
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
  >
  </VerticalTimelineElement>
          {this.props.events.map((event, index) => {
             return (
                  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    iconStyle={{ background: '#f1f2f6', color: '#fff' }}
  >
                    <h3 className="vertical-timeline-element-title">{event.heading}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{event.time}</h4>
    <p>
                 {event.description}
    </p>
                    {this.state.allowDelete ? (
                        <Link onClick={() => this.props.deleteEvent(index, this.props.dayIndex)}>Delete Event</Link>
                   ) : ''}
  </VerticalTimelineElement>
             )
         })}
 
        </React.Fragment>
   );
   }
}

export default Day;
