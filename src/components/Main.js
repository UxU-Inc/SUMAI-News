import React from 'react'; 

import Header from "./Header"; 

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import { connect } from 'react-redux';
import { logoutRequest } from '../actions/authentication';

class Main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            summaryText: '',
            fontSizeTextArea: 22,
            fontSizeSummary: 22,
    
            loading: false,
            error: null,
    
            textLimitTag: false,
            summaryLayoutTag: false,
            fabTag: false,

            convertSort: false,

            record: true,
        }
        
    }

    render() {
        return ( 
            <div>
                <Header isLoggedIn={this.props.status.isLoggedIn} currentUser={this.props.status.currentUser} 
                        onLogout={this.handleLogout} onClickLink={this.onClickLink} matches={isWidthUp('md', this.props.width)} xsm={isWidthUp('xsm', this.props.width)}/> 
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
    };
};
 
const mapDispatchToProps = (dispatch) => {
    return {
        logoutRequest: () => {
            return dispatch(logoutRequest());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(Main));
