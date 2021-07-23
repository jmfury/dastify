import React, { useState, useRef, useCallback, useEffect } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { useEditable } from "use-editable";

interface EditorProps {
  onUpdate?: (code: string) => void;
}

export default function Editor({ onUpdate }: EditorProps) {
  const editorRef = useRef(null);
  const [code, setCode] = useState("<h1>Hello World</h1>");

  const onEditableChange = useCallback((code) => {
    setCode(code.slice(0, -1));
  }, []);

  useEditable(editorRef, onEditableChange, {
    disabled: false,
    indentation: 2,
  });

  useEffect(() => {
    if (typeof onUpdate === "function") {
      onUpdate(code);
    }
  }, [code]);

  return (
    <Highlight {...defaultProps} code={code} language="markup">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style} ref={editorRef}>
          {tokens.map((line, i) => (
            <React.Fragment key={i}>
              {line
                .filter((token) => !token.empty)
                .map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              {"\n"}
            </React.Fragment>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
