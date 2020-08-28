import React, { Fragment, useRef } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { SketchPicker } from "react-color";
import { useState } from "react";
import { Form, Button, Popup } from "semantic-ui-react";

const $ = window.$;

export const CanvasEditor = (props) => {
    const [options, setOptions] = useState({
        changeBrushRadius: false,
        brushColor: "#E01F1F",
        brushRadius: 4,
        cWidth: 400,
        cHeight: 400,
    });
    const [image, setImage] = useState({ name: "", data: "" });

    let saveableCanvas = null;

    const canvasProps = {
        ...options,
        onChange: null,
        loadTimeOffset: 5,
        lazyRadius: 0,
        catenaryColor: "#0a0302",
        gridColor: "rgba(150,150,150,0.17)",
        hideGrid: false,
        disabled: false,
        imgSrc: "",
        saveData: null,
        immediateLoading: false,
        hideInterface: false,
    };
    debugger;

    return (
        <div className="ui container canvas-container">
            <CanvasDraw
                {...canvasProps}
                {...props}
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
                                ...options,
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
            <button
                className="ui button basic negative"
                onClick={() => {
                    saveableCanvas.clear();
                }}
            >
                Clear
            </button>
            <Popup
                content="Undo"
                inverted
                trigger={
                    <Button
                        circular
                        color="blue"
                        icon="share"
                        onClick={() => {
                            saveableCanvas.undo();
                        }}
                    />
                }
            />
            <div>
                {options.selectColor && (
                    <SketchPicker
                        color={options.brushColor}
                        onChangeComplete={(color) => {
                            setOptions({ ...options, brushColor: color.hex });
                        }}
                    />
                )}
                {options.changeBrushRadius && (
                    <Fragment>
                        <div
                            className="ui button basic"
                            onClick={() =>
                                setOptions({
                                    ...options,
                                    brushRadius: options.brushRadius - 1,
                                })
                            }
                        >
                            -
                        </div>
                        <input
                            value={options.brushRadius}
                            type="number"
                            onChange={(e, value) =>
                                setOptions({ ...options, brushRadius: value })
                            }
                        />
                        <div
                            className="ui button basic"
                            onClick={() =>
                                setOptions({
                                    ...options,
                                    brushRadius: options.brushRadius + 1,
                                })
                            }
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
