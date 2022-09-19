import classNames from 'classnames'
import Heart from '@/components/Heart'
import RichTextResolver from 'storyblok-js-client/dist/rich-text-resolver.cjs'

const TimelineItem = ({ Title = '', Description }) => {
  return (
    <div className="relative mt-5 flex flex-row items-start space-x-5">
      <div className="mt-1 h-[12px] w-[12px]">
        <Heart width={12} height={21} />
      </div>
      <div className="flex w-full flex-col">
        <span
          className={classNames('text-md font-semibold sm:text-lg', { 'w-full animate-pulse bg-black/50 py-2 dark:bg-white/50': Title.length < 1 })}
        >
          {Title}
        </span>
        <span
          className={classNames('dark:text-gray-400', {
            'mt-1 w-full animate-pulse bg-black/50 py-2 dark:bg-white/50': !Description || Description.length < 1,
          })}
          dangerouslySetInnerHTML={{
            __html: typeof Description === 'string' ? Description : new RichTextResolver().render(Description),
          }}
        ></span>
      </div>
    </div>
  )
}

export default TimelineItem
