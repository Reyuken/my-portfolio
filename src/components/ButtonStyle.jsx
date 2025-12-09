export const dropdownStyle = (style = {}) => ({
  position: "absolute",
  top: 20,
  left: 20,
  background: "#2c3e50",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  ...style,
});

export const buttonStyle = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  background: "#3498db",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "5px",
};
