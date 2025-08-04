import React, { useState, useEffect } from 'react';

const KhaltiCheckout = () => {
  const [checkout, setCheckout] = useState(null);

  useEffect(() => {
    if (window.KhaltiCheckout) {
      const config = {
        publicKey: "YOUR_KHALTI_PUBLIC_KEY", 
        productIdentity: "1234567890",
        productName: "TeachGear Product",
        productUrl: "http://localhost:5173/products", 
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
      setCheckout(new window.KhaltiCheckout(config));
    }
  }, []);

  const handlePayment = () => {
    if (checkout) {
      checkout.show({ amount: 1000 }); // amount in paisa (e.g. 1000 paisa = 10 NPR)
    } else {
      alert("Khalti SDK is not loaded yet. Please try again.");
    }
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

