import { BrowserRouter, Routes, Route } from "react-router-dom";
import Panel from "./Panel";
import Statistics from "./Statistics";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";

function App() {
  const [flavours, setFlavours] = useState(() => {
    const save = localStorage.getItem("flavours");
    return save ? JSON.parse(save) : [];
  });

  const reseted = useRef(false);

  useEffect(() => {
    if (reseted.current) return;

    const today = new Date().toDateString();
    const lastReset = localStorage.getItem("lastReset");

    if (lastReset !== today) {
      const history = JSON.parse(localStorage.getItem("history") || "[]");

      history.push({
        date: lastReset || today,
        sales: flavours.map((f) => ({
          id: f.id,
          name: f.name,
          sales: f.sales,
        })),
        expenses: 0.0,
      });

      localStorage.setItem("history", JSON.stringify(history));

      setFlavours((f) => f.map((flavour) => ({ ...flavour, sales: 0 })));

      localStorage.setItem("lastReset", today);

      reseted.current = true;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("flavours", JSON.stringify(flavours));
  }, [flavours]);

  return (
    <>
      <div className="panels">
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route
              path="/"
              element={<Panel flavours={flavours} setFlavours={setFlavours} />}
            />
            <Route path="/statistics" element={<Statistics />} />
            <Route
              path="*"
              element={
                <h1
                  style={{ flex: "1", textAlign: "center", marginTop: "350px" }}
                >
                  PAGE NOT FOUND
                </h1>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
