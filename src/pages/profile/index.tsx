import React from "react";
import {
  FiCheckCircle,
  FiMail,
  FiShield,
  FiUser,
  FiXCircle,
} from "react-icons/fi";
import { PageLayout } from "../../components/layouts/page-layout";
import { useCurrentUser } from "../../hooks/use-auth";

const formatDate = (date?: string) => {
  if (!date) return "Not available";

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

const Profile: React.FC = () => {
  const currentUserQuery = useCurrentUser();
  const user = currentUserQuery.data;
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "User";

  return (
    <PageLayout
      title="Profile"
      subtitle="View your Q-SMART account details."
      contentClassName="max-w-4xl"
    >
      {currentUserQuery.isLoading && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-sm text-gray-500">
          Loading profile...
        </div>
      )}

      {currentUserQuery.isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-sm text-red-700">
          Unable to load your profile.
        </div>
      )}

      {user && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 rounded-full bg-blue-900 text-white flex items-center justify-center text-2xl font-bold">
                {fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{fullName}</h2>
                <p className="text-sm text-gray-600">@{user.username || "-"}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center gap-3 text-gray-600 mb-2">
                <FiMail />
                <p className="text-sm font-semibold">Email</p>
              </div>
              <p className="text-gray-900 font-medium">{user.email || "-"}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center gap-3 text-gray-600 mb-2">
                <FiShield />
                <p className="text-sm font-semibold">Role</p>
              </div>
              <p className="text-gray-900 font-medium">{user.role || "-"}</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center gap-3 text-gray-600 mb-2">
                <FiUser />
                <p className="text-sm font-semibold">Account Created</p>
              </div>
              <p className="text-gray-900 font-medium">
                {formatDate(user.createdAt)}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center gap-3 text-gray-600 mb-2">
                {user.approved === false ? <FiXCircle /> : <FiCheckCircle />}
                <p className="text-sm font-semibold">Approval Status</p>
              </div>
              <p className="text-gray-900 font-medium">
                {user.approved === false ? "Pending approval" : "Approved"}
              </p>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Profile;
