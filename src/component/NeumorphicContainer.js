import React from "react";

export default function NeumorphicContainer(props) {
  const containerclasses = "neumorphic " + props.containerclassName;
  const subcontainerclasses = "neumorphic_layer2 " + props.subcontainerclasses;

  return (
    <>
      <div className={containerclasses}>
        <div className={subcontainerclasses}>
          {props.isLayer ? (
            <div className="neumorphic_layer3 round-25">{props.children}</div>
          ) : (
            <>{props.children}</>
          )}
        </div>
      </div>
    </>
  );
}
