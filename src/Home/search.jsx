import { useState } from "react";
import "../Styling/home.css";

const Search = () => {
  const [formData, setFormData] = useState({
    drugName: "",
    age: "",
    existingConditions: "",
    otherMedications: "",
    allergies: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add API call here to send data to FastAPI
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg" id="form">
      <h2 className="text-xl font-semibold mb-4"><b>Check Drug Interactions</b></h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Drug Name */}
        <label className="block">
          What is the name of the drug you are taking or want to check?
          <input
            type="text"
            name="drugName"
            value={formData.drugName}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter drug name..."
            required
          />
        </label>
        <br></br>
        {/* Age */}
        <label className="block">
          What is your age?
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter your age..."
            required
          />
        </label>
        <br></br>
        {/* Existing Medical Conditions */}
        <label className="block">
          Do you have any existing medical conditions? (e.g., Diabetes, Hypertension)
          <input
            type="text"
            name="existingConditions"
            value={formData.existingConditions}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="List your conditions..."
          />
        </label>
        <br></br>
        {/* Other Medications */}
        <label className="block">
          Are you currently taking any other medications?
          <input
            type="text"
            name="otherMedications"
            value={formData.otherMedications}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter other medications..."
          />
        </label>
        <br></br>
        {/* Allergies */}
        <label className="block">
          Do you have any known allergies to medications?
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Enter allergies (if any)..."
          />
        </label>
        <br></br>
        <br></br>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-2 rounded hover:bg-blue-700 transition duration-200" id="button"
        >
          Check Interactions
        </button>
      </form>
    </div>
  );
};

export default Search;
