import React from 'react';
import {
    Switch,
    Route,
  Redirect
} from 'react-router-dom';
import Layout from '../Layout';
import Itinerary from './Itinerary';
import Payments from './Payments';
import Travelers from './Travelers';
import Invite from './Invite';

class Dashboard extends React.Component {
    render() {
        return (
            <Layout>
      <Switch>
          <Route path="/app/itinerary" component={Itinerary} />
          <Route path="/app/invite/:inviteCode" component={Invite} />
            <Route path="/app/payments" component={Payments} />
            <Route path="/app/travelers" component={Travelers} />
        <Route>
         <Redirect to="/app/travelers"/>
        </Route>
        </Switch>
    </Layout>
        )
    }
}

export default Dashboard;
