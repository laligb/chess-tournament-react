interface CheckBoxProps {
  selectTypes: string[];
  selectFormat: string[];
  setSelectTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectFormat: React.Dispatch<React.SetStateAction<string[]>>;
}

function CheckBox({
  selectTypes,
  selectFormat,
  setSelectTypes,
  setSelectFormat,
}: CheckBoxProps) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "#fff",
          padding: "20px",
          borderRadius: "4px",
          zIndex: 1,
        }}
      >
        <h4>Filters</h4>

        <p>
          <strong>Types</strong>
        </p>
        {["individual", "team"].map((type) => (
          <label key={type} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={selectTypes.includes(type)}
              onChange={() => {
                if (selectTypes.includes(type)) {
                  setSelectTypes(selectTypes.filter((t) => t !== type));
                } else {
                  setSelectTypes([...selectTypes, type]);
                }
              }}
            />
            {type}
          </label>
        ))}

        <p style={{ marginTop: "10px" }}>
          <strong>Formats</strong>
        </p>
        {["blitz", "rapid", "standard"].map((format) => (
          <label key={format} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={selectFormat.includes(format)}
              onChange={() => {
                if (selectFormat.includes(format)) {
                  setSelectFormat(selectFormat.filter((f) => f !== format));
                } else {
                  setSelectFormat([...selectFormat, format]);
                }
              }}
            />
            {format}
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckBox;
