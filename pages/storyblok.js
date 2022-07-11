import SEO from '@/components/Seo'

const Storyblok = ({ data }) => {
  const SEODetails = {
    title: `Storyblok - Rishi Raj Jain`,
    canonical: `https://rishi.app/storyblok`,
    deploymentUrl: `https://rishi.app`,
  }
  return (
    <>
      <SEO {...SEODetails} />
      <div className="flex w-full flex-col items-center text-[14px]">
        <div className="mt-10 flex w-[90vw] max-w-[540px] flex-col">
          <h2 className="text-3xl font-bold text-zinc-700 dark:text-gray-300">Storyblok x Rishi Raj Jain</h2>
          <h2 id="About" className="mt-10 text-zinc-700 dark:text-gray-300">
            About
          </h2>
          <p className="mt-2 font-light text-gray-400">
            Rishi is a{' '}
            <a target="_blank" className="text-black underline dark:text-slate-200" href="https://storyblok.com">
              Storyblok Ambassador
            </a>
            , since Sept. 2021.
          </p>
        </div>
        {Object.keys(data).map((i) => (
          <div key={i} className="mt-10 flex w-[90vw] max-w-[540px] flex-col gap-y-5">
            <h2 id={i} className="text-zinc-700 dark:text-gray-300">
              {i}
            </h2>
            {data[i].map((j, _ind) => (
              <div key={_ind} className="flex flex-col gap-y-2 gap-x-10 md:flex-row md:gap-y-0">
                <p className="min-w-[100px] font-light text-gray-400">{j.name}</p>
                <a
                  target="_blank"
                  href={j.href || '#'}
                  className="flex flex-row items-center justify-start font-light text-black hover:underline dark:text-slate-200"
                >
                  {j.title} &#x2197;
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default Storyblok

export async function getStaticProps() {
  return {
    props: {
      data: {
        Tutorials: [
          {
            name: 'Sep 27, 2021',
            title: 'Build Your Personal Blog With Next.js, Storyblok, and Layer0',
            href: 'https://www.storyblok.com/tp/blog-next-layer0',
          },
          {
            name: 'Jul 9, 2021',
            title: 'Deploy Next SPA with Storyblok to Layer0',
            href: 'https://www.storyblok.com/tp/deploy-next-spa-with-storyblok-to-layer0',
          },
        ],
        Talks: [
          {
            name: 'Feb. 2022',
            title: 'Establishing Fastest Online Presence with Next.js, Storyblok and Layer0',
            href: 'https://youtu.be/r1BMNqI5Uwk?list=PL02pdjMT4gWzMOk6BEZBEubBtoKEkz0g9&t=1',
          },
          {
            name: 'Oct. 2021',
            title: 'Super fast blogs with Layer0, Storyblok and Next.js',
            href: 'https://www.youtube.com/watch?v=6U08V187cpc&t=5168s',
          },
          {
            name: 'Aug. 2021',
            title: 'Dynamically Static Blogs',
            href: 'https://a.storyblok.com/f/117912/x/33dd7667c9/dynamically-static-blogs-slides.pdf',
          },
        ],
        Repositories: [
          {
            name: 'Jul. 2022',
            title: 'Storyblok Upload Data',
            href: 'https://github.com/rishi-raj-jain/upload-storyblok',
          },
          {
            name: 'Feb. 2022',
            title: 'Dynamic portfolio with Layer0, Storyblok and Next.js',
            href: 'https://github.com/rishi-raj-jain/layer0-storyblok-nextjs-portfolio-starter',
          },
          {
            name: 'Sept. 2021',
            title: 'Super fast blogs with Layer0, Storyblok and Next.js',
            href: 'https://github.com/rishi-raj-jain/blog-next-storyblok-layer0-starter',
          },
          {
            name: 'Jul. 2021',
            title: 'Next.js Storyblok Layer0 Starter',
            href: 'https://github.com/rishi-raj-jain/next-storyblok-layer0-starter',
          },
        ],
        'Case Study': [
          {
            name: '2021',
            title: 'Personal Case Study - Rishi Raj Jain',
            href: 'https://www.storyblok.com/cs/rishi-raj-jain',
          },
        ],
      },
    },
  }
}
