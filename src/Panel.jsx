import react, { useState } from "react";

import Flavour from "./Flavour";
import FlavourEdit from "./FlavourEdit";
import "./css/Panel.css";

function Panel(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [ID, setID] = useState("");

  function addFlavour() {
    setID("");
    setModalVisible(true);
  }

  function editFlavour(id) {
    setID(id);
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  return (
    <div className="panel-encloser">
      {modalVisible && (
        <FlavourEdit
          flavours={props.flavours}
          setFlavours={props.setFlavours}
          hideModal={hideModal}
          id={ID}
        />
      )}
      <div className="controls">
        <button className="primary-button" onClick={addFlavour}>
          Adicionar Sabor
        </button>
      </div>
      <div className="panel">
        {props.flavours.map((element) => (
          <Flavour
            key={element.id}
            id={element.id}
            flavourName={element.name}
            flavourDescription={element.desc}
            flavourSales={element.sales}
            flavourColor={element.color}
            flavours={props.flavours}
            setFlavours={props.setFlavours}
            onClick={editFlavour}
          ></Flavour>
        ))}
      </div>
    </div>
  );
}

export default Panel;
