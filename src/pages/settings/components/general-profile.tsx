import React from "react";
import { AiOutlineUpload } from "react-icons/ai";

export interface GeneralProfileData {
  businessName: string;
  timezone: string;
  address: string;
  logoUrl: string;
}

type GeneralProfileProps = {
  data: GeneralProfileData;
  onChange: (data: GeneralProfileData) => void;
};

export const GeneralProfile: React.FC<GeneralProfileProps> = ({
  data,
  onChange,
}) => {
  const handleInputChange = (
    field: keyof GeneralProfileData,
    value: string,
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">General Profile</h2>
      <p className="text-gray-600 text-sm mb-6">
        Public information displayed to your customers.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              BUSINESS NAME
            </label>
            <input
              type="text"
              value={data.businessName}
              onChange={(e) =>
                handleInputChange("businessName", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              TIMEZONE
            </label>
            <select
              value={data.timezone}
              onChange={(e) => handleInputChange("timezone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="America/Chicago">America/Chicago (CST)</option>
              <option value="America/Denver">America/Denver (MST)</option>
              <option value="America/Los_Angeles">
                America/Los_Angeles (PST)
              </option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            ADDRESS
          </label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">
            LOGO URL
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={data.logoUrl}
              onChange={(e) => handleInputChange("logoUrl", e.target.value)}
              placeholder="https://example.com/logo.png"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-50 flex items-center gap-2">
              <AiOutlineUpload size={18} />
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
