// File: src/pages/Safety.tsx
import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Phone,
  MapPin,
  Shield,
  Zap,
  Bell,
  X,
  Check,
  MessageCircle,
  Share2,
  Play,
  Clock,
  Map,
  Users,
  Flag,
  LifeBuoy,
  Compass,
  Globe
} from "lucide-react";

type SafetyProps = {
  language: string;
  setLanguage?: (lang: string) => void;
  onBack?: () => void;
  userData?: { name?: string; village?: string } | null;
};

type Incident = {
  id: string;
  type: string;
  description: string;
  location?: string;
  time: string;
  resolved?: boolean;
};

export default function Safety({ language, setLanguage, onBack, userData }: SafetyProps) {
  const [showSOSConfirm, setShowSOSConfirm] = useState(false);
  const [showFakeCallConfirm, setShowFakeCallConfirm] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAlertDetail, setShowAlertDetail] = useState<null | { id: string; title: string; body: string }>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [reportType, setReportType] = useState("Fire");
  const [reportDesc, setReportDesc] = useState("");
  const [reportLoc, setReportLoc] = useState(userData?.village || "");
  const [alerts, setAlerts] = useState(
    [
      { id: "a1", title: "Flood Warning", body: "Heavy rain expected. Rivers may overflow in low-lying areas." },
      { id: "a2", title: "Heatwave Advisory", body: "High temperatures expected; stay hydrated and avoid midday sun." }
    ]
  );
  const [nearbyServices] = useState([
    { id: "p1", type: "Police Station", name: "District Police Station", distance: "1.2 km", phone: "100" },
    { id: "a1", type: "Ambulance", name: "Quick Ambulance Service", distance: "2.1 km", phone: "102" },
    { id: "s1", type: "Shelter", name: "Community Relief Center", distance: "0.9 km", phone: "" }
  ]);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkinMessage, setCheckinMessage] = useState("I'm safe — quick check-in from EduMitra/SevaMitra.");
  const [chatMessages, setChatMessages] = useState([
    { id: "m1", from: "bot", text: "Hi — I can help with safety guidance. Tap SOS for immediate help.", time: "Now" }
  ]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    // Load persisted incidents if any
    try {
      const saved = localStorage.getItem("sevamitra_incidents");
      if (saved) setIncidents(JSON.parse(saved));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sevamitra_incidents", JSON.stringify(incidents));
  }, [incidents]);

  // --- Handlers (UI-first; TODO: wire real APIs) ---
  const triggerSOS = () => {
    // TODO: Integrate real SOS flow: call, send SMS with location & user id to emergency contacts / server
    setShowSOSConfirm(false);
    const now = new Date().toLocaleString();
    setIncidents(prev => [
      {
        id: "sos-" + Date.now(),
        type: "SOS",
        description: "Automatic SOS triggered by user",
        location: reportLoc || userData?.village,
        time: now
      },
      ...prev
    ]);
    alert("SOS triggered — demo mode. Integrate calling/SMS APIs to make real.");
  };

  const triggerFakeCall = () => {
    // TODO: Integrate phone call API or simulate phone UI
    setShowFakeCallConfirm(false);
    alert("Fake call started (demo). Implement Telephony API or use device call intent.");
  };

  const sendCheckin = () => {
    setIsCheckingIn(true);
    // TODO: Send SMS / push to contacts / social
    setTimeout(() => {
      setIsCheckingIn(false);
      alert("Check-in sent to your emergency contacts (demo).");
    }, 1000);
  };

  const openReport = () => setShowReportModal(true);
  const submitReport = () => {
    if (!reportDesc.trim()) {
      alert("Please add a brief description.");
      return;
    }
    const now = new Date().toLocaleString();
    const newIncident: Incident = {
      id: "inc-" + Date.now(),
      type: reportType,
      description: reportDesc,
      location: reportLoc,
      time: now
    };
    setIncidents(prev => [newIncident, ...prev]);
    setReportDesc("");
    setReportType("Fire");
    setShowReportModal(false);
    alert("Report submitted (demo). You can wire an API to send this to authorities.");
  };

  const sendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages(prev => [...prev, { id: "u" + Date.now(), from: "user", text, time: now }]);
    setChatInput("");
    // simulated bot reply
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { id: "b" + Date.now(), from: "bot", text: `I recommend: ${text}. If this is an emergency, press SOS.`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
      ]);
    }, 700);
  };

  // Small UI helpers
  const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold">
      <AlertTriangle className="w-3 h-3" /> {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white rounded-lg p-2">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Safety Center</h1>
              <p className="text-xs text-gray-500">Your emergency hub • {userData?.name || "Guest"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage && setLanguage(e.target.value)}
              className="border px-3 py-1 rounded-md text-sm bg-white"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>

            <button onClick={onBack} className="px-3 py-2 bg-gray-100 rounded-md text-sm">Back</button>
          </div>
        </div>
      </header>

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <div className="text-sm font-semibold">Emergency? Call 108</div>
              <div className="text-xs opacity-90">Use SOS for local support and automatic alerts</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSOSConfirm(true)}
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:opacity-95"
            >
              🚨 SOS
            </button>
            <button
              onClick={() => setShowFakeCallConfirm(true)}
              className="bg-white/20 text-white px-3 py-2 rounded-lg hover:bg-white/30"
            >
              Fake Call
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Quick Safety Actions */}
        <aside className="space-y-6 lg:col-span-1">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Quick Actions</h3>
              <span className="text-xs text-gray-500">Fast access</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowSOSConfirm(true)}
                className="p-3 bg-red-600 text-white rounded-lg flex flex-col items-center gap-1"
              >
                <AlertTriangle className="w-6 h-6" />
                <span className="text-xs font-semibold">SOS</span>
              </button>

              <button
                onClick={() => setShowFakeCallConfirm(true)}
                className="p-3 bg-gray-800 text-white rounded-lg flex flex-col items-center gap-1"
              >
                <Phone className="w-6 h-6" />
                <span className="text-xs font-semibold">Fake Call</span>
              </button>

              <button
                onClick={() => { navigator.geolocation?.getCurrentPosition((pos) => { alert("Location obtained (demo): " + pos.coords.latitude + ", " + pos.coords.longitude); /* TODO: share */ }); }}
                className="p-3 bg-emerald-600 text-white rounded-lg flex flex-col items-center gap-1"
              >
                <Share2 className="w-6 h-6" />
                <span className="text-xs font-semibold">Share Location</span>
              </button>

              <button
                onClick={() => sendCheckin()}
                className="p-3 bg-amber-500 text-white rounded-lg flex flex-col items-center gap-1"
              >
                <Users className="w-6 h-6" />
                <span className="text-xs font-semibold">{isCheckingIn ? "Sending..." : "Check-in"}</span>
              </button>
            </div>

            <div className="mt-4 border-t pt-3">
              <h4 className="text-sm font-medium mb-2">Safety Tips</h4>
              <ul className="text-xs text-gray-600 space-y-2">
                <li>• Keep phone charged and contacts updated</li>
                <li>• Share location with trusted contact</li>
                <li>• Move to open/visible area in crowds</li>
                <li>• For medical emergency call 102</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Nearby Emergency Contacts</h4>
              <span className="text-xs text-gray-500">Tap to call</span>
            </div>
            <div className="space-y-3">
              {nearbyServices.map(s => (
                <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div>
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-gray-500">{s.type} • {s.distance}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {s.phone && (
                      <a href={`tel:${s.phone}`} className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs flex items-center gap-2">
                        <Phone className="w-3 h-3" /> Call
                      </a>
                    )}
                    <button className="px-2 py-1 bg-gray-50 rounded-md text-xs" onClick={() => alert("Open map to " + s.name + " (demo)")}>
                      <MapPin className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center: Live Alerts + Chat Assistant */}
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="font-semibold">Live Alerts</h3>
                  <p className="text-xs text-gray-500">Important safety and weather alerts</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">Updated just now</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {alerts.map(a => (
                <div key={a.id} className="p-3 rounded-lg border border-gray-100 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge>{a.title}</Badge>
                    </div>
                    <div className="text-sm mt-2">{a.body}</div>
                    <div className="text-xs text-gray-400 mt-2">Recommended: Follow local authority guidance</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-3 py-1 bg-red-600 text-white rounded-md text-xs" onClick={() => setShowAlertDetail(a)}>Details</button>
                    <button className="px-3 py-1 bg-gray-100 rounded-md text-xs" onClick={() => alert("Share alert (demo)")}>Share</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Assistant */}
          <div className="bg-white rounded-xl p-4 shadow-sm h-[420px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <LifeBuoy className="w-6 h-6 text-emerald-600" />
                <div>
                  <h4 className="font-semibold">Safety Assistant</h4>
                  <p className="text-xs text-gray-500">Ask for step-by-step help</p>
                </div>
              </div>

              <div className="text-xs text-gray-500">AI-powered (demo)</div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-3 bg-gray-50 rounded-md">
              {chatMessages.map((m: any, idx) => (
                <div key={m.id || idx} className={`${m.from === "bot" ? "justify-start" : "justify-end"} flex`}>
                  <div className={`${m.from === "bot" ? "bg-white text-gray-800" : "bg-emerald-600 text-white"} max-w-[80%] p-3 rounded-2xl`}>
                    <div className="text-sm">{m.text}</div>
                    <div className="text-xs mt-1 opacity-60">{m.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about first-aid, reporting, or safety..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200"
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
              />
              <button onClick={() => sendChat()} className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
                <MessageCircle className="w-4 h-4" /> Ask
              </button>
            </div>
          </div>

          {/* Incident List + Report */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Reported Incidents</h4>
              <div className="flex items-center gap-2">
                <button onClick={openReport} className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm">Report Incident</button>
                <button onClick={() => { setIncidents([]); localStorage.removeItem("sevamitra_incidents"); }} className="px-3 py-1 bg-gray-100 rounded-md text-sm">Clear</button>
              </div>
            </div>

            <div className="space-y-3">
              {incidents.length === 0 && <div className="text-sm text-gray-500">No incidents reported yet.</div>}
              {incidents.map(inc => (
                <div key={inc.id} className="p-3 rounded-lg border border-gray-100 flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold">{inc.type} • <span className="text-xs text-gray-400 ml-2">{inc.time}</span></div>
                    <div className="text-xs text-gray-600 mt-1">{inc.description}</div>
                    <div className="text-xs text-gray-400 mt-1">Location: {inc.location || "Unknown"}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => { setIncidents(prev => prev.map(i => i.id === inc.id ? ({ ...i, resolved: !i.resolved}) : i)); }} className={`px-3 py-1 rounded-md text-sm ${inc.resolved ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
                      {inc.resolved ? "Resolved" : "Mark Resolved"}
                    </button>
                    <button onClick={() => setIncidents(prev => prev.filter(i => i.id !== inc.id))} className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="max-w-7xl mx-auto px-4 text-sm text-gray-500">
          <div className="flex justify-between items-center">
            <div>© {new Date().getFullYear()} SevaMitra — Safety Center</div>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4" /> <span>Privacy-first • Offline-friendly</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Modals --- */}

      {/* SOS Confirm */}
      {showSOSConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSOSConfirm(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Trigger SOS</h3>
              <button onClick={() => setShowSOSConfirm(false)} className="p-1"><X /></button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to trigger SOS? This will notify emergency contacts and local authorities (demo).</p>
            <div className="flex gap-2">
              <button onClick={triggerSOS} className="flex-1 bg-red-600 text-white py-2 rounded-lg">Yes, Trigger SOS</button>
              <button onClick={() => setShowSOSConfirm(false)} className="flex-1 bg-gray-100 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Fake Call */}
      {showFakeCallConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowFakeCallConfirm(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Start Fake Call</h3>
              <button onClick={() => setShowFakeCallConfirm(false)} className="p-1"><X /></button>
            </div>
            <p className="text-sm text-gray-600 mb-4">A fake inbound call will be simulated to help you exit an unsafe situation. Demo only.</p>
            <div className="flex gap-2">
              <button onClick={triggerFakeCall} className="flex-1 bg-gray-800 text-white py-2 rounded-lg">Start Fake Call</button>
              <button onClick={() => setShowFakeCallConfirm(false)} className="flex-1 bg-gray-100 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowReportModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Report Incident</h3>
              <button onClick={() => setShowReportModal(false)} className="p-1"><X /></button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-medium">Type</label>
              <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full border rounded-md px-3 py-2">
                <option>Fire</option>
                <option>Flood</option>
                <option>Theft</option>
                <option>Accident</option>
                <option>Harassment</option>
                <option>Other</option>
              </select>

              <label className="text-xs font-medium">Location</label>
              <input value={reportLoc} onChange={(e) => setReportLoc(e.target.value)} className="w-full border rounded-md px-3 py-2" />

              <label className="text-xs font-medium">Description</label>
              <textarea value={reportDesc} onChange={(e) => setReportDesc(e.target.value)} rows={4} className="w-full border rounded-md px-3 py-2" />

              <div className="flex gap-2">
                <button onClick={submitReport} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg">Submit Report</button>
                <button onClick={() => setShowReportModal(false)} className="flex-1 bg-gray-100 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Detail */}
      {showAlertDetail && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAlertDetail(null)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{showAlertDetail.title}</h3>
              <button onClick={() => setShowAlertDetail(null)} className="p-1"><X /></button>
            </div>
            <p className="text-sm text-gray-700">{showAlertDetail.body}</p>
            <div className="mt-4 text-xs text-gray-500">Follow official instructions from local authorities. This is a demo alert view.</div>
          </div>
        </div>
      )}

    </div>
  );
}
