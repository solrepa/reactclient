import React, {useState} from "react";
import Constants from "./utilities/Constants";
import CustomerCreateForm from "./components/CustomerCreateForm";
import CustomerUpdateForm from "./components/CustomerUpdateForm";

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [showingCreateNewCustomerForm, setShowingCreateNewCustomerForm] = useState(false);
  const [customerCurrentlyUpdated, setCustomerCurrentlyUpdated] = useState(null);

  function getCustomers(){
    const url = Constants.API_URL_GET_ALL_CUSTOMERS;

    fetch(url, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(customersFromServer => {
      console.log(customersFromServer);
      setCustomers(customersFromServer);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
  }

  function deleteCustomer(customerId){
    //const url = `${Constants.API_BASE_URL_DEVELOPMENT}${customerId}`;

    const url = `https://localhost:7172/api/customers/delete/${customerId}`;

    fetch(url, {
      method: 'DELETE'
    })
    .then((response) => response)
    .then(responseFromServer => {
      console.log(responseFromServer);
      onCustomerDeleted(customerId);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });

  }

  return (
    <div className="container">
      <div className = "row min-vh-100">
        <div className = "col d-flex flex-column justify-content-center align-items-center">
          {(showingCreateNewCustomerForm === false && customerCurrentlyUpdated === null) && (
            <div>
             <div className="mt-5">
                <button onClick={getCustomers} className="btn btn-dark btn-lg w-100">Get Customers</button>
                <button onClick={() => setShowingCreateNewCustomerForm(true)} className="btn btn-secondary btn-lg w-100 mt-4">Create new Customer</button>
                <button onClick={() => setCustomers([])} className = "btn btn-dark btn-lg w-100 mt-4">Empty Customers</button>
              </div>
            </div>
          )}
          

          {(customers.length  > 0 && showingCreateNewCustomerForm === false && customerCurrentlyUpdated === null) && renderCustomersTable()}

          {showingCreateNewCustomerForm && <CustomerCreateForm onCustomerCreated={onCustomerCreated}/>}

          {customerCurrentlyUpdated !== null && <CustomerUpdateForm customer={customerCurrentlyUpdated} onCustomerUpdated={onCustomerUpdated}/>}
        </div>
      </div>
    </div>
  );


  function renderCustomersTable() 
  {
    return(
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th  scope="col">Id</th>
              <th  scope="col">Customer First Name</th>
              <th  scope="col">Customer Last Name</th>
              <th  scope="col">Customer Contact Number</th>
              <th  scope="col">CRUD </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.customerId}>
                <th scope="row">{customer.customerId}</th>
                <td>{customer.customerFirstName}</td>
                <td>{customer.customerLastName}</td>
                <td>+48 {customer.customerContactNumber}</td>
                <td>
                  <button onClick={() => setCustomerCurrentlyUpdated(customer)} className="btn btn-dark btn-md mx-3 my-3 text-uppercase" >Update</button>
                  <button onClick={() => {if(window.confirm("Delete this customer?")) deleteCustomer(customer.customerId)}} className="btn btn-secondary btn-md text-uppercase">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       
      </div>
    );
  }

  function onCustomerCreated(createdCustomer){
    setShowingCreateNewCustomerForm(false);
    if(createdCustomer === null){
      return;
    }

    alert('Customer created!');

    getCustomers();
  }

  function onCustomerUpdated(updateCustomer){
    setCustomerCurrentlyUpdated(null);

    if(updateCustomer === null){
      return;
    }

    let customersCopy = [...customers];

    const index = customersCopy.findIndex((customersCopyCustomer, currentIndex) => {
      if(customersCopyCustomer.customerId === updateCustomer.customerId){
        return true;
      }
    });

    if(index !== -1){
      customersCopy[index] = updateCustomer;
    }

    setCustomers(customersCopy);

    alert("Customer updated!");
  }

  function onCustomerDeleted(deletedCustomerId){

    let customersCopy = [...customers];

    const index = customersCopy.findIndex((customersCopyCustomer, currentIndex) => {
      if(customersCopyCustomer.customerId === deletedCustomerId){
        return true;
      }
    });

    if(index !== -1){
      customersCopy.splice(index, 1);
    }

    setCustomers(customersCopy);

    alert("Customer deleted!");
  }


}
