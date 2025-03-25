import { curve1, curve2 } from "../../assets";

export const RightCurve = () => {
  return (
    <div
      style={{
       
        position: "absolute",
        top: "50%",
        left: "100%",
        width: "10.125rem",
        marginTop: "-1rem",
        marginLeft: "2.5rem", // Equivalent to ml-10
        pointerEvents: "none",
      }}
    >
      <img src={curve2} width={162} height={76} alt="Curve 2" />
    </div>
  );
};

export const LeftCurve = () => {
  return (
    <div
      style={{
        
        position: "absolute",
        top: "50%",
        right: "100%",
        width: "32.625rem",
        marginTop: "-1rem",
        marginRight: "2.5rem", // Equivalent to mr-10
        pointerEvents: "none",
      }}
    >
      <img src={curve1} width={522} height={182} alt="Curve 1" />
    </div>
  );
};
