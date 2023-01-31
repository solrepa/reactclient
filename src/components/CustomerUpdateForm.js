import React, {useState} from 'react'
import Constants from '../utilities/Constants'

export default function CustomerUpdateForm(props) {
    const initialFormData = Object.freeze({
        customerId: props.customer.customerId,
        customerFirstName: props.customer.customerFirstName,
        customerLastName: props.customer.customerLastName,
        customerContactNumber: props.customer.customerContactNumber
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

        const customerToUpdate = {
            customerId: props.customer.customerId,
            customerFirstName: formData.customerFirstName,
            customerLastName: formData.customerLastName,
            customerContactNumber: formData.customerContactNumber
        };

        const url = `https://localhost:7172/api/customers/edit/${customerToUpdate.customerId}`;

        console.log(JSON.stringify(customerToUpdate, null, 4));

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerToUpdate,null, 4)
          })
          .then((response) => response)
          .then(responseFromServer => {
            console.log(responseFromServer);
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });

          props.onCustomerUpdated(customerToUpdate)
    };

  return (
    <form className="w-100 px-5">
        <h1 className="mt-5">Update {props.customer.customerLastName}</h1>

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

        <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Update</button>
        <button onClick={() => props.onCustomerUpdated(null)} className="btn btn-secondary btn-lg w-100 mt-3">Cancel</button>
      </form>
  );
}
