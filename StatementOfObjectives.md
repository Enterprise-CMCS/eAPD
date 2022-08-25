# Centers for Medicare and Medicaid Services (CMS)

# HITECH Program

# Statement of Objectives for eAPD application

## 1.0 Background and Purpose

### 1.1 Background

The Promoting Interoperability Program (PIP), previously known as the Electronic
Health Record (EHR) Incentive Program, is part of the Health Information
Technology for Economic and Clinical Health Act (HITECH) which is part of the
broader American Recovery and Reinvestment Act (ARRA) of 2009. The PIP was
designed as an economic stimulus program which would push the advancement of the
Health Information Technology (HIT) by incentivizing the adoption and meaningful
use of Certified Electronic Health Record technologies (CEHRT) for Medicaid
Eligible Providers. The program is supported by combined Federal/State funding,
managed by the State’s Medicaid Agency (SMA), overseen by the Centers for
Medicare & Medicaid Services (CMS), and governed by regulations found in 42 CFR
495, Part D.

Under this regulation, States are required to submit three categories of
documents to build their programs: The State Medicaid Health Information
Technology Plan (SMHP), the Advanced Planning Document (APD), and procurements.
The APD provides states a structured framework to describe any proposed projects
in support of the PIP; however, because it is primarily a paper document, the
content of the APD can vary. Upon review and approval of an APD, state projects
may be supported using enhanced Federal match (i.e. the Federal government will
reimburse states 90 cents for every dollar they spend).

