import React, { Component } from 'react'
import axios from "axios";

const Product = (props) => (
  <option key={props.product.ProductID} value={props.product.ProductID}>
     {props.product.Name}
  </option>
);

const ProductDetails = (props) => (
  <tr>
    <td>{props.product.Date ? props.product.Date.OrderedDate : ""}</td>
    <td>{props.product.Date ? props.product.ManufacturerID + " - " + props.product.Date.ManufactureDate : null}</td>
    <td>{props.product.Date ? props.product.WholesalerID + " - " + props.product.Date.SendToWholesalerDate : null}</td>
    <td>{props.product.Date ? props.product.DistributerID + " - " + props.product.Date.SendToDistributorDate : null}</td>
    <td>{props.product.Date ? props.product.RetailerID + " - " + props.product.Date.SendToRetailerDate : null}</td>
    <td>{props.product.Date ? props.product.ConsumerID + " - " + props.product.Date.SellToConsumerDate : null}</td>
    <td>{props.product.Status  }</td>
    <td>{props.product.Date ?  props.product.Date.DeliveredDate : null}</td>

  </tr>
);


export class QueryProduct extends Component {
 

    constructor(props) {
      super(props);

    this.onChangeProduct = this.onChangeProduct.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  
    this.state = {
      ProductId: "",
    };

      this.state = {
        role: sessionStorage.getItem('role'),
        usertype:sessionStorage.getItem('usertype'),
        products: [],
        details :[]
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
              console.log("response "+JSON.stringify(response))
              this.setState({
                products: response.data.data,
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


      onChangeProduct(e) {
        this.setState({
          ProductId: e.target.value,
        });
      }

      
      onSubmit(e){
        e.preventDefault();

        const role = sessionStorage.getItem("role");
        const headers = {
          "x-access-token": sessionStorage.getItem("jwtToken"),
        };

        axios.get("http://localhost:8090/product/" +  this.state.ProductId+"/"+ role,{
        headers: headers,
      })
        .then((response) => {
          console.log(response.data.data.ConsumerID)
          this.setState({
          details : response.data.data
          })
        })

      }
      productDet() {
        // return this.state.details.map((currentProduct) => {
          return (
            <ProductDetails
              product={this.state.details}
              deleteProduct={this.state.details.deleteProduct}
              key={this.state.details.Key}
            />
          );
        // });
      }

    render() { 
    return (
      <div>
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
          <input
            type="submit"
            value="Query Order"
            className="btn btn-primary"
          />
        </div>
      </form>


      <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Ordered Date</th>
              <th>Manufacturer - Date</th>
              <th>Wholesaler - Date</th>
              <th>Distributer - Date</th>
              <th>Retailer - Date</th>
              <th>Consumer - Date</th>
              <th>Status</th>
              <th>Delivered Date</th>
            </tr>
          </thead>
          <tbody>{this.productDet()}</tbody>
        </table>


    </div>
    )
  }
}

export default QueryProduct
