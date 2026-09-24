"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

const emptyForm = {
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  zip: "",
  country: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container section" style={{ textAlign: "center" }}>
        <h1 className="section-title">Nothing to check out</h1>
        <p className="section-subtitle">Your cart is empty.</p>
        <Link href="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  const set = (field) => (e) => {
    let value = e.target.value;
    if (field === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (field === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (field === "cvc") value = value.replace(/\D/g, "").slice(0, 4);
    setForm((f) => ({ ...f, [field]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (form.phone.trim().length < 7) errs.phone = "Enter a valid phone number.";
    if (!form.firstName.trim()) errs.firstName = "Required.";
    if (!form.lastName.trim()) errs.lastName = "Required.";
    if (!form.address.trim()) errs.address = "Required.";
    if (!form.city.trim()) errs.city = "Required.";
    if (!form.zip.trim()) errs.zip = "Required.";
    if (!form.country.trim()) errs.country = "Required.";
    if (!form.cardName.trim()) errs.cardName = "Required.";
    if (form.cardNumber.replace(/\s/g, "").length < 16)
      errs.cardNumber = "Enter the 16-digit card number.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) errs.expiry = "Use MM/YY.";
    if (form.cvc.length < 3) errs.cvc = "Invalid CVC.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setPlacing(true);
    // Simulate payment processing (demo — no real charge)
    setTimeout(() => {
      const orderNumber = "SN-" + Math.floor(100000 + Math.random() * 900000);
      const order = {
        number: orderNumber,
        total,
        itemCount: items.reduce((n, i) => n + i.qty, 0),
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
      };
      try {
        window.sessionStorage.setItem("last-order", JSON.stringify(order));
      } catch {}
      clearCart();
      router.push("/order-success");
    }, 1200);
  };

  const field = (name, label, props = {}) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        value={form[name]}
        onChange={set(name)}
        className={errors[name] ? "input-error" : ""}
        {...props}
      />
      {errors[name] && <div className="field-error">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="container section">
      <h1 className="section-title" style={{ textAlign: "left", marginBottom: "2rem" }}>
        Checkout
      </h1>

      <div className="demo-note">
        ⚠️ Demo checkout — no real payment is processed. Use any dummy card details (e.g.
        4111 1111 1111 1111).
      </div>

      <form onSubmit={placeOrder} noValidate>
        <div className="checkout-grid">
          <div className="checkout-form-card">
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-row">
                {field("email", "Email", { type: "email", placeholder: "you@example.com" })}
                {field("phone", "Phone", { placeholder: "+1 555 123 4567" })}
              </div>
            </div>

            <div className="form-section">
              <h3>Shipping Address</h3>
              <div className="form-row">
                {field("firstName", "First Name", { placeholder: "John" })}
                {field("lastName", "Last Name", { placeholder: "Doe" })}
              </div>
              {field("address", "Street Address", { placeholder: "123 Main Street, Apt 4" })}
              <div className="form-row">
                {field("city", "City", { placeholder: "New York" })}
                {field("zip", "ZIP / Postal Code", { placeholder: "10001" })}
              </div>
              {field("country", "Country", { placeholder: "United States" })}
            </div>

            <div className="form-section">
              <h3>Payment Details</h3>
              {field("cardName", "Name on Card", { placeholder: "John Doe" })}
              {field("cardNumber", "Card Number", {
                placeholder: "4111 1111 1111 1111",
                inputMode: "numeric",
              })}
              <div className="form-row">
                {field("expiry", "Expiry (MM/YY)", { placeholder: "12/28", inputMode: "numeric" })}
                {field("cvc", "CVC", { placeholder: "123", inputMode: "numeric" })}
              </div>
            </div>

            <button type="submit" className="btn btn-success btn-block" disabled={placing}>
              {placing ? "Processing..." : `Pay ${formatPrice(total)}`}
            </button>
            <Link href="/cart" className="btn btn-outline btn-block">
              ← Back to Cart
            </Link>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            {items.map((item) => (
              <div className="summary-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>{item.name}</div>
                  <div className="qty-tag">Qty: {item.qty}</div>
                </div>
                <div className="item-total">{formatPrice(item.price * item.qty)}</div>
              </div>
            ))}
            <div className="summary-row" style={{ marginTop: "1rem" }}>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? "free-shipping" : ""}>
                {shipping === 0 ? "FREE" : formatPrice(shipping)}
              </span>
            </div>
            <div className="summary-row grand">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
