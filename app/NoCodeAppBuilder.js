"use client";

import React, { useState } from "react";

export default function NoCodeAppBuilder() {
  const [components, setComponents] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");

  // Add a new component to the canvas
  const addComponent = (type) => {
    setComponents([...components, { type, id: Date.now() }]);
  };

  // AI Suggestion button handler
  const handleAISuggestion = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Important for JSON
        body: JSON.stringify({ prompt: "Suggest UI components for an app" }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI suggestion");
      }

      const data = await response.json();
      setAiSuggestion(data.suggestion);
    } catch (error) {
      console.error("Error fetching AI suggestion:", error);
      setAiSuggestion("AI Suggestion failed. Check API setup.");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
        AI-Powered No-Code App Builder
      </h1>
      <div style={{ marginTop: "16px" }}>
        {/* Button group */}
        <button onClick={() => addComponent("button")}>Add Button</button>
        <button onClick={() => addComponent("input")} style={{ marginLeft: "8px" }}>
          Add Input
        </button>
        <button onClick={() => addComponent("textarea")} style={{ marginLeft: "8px" }}>
          Add Textarea
        </button>
        <button onClick={handleAISuggestion} style={{ marginLeft: "8px" }}>
          AI Suggest Component
        </button>
      </div>

      {/* AI Suggestion box */}
      {aiSuggestion && (
        <div
          style={{
            border: "1px solid #ccc",
            marginTop: "16px",
            padding: "8px",
          }}
        >
          {aiSuggestion}
        </div>
      )}

      {/* Canvas for added components */}
      <div
        style={{
          border: "1px solid #ccc",
          marginTop: "16px",
          minHeight: "200px",
          padding: "8px",
        }}
      >
        {components.map((comp) => (
          <div key={comp.id} style={{ marginBottom: "8px" }}>
            {comp.type === "button" && <button>Click Me</button>}
            {comp.type === "input" && <input placeholder="Enter text..." />}
            {comp.type === "textarea" && (
              <textarea placeholder="Write something..." rows={3} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
