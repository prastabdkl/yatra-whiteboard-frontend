import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { SketchPicker } from "react-color";
import { useState } from "react";

export const CanvasEditor = (props) => {
    const [color, setColor] = useState("#E01F1F");
    const [bRadius, setBrushRadius] = useState(12);

    const canvasProps = {
        onChange: null,
        loadTimeOffset: 5,
        lazyRadius: 0,
        brushRadius: bRadius,
        brushColor: color,
        catenaryColor: "#0a0302",
        gridColor: "rgba(150,150,150,0.17)",
        hideGrid: false,
        canvasWidth: 400,
        canvasHeight: 400,
        disabled: false,
        imgSrc:
            "https://lh3.googleusercontent.com/GBm5XIFmoXROY-tELop17jsz8u2OtEElp2xfZtiXJJ7T0uWLapMeglUkcCAR07QUGJ4s=w412-h220-rw",
        saveData: null,
        immediateLoading: false,
        hideInterface: false,
    };

    return (
        <div className="ui container canvas-container">
            <CanvasDraw {...canvasProps} />
            Brush Color
            <SketchPicker
                color={color}
                onChangeComplete={(color) => {
                    setColor(color.hex);
                }}
            />
            Brush Radius
            <div
                className="ui button basic"
                onClick={() => setBrushRadius(bRadius - 1)}
            >
                -
            </div>
            <input
                value={bRadius}
                type="number"
                onChange={(e, value) => setBrushRadius(value)}
            />
            <div
                className="ui button basic"
                onClick={() => setBrushRadius(bRadius + 1)}
            >
                +
            </div>
        </div>
    );
};
