import React, { useState, useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useUpdatePasswordMutation } from "../../../redux/features/baseApi";

function DashbaordProfile({ user, updateProfile, isUpdating }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    passing_year: "",
    educational_institution: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDeletingPicture, setIsDeletingPicture] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // আলাদা password update mutation
  const [updatePassword, { isLoading: isPasswordUpdating }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.name?.split(" ")[0] || "",
        last_name: user.name?.split(" ").slice(1).join(" ") || "",
        passing_year: user.passing_year || "",
        educational_institution: user.educational_institution?.name || "",
        email: user.email || "",
      });

      const existingPic = user.profile_picture;
      if (existingPic) {
        const fullUrl = existingPic.startsWith("/media")
          ? `https://cowbird-central-crawdad.ngrok-free.app${existingPic}`
          : existingPic;
        setPreviewUrl(fullUrl);
      }
    }
  }, [user]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsDeletingPicture(false);
    }
  };

  const handleDeletePicture = () => {
    setProfilePicture("DELETE");
    setPreviewUrl("");
    setIsDeletingPicture(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const hasPassword =
      passwordData.new_password.trim() && passwordData.confirm_password.trim();

    if (hasPassword && passwordData.new_password !== passwordData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    let profileUpdated = false;
    let passwordUpdated = false;

    const profileFormData = new FormData();

    const fullName = `${formData.first_name} ${formData.last_name}`.trim();
    if (fullName && fullName !== user?.name) {
      profileFormData.append("name", fullName);
    }

    if (
      formData.passing_year &&
      formData.passing_year !== (user?.passing_year?.toString() || "")
    ) {
      profileFormData.append("passing_year", formData.passing_year);
    }

    if (profilePicture === "DELETE") {
      profileFormData.append("profile_picture", "");
    } else if (profilePicture && profilePicture instanceof File) {
      profileFormData.append("profile_picture", profilePicture);
    }

    if ([...profileFormData.entries()].length > 0) {
      try {
        await updateProfile(profileFormData).unwrap();
        profileUpdated = true;
        setProfilePicture(null);
      } catch (err) {
        console.error("Profile update failed:", err);
        alert(
          "Failed to update profile info: " +
            (err?.data?.detail || err?.data?.message || "Try again")
        );
        return;
      }
    }

    if (hasPassword) {
      try {
        await updatePassword({
          new_password: passwordData.new_password,
          confirm_password: passwordData.confirm_password,
        }).unwrap();

        passwordUpdated = true;
        setPasswordData({ new_password: "", confirm_password: "" }); // ক্লিয়ার করো
        alert("Password changed successfully!");
      } catch (err) {
        console.error("Password update failed:", err);
        alert(
          "Failed to change password: " +
            (err?.data?.detail || err?.data?.message || "Try again")
        );
        return;
      }
    }

    if (profileUpdated && !hasPassword) {
      alert("Profile updated successfully!");
    }
  };

  const isAnyUpdating = isUpdating || isPasswordUpdating;

  return (
    <div className="rounded-lg p-4 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[20px] font-semibold text-gray-900">
          Personal Information
        </h1>
        <button
          onClick={handleUpdate}
          disabled={isAnyUpdating}
          className="bg-[#3565FC] hover:bg-blue-600 disabled:opacity-70 text-white px-8 py-3 rounded-full font-medium text-[16px] cursor-pointer transition flex items-center gap-2"
        >
          {isAnyUpdating ? "Updating..." : "Update"}
        </button>
      </div>

      {/* Profile Picture Section */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-3xl text-gray-500 font-bold">
                  {formData.first_name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handlePictureChange}
            className="hidden"
          />

          <label
            htmlFor="profile-picture"
            className="bg-[#3565FC] hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg text-[14px] font-medium cursor-pointer inline-block text-center"
          >
            Change picture
          </label>

          {(previewUrl || user?.profile_picture) && (
            <button
              onClick={handleDeletePicture}
              className="text-red-500 hover:text-red-600 text-[14px] font-medium border border-red-300 px-5 py-2.5 rounded-lg cursor-pointer"
            >
              Delete picture
            </button>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              First name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-gray-700 mb-2">
              Last name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-[14px] font-medium text-gray-700 mb-2">
            Graduation year
          </label>
          <input
            type="number"
            name="passing_year"
            value={formData.passing_year}
            onChange={handleInputChange}
            placeholder="e.g. 2026"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-[14px] font-medium text-gray-700 mb-2">
            Name of education institute
          </label>
          <h1 className="text-[16px] text-[#525252] bg-gray-50 px-3 py-2 rounded-lg">
            {formData.educational_institution || "Not set"}
          </h1>
        </div>

        <div>
          <label className="block text-[14px] font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <h1 className="text-[16px] text-[#525252] bg-gray-50 px-3 py-2 rounded-lg">
              {formData.email}
            </h1>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <IoMdCheckmarkCircleOutline size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Change password (Optional)
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="new_password"
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm new password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  value={passwordData.confirm_password}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashbaordProfile;