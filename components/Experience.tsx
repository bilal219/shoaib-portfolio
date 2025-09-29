import { experiences } from '@/constants/data';
import Link from 'next/link';

export default function Experience() {
  return (
    <section id="experience" aria-label="Work experience">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-7 md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 backdrop-blur-md ">
        <h2 className="text-[6px] font-bold uppercase tracking-widest text-slate-700 dark:text-slate-200 lg:sr-only font-dreams leading-[4]">
          Experience
        </h2>
      </div>
      <div>
        <ol className="group/list">
          {experiences.map((experience, index) => (
            <li key={index} className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block"></div>
                <header
                  className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:col-span-2"
                  aria-label={experience.period}
                >
                  {experience.period}
                </header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium text-slate-800 dark:text-white font-sans leading-normal">
                    <Link
                      href={`/experience/${experience.id}`}
                      className="inline-flex flex-col items-start font-medium leading-tight hover:text-portfolio focus-visible:text-portfolio group/link transition-colors"
                      aria-label={`View details about ${experience.position} at ${experience.company}`}
                    >
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                      <span className="text-xl">
                        <span className="inline-block">
                          {experience.company}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14m-7-7 7 7-7 7" />
                          </svg>
                        </span>
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400 font-normal mt-1">
                        {experience.position}
                      </span>
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-normal font-helvetica text-slate-600 dark:text-slate-400">
                    {experience.description}
                  </p>
                  <ul
                    className="mt-2 flex flex-wrap"
                    aria-label="Technologies used"
                  >
                    {experience.technologies.map((tech) => (
                      <li key={tech} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-portfolio/10 px-3 py-1 text-xs font-medium leading-5 text-portfolio">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Link
            className="inline-flex items-baseline font-medium leading-tight text-slate-800 dark:text-slate-200 hover:text-portfolio focus-visible:text-portfolio font-semibold group/link text-base transition-colors"
            href="/shoaib_resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View Full Résumé (opens in a new tab)"
          >
            <span>
              View Full{" "}
              <span className="inline-block">
                Résumé
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 12h14m-7-7 7 7-7 7"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}