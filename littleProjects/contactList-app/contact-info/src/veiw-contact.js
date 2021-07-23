import React, {Component} from 'react';

class ContactView extends Component {


    constructor(props) {
        super(props);
        this.currentContact = this.props.currentContact;
    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {

        }
    }


    render(){
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col"><i className="fa fa-user"></i></th>
                    <th scope="col">{this.props.currentContact.name}</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Email </th>
                    <th colSpan="3">{this.props.currentContact.email}</th>
                </tr>
                <tr>
                    <th>Contact #</th>
                    <td colspan="3">{this.props.currentContact.phone}</td>
                </tr>
                <tr>
                    <th>Contact #2</th>
                    <td colSpan="3">Jacob</td>
                </tr>
                <tr>
                    <th colSpan="4">Notes</th>
                </tr>
                <tr>
                    <th colSpan="4">{this.props.currentContact.notes}</th>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default ContactView;
