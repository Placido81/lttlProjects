import React, {Component} from 'react';

class Contacts extends Component {

    currentid = null;

    constructor(props) {
        super(props);
        this.state = {currentContact: this.props.currentContact};
        this.currentContact = this.props.currentContact;
        this.currentid = this.props.currentContact.id;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
            this.setState({
                currentContact: nextProps.currentContact
            });
            this.currentid = nextProps.currentContact.id;
        }
    }

    handleContactUpdate(){
        this.props.onContactAdded();
    }

    handleSubmit(event) {
        let formData = new FormData(event.target);
        if (!event.target.checkValidity()) {
            return;
        }
        this.props.saveContact(formData);
       // this.saveContact(formData)
        event.preventDefault();
        event.target.reset();
        this.clearCurrentContact();
    }

    clearCurrentContact(){
        this.setState({currentContact: {}})
    }

    saveContact(data){
        fetch("http://dev.samples.com/insertcontacts.php",
            {
                body: data,
                method: "post"
            }).then(()=>{  this.handleContactUpdate() });
    }

    handleChange(e){
       if(e.target.name == 'name'){
           this.setState({currentContact : { name: e.target.value}})
       }
       if(e.target.name == 'email'){
           this.setState({currentContact : { email: e.target.value}})
       }
       if(e.target.name == 'phone'){
           this.setState({currentContact : { phone: e.target.value}})
       }
       if(e.target.name == 'notes'){
           this.setState({currentContact: {notes: e.target.value}});
       }
        if(e.target.name == 'id'){
            if(e.target.value != undefined || e.target.value != ''){
                this.setState({currentContact : { id: e.target.value}});
                console.log(e.target.value);
            }
        }
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="id" type="hidden" className="form-control" value={this.currentid}/>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Contact Name</label>
                    <input name="name" type="text" className="form-control"
                           onChange={this.handleChange} placeholder="Enter contact name" value={this.state.currentContact.name} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input name="email" className="form-control" value={this.state.currentContact.email}
                           onChange={this.handleChange} placeholder="email@test.com"/>
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" className="form-control"
                           onChange={this.handleChange}
                           placeholder="545-0000"
                           value={this.state.currentContact.phone}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">Note</label>
                    <textarea onChange={this.handleChange} name="notes" className="form-control" rows="3"
                    value={this.state.currentContact.notes}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Save contact</button>
            </form>
        )
    }
}

export default Contacts;
