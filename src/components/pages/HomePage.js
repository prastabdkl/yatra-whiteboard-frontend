import React, { useState } from "react";
import { TextEditor } from "../pages";

export function HomePage(props) {
  return (
    <div className="ui container">
      <h3 className="ui header">Text Editor</h3>
      <TextEditor></TextEditor>
    </div>
  );
}
