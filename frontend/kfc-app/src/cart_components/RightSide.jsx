import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiUrl } from "../utils/api";
import "../pages/Cart.css";
import { formatUGX, parsePrice } from "../utils/currency";

const RightSide = ({ customerInfo, deliveryInfo, orderType }) => {
  const [input, setInput] = useState(false);
  const [stotal, setstotal] = useState(0);
  const [paymentError, setPaymentError] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  // Calculate subtotal only from valid product prices.
  const hasUnavailablePrices = cart.some(
    (item) => parsePrice(item.price) === null
  );

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      const price = parsePrice(item.price);
      const qty = Number(item.qty) || 0;

      if (price === null || qty < 0) {
        return acc;
      }

      return acc + price * qty;
    }, 0);

    setstotal(Math.round(total));
  }, [cart]);

  // No unverified tax or handling charges in this demo.
  const gst = 0;
  const restaurantHandling = 0;

  // Optional donation
  const hopeAmount = input ? 500 : 0;

  // Subtotal plus optional donation
  const finalTotal = stotal + hopeAmount;
  // Donation checkbox
  const handleInput = () => {
    setInput(!input);
  };

  const handleDemoPayment = async () => {
    setPaymentError("");
    setPaymentMessage("");

    if (cart.length === 0) {
      setPaymentError("Your cart is empty.");
      return;
    }

    if (hasUnavailablePrices) {
      setPaymentError("Please remove items with unavailable prices before checkout.");
      return;
    }

    const requiredContactFields = [
      customerInfo?.firstName,
      customerInfo?.lastName,
      customerInfo?.email,
      customerInfo?.phone,
    ];

    if (requiredContactFields.some((value) => !String(value || "").trim())) {
      setPaymentError("Please complete your first name, last name, email and phone number.");
      return;
    }

    const email = customerInfo.email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setPaymentError("Please enter a valid email address.");
      return;
    }

    const phoneDigits = customerInfo.phone.replace(/\D/g, "");

    if (phoneDigits.length < 9 || phoneDigits.length > 15) {
      setPaymentError("Please enter a valid phone number.");
      return;
    }

    if (orderType === "delivery") {
      const requiredAddressFields = [
        deliveryInfo?.address,
        deliveryInfo?.town,
        deliveryInfo?.district,
      ];

      if (requiredAddressFields.some((value) => !String(value || "").trim())) {
        setPaymentError("Please complete your delivery address, town or city, and district.");
        return;
      }
    } else if (!String(deliveryInfo?.pickupRestaurant || "").trim()) {
      setPaymentError("Please enter your preferred restaurant or branch for pickup.");
      return;
    }
    setIsPaying(true);

    try {
      const { data } = await axios.post(apiUrl("api/payment/demo"), {
        amount: finalTotal,
      });
      if (
        data.status !== "success" ||
        data.demo !== true ||
        Number(data.amount) !== finalTotal ||
        !data.demoPaymentId
      ) {
        throw new Error("Unable to confirm the payment.");
      }
      setPaymentMessage(
        `Demo payment successful. Amount: ${formatUGX(data.amount)}. Reference: ${data.demoPaymentId}.`
      );
    } catch (error) {
      setPaymentError(
        error.response?.data?.message ||
          "Unable to complete the demo payment. Please try again."
      );
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <>
      {/* Items */}
      <h2 className="reciept_heading">
        {cart.length} ITEMS
      </h2>

      {/* Offers */}
      <div className="offers_deals_container">
        <img
          src="https://online.kfc.co.in/static/media/Offers_Coupon_Icon.72b94c41.svg"
          alt=""
        />

        <span className="cart_offers_text">
          Apply Offers & Deals
        </span>

        <Link className="viewAll_button" to="/menu">
          View Menu
        </Link>
      </div>

      {/* Subtotal */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div>SubTotal</div>
        <div>{formatUGX(stotal)}</div>
      </div>

      {/* GST */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div>Tax (not applied in this demo)</div>
        <div>{formatUGX(gst)}</div>
      </div>

      {/* Restaurant Handling */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            marginRight: "20px",
          }}
        >
          Handling fee (not applied)
        </div>

        <div>{formatUGX(restaurantHandling)}</div>
      </div>

      {/* Add Hope */}
      {input && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div>Add Hope</div>
          <div>{formatUGX(500)}</div>
        </div>
      )}

      <hr
        style={{
          color: "grey",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />

      {/* Donation */}
      <div className="donation_box">
        <div>
          <input
            onChange={handleInput}
            checked={input}
            type="checkbox"
          />
        </div>

        <div
          style={{
            marginTop: "-17px",
          }}
        >
          <p>Donate UGX 500 to Add Hope.</p>

          <p>
            Our goal is to feed 20 million people by 2022.
          </p>
        </div>

        <div>
          <img
            src="data:image/png;base64,..."
            alt=""
          />
        </div>
      </div>

      {/* Checkout / Payment */}
      {paymentError && <p className="paymentNotice paymentError" role="alert">{paymentError}</p>}
      {paymentMessage && (
        <div className="paymentNotice paymentSuccess" role="status">
          <h3>{paymentMessage.split(". ")[0]}</h3>
          <p>{paymentMessage.split(". ").slice(1).join(". ")}</p>
          <small>Presentation simulation — no payment was processed.</small>
        </div>
      )}
      {path === "/cart" ? (
        <button
          onClick={() => navigate("/checkout")}
          disabled={cart.length === 0 || hasUnavailablePrices}
          className="redButton"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <p>Checkout</p>

            <p>{formatUGX(finalTotal)}</p>
          </div>
        </button>
      ) : (
        <>
          <p className="paymentDisclosure">
            Presentation simulation — no payment will be processed.
          </p>
          <button
            onClick={handleDemoPayment}
            disabled={isPaying || cart.length === 0 || hasUnavailablePrices}
            className="redButton"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
                <p>{isPaying ? "Processing..." : "Pay Now"}</p>
              <p>{formatUGX(finalTotal)}</p>
            </div>
          </button>
        </>
      )}
    </>
  );
};

export default RightSide;
