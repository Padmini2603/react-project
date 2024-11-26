import { animated, useSpring } from "@react-spring/web";
import Header from "./Header";

const Cart = () => {
  // React Spring Animation
  const fadeInAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 170, friction: 20 }, // Smooth animation
  });

  const itemAnimation = useSpring({
    from: { scale: 0.9 },
    to: { scale: 1 },
    config: { tension: 200, friction: 15 },
  });

  return (
    <div>
      <Header />
      <animated.div style={{ ...fadeInAnimation, padding: "20px", textAlign: "center" }}>
        <h1>Your Cart</h1>
        <p>Review the items in your cart before proceeding to checkout.</p>
        <animated.div
          style={{
            ...itemAnimation,
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {/* Cart Items */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              width: "200px",
              textAlign: "left",
            }}
          >
            <h2>Item 1</h2>
            <p>Quantity: 1</p>
            <p>Price: $20</p>
          </div>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              width: "200px",
              textAlign: "left",
            }}
          >
            <h2>Item 2</h2>
            <p>Quantity: 2</p>
            <p>Price: $40</p>
          </div>
        </animated.div>
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Proceed to Checkout
        </button>
      </animated.div>
    </div>
  );
};

export default Cart;

