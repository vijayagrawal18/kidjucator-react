import React from 'react';
import { merge } from 'ramda';
import '../styles/ItemForm.css';

class ItemForm extends React.Component{
  saveDetails = event => {
    event.preventDefault();
    var item = {...this.props.item};

    const changes = {
      name: this.name.value,
      imageUrl: this.imageUrl.value,
      audioUrl: this.audioUrl.value,
      category: this.category.value,
    };

    item = merge(item, changes);
    this.props.saveItem(item);
  }

  render() {
    const item = this.props.item;
    return (<form key={`form-${item.id || ''}`} className="item-form" onSubmit={this.saveDetails}>
      <table cellSpacing="10">
        <tbody>
          <tr className="input-item">
            <td><label htmlFor="name">Name</label></td>
            <td><input className="form-name" defaultValue={item.name} ref={i => this.name = i} type="text"/></td>
          </tr>
          <tr className="input-item">
            <td><label htmlFor="imageUrl">Image Url</label></td>
            <td><input className="form-imageUrl" defaultValue={item.imageUrl} ref={i => this.imageUrl = i} type="text"/></td>
          </tr>
          <tr className="input-item">
            <td><label htmlFor="audioUrl">Audio Url</label></td>
            <td><input className="form-audioUrl" defaultValue={item.audioUrl} ref={i => this.audioUrl = i} type="text"/></td>
          </tr>
          <tr className="input-item">
            <td><label htmlFor="category">Category</label></td>
            <td><input className="form-category" defaultValue={item.category} ref={i => this.category = i} type="text"/></td>
          </tr>
          <tr className="input-item">
            <td colSpan="2"><button className="btn">Save</button></td>
          </tr>
        </tbody>
      </table>
    </form>)
  }

}

export default ItemForm;
