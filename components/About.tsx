export default function About() {
  return (
    <section id="about" aria-label="About me">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-7 md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0 backdrop-blur-md ">
        <h2 className="text-[6px] font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200 lg:sr-only font-dreams leading-[4]">
          About
        </h2>
      </div>
      <div className="font-helvetica relative">
        <p className="text-slate-700 dark:text-slate-300">
          Results-driven{" "}
          <strong className="text-slate-900 dark:text-slate-100">
            Executive Accounts professional with 5+ years of proven expertise
          </strong>{" "}
          in financial management, accounts payable/receivable operations, and strategic financial analysis. Demonstrated track record of career advancement from Accountant to Executive level, with expertise in{" "}
          <span className="text-portfolio font-medium">
            QuickBooks, Odoo ERP, advanced Excel (Pivot Tables, VLOOKUP), and comprehensive financial reporting
          </span>
          . Successfully managed multi-million dollar financial operations, reduced cash handling errors by 15%, implemented process improvements that streamlined workflows, and ensured 100% compliance with accounting standards. Currently leading financial operations at WEJ SHOES while maintaining{" "}
          <span className="text-portfolio font-medium">
            month-end/year-end closing procedures, aging reports analysis, and cross-functional team training
          </span>
          . Seeking to leverage analytical skills, software proficiency, and leadership experience to drive organizational growth and financial excellence in a dynamic accounting environment.
        </p>
      </div>
    </section>
  );
}
