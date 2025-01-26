import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

function MyEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onChange = (newEditorState: any) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <Editor editorState={editorState} onChange={onChange} />
    </div>
  );
}

export default MyEditor;
