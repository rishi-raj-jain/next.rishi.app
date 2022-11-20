import NextImage from 'next/image'

const Author = ({ author, post }) => {
  return (
    <div className="flex flex-row items-center space-x-3">
      <NextImage
        width={30}
        height={30}
        quality={30}
        alt={author ?? ''}
        title={author ?? ''}
        className="rounded-full"
        src={post?.content?.author?.content?.picture?.filename ?? 'https://placehold.jp/30x30.png'}
      />
      <div className="flex flex-col">
        <span className="text-sm">{author ?? ''}</span>
        <a className="text-xs text-blue-500" href="https://twitter.com/rishi_raj_jain_" target="_blank">
          {'@rishi_raj_jain_'}
        </a>
      </div>
    </div>
  )
}

export default Author
