import axios from "axios";
import React from "react";
import { useState } from "react";
import { useAgencyInfo } from "../../../../context/agency";
import { useAppServices } from "../../../../hook/services";
const BussinessLinks = ({ data, handleRefresh, features }) => {
    const [agency] = useAgencyInfo();
  
  const theme_content = agency?.theme_id?.theme_data;
  const AppService = useAppServices();
  const [loading, setLoading] = useState(false);
  const linksdisabled = features.find(
    (feature) => feature.name == "Extra Links" && feature.value == true
  )
    ? true
    : false;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      _id: data.id,
      privacy: e.target.privacy.value,
      terms_condition: e.target.terms_condition.value,
      community: e.target.community.value,
      help_center: e.target.help_center.value,
      video_tutorial: e.target.video_tutorial.value,
    };
    const { response } = await AppService.accounts.update({ payload });
    if (response) {
      handleRefresh();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              for="privacy"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Privacy
            </label>
            <input
              type="text"
              id="privacy"
              name="privacy"
              disabled={linksdisabled}
              defaultValue={data?.privacy || ""}
              placeholder="Enter your privacy link"
              className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              for="community"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Community
            </label>
            <input
              type="text"
              disabled={linksdisabled}
              id="community"
              name="community"
              defaultValue={data?.community || ""}
              placeholder="Enter your community link"
              className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              for="terms_condition"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Terms and Conditions
            </label>
            <input
              type="text"
              disabled={linksdisabled}
              id="terms_condition"
              name="terms_condition"
              defaultValue={data?.terms_condition || ""}
              placeholder="Enter Terms and Conditions link"
              className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="help_center"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Help Center
            </label>
            <input
              type="text"
              disabled={linksdisabled}
              id="help_center"
              name="help_center"
              defaultValue={data?.help_center || ""}
              placeholder="Enter your Help Center link"
              className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              for="video_tutorial"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Video Tutorial
            </label>
            <input
              type="text"
              disabled={linksdisabled}
              id="video_tutorial"
              name="video_tutorial"
              defaultValue={data?.video_tutorial || ""}
              placeholder="Your Video Tutorial Link"
              className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
           style={{
            background: theme_content?.general?.button_bg || "#EF4444",
            color: theme_content?.general?.button_text || "#fff",
          }}
            type="submit"
            className="focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  inline-flex items-center"
            disabled={loading || linksdisabled}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default BussinessLinks;
