import React, { useRef, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as CartIcon } from "../images/shopping_cart-black-18dp.svg";
import { incrementCart, decrementCart, resetCart } from "../actions/cart";

export default () => {
  const inputEl = useRef(null);

  let { cartCount, reciepts } = useSelector((state) => state.cartHash);

  let [invoiceNum, setInvoiceNum] = useState(null);

  let [allItemsTotalPrice, setAllItemsTotalPrice] = useState(null);

  let dispatch = useDispatch();

  const handleCartClick = (eventType) => {
    if (typeof inputEl.current.showModal === "function") {
      if (eventType === "open") {
        inputEl.current.showModal();
      } else {
        inputEl.current.close();
      }
      invoiceNum && dispatch(resetCart());
      setInvoiceNum(null);
    } else {
      alert("The <dialog> API is not supported by this browser");
    }
  };

  const incrementReciept = (subItemId, categoryName) => {
    dispatch(incrementCart(subItemId, categoryName));
  };

  const decrementReciept = (subItemId, categoryName) => {
    dispatch(decrementCart(subItemId, categoryName));
  };

  /**
   * @description
   *
   * Primary requirement handled here,
   *
   * 1. On confirmation of the cart details by the player, a receipt should be displayed with the products in the cart and the invoice number which can be any random number.
   */
  const generateInvoice = () => {
    setInvoiceNum(Math.floor(Math.random() * 1000000));
  };

  useEffect(() => {
    //Code to show tip.
    let popOverElem = window.$('[data-toggle="popover"]');
    window.$(function () {
      popOverElem.popover("show");
    });
    setTimeout(() => {
      popOverElem.popover("hide");
    }, 3500);

    //To act as mounting phase, passing empty.
  }, []);

  const allItemsTotalPriceHandler = useCallback(() => {
    let allItemsTotalPrice =
      reciepts && reciepts.length > 0
        ? reciepts.reduce((sum, acc) => (sum += acc.totalprice), 0)
        : 0;

    if (allItemsTotalPrice > 50) {
      return allItemsTotalPrice - allItemsTotalPrice * 0.1;
    }
    return allItemsTotalPrice;
  }, [reciepts]);

  useEffect(() => {
    setAllItemsTotalPrice(allItemsTotalPriceHandler(reciepts));
  }, [allItemsTotalPriceHandler, reciepts]);

  return (
    <React.Fragment>
      <div
        tabIndex={0}
        className="popover-dismiss"
        role="button"
        data-toggle="popover"
        data-trigger="hover"
        title="Tip"
        data-content="Click to view items added to your cart"
        data-placement="bottom"
      >
        <div
          className="position-relative cursor-pointer"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() => handleCartClick("open")}
        >
          <span className="cart-item-counter badge badge-pill badge-info">
            {cartCount}
          </span>
          <CartIcon height="40px" width="40px" />
        </div>
      </div>
      <dialog role="document" ref={inputEl} className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {!invoiceNum ? "Checkout your cart!" : "Your reciept"}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => handleCartClick("close")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {invoiceNum && <h5>Invoice No. {invoiceNum}</h5>}
            <dl className="row">
              <dt className="col-md-6">Category name</dt>
              <dd className="col-md-3 text-center">Total items</dd>
              <dd className="col-md-3 text-center">Total items price</dd>
            </dl>
            <hr />
            {reciepts && cartCount > 0 ? (
              reciepts.map((item) => (
                <React.Fragment key={item.categoryName}>
                  <dl className="row">
                    <dt className="col-md-6">{item.categoryName}</dt>
                  </dl>
                  <dl className="row">
                    {Object.keys(item.totalItems).map((subItem) => (
                      <React.Fragment key={item.totalItems[subItem].id}>
                        <dt className="col-md-6">{subItem}</dt>
                        <dd className="col-md-3 text-center">
                          {!invoiceNum && (
                            <span
                              onClick={() =>
                                decrementReciept(
                                  item.totalItems[subItem].id,
                                  item.categoryName
                                )
                              }
                              className="btn btn-danger badge badge-pill badge-danger mr-2"
                            >
                              {" "}
                              -{" "}
                            </span>
                          )}
                          {item.totalItems[subItem] &&
                            item.totalItems[subItem].length}
                          {!invoiceNum && (
                            <span
                              onClick={() =>
                                incrementReciept(
                                  item.totalItems[subItem].id,
                                  item.categoryName
                                )
                              }
                              className="btn btn-success badge badge-pill badge-success ml-2"
                            >
                              {"+"}
                            </span>
                          )}
                        </dd>
                        <dd className="col-md-3 text-center">
                          {item.totalItems[subItem] &&
                            item.totalItems[subItem].price}
                        </dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </React.Fragment>
              ))
            ) : (
              <div className="text-center p-3">{"Your cart is empty !"}</div>
            )}
            <hr />
            <dl className="row">
              <dt className="col-md-9">Total price</dt>
              <dd className="col-md-3 text-center">
                {allItemsTotalPrice}
              </dd>
            </dl>
          </div>
          {!invoiceNum && (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleCartClick("close")}
              >
                {"Close"}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={generateInvoice}
                disabled={cartCount === 0}
              >
                {"Confirm?"}
              </button>
            </div>
          )}
        </div>
      </dialog>
    </React.Fragment>
  );
};
