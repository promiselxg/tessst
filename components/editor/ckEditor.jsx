"use client";

import dynamic from "next/dynamic";

const CKEditor = dynamic(() => import("./ckCustomEditor"), { ssr: false });

export default CKEditor;
