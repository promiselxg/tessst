"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  Bold,
  Essentials,
  FontSize,
  Heading,
  HorizontalLine,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  ListProperties,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
  ClassicEditor,
  CloudServices,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";

function CKCustomEditor({ value, onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(_, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY,
        plugins: [
          Alignment,
          AutoImage,
          AutoLink,
          Autosave,
          BalloonToolbar,
          Bold,
          CloudServices,

          Essentials,
          FontSize,
          Heading,
          HorizontalLine,
          Indent,
          IndentBlock,
          Italic,
          Link,

          List,
          ListProperties,
          Mention,
          PageBreak,
          Paragraph,
          PasteFromOffice,
          RemoveFormat,
          Strikethrough,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TodoList,
          Underline,
        ],
        toolbar: [
          "heading",
          "|",
          "fontSize",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "link",

          "insertTable",
          "|",
          "alignment",
          "|",
          "bulletedList",
          "numberedList",
          "todoList",
          "outdent",
          "indent",
        ],
        initialData: "",
        balloonToolbar: [
          "bold",
          "italic",
          "|",
          "link",
          "|",
          "bulletedList",
          "numberedList",
        ],
      }}
    />
  );
}

export default CKCustomEditor;
