"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NoCodeAppBuilder() {
  const [components, setComponents] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const addComponent = (type) => {
    setComponents([...components, { type, id: Date.now() }]);
  };

  const handleAISuggestion = async () => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ✅ Missing Header
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
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">AI-Powered No-Code App Builder</h1>
      <div className="flex space-x-2">
        <Button onClick={() => addComponent("button")}>Add Button</Button>
        <Button onClick={() => addComponent("input")}>Add Input</Button>
        <Button onClick={() => addComponent("textarea")}>Add Textarea</Button>
        <Button onClick={handleAISuggestion}>AI Suggest Component</Button>
      </div>

      {aiSuggestion && (
        <Card className="mt-4">
          <CardContent>{aiSuggestion}</CardContent>
        </Card>
      )}

      <div className="border p-4 mt-4 min-h-[200px]">
        {components.map((comp) => (
          <div key={comp.id} className="p-2">
            {comp.type === "button" && <Button>Click Me</Button>}
            {comp.type === "input" && <Input placeholder="Enter text..." />}
            {comp.type === "textarea" && <Textarea placeholder="Write something..." />}
          </div>
        ))}
      </div>
    </div>
  );
}

