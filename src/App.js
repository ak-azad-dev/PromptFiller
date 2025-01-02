import React, { useState, useCallback, useEffect } from "react";
import { Button, Input, Form, Card, Space, Typography, message } from "antd";
import "antd/dist/reset.css"; // For Ant Design v5 (latest)

const { TextArea } = Input;

const App = () => {
  const [page, setPage] = useState("main");
  const [prompt, setPrompt] = useState("");
  const [placeholders, setPlaceholders] = useState([]);
  const [values, setValues] = useState({});
  const [finalText, setFinalText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  // Sample prompts list
  const samplePrompts = [
    "Sample Prompt with [placeholder1]",
    "Another example with {placeholder2} and {placeholder3}",
    "Final example with {placeholder4}",
  ];

  const extractPlaceholders = useCallback(() => {
    const regex = new RegExp("[{\\[](.+?)[}\\]]", "g");
    const newPlaceholders = [
      ...new Set((prompt.match(regex) || []).map((m) => m.slice(1, -1))),
    ];
    
    // Only update state if placeholders have changed
    if (newPlaceholders.length !== placeholders.length) {
      setPlaceholders(newPlaceholders);

      const newValues = {};
      newPlaceholders.forEach((p) => {
        newValues[p] = values[p] || "";
      });
      setValues(newValues);
    }
  }, [prompt, placeholders, values]);

  useEffect(() => {
    if (prompt.trim()) {
      extractPlaceholders(); // Run after prompt is updated
    }
  }, [prompt, extractPlaceholders]); // Trigger when prompt changes

  const updateFinalText = useCallback(() => {
    let updatedText = prompt;
    placeholders.forEach((p) => {
      updatedText = updatedText.replace(
        new RegExp(`[{\\[]${p}[\\]}]`, "g"),
        values[p] || `[${p}]`
      );
    });
    setFinalText(updatedText);
  }, [prompt, placeholders, values]);

  useEffect(() => {
    updateFinalText();
  }, [values, updateFinalText, prompt]);

  const getLabel = (placeholder) => {
    return placeholder
      .replace(/_/g, " ")
      .replace(/\b\w/g, (p) => p.toUpperCase());
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(finalText)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Copied to clipboard!",
        });
      })
      .catch(console.error);
  };

  
  const setPromptHandler = (newPrompt) => {
    setPage("main"); // Switch to main page after setting prompt
    setPrompt(newPrompt);
  };
  return (
    <>
      {contextHolder}
      <div
        className="container"
        style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}
      >
        {page === "main" ? (
          <Card
            title="Prompt Filler"
            extra={
              <Button type="link" onClick={() => setPage("prompt")}>
                Sample Prompts
              </Button>
            }
            style={{
              backgroundColor: "#fff",
              borderColor: "#ccc",
              textAlign: "left",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow with custom color
            }}
          >
            <Form layout="vertical">
              <Form.Item>
                <TextArea
                  rows={4}
                  value={prompt}
                  onChange={(e) => {
                    const newPrompt = e.target.value;
                    setPrompt(newPrompt);
                    const regex = new RegExp("[{\\[](.+?)[}\\]]", "g");
                    // Update placeholders directly without debounce
                    const newPlaceholders = [
                      ...new Set(
                        (newPrompt.match(regex) || []).map((m) =>
                          m.slice(1, -1)
                        )
                      ),
                    ];
                    setPlaceholders(newPlaceholders);
                  }}
                  placeholder="Paste your prompt here..."
                  allowClear
                />
              </Form.Item>

              {placeholders.length > 0 && (
                <div>
                  <h2>Fill Placeholders:</h2>
                  {placeholders.map((placeholder, index) => (
                    <Form.Item key={index} label={getLabel(placeholder)}>
                      <Input
                        value={values[placeholder] || ""} // Ensure value is always defined
                        onChange={(e) => {
                          // Use functional form to update state
                          setValues((prevValues) => ({
                            ...prevValues,
                            [placeholder]: e.target.value,
                          }));
                        }}
                        placeholder={`Enter value for ${placeholder}`}
                      />
                    </Form.Item>
                  ))}
                </div>
              )}

              {prompt.trim().length > 0 && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text strong>Final Prompt:</Typography.Text>
                    <Button
                      type="primary"
                      size="small"
                      onClick={copyToClipboard}
                    >
                      Copy
                    </Button>
                  </div>
                  <Form.Item style={{ marginTop: "10px" }}>
                    <TextArea
                      rows={4}
                      value={finalText}
                      readOnly
                      placeholder="Final prompt will appear here..."
                    />
                  </Form.Item>
                </div>
              )}
            </Form>
            {/* Footer */}
            <div
              style={{
                marginTop: "30",
                textAlign: "center",
              }}
            >
              <Space direction="vertical" size="middle">
                <Typography.Text>
                  Made with{" "}
                  <span role="img" aria-label="heart">
                    ❤️
                  </span>{" "}
                  by{" "}
                  <Typography.Link href="https://your-link.com" target="_blank">
                    Azad
                  </Typography.Link>
                </Typography.Text>
              </Space>
            </div>
          </Card>
        ) : (
          <Card
            title="Prompts"
            extra={
              <Button type="link" onClick={() => setPage("main")}>
                Back
              </Button>
            }
          >
            <div className="prompt-list">
              {samplePrompts.map((samplePrompt, index) => (
                <Card
                  type="inner"
                  title={samplePrompt}
                  key={index}
                  extra={
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => setPromptHandler(samplePrompt)}
                    >
                      Use
                    </Button>
                  }
                />
              ))}
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default App;
