import { useEffect, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { IoMdAlert } from "react-icons/io";
import "./css/Statistics.css";

function Statistics() {
  const [modalVisible, setModalVisible] = useState(false);

  const [history, setHistoryState] = useState(() =>
    JSON.parse(localStorage.getItem("history") || "[]"),
  );
  const [dayIndex, setDayIndex] = useState(history.length - 1);

  const todayRecord = history[dayIndex];
  const liquid = todayRecord.sales.reduce((acc, s) => acc + Number(s.sales), 0);

  const [expensesToday, setExpensesToday] = useState(todayRecord.expenses);

  function handleSetExpensesToday(event) {
    if (event.target.value < 0) return;

    setExpensesToday(event.target.value);
  }

  useEffect(() => {
    setExpensesToday(todayRecord.expenses);
  }, [todayRecord]);

  function setHistory() {
    const newHistory = history.map((record) =>
      record.date === todayRecord.date
        ? { ...record, expenses: Number(expensesToday) }
        : record,
    );

    localStorage.setItem("history", JSON.stringify(newHistory));
    setHistoryState(newHistory);
  }

  let total = (liquid * 2.5 - expensesToday).toFixed(2);

  return (
    <div className="statistics">
      {modalVisible && (
        <div className="overlay">
          <div className="expenses">
            <h1>Adicionar gastos</h1>
            <label htmlFor="expenses_input">Valor gasto de hoje:</label>
            <input
              type="number"
              id="expenses_input"
              name="expenses_input"
              value={expensesToday}
              onChange={handleSetExpensesToday}
            />
            <button
              className="primary-button"
              onClick={() => {
                setHistory();
                setModalVisible(false);
              }}
            >
              feito
            </button>
            <button
              className="secondary-button"
              onClick={() => setModalVisible(false)}
            >
              cancelar
            </button>
          </div>
        </div>
      )}
      <h2>Estatísticas</h2>

      <table className="statistics-table">
        <thead className="table-head">
          <tr>
            <th className="leftest-th">
              <button
                className="date-sub"
                onClick={() => setDayIndex((i) => i + 1)}
                disabled={dayIndex === history.length - 1}
              >
                <AiFillCaretLeft />
              </button>
              <span>Data</span>
              <button
                className="date-plus"
                onClick={() => setDayIndex((i) => i - 1)}
                disabled={dayIndex === 0}
              >
                <AiFillCaretRight />
              </button>
            </th>
            <th>Sabor</th>
            <th>Vendas</th>
            <th>Líquido</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {history.map((record) => {
            if (record.date == todayRecord.date) {
              return record.sales.map((flavour) => (
                <tr key={flavour.id}>
                  <td className="leftest-th">
                    {new Date(record.date).toLocaleDateString("pt-br")}
                  </td>
                  <td>{flavour.name}</td>
                  <td>{flavour.sales}</td>
                  <td>R$ {(parseInt(flavour.sales) * 2.5).toFixed(2)}</td>
                </tr>
              ));
            }
          })}
        </tbody>
      </table>

      <div className="statistic-payment">
        <div className="statistic-card">
          <h4>Valor líquido</h4>
          <span style={{ color: "#115711" }}>
            R$ {(liquid * 2.5).toFixed(2)}
          </span>
        </div>
        <div
          className="statistic-card expenses-card"
          onClick={() => setModalVisible(true)}
        >
          <h4>Gastos</h4>
          <span style={{ color: "#6b1f1c" }}>
            R$ {Number(expensesToday ? expensesToday : 0).toFixed(2)}
          </span>
          {Number(expensesToday) === 0 ? (
            <div className="md-alert-div">
              <IoMdAlert className="md-alert" />
              <span>adicione os gastos</span>
            </div>
          ) : null}
        </div>
        <div className="statistic-card">
          <h4>Lucro total</h4>
          <span id="larger-span" style={{ color: "#006492" }}>
            R$ {total}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
