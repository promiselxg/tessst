"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import { useMemo } from "react";

const Editor = ({ onChange, value, height, ...props }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <>
      <div className={`bg-white ${height && `${height}`}`}>
        <ReactQuill theme="snow" value={value} onChange={onChange} {...props} />
      </div>
    </>
  );
};

export default Editor;
