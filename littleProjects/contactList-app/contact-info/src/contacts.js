import React, {Component} from 'react';

class Contacts extends Component {

    constructor(props) {
        super(props);
        this.state = {items:this.props.contacts};
        this.getContacts();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
            if(nextProps.contacts.length > 0 ){
                console.log(nextProps.contacts);
                this.setState({
                    items: nextProps.contacts
                });
            }
        }
    }

    listStyle = {
        overflow:"auto",
        maxHeight: "500px"
    };


    items  =  ['Cras justo odios','Dapibus ac facilisis in', 'Morbi leo risus',
    'Porta ac consectetur ac','Vestibulum at eros', 'test'];

    refreshListing = (e)=> {
        this.getContacts();
        e.preventDefault()
    }

    getContacts = () => {
        fetch('http://dev.samples.com/getcontacts.php')
            .then(rsp=>rsp.json())
            .then(response =>{
                this.setState({items:response.data});
                console.log(response.data)
            })
    }

    render(){
        return (
            <div style={this.listStyle}>
                <p><a href="" onClick={this.refreshListing}>Refresh this listing</a></p>
                <ul className="list-group">
                    {this.state.items.map(listitem => (
                        <li key={listitem.id} className="list-group-item">
                            <span onClick={()=>{this.props.viewContact(listitem)}}>
                                <i className="fa fa-user"></i> {listitem.name}</span>
                            <span>
                                {listitem.email ? " | " + listitem.email  : ''}</span>
                            <button onClick={()=>{this.props.editContact(listitem)}} className="btn btn-primary btn-sm float-right">Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Contacts;
