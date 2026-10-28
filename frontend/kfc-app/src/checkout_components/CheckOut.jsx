import React, { useState } from "react";
import RightSide from "../cart_components/RightSide";
import "./Checkout.css";
import ContactInfo from "./ContactInfo";
import DeliveryInfo from "./DeliveryInfo";
import DeliveryOpt from "./DeliveryOpt";

const CheckOut = () => {
  const [orderType, setOrderType] = useState("delivery");

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    town: "",
    district: "",
    instructions: "",
    pickupRestaurant: "",
  });

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomerInfo((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleDeliveryChange = (event) => {
    const { name, value } = event.target;

    setDeliveryInfo((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <div className="checkout_container">
      <h1>CHECKOUT</h1>

      <p className="checkout-demo-note">
        Uganda demo checkout. Payment is simulated; no real payment will be processed.
      </p>

      <section className="order-type-section">
        <h2>How would you like to receive your order?</h2>

        <div className="order-type-options">
          <label className={orderType === "delivery" ? "order-type-option selected" : "order-type-option"}>
            <input
              type="radio"
              name="orderType"
              value="delivery"
              checked={orderType === "delivery"}
              onChange={() => setOrderType("delivery")}
            />
            <span>Delivery</span>
            <small>Bring the order to your address</small>
          </label>

          <label className={orderType === "pickup" ? "order-type-option selected" : "order-type-option"}>
            <input
              type="radio"
              name="orderType"
              value="pickup"
              checked={orderType === "pickup"}
              onChange={() => setOrderType("pickup")}
            />
            <span>Restaurant pickup</span>
            <small>Collect your order yourself</small>
          </label>
        </div>
      </section>

      <div className="checkout-content">
        <div className="checkout-details">
          <DeliveryInfo
            orderType={orderType}
            deliveryInfo={deliveryInfo}
            onChange={handleDeliveryChange}
          />

          {orderType === "delivery" && <DeliveryOpt />}

          <ContactInfo
            customerInfo={customerInfo}
            onChange={handleCustomerChange}
          />
        </div>

        <div className="checkout-summary">
          <RightSide
            customerInfo={customerInfo}
            deliveryInfo={deliveryInfo}
            orderType={orderType}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
