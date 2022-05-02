import StripeCheckout from "react-stripe-checkout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100.00002;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_API_PUBLISHABLE_KEY;
  const cart = useSelector((state) => state.cart);
  const [issuer, setIssuer] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/userDetails");
      const data = await res.json();

      setIssuer(data?.userDetails?.data?.users[0].issuer);
      setEmail(data?.userDetails?.data?.users[0].email);
    })();
  }, []);

  const finalPrice = (priceForStripe / 100).toFixed(2);

  let finalCart = [];

  const onToken = async (token) => {
    let d = new Date();
    const currentMonth = d.getMonth();
    const currentDay = d.getDate();
    const currentYear = d.getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    alert("Payment Successful");

    const dateString = `${months[currentMonth]}-${currentDay}-${currentYear}`;

    cart.map(({ quantity, strMeal, strMealThumb } = item) => {
      const string = {
        quantity: quantity,
        strMeal: strMeal,
        strMealThumb: strMealThumb,
      };
      finalCart.push(string);
    });
    const res = await fetch("/api/addOrders", {
      method: "POST",
      headers: {
        body: JSON.stringify({
          cart: JSON.stringify(finalCart),
          paymentId: token.id,
          currentDate: dateString,
          userId: issuer,
          email: email,
          price: finalPrice,
        }),
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="FOOD APP"
      billingAddress
      shippingAddress
      image="https://p.kindpng.com/picc/s/45-451836_transparent-king-crown-clipart-king-crown-clipart-hd.png"
      descriptiong={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
