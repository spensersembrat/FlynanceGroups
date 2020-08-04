import React from 'react';
import illustration from '../../img/step1.png';


class Step1 extends React.Component {
    render() {
        return (
           <div class="container-fluid">
             <div class="row">
                <div class="col-md-6 col-xs-3 col-lg-5 offset-lg-2 d-flex align-items-start justify-content-center flex-column">
                <h1 className="font-weight-normal" class="serif-headline">The new standard for <span class="highlight" style={{fontWeight: "bold"}}>solo</span> and <span class="highlight" style={{fontWeight: "bold"}}>group travel</span>.</h1>

                <p class="text-break lead"> Effortlessly invite group members, organize payments and create your itinerary.
                All with the Flynance payment plan. </p>

                <div class="dropdown">
                  <span class="btn btn-primary-rounded">New Trip</span>
                    <div class="dropdown-content">
                      <p onClick={this.props.nextStep}>Group Trip</p>
                      <p>Solo Trip</p>
                    </div>
                </div>



            </div>
                <div class="col-md-6 col-lg-4">
                <img class="illustration" src={illustration} />
            </div>
            </div>
           </div>
        )
    }
}

export default Step1;
