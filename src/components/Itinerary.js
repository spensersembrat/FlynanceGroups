import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../css/itinerary.css';
import { Auth } from 'aws-amplify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Form, Button, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/en-ca';
import Day from './Day';

class Itinerary extends React.Component {
  constructor(props) {
    super(props);
    this.addDay = this.addDay.bind(this);
    this.showForm = this.showForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  state = {
    days: [],
    showDayForm: false,
    trip: {
      start_date: new Date().getTime(),
      end_date: new Date().getTime()
    }
  }

handleChange(evt) {
  const value = evt.target.value;
  this.setState({
    ...this.state,
    [evt.target.name]: value
  });
}

  showForm() {
    this.setState({
      showDayForm: !this.state.showDayForm
    })
  }

async fetchDays() {
      Auth.currentSession()
    .then(data => {
     let accessToken = data.getAccessToken()
                let jwt = accessToken.getJwtToken()
      const group = data.accessToken.payload['cognito:groups'] ? data.accessToken.payload['cognito:groups'][0] : 'traveler';
       console.log(data)
      this.setState({
        role: group
      });
fetch(`/api/itinerary/days`, {
  headers: {
    'Content-Type': 'application/json',
    'flynance-token': jwt
  }
})
        .then(response => response.json())
        .then(data => {
          console.log(data)
          fetch('/api/trips', {
            headers: {
              'Content-Type': 'application/json',
              'flynance-token': jwt
            }
          })
            .then(response => response.json())
            .then(tripData => {
              console.log(tripData)
              this.setState({
                days: data,
                trip: tripData
              })
            });
        });

    })
    .catch(err => console.log(err));

  }

  async componentDidMount() {
    this.fetchDays();
  }

  async deleteEvent(eventIndex, dayIndex) {
Auth.currentSession()
    .then(data => {
     let accessToken = data.getAccessToken()
                let jwt = accessToken.getJwtToken()
   const index = parseInt(eventIndex);
      const day = parseInt(dayIndex);
    this.state.days[day].events.items.splice(index, 1)
      console.log('newarray', this.state.days[day].events.items)
        fetch(`/api/itinerary/days`, {
  headers: {
    'Content-Type': 'application/json',
        'flynance-token': jwt
  },
  method: 'PUT',
  body: JSON.stringify({
    dayId: this.state.days[day].day_id,
    updatedEvents: this.state.days[day].events
  })
})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        window.location.reload();
      });

    });

  }

async addDay(event) {
  event.preventDefault();
      Auth.currentSession()
    .then(data => {
     let accessToken = data.getAccessToken()
                let jwt = accessToken.getJwtToken()

      console.log(this.state.chooseDay)
      if(this.state.chooseDay === 'new') {
        fetch(`/api/itinerary/days`, {
  headers: {
    'Content-Type': 'application/json',
        'flynance-token': jwt
  },
  method: 'POST',
  body: JSON.stringify({
    label: `Day ${this.state.days.length + 1}`,
    events: {
      items: [{
      heading: this.state.newEventHeading,
      time: this.state.newEventTime,
      description: this.state.newEventDescription
    }]
    }
  })
})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        window.location.reload();
      });
      } else {
        const index = parseInt(this.state.chooseDay);
this.state.days[index].events.items.push({
      heading: this.state.newEventHeading,
      time: this.state.newEventTime,
      description: this.state.newEventDescription
    })
        fetch(`/api/itinerary/days`, {
  headers: {
    'Content-Type': 'application/json',
        'flynance-token': jwt
  },
  method: 'PUT',
  body: JSON.stringify({
    dayId: this.state.days[index].day_id,
    updatedEvents: this.state.days[index].events
  })
})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        window.location.reload();
      });
      }

    })
    .catch(err => console.log(err));

  }

    render() {
      const showCreateEvent = this.state.role === 'owner' ? (
        <VerticalTimelineElement
    className="vertical-timeline-element--work"
    icon={<FontAwesomeIcon icon={faPlus} size="2x"/>}
    iconStyle={{ background: '#f1f2f6', color: 'rgb(33, 150, 243)' }}
          iconOnClick={this.showForm}
  >
          {this.state.showDayForm ? (
            <Form onSubmit={this.addDay}>
              <Row>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                <Form.Label>Location</Form.Label>
            <Form.Control name="newEventHeading" type="text" placeholder="Enter location" onChange={this.handleChange}  />
              </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                <Form.Label>Time</Form.Label>
                <Form.Control name="newEventTime" type="text" placeholder="Enter time" onChange={this.handleChange} />
              </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                 <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control name="newEventDescription" as="textarea" rows="3" onChange={this.handleChange} />
  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Choose Day</Form.Label>
    <Form.Control name="chooseDay" as="select" onChange={this.handleChange}>
      <option>Select Day</option>
      <option value="new">New Day</option>
      {this.state.days.map((day, index) => (
        <option value={index}>{day.label}</option>
      ))}

    </Form.Control>
  </Form.Group>
                </Col>
              </Row>
              <Button variant="secondary" class="btn btn-secondary" type="submit">
                Create Event
              </Button>
            </Form>
          ) : ''}
  </VerticalTimelineElement>
      ) : '';
        return (
            <div>
            <div class="row">
  <div class="col-md-12">
    <small><Moment format="MMMM DD, YYYY">{new Date(this.state.trip.start_date)}</Moment> - <Moment format="MMMM DD, YYYY">{new Date(this.state.trip.end_date)}</Moment></small>
    <h1>{this.state.trip.traveling_to}</h1>
  </div>
</div>
<br/>
<div class="row" >
  <div class="col-md-12">
            <VerticalTimeline >
              {this.state.days.map((day, index) => (
                <Day label={day.label} events={day.events.items} dayIndex={index} deleteEvent={this.deleteEvent} />
              ))}
{showCreateEvent}
</VerticalTimeline>
  </div>
</div>
</div>
        )
    }
}

export default Itinerary;
