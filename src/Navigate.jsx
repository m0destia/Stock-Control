import { useNavigate } from "react-router-dom";
import "./css/Navigate.css";

function Navigate() {
  const navigate = useNavigate();

  return (
    <nav className="navigate">
      <button className="secondary-button" onClick={() => navigate("/")}>
        Início
      </button>
      <button
        className="secondary-button"
        onClick={() => navigate("/statistics")}
      >
        Estatísticas
      </button>
    </nav>
  );
}

export default Navigate;
