import React from "react";
import { useState } from "react";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useAgencyInfo } from "../../../../context/agency";
import { useUserInfo } from "../../../../context/user";
import { useAppServices } from "../../../../hook/services";

const SubscriptionModelPopup = ({ product, yearlyPrice,selectedbusiness,setOpenUpgradeModel }) => {
  const [agency] = useAgencyInfo();
  const [user, Update] = useUserInfo();
  const stripePromise = loadStripe(agency?.stripe?.publish_key);
  const AppService = useAppServices();
  const navigate = useNavigate();
  const { agency_id } = useParams();
  let middleware = `/`;
  if (agency_id) {
    middleware = `/app/${agency_id}/`;
  }
  function AddPaymentMethod({ isOpen, onClose,selectedbusiness,product,setOpenUpgradeModel }) {
    const stripe = useStripe();
    const [loading, setLoading] = useState(false);

    const handleSubscription = async (e) => {
      setLoading(true);
      const payload = {
        agency_id: agency._id,
        price_id: yearlyPrice ? product?.yearly_id : product.monthly_id,
        card_id: user?.card_id,
        account_id: user?.id,
        yearlyPrice: yearlyPrice,
        business_id:selectedbusiness?.business?._id,
        plan_id:product._id,
        plan_type:"premium"
      };
      console.log(payload, "payload");
      const { response } = await AppService.subscriptions.account({ payload });
      console.log(response);
      if (response) {
        if (response.status == "completed") {
          Update(response.data);
          setOpenUpgradeModel(false)
          Swal.fire({
            title: "Account Upgraded",
            text: `You have been upgraded`,
            showConfirmButton: true,
            confirmButtonText: "Got It",
          });
        } else {
          stripe
            .confirmCardPayment(response.data.client_secret, {
              payment_method: response.data.paymentMethod_id, // your payment method id
            })
            .then(async function (result) {
              console.log(result, "resultresult");
              if (result?.paymentIntent?.status == "succeeded") {
                const payload = {
                  price_id: yearlyPrice
                    ? product?.yearly_id
                    : product.monthly_id,
                  card_id: user?.card_id,
                  account_id: user?.id,
                  yearlyPrice: yearlyPrice,
                  subscription_data: response.subscription_data,
                  confirm_subscription: true,
                  business_id:selectedbusiness?.business?._id,
                  plan_id:product._id,
                  plan_type:"premium"
                };
                console.log(payload, "payload");
                const update_result = await AppService.subscriptions.account({
                  payload,
                });
                if (update_result.response) {
                  Update(update_result.response.data);
                  setOpenUpgradeModel(false);
                }
              } else {
                setOpenUpgradeModel(false);
              }
            });
        }
        setLoading(false);
      } else {
        setLoading(false);
        setOpenUpgradeModel(false);
      }
    };
    return (
       <>
          <div className="space-y-6">
          {/* Product Summary */}
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Plan Summary: {product?.plan?.planName || "N/A"}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {product?.plan?.description}
            </p>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Monthly:</strong>{" "}
                {product.currency_symbol ? product.currency_symbol : "$"}
                {(product.monthly_amount / 100).toFixed(2)}
              </p>
              <p>
                <strong>Yearly:</strong>{" "}
                {product.currency_symbol ? product.currency_symbol : "$"}
                {(product.yearly_amount / 100).toFixed(2)}
              </p>
            </div>
            {product?.features?.length > 0 && (
              <div className="mt-3">
                <h4 className="font-medium text-sm text-gray-700 mb-1">
                  Included Features:
                </h4>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                  {product.features
                    .filter((f) => f.value)
                    .map((f, idx) => (
                      <li key={idx}>{f.name}</li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          {/* Card Form */}
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={handleSubscription}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            disabled={loading}
          >
            {loading && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Confirm
          </button>
        </div>
       </>
    );
  }

  return (
    <>
      <div className="w-full flex justify-center">
      </div>
        <Elements stripe={stripePromise}>
          <AddPaymentMethod selectedbusiness={selectedbusiness} product={product} setOpenUpgradeModel={setOpenUpgradeModel}/>
        </Elements>
    </>
  );
};

export default SubscriptionModelPopup;
