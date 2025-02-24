import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SuccessScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-purple-600 text-white px-6 rounded-3xl">
      {/* Success Icon */}
      <FiCheckCircle className="text-6xl text-green-400 animate-bounce mb-6" />

      {/* Success Message */}
      <h1 className="text-4xl font-extrabold tracking-wide mb-2">Payment Successful!</h1>
      <p className="text-lg text-gray-200 text-center max-w-md">
        Thank you for your purchase. Your order has been confirmed, and a receipt has been sent to your email.
      </p>

      {/* Go Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
      >
        Back to Home
      </button>
    </div>
  );
};

export default SuccessScreen;
