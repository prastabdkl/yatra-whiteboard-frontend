import React, { Fragment, useRef } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { SketchPicker } from "react-color";
import { useState } from "react";
import { Form, Button, Popup, Grid } from "semantic-ui-react";
import { postFormData, updateBoard } from "../../request";
import { v4 as uuidv4 } from "uuid";

const $ = window.$;

export const CanvasEditor = (props) => {
    const [options, setOptions] = useState({
        changeBrushRadius: false,
        brushColor: "#E01F1F",
        brushRadius: 4,
        canvasWidth: 400,
        canvasHeight: 400,
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
            <Grid>
                <Grid.Column floated="left" width={8}>
                    <Popup
                        content="Brush Color"
                        inverted
                        trigger={
                            <Button
                                circular
                                color="green"
                                icon="paint brush"
                                onClick={() => {
                                    setOptions({
                                        selectColor: !options.selectColor,
                                    });
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
                </Grid.Column>
                {
                    <Grid.Column floated="right" width={8} textAlign="right">
                        <button
                            className="ui button basic primary"
                            onClick={() => {
                                localStorage.setItem(
                                    "savedDrawing",
                                    saveableCanvas.getSaveData()
                                );
                                var values = {};
                                var key = props.keyID || uuidv4();
                                values[key] = {
                                    type: "canvas-editor",
                                    imgSrc: props.imgSrc,
                                    data: saveableCanvas.getSaveData(),
                                };
                                updateBoard(props.idx, { extras: values }).then(
                                    (v) => {
                                        debugger;
                                    }
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
                    </Grid.Column>
                }
            </Grid>

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
                            postFormData("UPLOAD_PICTURE", {
                                image: file,
                            }).then((v) => {
                                debugger;
                                setOptions({
                                    ...options,
                                    imgSrc: v.data.image,
                                });
                            });
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
