import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experiences } from "@/constants/data";
import { Timeline } from "@/components/ui/Timeline";
import { MapPin, Calendar, Building2 } from "lucide-react";

interface ExperiencePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return experiences.map((experience) => ({
    id: experience.id,
  }));
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { id } = await params;
  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) {
    return {
      title: "Experience Not Found",
      description: "The requested work experience could not be found."
    };
  }

  return {
    title: `${experience.position} at ${experience.company} | Muhammad Shoaib Israr - Executive Accounts`,
    description: `${experience.description} Technologies used: ${experience.technologies.slice(0, 5).join(', ')}. View detailed work experience timeline and achievements.`,
    keywords: [
      "Muhammad Shoaib Israr",
      "Executive Accounts",
      "Accounts Executive",
      "Work Experience", 
      experience.position,
      experience.company,
      ...experience.technologies,
      "Finance Professional",
      "Career Journey"
    ].join(", "),
    openGraph: {
      title: `${experience.position} at ${experience.company} | Muhammad Shoaib Israr`,
      description: experience.description,
      type: "website",
      siteName: "Muhammad Shoaib Israr Portfolio"
    },
    twitter: {
      card: "summary",
      title: `${experience.position} at ${experience.company} | Muhammad Shoaib Israr`,
      description: experience.description
    },
    alternates: {
      canonical: `/experience/${id}`
    }
  };
}

async function getExperience(id: string) {
  const experience = experiences.find((exp) => exp.id === id);
  return experience || null;
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { id } = await params;
  const experience = await getExperience(id);

  if (!experience) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WorkExperience",
            name: experience.position,
            description: experience.description,
            employer: {
              "@type": "Organization",
              name: experience.company,
              address: {
                "@type": "PostalAddress",
                addressLocality: experience.location,
              },
            },
            startDate: experience.period.split(" — ")[0],
            endDate: experience.period.includes("Present")
              ? new Date().getFullYear().toString()
              : experience.period.split(" — ")[1],
            employee: {
              "@type": "Person",
              name: "Muhammad Shoaib Israr",
              jobTitle: "Executive Accounts",
            },
            skills: experience.technologies,
          }),
        }}
      />

      <div className="mx-auto min-h-screen max-w-screen-xl  md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:py-24">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-portfolio transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <Link
                  href="/#experience"
                  className="text-slate-400 hover:text-portfolio transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li
                className="text-slate-800 dark:text-slate-200"
                aria-current="page"
              >
                {experience.company}
              </li>
            </ol>
          </nav>

          {/* Back Link */}
          <Link
            href="/#experience"
            className="group mb-2 inline-flex items-center font-semibold leading-tight text-portfolio hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Experience
          </Link>

          {/* Experience Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:text-5xl mb-4">
              {experience.position}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex items-center text-portfolio font-semibold">
                <Building2 className="w-5 h-5 mr-2" />
                {experience.company}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 text-slate-600 dark:text-slate-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time>{experience.period}</time>
                </div>

                {experience.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{experience.location}</span>
                  </div>
                )}
              </div>
            </div>

            <p className="leading-normal text-slate-700 dark:text-slate-300 max-w-4xl">
              {experience.description}
            </p>
          </header>

          {/* Technologies Section */}
          <section className="mb-12" aria-labelledby="technologies-heading">
            <h2
              id="technologies-heading"
              className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200 mb-6"
            >
              Technologies & Tools
            </h2>
            <ul
              className="flex flex-wrap gap-3"
              aria-label="Technologies used in this role"
            >
              {experience.technologies.map((tech) => (
                <li key={tech}>
                  <div className="flex items-center rounded-full bg-portfolio/10 px-3 py-1.5 text-xs font-medium leading-4 text-portfolio border border-portfolio/20">
                    {tech}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Journey Timeline */}
          {experience.timeline && experience.timeline.length > 0 && (
            <section className="mb-12" aria-labelledby="timeline-heading">
              <h2
                id="timeline-heading"
                className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200 mb-6"
              >
                Career Journey at {experience.company}
              </h2>
              <Timeline
                items={experience.timeline.map((item) => ({
                  ...item,
                  type: "work" as const,
                }))}
              />
            </section>
          )}

          {/* Key Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <section className="mb-12" aria-labelledby="achievements-heading">
              <h2
                id="achievements-heading"
                className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200 mb-6"
              >
                Key Achievements & Contributions
              </h2>
              <ul className="space-y-4">
                {experience.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-portfolio rounded-full mt-2.5 mr-4"></span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {achievement}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Role Overview */}
          <section className="mb-12" aria-labelledby="overview-heading">
            <h2
              id="overview-heading"
              className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200 mb-6"
            >
              Role Overview & Impact
            </h2>
            <div className="prose prose-slate prose-invert max-w-none ">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                During my tenure as {experience.position} at{" "}
                {experience.company}, I played a pivotal role in driving
                financial excellence and delivering accurate accounting solutions that
                significantly impacted organizational financial performance and compliance standards.
              </p>

              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                Core Responsibilities
              </h3>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-portfolio rounded-full mt-2.5 mr-3"></span>
                  <span>
                    Comprehensive financial management including accounts payable/receivable operations
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-portfolio rounded-full mt-2.5 mr-3"></span>
                  <span>
                    Financial reporting, reconciliation, and compliance management
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-portfolio rounded-full mt-2.5 mr-3"></span>
                  <span>
                    Advanced accounting software utilization (QuickBooks, Odoo ERP)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-portfolio rounded-full mt-2.5 mr-3"></span>
                  <span>
                    Cash flow management and budget preparation with variance analysis
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-portfolio rounded-full mt-2.5 mr-3"></span>
                  <span>Training and mentoring junior staff on accounting procedures</span>
                </li>
              </ul>

              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-4">
                Professional Growth
              </h3>
              <p className="text-slate-700 dark:text-slate-300">
                This role provided invaluable opportunities to expand financial
                expertise, develop leadership skills, and contribute to
                meaningful accounting processes that enhanced organizational efficiency. The
                experience strengthened my ability to work in dynamic business
                environments while maintaining high standards of financial accuracy
                and professional excellence in accounting operations.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}