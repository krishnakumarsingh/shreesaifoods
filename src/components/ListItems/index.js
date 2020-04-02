import React, { Component } from 'react'
import './index.scss';
import Spin from '../Spin';
import foodsJson from './food.json'
class ListItems extends Component {
  constructor(props) {
    super(props);
    let {
      text,
      items,
      priceSymbol
    } = foodsJson;

    this.state = {
      total: 0.00,
      arrSelected: [],
      messageError: [],
      foodTypesItem: [],
      text,
      items,
      priceSymbol
    }
    this.addCart = this.addCart.bind(this);
    this.addPlus = this.addPlus.bind(this);
    this.addMinus = this.addMinus.bind(this);
    
  }
  componentWillMount() {
    const preFix = "https://spreadsheets.google.com/feeds/list/";
    const sheetID = "1hjWE940VNJJe5sz3O2lpBuvwFHXE2tUA8I_NuS_-jVA";
    const postFix = "/od6/public/values?alt=json";
    const spreadsheetURL = "https://script.google.com/macros/s/AKfycbzbO9PZeEibxoi34vv_Ts61eaplTGLvHlAkQoy9EU8G8qL6Z2I8/exec";
    $.getJSON(spreadsheetURL, (data) => {
      this.setState({foodTypesItem: data.user}, function() {
        setTimeout(function() {
          $(".price-list-animation li").delay(500).each(function(i) {
            $(this).delay(100 * i).queue(function() {
              $(this).css({
                "opacity": "1",
              });
            });
          });
        }, 400);
      });
    });
  }
  foodTypesLists(foodType, type, addCart, addToCarts, priceSymbol) {
    var foodTypesArr = [];
    var foodType = foodType.filter(function (el) {
      return el.foodType == type;
    });
    return foodType.map(function (foodTypeItem, index) {
      const classNameLi = addToCarts ? "price-list__item" : 'price-list__item price-list__item-no-add-cart';
      let perList = '';
      perList = <li className={classNameLi} onClick={addToCarts ? addCart : 'return false'} id={foodTypeItem.id} key={index}>
            {addToCarts && <input type="checkbox" className="price-list__item-selector" />}
            {addToCarts && <span className="price-list__item-checkmark"></span>}
            <div className="price-item">
              <h4 className="price-item__heading">{foodTypeItem.name}</h4>
              <div className="price-item__separator"></div>
              <div className="price-item__price">{priceSymbol}{foodTypeItem.price}</div>
            </div>
        </li>;
      if (!addToCarts) {
        perList = <li className={classNameLi} id={foodTypeItem.id} key={index}>
          <div className="price-item">
            <h4 className="price-item__heading">{foodTypeItem.name}</h4>
            <div className="price-item__separator"></div>
            <div className="price-item__price">{priceSymbol}{foodTypeItem.price}</div>
          </div>
        </li>;
      }
      return perList;
    })
  }
  addToCartsModal(arrSelected) {
    return <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {arrSelected.length === 0 && 
          <div>
            <div className="modal-header">No data</div>
            <div className="modal-footer">No Thanks!!</div>
          </div>}
          {arrSelected.length > 0 && <div>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Item Selected</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price/Unit</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {arrSelected.map((i, j) => {
                    return <tr key={j}>
                      <th scope="row">{j + 1}</th>
                      <td>{i.name}</td>
                      <td>
                        <span className="qty-nmr">{1}</span>
                        <span className="qty-count">
                          <span className="add bg-danger" onClick={this.addPlus}>+</span>
                          <span className="minus bg-success" onClick={this.addMinus}>-</span>
                        </span>
                      </td>
                      <td>{parseFloat(i.price)}</td>
                      <td>{parseFloat(i.price) * 1}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Buy</button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  }
  addCart(e) {
    var item = foodsJson.items[0].foods.find(x => x.id === e.currentTarget.id);
    if($(e.currentTarget).find('input[type="checkbox"]').is(':checked')) {
      $(e.currentTarget).find('input[type="checkbox"]').attr('checked', false);
    } else {
      $(e.currentTarget).find('input[type="checkbox"]').attr('checked', true);
    }
    let arrSelected = [...this.state.arrSelected];
    if(arrSelected.find(x => x.id === e.currentTarget.id)) {
      var index = arrSelected.indexOf(item);
      console.log(item.id, index);
      if (index !== -1) {
        arrSelected.splice(index, 1);
      }
      this.setState({
        messageError: [...this.state.messageError, 'Already added, So remove this item from select list!!']
      });
      const that = this;
      setTimeout(function() {
        that.setState({
          messageError: []
        });
      }, 2000);
    } else {
      arrSelected.push(item);
    }
    this.setState({ arrSelected }, function() {
      var x = arrSelected.map((i, j) => {
        return i.price;
      });
      var total = x.reduce(function(a, b){
        return parseFloat(a) + parseFloat(b);
      }, 0);
      this.setState({ total });
    });
  }
  addPlus(e) {
    var currentTarget = $(e.currentTarget);
    var tdCurrt = currentTarget.closest('td');
    var qtyNmr = tdCurrt.find('.qty-nmr');
    var currentTableLastTd = currentTarget.closest('table').find('tbody td:last-child');
    if(parseInt(qtyNmr.html()) < 10) {
      qtyNmr.text(parseInt(qtyNmr.html()) + 1);
      tdCurrt.next().next().text(parseInt(qtyNmr.html()) * parseFloat(tdCurrt.next().text()));
      var x = []
      currentTableLastTd.map((i, j) => {
        x.push(parseFloat($(j).text()));
      });
      var total = x.reduce(function(a, b){
        return parseFloat(a) + parseFloat(b);
      }, 0);
      this.setState({ total });
    }
  }
  addMinus(e) {
    var currentTarget = $(e.currentTarget);
    var tdCurrt = currentTarget.closest('td');
    var qtyNmr = tdCurrt.find('.qty-nmr');
    var currentTableLastTd = currentTarget.closest('table').find('tbody td:last-child');
    if(parseInt(qtyNmr.html()) > 1) {
      qtyNmr.text(parseInt(qtyNmr.html()) - 1);
      tdCurrt.next().next().text(parseInt(qtyNmr.html()) * parseFloat(tdCurrt.next().text()));
      var x = []
      currentTableLastTd.map((i, j) => {
        x.push(parseFloat($(j).text()));
      });
      var total = x.reduce(function(a, b){
        return parseFloat(a) + parseFloat(b);
      }, 0);
      this.setState({ total });
    }
  }
  render() {
    var that = this;
    const {
      addToCarts
    } = this.props;
    const {
      text,
      foodTypesItem,
      messageError,
      arrSelected,
      total
    } = this.state;
    const {
      foodTypes,
      foodsItems,
      priceSymbol
    } = foodsJson;
    return (
      <div className={`custom_width container list-items-container ${foodTypesItem.length == 0 && 'list-items-container-relative'}`}>
        {foodTypesItem.length == 0 && <Spin />}
        {foodTypesItem.length > 0 && <div className="row">
          {text && <div className="col-sm-12">
            <div className="title-block txt-center">
              <h3 className="title-block__title--menu">{text}</h3>
            </div>
            <div className="spacer-65">
              {addToCarts && messageError.length > 0 && <div className="alert alert-primary" role="alert">
                {messageError.map((i, j) => {
                  return i;
                })}
                </div>
              }
              {addToCarts && <div className="spacer-total">Total:&nbsp;&nbsp;${total}</div>}
              {addToCarts && arrSelected.length > 0 && <button type="button" className="btn btn-primary cart-btn" data-toggle="modal" data-target="#exampleModal">
                Carts
              </button>}
              {addToCarts && this.addToCartsModal(arrSelected)}
            </div>
          </div>}
          {foodTypesItem && foodTypes.map((item, index) => {
            return (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="col-wrapper">
                  <div className="title-block txt-center">
                    <h3 className="title-block__subtitle--menu">{item}</h3>
                  </div>
                  <ul className="price-list price-list-animation">
                    { this.foodTypesLists(foodTypesItem, item, this.addCart, addToCarts, priceSymbol) }
                  </ul>
                </div>
              </div>
            )
          })}
        </div>}
        {!foodsJson && <div>Sorry</div>}
      </div>
    )
  }
}
export default ListItems;