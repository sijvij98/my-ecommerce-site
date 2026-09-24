"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { inr, FREE_SHIPPING_THRESHOLD } from "../../data/products";

const PAY_METHODS = [
  { id: "card", label: "Card", icon: "💳" },
  { id: "upi", label: "UPI", icon: "📱" },
  { id: "cod", label: "COD", icon: "💵" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [pay, setPay] = useState("card");
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    card: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 199;
  const total = subtotal + shipping;

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: null }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 3) er.name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      er.email = "Enter a valid email";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
      er.phone = "Enter a valid 10-digit mobile number";
    if (form.address.trim().length < 8) er.address = "Enter your full address";
    if (!form.city.trim()) er.city = "Required";
    if (!form.state.trim()) er.state = "Required";
    if (!/^\d{6}$/.test(form.pincode)) er.pincode = "6-digit pincode";
    if (pay === "card") {
      if (!/^\d{12,19}$/.test(form.card.replace(/\s/g, "")))
        er.card = "Enter a valid card number";
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) er.expiry = "MM/YY";
      if (!/^\d{3,4}$/.test(form.cvv)) er.cvv = "3–4 digits";
    }
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      const orderNo =
        "UQ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      clear();
      router.push(`/order-success?order=${orderNo}`);
    }, 1400);
  };

  const field = (key, label, props = {}, full = false) => (
    <div className={`field ${full ? "full" : ""}`} key={key}>
      <label htmlFor={key}>{label}</label>
      <input
        id={key}
        value={form[key]}
        onChange={set(key)}
        className={errors[key] ? "invalid" : ""}
        {...props}
      />
      {errors[key] && <span className="err">{errors[key]}</span>}
    </div>
  );

  if (items.length === 0 && !placing) {
    return (
      <div className="container">
        <div className="empty-state" style={{ padding: "110px 20px" }}>
          <h3>Your bag is empty</h3>
          <p>Add something beautiful before checking out.</p>
          <Link href="/products" className="btn btn-gold" style={{ marginTop: 24 }}>
            Shop the Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="checkout-grid">
        <form onSubmit={placeOrder} noValidate>
          <div className="co-card">
            <h3>Contact</h3>
            <p>We&apos;ll send your order updates here.</p>
            <div className="field-grid">
              {field("name", "Full name", { placeholder: "Aarav Kapoor", autoComplete: "name" })}
              {field("email", "Email", {
                placeholder: "you@example.com",
                type: "email",
                autoComplete: "email",
              })}
              {field("phone", "Mobile", {
                placeholder: "98765 43210",
                inputMode: "numeric",
                autoComplete: "tel",
              })}
            </div>
          </div>

          <div className="co-card">
            <h3>Shipping Address</h3>
            <p>Dispatched within 24 hours, delivered in 3–5 days.</p>
            <div className="field-grid">
              {field("address", "Address", {
                placeholder: "Flat, street, landmark",
                autoComplete: "street-address",
              }, true)}
              {field("city", "City", { placeholder: "Mumbai" })}
              {field("state", "State", { placeholder: "Maharashtra" })}
              {field("pincode", "Pincode", {
                placeholder: "400001",
                inputMode: "numeric",
              })}
            </div>
          </div>

          <div className="co-card">
            <h3>Payment</h3>
            <p>This is a demo checkout — no real charge is made.</p>
            <div className="pay-methods">
              {PAY_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`pay-opt ${pay === m.id ? "active" : ""}`}
                  onClick={() => setPay(m.id)}
                >
                  <strong>{m.icon}</strong>
                  {m.label}
                </button>
              ))}
            </div>
            {pay === "card" && (
              <div className="field-grid">
                {field("card", "Card number", {
                  placeholder: "1234 5678 9012 3456",
                  inputMode: "numeric",
                }, true)}
                {field("expiry", "Expiry", { placeholder: "MM/YY" })}
                {field("cvv", "CVV", {
                  placeholder: "123",
                  inputMode: "numeric",
                  type: "password",
                })}
              </div>
            )}
            {pay === "upi" && (
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                A collect request will be sent to your UPI app after you place
                the order.
              </p>
            )}
            {pay === "cod" && (
              <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                Pay in cash or UPI when your order arrives. Please keep the
                exact amount ready.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-gold btn-block"
            disabled={placing}
            style={{ padding: "18px", fontSize: "0.9rem" }}
          >
            {placing ? "Placing your order…" : `Place Order — ${inr(total)}`}
          </button>
          <p className="cart-note">
            By placing this order you agree to our terms. Secure 256-bit
            encrypted checkout.
          </p>
        </form>

        <aside className="summary-card">
          <h3>Order Summary</h3>
          {items.map((i) => (
            <div className="co-summary-line" key={`${i.id}__${i.size}`}>
              <img src={i.product.image} alt={i.product.name} />
              <div className="grow">
                <h5>{i.product.name}</h5>
                <small>
                  Size {i.size} · Qty {i.qty}
                </small>
              </div>
              <span>{inr(i.product.price * i.qty)}</span>
            </div>
          ))}
          <div style={{ marginTop: 18 }}>
            <div className="sum-row">
              <span>Subtotal</span>
              <span>{inr(subtotal)}</span>
            </div>
            <div className="sum-row">
              <span>Shipping</span>
              <span className={shipping === 0 ? "free-ship" : ""}>
                {shipping === 0 ? "Complimentary" : inr(shipping)}
              </span>
            </div>
            <div className="sum-row grand">
              <span>Total</span>
              <strong>{inr(total)}</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
