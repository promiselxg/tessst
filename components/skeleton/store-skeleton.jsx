const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4 p-4 rounded-lg shadow-sm">
      <div className="bg-gray-300 h-48 w-full rounded-md" />
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </div>
  );
};

export default ProductCardSkeleton;
