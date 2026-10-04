import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../utils/api";
import "../pages/Cart.css";

const RightSide = () => {
  const [input, setInput] = useState(false);
  const [stotal, setstotal] = useState(0);
  const [paymentError, setPaymentError] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  // Calculate subtotal
  useEffect(() => {
    const total = cart.reduce((acc, el) => {
      const price = Number(
        String(el.price).replace(/[^\d.]/g, "")
      );

      const qty = Number(el.qty) || 0;

      return acc + price * qty;
    }, 0);

    setstotal(Math.round(total));
  }, [cart]);

  // GST = 5%
  const gst = Math.round(stotal * 0.05);

  // Restaurant handling charge
  const restaurantHandling = 20;

  // Donation
  const hopeAmount = input ? 5 : 0;

  // Final amount
  const finalTotal =
    stotal + gst + restaurantHandling + hopeAmount;

  // Donation checkbox
  const handleInput = () => {
    setInput(!input);
  };

  const handleDemoPayment = async () => {
    setPaymentError("");
    setPaymentMessage("");
    setIsPaying(true);

    try {
      const { data } = await axios.post(apiUrl("api/payment/demo"), {
        amount: finalTotal,
      });
      if (data.status !== "success" || data.demo !== true) {
        throw new Error("Unable to confirm the payment.");
      }
      setPaymentMessage(
        `Payment successful. Amount: ₹${data.amount}. Reference: ${data.demoPaymentId}.`
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

        <button className="viewAll_button">
          View All
        </button>
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
        <div>₹{stotal}</div>
      </div>

      {/* GST */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div>GST (5%)</div>
        <div>₹{gst}</div>
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
          Restaurant Handling (Incl. Taxes)
        </div>

        <div>₹{restaurantHandling}</div>
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
          <div>₹5</div>
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
          <p>Donate ₹5.00 Tick to Add Hope.</p>

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
          className="redButton"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <p>Checkout</p>

            <p>₹{finalTotal}</p>
          </div>
        </button>
      ) : (
        <>
          <p className="paymentDisclosure">
            Presentation simulation — no payment will be processed.
          </p>
          <button
            onClick={handleDemoPayment}
            disabled={isPaying || cart.length === 0}
            className="redButton"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
                <p>{isPaying ? "Processing..." : "Pay Now"}</p>
              <p>₹{finalTotal}</p>
            </div>
          </button>
        </>
      )}
    </>
  );
};

export default RightSide;