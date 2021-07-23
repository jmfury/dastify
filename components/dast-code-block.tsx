import Highlight, { defaultProps } from "prism-react-renderer";
import { Fragment } from "react";

export default function DastCodeBlock({ dast }: { dast: string }) {
  return (
    <Highlight {...defaultProps} code={dast} language="json">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Fragment key={i}>
              {line
                .filter((token) => !token.empty)
                .map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              {"\n"}
            </Fragment>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
