import "./css/Flavour.css";

function Flavour(props) {
  function handleAddSale() {
    props.setFlavours((f) => {
      return f.map((flavour) =>
        flavour.id === props.id
          ? {
              ...flavour,
              sales: parseInt(props.flavourSales) + 1,
            }
          : flavour,
      );
    });
  }

  function handleSubSale() {
    props.setFlavours((f) => {
      return f.map((flavour) => {
        var result = parseInt(props.flavourSales) - 1;

        console.log(result);

        if (result <= 0) {
          return flavour.id === props.id
            ? {
                ...flavour,
                sales: 0,
              }
            : flavour;
        } else {
          return flavour.id === props.id
            ? {
                ...flavour,
                sales: result,
              }
            : flavour;
        }
      });
    });
  }

  return (
    <div
      className="flavour"
      style={{
        borderColor: props.flavourColor,
      }}
      onClick={() => props.onClick(props.id)}
    >
      <h2>{props.flavourName}</h2>
      <p>{props.flavourDescription}</p>
      <div className="sales">
        <span>
          Vendas: <b>{props.flavourSales}</b>
        </span>
        <div className="add-sub-controls">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddSale();
            }}
            className="add"
          >
            +
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSubSale();
            }}
            className="sub"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default Flavour;
