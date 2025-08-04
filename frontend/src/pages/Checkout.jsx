import React from 'react';

const KhaltiCheckout = ({ amount }) => {
  const config = {
    publicKey: "YOUR_KHALTI_PUBLIC_KEY",
    productIdentity: "1234567890",
    productName: "TeachGear Cart Payment",
    productUrl: "http://localhost:5173/checkout",
    eventHandler: {
      onSuccess(payload) {
        console.log("Payment Success:", payload);
        alert('Payment Successful!');
      },
      onError(error) {
        console.error("Payment Error:", error);
        alert('Payment Failed!');
      },
      onClose() {
        console.log("Payment widget closed");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  const checkout = new window.KhaltiCheckout(config);

  const handlePayment = () => {
    checkout.show({ amount });
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
    >
      Pay with Khalti
    </button>
  );
};

export default KhaltiCheckout;

