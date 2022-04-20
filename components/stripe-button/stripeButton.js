import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100.00002;
  const publishableKey = process.env.STRIPE_API_PUBLISHABLE_KEY;

  const onToken = (token) => {
    // let d = new Date();
    // let currentMonth = d.getMonth();
    // let currentDay = d.getDate();
    // let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    console.log(token);
    alert("Payment Successful");
    // Axios.post('http://localhost:3001/updateProfitStats', {priceOrder: (priceForStripe/100).toFixed(2), currentMonth: months[currentMonth], currentDay: currentDay})
    // .then(response => console.log(response))
    // .catch(err => console.log(err));
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
