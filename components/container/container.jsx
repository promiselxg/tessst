"use client";

const Container = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`mx-auto w-[90%] md:max-w-[1200px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
