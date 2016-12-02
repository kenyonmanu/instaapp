import React from 'react';
import $ from 'jquery';

class  extends React.Component {
  render() {
    return (
      <div>
        <h3 className="center">feeds</h3>
        <button className="btn" onClick={ this.getfeeds }>Get feeds</button>
        <table className="table">
          <thead>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {this.feeds()}
          </tbody>
        </table>
      </div>
     )
   }
}

getfeeds() {
  $.ajax({
    url: `${this.baseUrl}/feeds`,
    type: 'GET'
  }).done( feeds => {
    this.setState({ feeds });
  })
}

feeds() {
  return this.state.feeds.map( product => {
    return (
      <tr key={product.id}>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>${product.base_price || 0}</td>
        <td>
          <button className="btn red" onClick={() => this.deleteProduct(product.id)}>Delete</button>
        </td>
      </tr>
     )
   });
 }

 deleteProduct(id) {
  //OPTIMISTIC UPDATING
  this.setState({ feeds: this.state.feeds.filter( (product) => product.id !== id ) });

  $.ajax({
    url: `${this.baseUrl}/feeds/${id}`,
    type: 'DELETE'
   }).fail( () => {
     alert('Product failed to delete');
     this.getfeeds();
   });
 }
