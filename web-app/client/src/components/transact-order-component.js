import React, { Component } from 'react'
import axios from "axios";

const Product = (props) => (
  <option key={props.product.ProductID} value={props.product.ProductID}>
     {props.product.Name}
  </option>
);

const User = (props) => (
  <option key={props.user.UserType} value={props.user.UserID}>
     {props.user.Name}
  </option>
);



export class TransactOrder extends Component {
 

    constructor(props) {
      super(props);

    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  
    this.state = {
      ProductId: "",
      UserId: "",
    };

      this.state = {
        role: sessionStorage.getItem('role'),
        usertype:sessionStorage.getItem('usertype'),
        products: [],
        users:[]
      };
    }
  
    componentDidMount() {

      const headers = {
        "x-access-token": sessionStorage.getItem("jwtToken"),
      };
      
      axios
          .get("http://localhost:8090/product/" + this.state.role, {
          headers: headers,
        })
        .then((response) => {
          // console.log("response "+JSON.stringify(response))
          this.setState({
            products: response.data.data,
          });
        })
        .catch((error) => console.log(error));


        axios
      .get("http://localhost:8090/user/all/manufacturer", {headers: headers})
      .then((response) => {
        console.log("response "+JSON.stringify(response))
        this.setState({
          users: response.data.data,
        });
      })
      .catch((error) => console.log(error));
    
      }


      CreateOrder(){
        return this.state.products.map((currentProduct) => {
          return (
            <Product
              product={currentProduct.Record}
              deleteProduct={this.deleteProduct}
              key={currentProduct.Key}
            />
          );
        });
      }

      SelectUser(){
        return this.state.users.map((currentUser) => {
          return (
            <User
              user={currentUser.Record}
              deleteUser={this.deleteUser}
              key={currentUser.Key}
            />
          );
        });
      }

      onChangeProduct(e) {
        this.setState({
          ProductId: e.target.value,
        });
      }

      onChangeUser(e){
        this.setState({
          UserId : e.target.value,
        })
      }

      onSubmit(e){
        e.preventDefault();
        const SubmitProduct = {
          id:"admin",
          productId : this.state.ProductId,
          userId : this.state.UserId,
          loggedUserType : this.state.role,
         
        }

        const headers = {
          "x-access-token": sessionStorage.getItem("jwtToken"),
        };

        if(this.state.usertype == "retailer"){
          
          axios
        .post("http://localhost:8090/transact/consumer", SubmitProduct, {
          headers: headers,
        })
        .then((res) => console.log(res));

        }else{
          axios
          .post("http://localhost:8090/transact/", SubmitProduct, {
            headers: headers,
          })
          .then((res) => console.log(res));
  
        }

      }


    render() { 
    return (
      <div>
      <h3>Transact Order</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Products: </label>
          <select
            ref="usertypeInput"
            required
            className="form-control"
            onChange={this.onChangeProduct}
          >
            <option value="">
              Select Product
            </option>
            {this.CreateOrder()}
          </select>
        </div>

        <div className="form-group">
          <label>Users: </label>
          <select
            ref="usertypeInput"
            required
            className="form-control"
            onChange={this.onChangeUser}
          >
            <option value="">
              Select User
            </option>
            {this.SelectUser()}
          </select>
          </div>

        <div className="form-group">
          <input
            type="submit"
            value="Transact Order"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
    )
  }
}

export default TransactOrder
