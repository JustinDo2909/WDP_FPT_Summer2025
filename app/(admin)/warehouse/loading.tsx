import { Area, Yard } from "@/lib/by/Div"

export default function WarehouseLoading() {
  return (
    <Yard className="p-6 space-y-6">
      {/* Page Header Skeleton */}
      <Area className="flex items-center justify-between">
        <Yard>
          <Yard className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2" />
          <Yard className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
        </Yard>
      </Area>

      {/* Main Content Skeleton */}
      <Area className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar Skeleton */}
        <Yard className="lg:col-span-1">
          <Yard className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <Yard className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
            <Yard className="space-y-2">
              {[...Array(6)].map((_, i) => (
                <Yard key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
              ))}
            </Yard>
          </Yard>
        </Yard>

        {/* Right Content Skeleton */}
        <Yard className="lg:col-span-3 space-y-6">
          {/* Stats Skeleton */}
          <Yard className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Yard key={i} className="bg-gray-100 rounded-lg p-4">
                <Yard className="h-12 bg-gray-200 rounded animate-pulse mb-2" />
                <Yard className="h-4 bg-gray-200 rounded animate-pulse" />
              </Yard>
            ))}
          </Yard>

          {/* Filters Skeleton */}
          <Yard className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <Area className="flex gap-4">
              <Yard className="flex-1 h-10 bg-gray-100 rounded animate-pulse" />
              <Yard className="w-48 h-10 bg-gray-100 rounded animate-pulse" />
            </Area>
          </Yard>

          {/* Batches Grid Skeleton */}
          <Yard className="bg-white rounded-lg shadow-sm border border-gray-200">
            <Area className="p-4 border-b border-gray-200">
              <Yard className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            </Area>
            <Yard className="p-4">
              <Yard className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Yard key={i} className="bg-gray-50 rounded-lg p-4">
                    <Yard className="h-32 bg-gray-200 rounded animate-pulse mb-4" />
                    <Yard className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                    <Yard className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  </Yard>
                ))}
              </Yard>
            </Yard>
          </Yard>
        </Yard>
      </Area>
    </Yard>
  )
}
