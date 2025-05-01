"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/card/product-card";
import axios from "axios";
import ProductCardSkeleton from "@/components/skeleton/store-skeleton";
import Container from "@/components/container/container";
import { Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

const ListAllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  useEffect(() => {
    axios
      .get("/api/product")
      .then((res) => setProducts(res.data.products))
      .finally(() => setLoading(false));
  }, []);

  const isGrid = viewMode === "grid";

  return (
    <>
      <Container className="w-[90%] md:w-[1100px] mx-auto mb-8">
        {loading ? (
          <div className="flex w-full justify-between animate-pulse">
            <div className="h-5 bg-gray-300 rounded w-32" />
            <div className="flex items-center gap-4">
              <div className="h-5 bg-gray-300 rounded w-10" />
              <div className="h-6 w-6 bg-gray-300 rounded-full" />
              <div className="h-6 w-6 bg-gray-300 rounded-full" />
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-between">
            <div>
              <p className="tracking-wide">
                About {products?.length || 0} results.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span>View:</span>
              <button onClick={() => setViewMode("list")}>
                <List
                  className={cn(
                    "w-5 h-5",
                    viewMode === "list" ? "text-black" : "text-gray-400"
                  )}
                />
              </button>
              <button onClick={() => setViewMode("grid")}>
                <Grid
                  className={cn(
                    "w-5 h-5",
                    viewMode === "grid" ? "text-black" : "text-gray-400"
                  )}
                />
              </button>
            </div>
          </div>
        )}
      </Container>

      <Container className="w-[90%] md:w-[1100px] mx-auto">
        <div
          className={cn(
            "gap-8",
            isGrid
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "flex flex-col"
          )}
        >
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} view={viewMode} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No products found.
            </p>
          )}
        </div>
      </Container>
    </>
  );
};

export default ListAllProductsPage;
