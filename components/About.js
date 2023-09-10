import { Fragment } from 'react'
import classNames from 'classnames'
import TimelineIte from './TimelineItem'

const fallData = {}
for (let i = 0; i < 5; i++) {
  fallData[i] = new Array(5).fill({ content: { Title: '', Description: '' } })
}

const AboutWithFallback = ({ heading = '', tagline = '', description = '', data = fallData }) => {
  return (
    <>
      <h1 className={classNames('text-2xl font-bold sm:text-5xl', { 'animate-pulse bg-black/50 py-5 px-10 dark:bg-white/50': heading.length < 1 })}>
        {heading}
      </h1>
      <h2
        dangerouslySetInnerHTML={{
          __html: tagline,
        }}
        className={classNames('font-regular text-md mt-5 whitespace-pre-line dark:text-gray-400 sm:text-xl', {
          'animate-pulse bg-black/50 py-3 px-10 dark:bg-white/50': tagline.length < 1,
        })}
      />
      {Object.keys(data).length > 0 && (
        <>
          <h1
            className={classNames('mt-16 text-2xl font-bold sm:text-5xl', {
              'animate-pulse bg-black/50 py-5 px-10 dark:bg-white/50': description.length < 1,
            })}
          >
            {description}
          </h1>
          {Object.keys(data)
            .sort((a, b) => (a > b ? -1 : 1))
            .map((item, ind) => (
              <Fragment key={`${item}_${ind}`}>
                <span
                  className={classNames('mt-8 text-lg font-bold', { 'w-[100px] animate-pulse bg-black/50 px-1 py-2 dark:bg-white/50': item < 1800 })}
                >
                  {item < 1800 ? '' : item}
                </span>
                {data[item].map((exp, ind) => (
                  <TimelineItem key={`${exp.content.Title}_${ind}`} {...exp['content']} />
                ))}
              </Fragment>
            ))}
        </>
      )}
    </>
  )
}

export default AboutWithFallback