In an effort to modernize the HITECH APD creation, submission, review, and
decision process, CMS partnered with [18F/GSA](https://18f.gsa.gov/) to leverage
modern software development techniques coupled with user-centered design to
develop a system to streamline the APD experience as part of the Medicaid and
CHIP (Children's Health Insurance Program) program Portal
[MACPro](https://www.medicaid.gov/state-resource-center/medicaid-and-chip-program-portal/medicaid-and-chip-program-portal.html)
suite of products. In its first iteration, the eAPD focused on developing a
robust APD builder which presented states a more guided authoring process and
providing automatic calculations for proposed budgets. The user testing and
subsequent pilot was met with enthusiastic support from CMS leadership and State
users.

Because of this encouraging progress, CMS expanded the scope of the project to
include all other components of the Medicaid IT Enterprise. The system roadmap
has been updated to include support for Medicaid Management Information System
(MMIS) and Eligibility & Enrollment (E&E) APDs. There is still much work to be
done for the vision of the eAPD to be realized.

### 1.2 Problem

The eAPD application tackles several different problems faced by CMS and states.
Each of the following pain points describes a component of the creation,
submission, review, and decision process which is currently rooted in
inconsistently applied manual systems or subjective narrative.

**Consistency of submissions**

While templates and guidance exist for many of the HITECH related documents, the
consistency and quality of submissions are dependent on the author to properly
interpret the guidance and author a document with the appropriate/required
information. Documents often include extraneous information unrelated to the
request and can often prevent the reviewer from understanding a state’s request.
As states update their submissions from year to year, there can be a dramatic
variation in each submission. Some states produce wholly new submissions, some
states produce a track-changes versions, and some states only include the
updated information.

**Process Transparency and Lack of Automation**

Tracking of the request, the review, response, and decision of a submission is
largely a manual process that requires duplicate data entry in various systems.
Completing the process requires a familiarity of the existing Standard Operating
Procedure (SOP) with a high likelihood of missing a step. Once a submission has
been received by CMS, states are often left guessing as to the status of their
submission and must request a status update from the Medicaid Enterprise Systems
(MES) state officer. Internally, providing the status of submissions also
requires manual status updates and verification. There is no singular approach
to tracking submissions that are received or responded to by CMS. As noted
above, each step of the process is manual and spans multiple programs and
systems.

**Communication between states and CMS**

As part of the review cycle, after a state has submitted their submissions to
CMS, there may be a need for additional information. This request is conducted
in an inconsistent manner utilizing email, Word documents, or direct markup in
the submission to itemize or reference content within the submission. Similarly,
the response from the state is conducted in an inconsistent fashion. In both
cases, inefficiencies result in a cycle of back and forth that does not always
provide sufficient detail for the CMS reviewer to support their decision.

**Document and submission management**

Submissions are primarily submitted to CMS via email. As each submission is
received, there are multiple steps that require the logging, tracking, and
storing of documents in multiple locations which creates multiple copies of the
document through the organization. Once a decision has been made, letters are
emailed out and also stored in an inconsistent manner within SharePoint’s
document library. Accessing and tracking documents created by states or by CMS
is a manual and labor-intensive effort.

**Auditing**

CMS is often subject to audit from an internal and external stakeholders. This
requires staff to provide documentation that shows how CMS followed the existing
SOPs and provide primary source documentation. Because of the nature of our
processes and our document management, this process is a labor-intensive process
to compile and provide to various requestors.

**Analytics**

All the information that is contained within the IAPD (implementation advance
planning document), SMHP and Procurement documents is held in free-form text,
making data analytics a primarily manual process. Information regarding approved
funding, project scope/status/milestones, expended funding, contractors used,
types of procurements, etc. require manual input from a non-primary user.
Through use of the Excel-based tracker, we are able to perform rudimentary
analytics concerning the review cycle, however when we need to provide
information about data contained within a submission, the free text necessitates
a manual lookup into each submission.

**Socializing information**

Sharing information between stakeholders is managed through email/FTP/disparate
systems, and heavily relies on CMS analysts and States to share key information
or best practices. This creates knowledge gaps and knowledge silos, and does not
promote consistency across various state approaches.

## 2.0 Scope

**Description of Work to be Performed** CMS seeks agile software development
services. The services to be provided will include all aspects of the software
development process, including initial planning, design, software development
and coding, prototyping, documentation, testing, and configuration.

CMS intends that the software delivered under this task order will be committed
to the public domain. The Contractor will have to obtain CMS permission before
delivering software under this task order that incorporates any software that is
not free and open source. The Contractor must post all developed code to a
GitHub repository designated by CMS. The Contractor will not be responsible for
importing any pending case data, practitioner data, or other data into the new
System.

This software development project will use agile development principles, with
robust documentation, human-centered design, and an extensible infrastructure.
CMS expects that the development process will be collaborative and iterative,
with open, regular, and frequent communication between CMS and the Contractor.
CMS expects that the development process will consist of 2-week sprint cycles,
and that the initial phases of the development process will focus on refining
the existing APD builder, building the APD update experience,and creating a
workflow for the submission and routing of the electronic documents. CMS has
designated an employee who will be empowered to serve as the Product Owner for
this project. CMS Product Owner will set direction, make prioritization choices
to build a product roadmap, consider and address the business needs of CMS, and
support the other members of the development team. The Contractor will assist
CMS with product management and facilitation. CMS, not the Contractor, will be
responsible for the hosting of the deployed System and obtaining any necessary
Authority to Operate (ATO). CMS will also determine what security controls are
required and whether they have been satisfied. CMS expects to provide those
security controls to the Contractor as either acceptance criteria or separate
user stories. The Contractor is expected to use best practices for security in
delivering code.

CMS intends to deploy the new System as soon as the software for the new System
has been sufficiently developed to provide the minimal viable functionality
required to support an acceptable level of CMS’s fundamental APD operations. The
minimal viable functionality, which was completed in July 2019, includes the
ability for external users to author an APD in a structured form and export the
APD as a PDF for submission to CMS. Enhancements to the application will
incorporate functionality such as updating previous APDs as a new submission,
submitting additional types of documents for review, tracking and monitoring
submissions, and reporting. CMS expects that substantial further development of
the software and modifications to the System will occur following a
human-centered design methodology and the sequencing of additional functions
will be determined as we continue to solve for user and stakeholder needs.

### 2.1 Product Vision

As a core function of the MACPro suite, the eAPD system will serve as a
singular, streamlined portal for state, federal, and associated partners to
develop, review, track, analyze, and share APD, contract submissions, and data
to improve accountability and outcomes associated with the State’s Medicaid
business needs. The system will be developed and maintained through continuous
integration/continuous delivery methods with a loosely coupled architecture
connected by Application Programming Interfaces (APIs).

### 2.2 Anticipated Period of Performance, Budget, and Ceiling Price

The not to exceed ceiling on this contract will be $2 million for the base year
and an additional $2 million for an option period of one year, if exercised.

## Objectives

### 3.1 Redacted/Reserved

### 3.2 List of Deliverables and Quality Assurance Surveillance Plan

The following chart sets forth the performance standards and quality levels the
code and documentation provided by the Contractor must meet, and the methods CMS
will use to assess the standard and quality levels of that code and
documentation.

| Deliverable          | Performance Standard(s)                                                                                                                                                                                                                                  | Acceptable Quality Level                                                                                                                                                                                 | Method of Assessment                                                                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tested Code          | Code delivered under the order must have substantial test code coverage. Version-controlled CMS GitHub repository of code that comprises product that will remain in the government domain.                                                              | Minimum of 90% test coverage of all code. All areas of code are meaningfully tested.                                                                                                                     | Combination of manual review and automated testing                                                                                                                   |
| Properly Styled Code | [Airbnb Style Guide](https://github.com/airbnb/javascript) and [prettier](https://prettier.io/) for Javascript. CSS and Sass conforms to Block-Element-Modifier [BEM](http://getbem.com/)                                                                | 0 linting errors and 0 warnings                                                                                                                                                                          | Combination of manual review and automated testing with eslint                                                                                                       |
| Accessible           | Web Content Accessibility Guidelines 2.1 AA (WCAG 2.1 AA) standards                                                                                                                                                                                      | 0 errors reported for WCAG 2.1 AA standards using an automated scanner and 0 errors reported in manual testing                                                                                           | [http://squizlabs.github.io/HTML_CodeSniffer/](http://squizlabs.github.io/HTML_CodeSniffer/) or [https://github.com/pa11y/pa11y](https://github.com/pa11y/pa11y)     |
| Deployed             | Code must successfully build and deploy into staging environment.                                                                                                                                                                                        | Successful build with a single command                                                                                                                                                                   | Combination of manual review and automated testing                                                                                                                   |
| Documentation        | All dependencies are listed and the licenses are documented. Major functionality in the software/source code is documented. Individual methods are documented inline using comments that permit the use tools such as JsDoc. System diagram is provided. | Combination of manual review and automated testing, if available                                                                                                                                         | Manual review                                                                                                                                                        |
| Secure               | OWASP Application Security Verification Standard 3.0                                                                                                                                                                                                     | Code submitted must be free of medium- and high-level static and dynamic security vulnerabilities                                                                                                        | Clean tests from a static testing SaaS (such as Snyk or npm audit) and from OWASP ZAP, along with documentation explaining any false positives                       |
| User Research        | Usability testing and other user research methods must be conducted at regular intervals throughout the development process (not just at the beginning or end).                                                                                          | Research plans and artifacts from usability testing and/or other research methods with end users are available at the end of every applicable sprint, in accordance with the contractor’s research plan. | CMS will manually evaluate the artifacts based on a research plan provided by the contractor at the end of the second sprint and every applicable sprint thereafter. |

## 4.0 Operating Constraints (Non-functional Requirements)

### 4.1 Environment

The System will be deployed to Amazon Web Service (AWS) infrastructure provided
by CMS. Deployments are automated via CircleCI continuous integration/continuous
deployment. Contractor is required to maintain deployment scripts and
configurations as changes are required. CMS will provide the necessary AWS
configuration information to the Contractor.

The system is composed of three primary parts: a PostgreSQL database, a backend
API application, and a frontend web application. All of the custom software is
in Javascript. Data files are written in either JSON or YAML, depending on who
is expected to edit them (e.g., data files that CMS may edit directly are
written in YAML). Deployment scripts are written in Bash script.

The backend API application uses these primary software libraries and
frameworks:

- Node.js 16.16.0, or higher 16.x version
- Express web application server
- Knex.js database query builder and migration management
- Passport authentication middleware

The frontend web application uses these primary software libraries and
frameworks:

- React 16
- React Router
- Redux
- CMS Design System

### 4.2 Personnel Skills and Knowledge

_Key Personnel_ – The Contractor must designate a **Facilitator**, a **Technical
Lead**, and a **Design Lead** as Key Personnel for this project. The Facilitator
will be a direct liaison to the CMS product team and will be responsible for the
supervision and management of all of the Contractor’s personnel. The Technical
Lead must have a full understanding of the technical approach to be used by the
Contractor’s development team and will be responsible for ensuring that the
Contractor’s development team follows that approach. The Design Lead will ensure
good design practices are employed throughout the entire process.

**The Facilitator** role may be filled by a scrum master, project manager,
product manager, agile coach, or a similar type of role. The person in this role
on the team will be expected to:

- Be well versed in Agile practices/methodologies and continuously coach the
  team as needed ( be familiar with agile techniques, such as user stories,
  continuous integration, etc.)
- Manage the scrum process, facilitate meetings and run sprint ceremonies (daily
  scrum, sprint planning, sprint demos, retrospectives, etc.)
- Work with the product manager to ensure the team is on track for work. Track
  impediments or “blocks” and help the product manager remove them.
- Help the product manager to maintain the product backlog.
- Work with the product manager to create useful and practical plans for
  development, and lead appropriate forecasting of the number of deliverables
  possible in an iteration.
- Work with the product manager to ensure the overall health and emotional
  safety of the team.
- Assist the product manager and executive sponsor in managing the project scope
  and costs.
- Ensure that the product manager receives honest, timely, and appropriate
  feedback from the vendor team.
- Assist in recruiting and scheduling user research sessions.

The **Technical Lead** role may be filled by a developer, developer team lead,
or similar role. The person in this role will be expected to:

- Be well versed in software development practices and methodologies and
  continuously coach the team as needed
- Maintain a high-level understanding of the technical architecture of the
  application to help other developers onboard as needed
- Work with the product manager to help them understand the technical tradeoffs
  during prioritization and decision making
- Monitor code and test quality to ensure it satisfies the QASP

The **Design Lead** role may be filled by a user experience designer, visual
designer, content designer, or similar role. The person in this role will be
expected to:

- Be well-versed in design practices and methodologies and continuously
  educate/coach the team as needed
- Maintain high quality, ongoing research
- Ensure smooth operation of the design activities on the project
- Work with the product manager to set the research agenda and determine the
  team’s design needs

### 4.3 Special Clauses

_Data Rights and Ownership of Deliverables_ – CMS intends that all software and
documentation delivered by the Contractor will be owned by CMS and committed to
the public domain. This software and documentation includes, but is not limited
to, data, documents, graphics, code, plans, reports, schedules, schemas,
metadata, architecture designs, and the like; all new open source software
created by the Contractor and forks or branches of current open source software
where the Contractor has made a modification; and all new tooling, scripting
configuration management, infrastructure as code, or any other final changes or
edits to successfully deploy or operate the software.

To the extent that the Contractor seeks to incorporate any software that was not
first produced in the performance of this task order in the software delivered
under this task order, CMS encourages the Contractor to incorporate either
software that is in the public domain, or free and open source software that
qualifies under the Open Source Definition promulgated by the Open Source
Initiative. In any event, the Contractor must promptly disclose to CMS in
writing, and list in the documentation, any software incorporated in the
delivered software that is subject to a license.

If software delivered by the Contractor incorporates software that is subject to
an open source license that provides implementation guidance, then the
Contractor must ensure compliance with that guidance. If software delivered by
the Contractor incorporates software that is subject to an open source license
that does not provide implementation guidance, then the Contractor must attach
or include the terms of the license within the work itself, such as in code
comments at the beginning of a file, or in a license file within a software
repository.

In addition, the Contractor must obtain written permission from CMS before
incorporating into the delivered software any software that is subject to a
license that does not qualify under the Open Source Definition promulgated by
the Open Source Initiative. If CMS grants such written permission, then the
Contractor’s rights to use that software must be promptly assigned to CMS.
