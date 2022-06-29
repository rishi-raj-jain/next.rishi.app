import SEO from '@/components/Seo'

const CV = ({ data }) => {
   const SEODetails = {
    title: `CV - Rishi Raj Jain`,
    canonical: `https://rishi.app/cv`,
    deploymentUrl: `https://rishi.app`
  }
  return (
    <Fragment>
      <SEO {...SEODetails} />
      <div className="flex w-full flex-col items-center text-[14px]">
        <div className="mt-10 flex w-[90vw] max-w-[540px] flex-col">
          <h2 className="text-3xl font-bold text-zinc-700 dark:text-gray-300">Rishi Raj Jain</h2>
          <h2 id="About" className="mt-10 animate-fade text-zinc-700 dark:text-gray-300">
            About
          </h2>
          <p className="mt-2 animate-fade-2 font-light text-slate-600 dark:text-slate-400">
            Customer Success Manager at{' '}
            <a target="_blank" className="text-black underline dark:text-slate-200" href="https://edg.io">
              Edgio
            </a>
            .{' '}
            <a target="_blank" className="text-black underline dark:text-slate-200" href="https://storyblok.com">
              Storyblok
            </a>{' '}
            Ambassador. Synchronising my knowledge with community about Web Development, Caching, Edge Computing, Serverless, front-end ecosystems.
          </p>
        </div>
        {Object.keys(data).map((i) => (
          <div key={i} className="mt-10 flex w-[90vw] max-w-[540px] flex-col gap-y-5">
            <h2 id={i} className="animate-fade text-zinc-700 dark:text-gray-300">
              {i}
            </h2>
            {data[i].map((j, _ind) => (
              <div key={_ind} className="flex flex-col gap-y-2 gap-x-10 md:flex-row md:gap-y-0">
                <p className="min-w-[100px] animate-fade-2 font-light text-gray-400">{j.name}</p>
                <a
                  target="_blank"
                  href={j.href || '#'}
                  className="flex animate-fade-3 flex-row items-center justify-start font-light text-black hover:underline dark:text-slate-200"
                >
                  {j.title} &#x2197;
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default CV

export async function getStaticProps() {
  return {
    props: {
      data: {
        'Work Experience': [
          { name: '2022 — Now', title: 'Customer Success Manager at Edgio', href: 'https://edg.io' },
          { name: '2021 — Now', title: 'Ambassador at Storyblok', href: 'https://storyblok.com' },
          { name: '2021 — 2022', title: 'Solutions / DevRel at Layer0 by Limelight Networks', href: 'https://limelight.com' },
          { name: '2019 — 2021', title: 'Developer Evangelist, Freelance at Layer0', href: 'https://layer0.co' },
          { name: '2020 — 2020', title: 'UI Engineer, Freelance at Arian Architects', href: 'https://arian-architects.github.io' },
          { name: '2019 — 2020', title: 'UI Engineer, Intern at Wellowise', href: 'https://wellowise.com' },
        ],
        Education: [
          {
            name: '2018 — 2022',
            title: 'B.Tech Computer Science and Design at Indraprastha Institute of Information Technology, Delhi',
            href: 'https://iiitd.ac.in',
          },
        ],
        Contact: [
          {
            name: 'Website',
            title: 'rishi.app',
            href: 'https://rishi.app',
          },
          {
            name: 'Twitter',
            title: 'rishi_raj_jain_',
            href: 'https://twitter.com/rishi_raj_jain_',
          },
          {
            name: 'LinkedIn',
            title: 'rishi-raj-jain',
            href: 'https://linkedin.com/in/rishi-raj-jain',
          },
          {
            name: 'GitHub',
            title: 'rishi-raj-jain',
            href: 'https://github.com/in/rishi-raj-jain',
          },
          {
            name: 'Email',
            title: 'rjain@edg.io',
            href: 'mailto:rjain@edg.io',
          },
        ],
      },
    },
  }
}
