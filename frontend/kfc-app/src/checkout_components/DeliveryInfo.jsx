import React from "react";
import "./DeliverInfo.css";

const DeliveryInfo = ({
  orderType = "delivery",
  deliveryInfo,
  onChange,
}) => {
  if (orderType === "pickup") {
    return (
      <section className="delivery_info_container">
        <h3>RESTAURANT PICKUP</h3>

        <p>
          Enter your preferred KFC Uganda restaurant or branch.
          Live branch availability is not checked in this demonstration.
        </p>

        <label htmlFor="pickup-restaurant">
          Restaurant or branch name*
        </label>
        <input
          id="pickup-restaurant"
          name="pickupRestaurant"
          className="input_style"
          type="text"
          placeholder="Enter your preferred restaurant"
          value={deliveryInfo.pickupRestaurant}
          onChange={onChange}
          required
        />

        <p>
          Please confirm the collection location with the restaurant before travelling.
        </p>
      </section>
    );
  }

  return (
    <section className="delivery_info_container">
      <h3>DELIVERY ADDRESS</h3>

      <p>
        Enter the address where you would like your order delivered in Uganda.
      </p>

      <label htmlFor="delivery-address">Street, building or area*</label>
      <input
        id="delivery-address"
        name="address"
        className="input_style"
        type="text"
        placeholder="Street, building, village or area"
        value={deliveryInfo.address}
        onChange={onChange}
        required
      />

      <label htmlFor="delivery-town">Town or city*</label>
      <input
        id="delivery-town"
        name="town"
        className="input_style"
        type="text"
        placeholder="Town or city"
        value={deliveryInfo.town}
        onChange={onChange}
        required
      />

      <label htmlFor="delivery-district">District*</label>
      <input
        id="delivery-district"
        name="district"
        className="input_style"
        type="text"
        placeholder="District"
        value={deliveryInfo.district}
        onChange={onChange}
        required
      />

      <label htmlFor="delivery-instructions">
        Additional address details (optional)
      </label>
      <input
        id="delivery-instructions"
        name="instructions"
        className="input_style"
        type="text"
        placeholder="Nearby landmark, apartment or directions"
        value={deliveryInfo.instructions}
        onChange={onChange}
      />
    </section>
  );
};

export default DeliveryInfo;
