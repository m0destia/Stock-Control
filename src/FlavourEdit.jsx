import react, { useEffect, useState } from "react";

import "./css/FlavourEdit.css";

function FlavourEdit(props) {
  const [flavourName, setFlavourName] = useState("");
  const [flavourDesc, setFlavourDesc] = useState("");
  const [flavourColor, setFlavourColor] = useState("#3a2d28");
  const [flavourSales, setFlavourSales] = useState(0);

  function checkIfEditing() {
    if (props.id == "") return;

    var flavour = props.flavours.find((flavour) => flavour.id == props.id);

    setFlavourName(flavour.name);
    setFlavourDesc(flavour.desc);
    setFlavourColor(flavour.color);
    setFlavourSales(flavour.sales);
  }

  function handleSetFlavours() {
    if (flavourName == "") return;

    const newFlavour = {
      id: Date.now(),
      name: flavourName,
      desc: flavourDesc,
      color: flavourColor,
      sales: flavourSales,
    };

    if (props.id != "") {
      props.setFlavours((f) => {
        return f.map((flavour) =>
          flavour.id === props.id
            ? {
                ...flavour,
                name: flavourName,
                desc: flavourDesc,
                color: flavourColor,
                sales: flavourSales,
              }
            : flavour,
        );
      });
    } else {
      props.setFlavours((f) => {
        return [...f, newFlavour];
      });
    }

    clean();
  }

  function removeFlavour() {
    props.setFlavours((f) => {
      return f.filter((flavour) => flavour.id !== props.id);
    });
    clean();
  }

  function clean() {
    setFlavourName("");
    setFlavourDesc("");
    setFlavourColor("#3a2d28");
    setFlavourSales(0);

    props.hideModal();
  }

  function handleFlavourName(event) {
    setFlavourName(event.target.value);
  }

  function handleFlavourDesc(event) {
    setFlavourDesc(event.target.value);
  }

  function handleFlavourColor(event) {
    setFlavourColor(event.target.value);
  }

  function handleFlavourSales(event) {
    if (event.target.value >= 0) {
      setFlavourSales(event.target.value);
    }
  }

  useEffect(() => {
    checkIfEditing();
  }, [props.id]);

  return (
    <div className="overlay">
      <div
        className="flavour-edit"
        style={{
          borderColor: flavourColor,
          boxShadow: `0px 0px 8px ${flavourColor}`,
        }}
      >
        <h1>
          {props.id
            ? `Editar ${flavourName ? flavourName : "sabor"}`
            : `Adicionar ${flavourName ? flavourName : "sabor"}`}
        </h1>
        <label htmlFor="flavour_name">Nome do sabor:</label>
        <input
          type="text"
          id="flavour_name"
          name="flavour_name"
          placeholder="Chocolate [Nome é obrigatório!]"
          value={flavourName}
          onChange={handleFlavourName}
        />
        <label htmlFor="flavour_desc">Descrição do sabor:</label>
        <input
          type="text"
          id="flavour_desc"
          name="flavour_desc"
          placeholder="Geladinho saborosissimo de chocolate!"
          value={flavourDesc}
          onChange={handleFlavourDesc}
        />
        <label htmlFor="flavour_color">Cor:</label>
        <input
          type="color"
          id="flavour_color"
          name="flavour_color"
          value={flavourColor}
          onChange={handleFlavourColor}
        />
        <label htmlFor="flavour_sales">Vendas do dia do sabor:</label>
        <input
          type="number"
          id="flavour_sales"
          name="flavour_sales"
          placeholder="11"
          value={flavourSales}
          onChange={handleFlavourSales}
        />
        <button className="primary-button" onClick={handleSetFlavours}>
          {props.id ? `editar` : "Adicionar sabor"}
        </button>
        {props.id ? (
          <button
            className="primary-button remove-button"
            onClick={removeFlavour}
          >
            remover sabor
          </button>
        ) : (
          <></>
        )}
        <button className="secondary-button" onClick={clean}>
          cancelar
        </button>
      </div>
    </div>
  );
}

export default FlavourEdit;
