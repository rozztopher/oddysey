import { phases } from "../../utils/Constants";

const Roadmap = () => {
  const Item = (props) => {
    const { phase, date, title, description, side } = props;
    const className =
      side === "right"
        ? "fill flex-column flex-end mt-20"
        : "fill flex-column mt-20";
    const p = side === "right" ? "left" : "right";
    const bottom = phase === "Phase eight" ? "20vh" : "0px";
    return (
      <div
        className={className + " phase-container"}
        style={{ marginBottom: bottom }}
      >
        <div className="roadmap-item">
          <p className={"all-caps fs-14 " + p}>
            {phase} <span className="t-white-50">|</span> {date}
          </p>
          <p className={"all-caps fs-20 medium mt-10 " + p}>{title}</p>
          <p className={"fs-16 mt-20 t-white-80 " + p}>{description}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-column ai-center" style={{ overflow: "hidden" }}>
      <img
        src="/images/roadmap-tower.png"
        alt="tower"
        className="mobile-only"
        style={{ position: "absolute", right: "-150%", width: "300%" }}
      />
      <div
        id="roadmap"
        className="flex-column ai-center mt-200"
        style={{ overflow: "hidden" }}
      >
        <h2 id="roadmap-header" className="fs-42 medium all-caps mt-120">
          Roadmap
        </h2>
        <img
          src="/images/roadmap-tower.png"
          className="absolute-center fill mobile-hidden"
          alt="tower"
          style={{ zIndex: -1 }}
        />
        {phases.map((item, i) => {
          return (
            <Item
              key={item.phase}
              phase={item.phase}
              date={item.date}
              title={item.title}
              description={item.description}
              side={i % 2 === 0 ? "right" : "left"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
