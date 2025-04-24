import React from "react";

const FormWrapper = ({ children, title, label = "" }) => {
  return (
    <>
      <div className="w-full bg-[white] shadow rounded-tl-[10px] rounded-tr-[10px] overflow-hidden">
        <div className="p-4 w-full border-b-[1px] border-[rgba(0,0,0,0.1)] ">
          <h1 className="text-[14px] font-bold">{title}</h1>
          <p className="text-sm italic text-slate-700">{label}</p>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </>
  );
};

export default FormWrapper;
