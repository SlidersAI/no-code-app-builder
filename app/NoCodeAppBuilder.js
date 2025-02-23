const handleAISuggestion = async () => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ✅ Fixed: Added Headers
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

