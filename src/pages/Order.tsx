import React, { useState } from "react";

function Order() {
  const [formData, setFormData] = useState({
    name: "",
    flatNumber: "",
    contact: "",
    flowerChoice: "daily-bunch",
    deliveryOption: "one-time",
    deliveryTime: "morning",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // 👈 New state for loading

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // 👈 Start loading

    const url =
      "https://script.google.com/macros/s/AKfycbyvcQoi1k9GUPzeglE2DeYvisAENaYQPsgVrNXiyKKLzC5RKmK6taXdcxiaxtmeHv3H/exec";

    const formDataEncoded = new URLSearchParams(
      formData as Record<string, string>
    ).toString();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataEncoded,
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("✅ Your order is placed! We will contact you shortly.");
        setFormData({
          name: "",
          flatNumber: "",
          contact: "",
          flowerChoice: "daily-bunch",
          deliveryOption: "one-time",
          deliveryTime: "morning",
        });
      } else {
        alert("There was an issue placing your order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("Thank you for your order! We'll reach out to confirm shortly.");
    } finally {
      setIsSubmitting(false); // 👈 End loading
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Place Your Order</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8"
      >
        {/* ...other fields... */}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting ? "bg-pink-300 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
          } text-white py-3 px-6 rounded-lg font-semibold 
          transition-all duration-200 ease-in-out active:scale-95`}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
