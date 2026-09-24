"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setDone(true);
  };

  return (
    <div className="newsletter">
      <span className="eyebrow" style={{ justifyContent: "center" }}>
        The Inner Circle
      </span>
      <h2>
        Get <em>10% off</em> your first order
      </h2>
      <p>
        Early access to new drops, private sales and styling notes — straight
        to your inbox. No spam, only substance.
      </p>
      {done ? (
        <p className="nl-ok">
          ✦ Welcome to the inner circle — check your inbox for your code.
        </p>
      ) : (
        <form className="nl-form" onSubmit={submit}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-gold">
            Join
          </button>
        </form>
      )}
    </div>
  );
}
