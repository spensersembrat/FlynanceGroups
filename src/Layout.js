import React from 'react';
import './css/layout.css';
import Sidebar from './components/layout/Sidebar.js';
import background from './img/background-app.png';

class Layout extends React.Component {
    render() {
const backgroundImage = window.innerWidth <= 760 ? '' : 'url('+ background +')';
        return (
                <div class="row dashboard-wrapper" style={{
                    backgroundImage,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '-8% 120%',
                    backgroundSize: 'auto'}}>
                <div class="col-md-2">
                <Sidebar />
                </div>
                <div class="col-md-9 col-xs-12 offset-md-1 pb-5">
               {this.props.children} 
            </div>
                </div>
        )
    }
}

export default Layout;
