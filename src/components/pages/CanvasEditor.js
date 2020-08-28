import React, { Fragment, useRef } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { SketchPicker } from "react-color";
import { useState } from "react";
import { Form, Button, Popup } from "semantic-ui-react";

const $ = window.$;

export const CanvasEditor = (props) => {
    const [options, setOptions] = useState({
        selectColor: false,
        changeBrushRadius: false,
    });
    const [color, setColor] = useState("#E01F1F");
    const [bRadius, setBrushRadius] = useState(12);
    const [image, setImage] = useState({ name: "", data: "" });

    let saveableCanvas = null;

    const canvasProps = {
        width: 1000,
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
        imgSrc: "",
        // "https://lh3.googleusercontent.com/GBm5XIFmoXROY-tELop17jsz8u2OtEElp2xfZtiXJJ7T0uWLapMeglUkcCAR07QUGJ4s=w412-h220-rw",
        saveData: null,
        immediateLoading: false,
        hideInterface: false,
    };

    return (
        <div className="ui container canvas-container">
            <CanvasDraw
                {...canvasProps}
                ref={(canvasDraw) => (saveableCanvas = canvasDraw)}
            />
            <Popup
                content="Brush Color"
                inverted
                trigger={
                    <Button
                        circular
                        color="green"
                        icon="paint brush"
                        onClick={() => {
                            setOptions({ selectColor: !options.selectColor });
                        }}
                    />
                }
            />
            <Popup
                content="Brush Radius"
                inverted
                trigger={
                    <Button
                        circular
                        color="red"
                        icon="paint brush"
                        onClick={() => {
                            setOptions({
                                changeBrushRadius: !options.changeBrushRadius,
                            });
                        }}
                    />
                }
            />
            <Popup
                content="Upload Image"
                inverted
                trigger={
                    <Button
                        circular
                        color="blue"
                        icon="attach"
                        onClick={() => {
                            $("#image-upload").trigger("click");
                        }}
                    />
                }
            />
            <button
                className="ui button basic primary"
                onClick={() => {
                    localStorage.setItem(
                        "savedDrawing",
                        saveableCanvas.getSaveData()
                    );
                }}
            >
                Save
            </button>
            <div>
                {options.selectColor && (
                    <SketchPicker
                        color={color}
                        onChangeComplete={(color) => {
                            setColor(color.hex);
                        }}
                    />
                )}
                {options.changeBrushRadius && (
                    <Fragment>
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
                    </Fragment>
                )}
                <Form.Field className="invisible">
                    <Form.Input
                        id="image-upload"
                        type="file"
                        fluid
                        name="image"
                        onChange={(event) => {
                            var file = event.target.files[0];
                            var reader = new FileReader();
                            reader.onload = function (item) {
                                setImage({
                                    ...image,
                                    name: "",
                                    data: item.target.result,
                                });
                            };
                            reader.readAsDataURL(file);
                        }}
                        value={image.name}
                    />
                </Form.Field>
                {image.data && (
                    <div className="ui segment placeholder">
                        <img src={image.data} className="ui fluid image" />
                    </div>
                )}
            </div>
        </div>
    );
};
