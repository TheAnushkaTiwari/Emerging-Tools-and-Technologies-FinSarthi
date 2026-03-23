import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <h1>AI Powered Financial Guidance</h1>
      <p>Personalised investment insights tailored to you.</p>
      <button
        onClick={() => navigate("/login")}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Get Started
      </button>
    </div>
  );
};

export default Landing;
