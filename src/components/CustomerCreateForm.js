import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function CustomerCreateForm(props) {
    const initialFormData = Object.freeze({
        customerFirstName: "",
        customerLastName: "",
        customerContactNumber: 0
    });

    const [formData, setFormData ] =  useState(initialFormData);

    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const customerToCreate = {
            customerId: 0,
            customerFirstName: formData.customerFirstName,
            customerLastName: formData.customerLastName,
            customerContactNumber: formData.customerContactNumber
        };

        const url = Constants.API_URL_CREATE_CUSTOMER;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerToCreate)
          })
          .then(response => response.json())
          .then(responseFromServer => {
            console.log(responseFromServer);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });

          props.onCustomerCreated(customerToCreate)
    };

  return (
    <form className="w-100 px-5">
        <h1 className="mt-5">Create a new Customer</h1>

        <div className="mt-5">
            <label className="h3 form-label">Customer First Name</label> 
            <input value={formData.customerFirstName} name="customerFirstName"  type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-5">
            <label className="h3 form-label">Customer Last Name</label> 
            <input value={formData.customerLastName} name="customerLastName"  type="text" className="form-control" onChange={handleChange}/>
        </div>

        <div className="mt-5">
            <label className="h3 form-label">Customer Contact Number</label> 
            <input value={formData.customerContactNumber} name="customerContactNumber"  type="text" className="form-control" onChange={handleChange}/>
        </div>

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Create</button>
        <button onClick={() => props.onCustomerCreated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
      </form>
  );
}
