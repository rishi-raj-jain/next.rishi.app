import classNames from 'classnames'

const fallData = {
  '': new Array(5).fill({ name: '', title: '' }),
  ' ': new Array(5).fill({ name: '', title: '' }),
  '  ': new Array(5).fill({ name: '', title: '' }),
}

const Description = ({ heading = '', subHead = '', description = '', data = fallData }) => {
  return (
    <div className="flex w-full flex-col items-center text-[14px]">
      <div className="mt-10 flex w-[90vw] max-w-[540px] flex-col">
        <h2 className={classNames('text-3xl font-bold', { 'animate-pulse bg-black/50 py-2 px-10 dark:bg-white/50': heading.length < 1 })}>
          {heading}
        </h2>
        <h2 id="About" className={classNames('mt-10 font-medium', { 'animate-pulse bg-black/50 py-2 px-5 dark:bg-white/50': subHead.length < 1 })}>
          {subHead}
        </h2>
        <div
          className={classNames('mt-2 font-light', { 'w-full animate-pulse bg-black/50 py-5 dark:bg-white/50': description.length < 1 })}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      {Object.keys(data).map((i, _) => (
        <div key={_} className="mt-10 flex w-[90vw] max-w-[540px] flex-col gap-y-5">
          <h2
            className={classNames('text-zinc-700 dark:text-gray-300', {
              'w-[150px] animate-pulse bg-black/50 px-10 py-2 dark:bg-white/50': i.trim().length < 1,
            })}
          >
            {i}
          </h2>
          {data[i].map((j, __) => (
            <div key={__} className="flex flex-col gap-y-2 gap-x-10 md:flex-row md:gap-y-0">
              <p
                className={classNames('min-w-[100px] font-light text-gray-400', {
                  'animate-pulse bg-black/50 px-10 py-2 dark:bg-white/50': j.name.length < 1,
                })}
              >
                {j.name}
              </p>
              <a
                className={classNames('flex flex-row items-center justify-start font-light text-black hover:underline dark:text-slate-200', {
                  'w-full animate-pulse bg-black/50 dark:bg-white/50': j.title.length < 1,
                })}
              >
                {j.title} &#x2197;
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Description
