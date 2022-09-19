const BlogFallback = ({ heading, subHead }) => {
  return (
    <>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold sm:text-5xl">{heading}</h1>
        <h2 className="mt-5 w-3/4 animate-pulse bg-black/50 py-4 dark:bg-white/50" />
        <h2 className="mt-5 w-1/2 animate-pulse bg-black/50 py-4 dark:bg-white/50" />
        <div className="flex flex-row flex-wrap">
          <div className="mt-10 flex w-full flex-col lg:mt-20 lg:w-2/3 lg:pr-10">
            {new Array(5).fill(0).map((_, item) => (
              <div key={`/blog/${item}`} className="mb-10 flex flex-col border-b pb-10 dark:border-gray-700">
                <span className="w-1/4 animate-pulse bg-black/50 py-2 dark:bg-white/50" />
                <span className="mt-3 w-full animate-pulse bg-black/50 py-4 text-lg font-bold dark:bg-white sm:text-2xl" />
                <span className="mt-1 w-full animate-pulse bg-black/50 py-2.5 text-lg font-bold dark:bg-white sm:text-2xl" />
                <div className="mt-5 w-1/4 animate-pulse bg-black/50 py-2 dark:bg-white" />
              </div>
            ))}
          </div>
          <div className="mt-0 flex w-full flex-col lg:mt-20 lg:w-1/3">
            <h4 className="text-md font-bold sm:text-lg">{subHead}</h4>
            {new Array(5).fill(0).map((_, item) => (
              <span
                key={item}
                href={item}
                className="mt-5 animate-pulse truncate border-b bg-black/50 px-10 py-4 text-sm font-light dark:bg-white/50"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogFallback
