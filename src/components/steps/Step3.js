import React from 'react';
import { Alert } from 'react-bootstrap';
import illustration from '../../img/step3.png';

class Step3 extends React.Component {

    constructor(props) {
        super(props);
        this.verifyStep = this.verifyStep.bind(this);
    }
    state = {
        location: '',
        error: null
    }

    verifyStep = () => {
        const { location } = this.state;

        this.setState({
            error: null
        })
        if (location.length > 0) {
            this.props.handleLocationSubmit(location);
            this.props.nextStep();
        } else {
            this.setState({
                error: true
            })
        }
    }

    render() {
        const { location } = this.state;
        const error = this.state.error ? <Alert variant='danger' className="mt-3">Sorry, please try again!</Alert> : '';
        
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6 col-xs-3 col-lg-4 offset-lg-2 d-flex align-items-start justify-content-center flex-column">
                        <h1> Where is your group traveling to?</h1>
                        <form>
                            <div class="form-group">
                                <input name="travelingTo" type="text" class="form-control step-input" id="location" value={location} placeholder="Rome, Italy" onChange={(e) => {
                                    this.setState({ location: e.target.value })
                                }} />
                            </div>
                            <button type="button" class="btn btn-primary-rounded" onClick={this.verifyStep}>Next</button>
                            {error}
                        </form>
                    </div>
                    <div class="col-md-6 col-lg-4">
                        <img class="illustration" src={illustration} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Step3;
