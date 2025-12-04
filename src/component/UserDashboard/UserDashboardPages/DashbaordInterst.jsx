import { useState } from "react";

export default function DashboardInterests({ user, updateProfile, isUpdating }) {
  // SAFE fallback
  const safeUser = user || {};

  const [careerInterests, setCareerInterests] = useState(
    safeUser.career_interest?.map((item) => item.name) ?? []
  );

  const [extracurricular, setExtracurricular] = useState(
    safeUser.extracurricular_activities ?? []
  );

  const [careerInput, setCareerInput] = useState("");
  const [extraInput, setExtraInput] = useState("");

  const addCareerInterest = () => {
    if (careerInput.trim() && !careerInterests.includes(careerInput.trim())) {
      setCareerInterests([...careerInterests, careerInput.trim()]);
      setCareerInput("");
    }
  };

  const addExtracurricular = () => {
    if (extraInput.trim() && !extracurricular.includes(extraInput.trim())) {
      setExtracurricular([...extracurricular, extraInput.trim()]);
      setExtraInput("");
    }
  };

  const removeCareer = (item) => {
    setCareerInterests(careerInterests.filter((i) => i !== item));
  };

  const removeExtra = (item) => {
    setExtracurricular(extracurricular.filter((i) => i !== item));
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        career_interest: careerInterests,
        extracurricular_activities: extracurricular,
      }).unwrap();
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update!");
    }
  };
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold text-gray-800">Edit Interests</h2>

      {/* Career Interests */}
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Career Interests
        </label>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={careerInput}
            onChange={(e) => setCareerInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCareerInterest())}
            placeholder="Type and press Enter or click Add"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addCareerInterest}
            className="px-6 py-2 bg-[#615FFF] text-white rounded-lg hover:bg-[#4e4cc7] transition"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {careerInterests.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full"
            >
              {item}
              <button
                onClick={() => removeCareer(item)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Extracurricular Activities */}
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Extracurricular Activities
        </label>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={extraInput}
            onChange={(e) => setExtraInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addExtracurricular())}
            placeholder="Type and press Enter or click Add"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addExtracurricular}
            className="px-6 py-2 bg-[#615FFF] text-white rounded-lg hover:bg-[#4e4cc7] transition"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {extracurricular.map((item) => (
            <span
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full"
            >
              {item}
              <button
                onClick={() => removeExtra(item)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-6">
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className={`px-8 py-3 py-3 text-white rounded-lg font-medium transition ${
            isUpdating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#615FFF] hover:bg-[#4e4cc7]"
          }`}
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}