import NextImage from 'next/image'
import DateString from './DateString'

const Author = ({ author, pubDate, post }) => {
  return (
    <div className="flex flex-row items-center space-x-3">
      <NextImage
        width={30}
        height={30}
        alt={author}
        quality={30}
        title={author}
        src={post.content.author.content.picture.filename}
      />
      <span className="hidden sm:block text-[16px]">{author}</span>
      <span>/</span>
      <span className="text-[16px]">
        <DateString date={new Date(pubDate)} />
      </span>
    </div>
  )
}

export default Author
