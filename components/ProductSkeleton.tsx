interface ProductSkeletonProps {
    count: number
    gridCols?: string
  }
  
  function ProductSkeleton({
    count,
    gridCols = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  }: ProductSkeletonProps) {
    return (
      <div className={`grid ${gridCols} gap-6`}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`
              flex
              flex-col
              w-full
              bg-white
              rounded-lg
              border
              border-gray-200
              shadow-sm
              overflow-hidden
              animate-pulse
              ${index >= 3 ? "hidden sm:block" : ""}
            `}
          >
            {/* Image skeleton */}
            <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
              <div className="w-full h-full bg-gray-300"></div>
            </div>
  
            {/* Content skeleton */}
            <div className="p-4 space-y-3">
              {/* Title skeleton */}
              <div className="h-5 bg-gray-300 rounded w-3/4"></div>
  
              {/* Description skeleton - 2 lines */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
  
              {/* Price skeleton */}
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  export default ProductSkeleton
  