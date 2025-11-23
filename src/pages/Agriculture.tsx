import React, { useState } from "react";
import { Cloud, Leaf, Sun, Droplets, Wind, MapPin, AlertTriangle, Sprout, TrendingUp, Home, DollarSign, Plus, Edit, Save, X, CheckCircle, Clock, Bug, Beaker, Target, TrendingDown, Package, Bell, Shield, Zap } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function AgricultureWeather() {
  // Inside AgricultureWeather
const onBack = () => {
  if (window.history.length > 1) {
    window.history.back(); // go to previous page
  } else {
    window.location.href = "/"; // fallback if no history
  }
};
   
  const [activeTab, setActiveTab] = useState("dashboard");
  const [farmName, setFarmName] = useState("Green Valley Farm");
  const [isEditingFarm, setIsEditingFarm] = useState(false);
  const [tempFarmName, setTempFarmName] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
const [newTaskName, setNewTaskName] = useState("");
const [newTaskDue, setNewTaskDue] = useState("");
const [newTaskPriority, setNewTaskPriority] = useState("low");

const [crops, setCrops] = useState([
    { id: 1, name: "Tomato", area: "2 acres", planted: "2024-10-15", stage: "Flowering", health: 85, daysToHarvest: 25, expectedYield: "4000 kg", waterNeeded: "High", fertilizer: "NPK 19-19-19", lastPesticide: "2024-11-01" },
    { id: 2, name: "Wheat", area: "5 acres", planted: "2024-09-20", stage: "Vegetative", health: 92, daysToHarvest: 45, expectedYield: "8000 kg", waterNeeded: "Medium", fertilizer: "Urea + DAP", lastPesticide: "2024-10-28" }
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, task: "Water tomato field", due: "Today", status: "pending", priority: "high" },
    { id: 2, task: "Apply pesticide to wheat", due: "Tomorrow", status: "pending", priority: "medium" },
    { id: 3, task: "Fertilizer application", due: "In 3 days", status: "pending", priority: "low" }
  ]);

  const finances = {
    totalExpenses: 45000,
    totalRevenue: 78000,
    profit: 33000,
    cropWiseProfit: [
      { name: "Tomato", profit: 15000 },
      { name: "Wheat", profit: 18000 }
    ]
  };

  const soilAnalysis = {
    pH: 6.8,
    nitrogen: "Medium",
    phosphorus: "Low",
    potassium: "High",
    calcium: "Medium",
    magnesium: "High",
    organicMatter: "Good",
    recommendation: "Add phosphorus-rich fertilizer. pH level is optimal."
  };

  const [weather] = useState({
    today: { temp: 29, condition: "Partly Cloudy", wind: 12, humidity: 56, uv: 7, rain: 20 },
    forecast: [
      { day: "Mon", temp: 28, icon: Sun },
      { day: "Tue", temp: 30, icon: Cloud },
      { day: "Wed", temp: 27, icon: Sun },
      { day: "Thu", temp: 26, icon: Cloud },
      { day: "Fri", temp: 29, icon: Sun },
      { day: "Sat", temp: 31, icon: Sun },
      { day: "Sun", temp: 30, icon: Cloud }
    ]
  });

  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === "pending" ? "completed" : "pending" } : t));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 p-6">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
            <Home className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SmartFarm Pro</h1>
            <p className="text-gray-500 text-sm">Complete Farm Management</p>
          </div>
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-semibold px-3 py-2 border border-gray-300 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </header>


      <div className="bg-white rounded-2xl shadow-lg p-2 mb-6 flex flex-wrap gap-2">
        {[
          { id: "dashboard", icon: Home, label: "Dashboard" },
          { id: "crops", icon: Sprout, label: "Crops" },
          { id: "soil", icon: Beaker, label: "Soil" },
          { id: "pest", icon: Bug, label: "Pest Control" },
          { id: "weather", icon: Cloud, label: "Weather" },
          { id: "finances", icon: DollarSign, label: "Finances" }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition ${activeTab === tab.id ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
            <tab.icon className="w-5 h-5" /><span>{tab.label}</span>
          </button>
        ))}
      </div>

       {/* DASHBOARD */}
{activeTab === "dashboard" && (
  <div>
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center">
          <Home className="w-10 h-10 text-white" />
        </div>
        <div>
          {isEditingFarm ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={tempFarmName}
                onChange={(e) => setTempFarmName(e.target.value)}
                className="border border-green-300 rounded-lg px-3 py-1 text-xl font-bold"
              />
              <button
                onClick={() => {
                  if (tempFarmName.trim()) setFarmName(tempFarmName);
                  setIsEditingFarm(false);
                }}
                className="text-green-600"
              >
                <Save className="w-5 h-5" />
              </button>
              <button onClick={() => setIsEditingFarm(false)} className="text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">{farmName}</h1>
              <button
                onClick={() => {
                  setTempFarmName(farmName);
                  setIsEditingFarm(true);
                }}
                className="text-gray-500"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>
          )}
          <p className="text-gray-500 flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Bhubaneswar, Odisha</span>
          </p>
          <p className="text-sm text-green-600 font-semibold">
            7 acres • {crops.length} Crops
          </p>
        </div>
      </div>


      {/* ADD TASK BUTTON */}
      <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Record Harvest</span>
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5" />
          <span>Weather Alert</span>
        </button>
      </div>
    </div>

    {/* ADD TASK FORM */}
    {showAddTask && (
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Add New Task</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Task Name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 flex-1"
          />
          <input
            type="text"
            placeholder="Due (Today/Tomorrow/In 3 days)"
            value={newTaskDue}
            onChange={(e) => setNewTaskDue(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 flex-1"
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={() => {
              if (!newTaskName.trim()) return;
              setTasks([
                ...tasks,
                {
                  id: Date.now(),
                  task: newTaskName,
                  due: newTaskDue || "Today",
                  status: "pending",
                  priority: newTaskPriority,
                },
              ]);
              setNewTaskName("");
              setNewTaskDue("");
              setNewTaskPriority("low");
              setShowAddTask(false);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    )}

          {/* Dashboard Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
              <Sprout className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-2xl font-bold">{crops.length}</p>
              <p className="text-sm opacity-90">Active Crops</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <Droplets className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-2xl font-bold">{Math.round(crops.reduce((a, c) => a + c.health, 0)/crops.length)}%</p>
              <p className="text-sm opacity-90">Average Health</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 text-white">
              <TrendingUp className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-2xl font-bold">₹{finances.profit.toLocaleString()}</p>
              <p className="text-sm opacity-90">Profit</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
              <Clock className="w-8 h-8 mb-2 opacity-80" />
              <p className="text-2xl font-bold">{tasks.filter(t => t.status === "pending").length}</p>
              <p className="text-sm opacity-90">Pending Tasks</p>
            </div>
          </div>

          {/* Health Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2"><TrendingUp className="w-6 h-6 text-green-500" /><span>Crop Health Trend</span></h2>
            <Line data={{
              labels: crops.map(c => c.name),
              datasets: [{ label: "Health %", data: crops.map(c => c.health), borderColor: "#34D399", backgroundColor: "rgba(52,211,153,0.2)", tension: 0.3 }]
            }} />
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2"><Bell className="w-6 h-6 text-yellow-500" /><span>Recent Alerts</span></h2>
            <ul className="space-y-2">
              <li className="flex justify-between p-3 bg-yellow-50 rounded-lg">
                <span>Low water alert for Tomato</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </li>
              <li className="flex justify-between p-3 bg-red-50 rounded-lg">
                <span>Pest detected in Wheat field</span>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </li>
            </ul>
          </div>
        </div>
      )}

   
{activeTab === "crops" && (
  <div>
    {/* Top controls */}
    <div className="flex flex-col md:flex-row justify-between mb-6 items-start md:items-center gap-4">
      <h2 className="text-2xl font-bold">My Crops</h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            const name = prompt("Enter crop name");
            if (!name) return;
            const newCrop = {
              id: Date.now(),
              name,
              area: "1 acre",
              planted: new Date().toISOString().split("T")[0],
              stage: "Seedling",
              health: 100,
              daysToHarvest: 30,
              expectedYield: "500 kg",
              waterNeeded: "Medium",
              fertilizer: "NPK 19-19-19",
            };
            setCrops([...crops, newCrop]);
          }}
          className="bg-green-600 text-white rounded-lg px-4 py-2 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" /><span>Add Crop</span>
        </button>
      </div>
    </div>

    {/* Crop Grid - 2 columns */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {[
        { id: 1, name: "Tomato", area: "2 acres", planted: "2024-10-15", stage: "Flowering", health: 85, daysToHarvest: 25, expectedYield: "4000 kg", waterNeeded: "High", fertilizer: "NPK 19-19-19" },
        { id: 2, name: "Wheat", area: "5 acres", planted: "2024-09-20", stage: "Vegetative", health: 92, daysToHarvest: 45, expectedYield: "8000 kg", waterNeeded: "Medium", fertilizer: "Urea + DAP" },
        { id: 3, name: "Potato", area: "3 acres", planted: "2024-09-25", stage: "Vegetative", health: 78, daysToHarvest: 35, expectedYield: "5000 kg", waterNeeded: "Medium", fertilizer: "Potash 20-20-20" },
        { id: 4, name: "Carrot", area: "1 acre", planted: "2024-10-05", stage: "Seedling", health: 95, daysToHarvest: 40, expectedYield: "1500 kg", waterNeeded: "High", fertilizer: "Organic Compost" },
        { id: 5, name: "Maize", area: "4 acres", planted: "2024-09-10", stage: "Mature", health: 88, daysToHarvest: 20, expectedYield: "7000 kg", waterNeeded: "Medium", fertilizer: "NPK 15-15-15" },
        { id: 6, name: "Spinach", area: "1.5 acres", planted: "2024-10-12", stage: "Harvest", health: 97, daysToHarvest: 10, expectedYield: "1200 kg", waterNeeded: "High", fertilizer: "Urea" }
      ].map(crop => (
        <div key={crop.id} className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between mb-4 items-start md:items-center">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{crop.name}</h3>
                <p className="text-gray-500">{crop.area} • {crop.planted}</p>
                <p className="text-sm mt-1">
                  Stage: <span className="font-semibold">{crop.stage}</span>
                </p>
                <div className="flex gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-lg text-xs ${crop.waterNeeded === "High" ? "bg-blue-100 text-blue-700" : crop.waterNeeded === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>Water: {crop.waterNeeded}</span>
                  <span className="px-2 py-1 rounded-lg text-xs bg-purple-100 text-purple-700">Fertilizer: {crop.fertilizer}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const newName = prompt("Edit crop name", crop.name);
                  if (!newName) return;
                  setCrops(crops.map(c => c.id === crop.id ? { ...c, name: newName } : c));
                }}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => setCrops(crops.filter(c => c.id !== crop.id))}
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Health & Harvest Progress */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Health</span>
              <span className="font-bold text-green-600">{crop.health}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div className="bg-green-600 h-3 rounded-full" style={{ width: `${crop.health}%` }}></div>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold">Days to Harvest</span>
              <span className="font-bold">{crop.daysToHarvest}d</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-yellow-500 h-3 rounded-full" style={{ width: `${Math.min(100, 100 - crop.daysToHarvest)}%` }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


{activeTab === "soil" && (
  <div>
    <h2 className="text-2xl font-bold mb-6">Soil Health</h2>

    {/* Soil Analysis Grid */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
        <Beaker className="w-6 h-6 text-blue-600" /><span>Analysis</span>
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-600">pH</p>
          <p className="text-3xl font-bold text-blue-600">{soilAnalysis.pH}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-600">Nitrogen</p>
          <p className="text-2xl font-bold text-green-600">{soilAnalysis.nitrogen}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-600">Phosphorus</p>
          <p className="text-2xl font-bold text-yellow-600">{soilAnalysis.phosphorus}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-600">Potassium</p>
          <p className="text-2xl font-bold text-purple-600">{soilAnalysis.potassium || "High"}</p>
        </div>
        <div className="bg-teal-50 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-600">Organic Matter</p>
          <p className="text-2xl font-bold text-teal-600">{soilAnalysis.organicMatter}</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-xl text-center">
          <p className="text-sm text-gray-600">Moisture</p>
          <p className="text-2xl font-bold text-indigo-600">{soilAnalysis.moisture || "Optimal"}</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
        <p className="font-semibold text-green-900 mb-2">Recommendation</p>
        <p className="text-gray-700">{soilAnalysis.recommendation}</p>
        <p className="mt-2 text-sm text-gray-600">Irrigation Suggestion: {soilAnalysis.moisture && soilAnalysis.moisture === "Low" ? "Water the crops today" : "No immediate action needed"}</p>
      </div>

      {/* Soil Health Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
        <h3 className="text-xl font-bold mb-4">Nutrient Levels Chart</h3>
        <Line data={{
          labels: ["Nitrogen", "Phosphorus", "Potassium", "Organic Matter"],
          datasets: [{
            label: "Soil Nutrient Levels",
            data: [
              soilAnalysis.nitrogen === "Low" ? 30 : soilAnalysis.nitrogen === "Medium" ? 60 : 90,
              soilAnalysis.phosphorus === "Low" ? 30 : soilAnalysis.phosphorus === "Medium" ? 60 : 90,
              soilAnalysis.potassium === "Low" ? 30 : soilAnalysis.potassium === "Medium" ? 60 : 90,
              soilAnalysis.organicMatter === "Poor" ? 30 : soilAnalysis.organicMatter === "Good" ? 70 : 90
            ],
            backgroundColor: ["#34D399", "#FACC15", "#8B5CF6", "#14B8A6"]
          }]
        }} />
      </div>

      {/* Recent Soil Tests Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Recent Soil Tests</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Field</th>
              <th className="p-2 border">pH</th>
              <th className="p-2 border">Nitrogen</th>
              <th className="p-2 border">Phosphorus</th>
              <th className="p-2 border">Potassium</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "2024-10-01", field: "Tomato Field", pH: 6.8, N: "Medium", P: "Low", K: "High" },
              { date: "2024-09-25", field: "Wheat Field", pH: 6.5, N: "High", P: "Medium", K: "Medium" },
              { date: "2024-09-20", field: "Maize Field", pH: 6.9, N: "Low", P: "Medium", K: "High" }
            ].map((test, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-2 border">{test.date}</td>
                <td className="p-2 border">{test.field}</td>
                <td className="p-2 border">{test.pH}</td>
                <td className="p-2 border">{test.N}</td>
                <td className="p-2 border">{test.P}</td>
                <td className="p-2 border">{test.K}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fertilizer Suggestions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Fertilizer Suggestions</h3>
        {[
          { name: "DAP", purpose: "Phosphorus", dosage: "50 kg/acre", price: "₹1,800" },
          { name: "Urea", purpose: "Nitrogen", dosage: "40 kg/acre", price: "₹800" },
          { name: "Potash", purpose: "Potassium", dosage: "30 kg/acre", price: "₹1,200" },
          { name: "Compost", purpose: "Organic Matter", dosage: "100 kg/acre", price: "₹500" }
        ].map((f, i) => (
          <div key={i} className="border rounded-xl p-4 mb-3 flex justify-between">
            <div>
              <h4 className="font-bold">{f.name}</h4>
              <p className="text-sm text-gray-600">{f.purpose} • {f.dosage}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-green-600">{f.price}</p>
              <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm">Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}




{activeTab === "pest" && (
  <div>
    <h2 className="text-2xl font-bold mb-6">Pest Control</h2>

    {/* Pest Threats */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
        <Bug className="w-6 h-6 text-red-600" /><span>Threats</span>
      </h3>
      {[
        { pest: "Aphids", crop: "Tomato", severity: "Low", treatment: "Neem oil", cost: "₹500/acre" },
        { pest: "Whiteflies", crop: "Wheat", severity: "Medium", treatment: "Imidacloprid", cost: "₹800/acre" },
        { pest: "Fungal Blight", crop: "Maize", severity: "High", treatment: "Fungicide Spray", cost: "₹1200/acre" },
        { pest: "Leaf Miner", crop: "Potato", severity: "Medium", treatment: "Insecticide", cost: "₹700/acre" }
      ].map((p, i) => (
        <div key={i} className={`border-l-4 ${p.severity === "High" ? "border-red-500" : p.severity === "Medium" ? "border-yellow-500" : "border-green-500"} bg-red-50 p-4 mb-3 rounded-r-xl`}>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold">{p.pest} <span className="text-xs px-2 py-1 rounded bg-yellow-200">{p.severity}</span></h4>
              <p className="text-sm">Affected Crop: {p.crop}</p>
              <p className="text-sm">Treatment: {p.treatment}</p>
              <p className="text-sm">Cost: {p.cost}</p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">Apply</button>
          </div>
        </div>
      ))}
    </div>

    {/* AI Disease Detection */}
    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
      <h3 className="text-xl font-bold mb-3 flex items-center space-x-2"><Zap className="w-6 h-6" /><span>AI Disease Detection</span></h3>
      <p className="mb-4">Upload crop photos to automatically detect diseases and suggest treatments.</p>
      <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">Upload Photo</button>
    </div>

    {/* Pest Severity Trends Chart */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Pest Severity Trend</h3>
      <Line data={{
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          { label: "Aphids", data: [10, 15, 12, 8], borderColor: "#F87171", tension: 0.3 },
          { label: "Whiteflies", data: [5, 8, 15, 12], borderColor: "#FBBF24", tension: 0.3 },
          { label: "Fungal Blight", data: [0, 5, 10, 20], borderColor: "#9333EA", tension: 0.3 }
        ]
      }} />
    </div>

    {/* Pest Application History */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Pest Control History</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Pest</th>
            <th className="p-2 border">Crop</th>
            <th className="p-2 border">Treatment</th>
            <th className="p-2 border">Effectiveness</th>
          </tr>
        </thead>
        <tbody>
          {[
            { date: "2024-10-01", pest: "Aphids", crop: "Tomato", treatment: "Neem oil", effectiveness: "Good" },
            { date: "2024-09-28", pest: "Whiteflies", crop: "Wheat", treatment: "Imidacloprid", effectiveness: "Moderate" },
            { date: "2024-09-25", pest: "Fungal Blight", crop: "Maize", treatment: "Fungicide Spray", effectiveness: "High" }
          ].map((h, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="p-2 border">{h.date}</td>
              <td className="p-2 border">{h.pest}</td>
              <td className="p-2 border">{h.crop}</td>
              <td className="p-2 border">{h.treatment}</td>
              <td className="p-2 border">{h.effectiveness}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Seasonal Advice */}
    <div className="bg-green-50 rounded-2xl p-6 mb-6">
      <h3 className="text-xl font-bold mb-2">Seasonal Pest Advice</h3>
      <p className="text-gray-700">Monitor your crops for early signs of fungal infections during the rainy season. Apply preventive treatments to high-risk crops like Wheat and Tomato. Maintain crop rotation to reduce pest build-up.</p>
    </div>
  </div>
)}


{activeTab === "weather" && (
  <div>
    <h2 className="text-2xl font-bold mb-6">Weather Forecast</h2>

    {/* Today's Weather */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Today</h3>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="text-6xl font-bold">29°C</p>
          <p className="text-xl text-gray-600 mt-2">Partly Cloudy</p>
          <p className="text-gray-500 mt-1">Feels like 31°C</p>
        </div>
        <Sun className="w-32 h-32 text-yellow-500 mt-4 md:mt-0" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600">Wind</p>
          <p className="font-bold">12 km/h</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="font-bold">56%</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600">UV Index</p>
          <p className="font-bold">7 High</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600">Rain</p>
          <p className="font-bold">20%</p>
        </div>
      </div>

      {/* Sunrise / Sunset */}
      <div className="flex justify-between mt-4 text-gray-600">
        <p>Sunrise: 6:12 AM</p>
        <p>Sunset: 5:48 PM</p>
      </div>
    </div>

    {/* Hourly Forecast */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Hourly Forecast</h3>
      <div className="flex overflow-x-auto space-x-4">
        {["6AM", "9AM", "12PM", "3PM", "6PM", "9PM"].map((hour, i) => (
          <div key={i} className="bg-gray-50 p-3 rounded-xl text-center min-w-[80px]">
            <p className="text-sm text-gray-600">{hour}</p>
            <Sun className="w-6 h-6 text-yellow-500 mx-auto my-1" />
            <p className="font-bold">28°C</p>
          </div>
        ))}
      </div>
    </div>

    {/* 7-Day Forecast */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-7 gap-3">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
          <div key={i} className="bg-gray-50 p-4 rounded-xl text-center">
            <p className="text-sm text-gray-600">{day}</p>
            <Sun className="w-8 h-8 text-yellow-500 mx-auto my-2" />
            <p className="font-bold">28°C</p>
            <p className="text-xs text-gray-500">18°C - 30°C</p>
          </div>
        ))}
      </div>
    </div>

    {/* Weather Trends */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Weekly Weather Trends</h3>
      <Line data={{
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          { label: "Max Temp °C", data: [30, 28, 29, 31, 30, 27, 28], borderColor: "#F59E0B", tension: 0.3 },
          { label: "Min Temp °C", data: [18, 17, 19, 18, 17, 16, 17], borderColor: "#3B82F6", tension: 0.3 },
          { label: "Rainfall %", data: [20, 40, 10, 0, 15, 30, 25], borderColor: "#10B981", tension: 0.3 }
        ]
      }} />
    </div>

    {/* Weather Alerts */}
    <div className="bg-red-50 border-l-4 border-red-500 rounded-2xl p-6 mb-6">
      <h3 className="text-xl font-bold mb-2 flex items-center space-x-2"><AlertTriangle className="w-6 h-6 text-red-600" /><span>Weather Alerts</span></h3>
      <ul className="list-disc list-inside text-gray-700">
        <li>Heavy Rain expected tomorrow, take necessary precautions.</li>
        <li>High UV index expected on Thursday, wear protective gear.</li>
        <li>Strong winds on Saturday, secure outdoor equipment.</li>
      </ul>
    </div>
  </div>
)}

{activeTab === "finances" && (
  <div>
    <h2 className="text-2xl font-bold mb-6">Finances</h2>

    {/* Summary Cards */}
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
        <TrendingDown className="w-10 h-10 mb-2 opacity-80" />
        <p className="text-3xl font-bold">₹{finances.totalExpenses.toLocaleString()}</p>
        <p>Expenses</p>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
        <TrendingUp className="w-10 h-10 mb-2 opacity-80" />
        <p className="text-3xl font-bold">₹{finances.totalRevenue.toLocaleString()}</p>
        <p>Revenue</p>
      </div>
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <DollarSign className="w-10 h-10 mb-2 opacity-80" />
        <p className="text-3xl font-bold">₹{finances.profit.toLocaleString()}</p>
        <p>Profit</p>
      </div>
    </div>

    {/* Monthly Profit/Loss Trend */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Monthly Profit/Loss Trend</h3>
      <Line data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
          { label: "Profit", data: [30000, 35000, 32000, 40000, 38000, 42000, 39000, 45000], borderColor: "#10B981", tension: 0.3 },
          { label: "Expenses", data: [20000, 25000, 22000, 30000, 28000, 32000, 29000, 33000], borderColor: "#EF4444", tension: 0.3 }
        ]
      }} />
    </div>

    {/* Income vs Expense Pie */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 md:w-1/2">
      <h3 className="text-xl font-bold mb-4">Income vs Expense</h3>
      <Line data={{
        labels: ["Revenue", "Expenses"],
        datasets: [{
          label: "Amount",
          data: [finances.totalRevenue, finances.totalExpenses],
          backgroundColor: ["#10B981", "#EF4444"],
          borderColor: ["#10B981", "#EF4444"],
          borderWidth: 1
        }]
      }} />
    </div>

    {/* Top Expense Categories */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Top Expense Categories</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { name: "Fertilizers", amount: "₹12,000" },
          { name: "Pesticides", amount: "₹8,500" },
          { name: "Labor", amount: "₹15,000" }
        ].map((e, i) => (
          <div key={i} className="bg-red-50 p-4 rounded-xl flex flex-col items-center justify-center">
            <p className="text-gray-600 font-semibold">{e.name}</p>
            <p className="text-xl font-bold text-red-600">{e.amount}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Market Prices for Multiple Crops */}
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Market Prices</h3>
      <Line data={{
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          { label: "Tomato", data: [25, 28, 27, 26, 30, 29, 31], borderColor: "#34D399", tension: 0.3 },
          { label: "Potato", data: [20, 22, 21, 23, 25, 24, 26], borderColor: "#3B82F6", tension: 0.3 },
          { label: "Wheat", data: [15, 16, 15, 17, 18, 16, 17], borderColor: "#FBBF24", tension: 0.3 },
          { label: "Corn", data: [18, 17, 19, 18, 20, 21, 19], borderColor: "#EF4444", tension: 0.3 }
        ]
      }} />
    </div>

    {/* Financial Alerts */}
    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-2 flex items-center space-x-2"><AlertTriangle className="w-6 h-6 text-yellow-500" /><span>Financial Alerts</span></h3>
      <ul className="list-disc list-inside text-gray-700">
        <li>Expenses are higher than average this week.</li>
        <li>Profit margin dropped below 40%.</li>
        <li>Consider reducing labor costs or fertilizer expenses.</li>
      </ul>
    </div>
  </div>
)}

    </div>
  );
}