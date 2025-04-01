import React from "react";
import DashboardHeader from "../../../_components/dashboard/header";
import ProductTitleForm from "../../../_components/ecommerce/product-title-form";
import ProductDescriptionForm from "../../../_components/ecommerce/product-description-form";
import ProductImageUploadForm from "../../../_components/ecommerce/product-image-upload-form";

const AddProduct = () => {
  const breadcrumbs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Ecommerce", href: "/dashboard/ecommerce" },
    { name: "Products", href: "/dashboard/ecommerce/products" },
    { name: "Add new product" },
  ];

  return (
    <>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      <div className="p-6 bg-[whitesmoke] min-h-screen space-y-4">
        <h1 className="font-bold text-[20px]">Add Product</h1>
        <div className="w-full flex gap-5 justify-between">
          <div className="w-2/3 space-y-5">
            {/* <ProductTitleForm /> */}
            {/* <ProductDescriptionForm /> */}
            <ProductImageUploadForm />
          </div>
          <div className="w-2/6 bg-[white] shadow-md rounded-md p-4"></div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
