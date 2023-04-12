import React, { useState, Fragment } from 'react';
import { HelpDrawer, Button } from '@cmsgov/design-system';
import { ChevronRight } from './Icons';

const StandardsAndConditionsHelpDrawer = () => {
  const [open, toggleOpen] = useState(false);

  return (
    <Fragment>
      <div className="ds-u-display--flex ds-u-justify-content--start ds-u-align-items--center">
        <Button
          variation="transparent"
          onClick={() => toggleOpen(true)}
          className="ds-u-padding-left--0"
        >
          Review Standards and Conditions Regulation <ChevronRight />
        </Button>
      </div>
      {open && (
        <HelpDrawer
          heading="Standards and Conditions Help"
          onCloseClick={() => toggleOpen(false)}
          isHeaderSticky={true}
          isFooterSticky={true}
          footerBody={
            <Fragment>
              <div className="ds-u-padding-bottom--1">
                <strong>For more details on this regulation.</strong>
                <br />
                <a
                  href="https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-C/part-433/subpart-C/section-433.112"
                  target="_blank"
                  rel="noreferrer"
                >
                  Review 42. CFR 433.112 documentation
                </a>
              </div>
            </Fragment>
          }
        >
          <strong>
            An Excerpt 42 CFR 433.112 and Additional Conditions for Enhanced
            Funding
          </strong>
          <p>
            (1) CMS determines the system is likely to provide more efficient,
            economical. and effective administration of the State plan.
          </p>
          <p>
            (2) The system meets the system requirements, standards and
            conditions, and performance standards in Part 11 of the State
            Medicaid Manual, as periodically amended.
          </p>
          <p>
            (3) The system is compatible with the claims processing and
            information retrieval used in the administration of Medicare for
            prompt eligibility verification and for processing claims for
            persons eligible for both programs.
          </p>
          <p>
            (4) The system supports the data requirements of quality improvement
            organizations established under Part B of title XI of the Act.
          </p>
          <p>
            (5) The State owns any software that is designed, developed,
            installed or improved with 90 percent FFP.
          </p>
          <p>
            (6) The Department has a royalty free, non-exclusive. and
            irrevocable license to reproduce, publish, or otherwise use and
            authorize others to use, for Federal Government purposes, software,
            modifications to software, and documentation that is designed,
            developed, installed or enhanced with 90 percent FFP.
          </p>
          <p>
            (7) The costs of the system are determined in accordance with the 45
            CFR 75, subpart E.
          </p>
          <p>
            (8) The Medicaid agency agrees in writing to use the system for the
            period of time specified in the advance planning document approved
            by CMS or for any shorter period of time that CMS determines
            justifies the Federal funds invested.
          </p>
          <p>
            (9) The agency agrees in writing that the information in the system
            will be safeguarded in accordance with subpart F, part 431 of this
            subchapter.
          </p>
          <p>
            (10) Use a modular, flexible approach to systems development,
            including the use of open interfaces and exposed application
            programming interfaces; the separation of business rules from core
            programming, available in both human and machine readable formats.
          </p>
          <p>
            (11) Align to, and advance increasingly, in MITA maturity for
            business, architecture, and data.
          </p>
          <p>
            (12) The agency ensures alignment with, and incorporation of,
            industry standards adopted by the Office of the National Coordinator
            for Health IT in accordance with 45 CFR part 170, subpart B: The
            HIPAA privacy, security and transaction standards; accessibility
            standards established under section 508 of the Rehabilitation Act,
            or standards that provide greater accessibility for individuals with
            disabilities, and compliance with Federal civil rights laws;
            standards adopted by the Secretary under section 1104 of the
            Affordable Care Act; and standards and protocols adopted by the
            Secretary under section 1561 of the Affordable Care Act.
          </p>
          <p>
            (13) Promote sharing, leverage, and reuse of Medicaid technologies
            and systems within and among States.
          </p>
          <p>
            (14) Support accurate and timely processing and
            adjudications/eligibility determinations and effective
            communications with providers, beneficiaries, and the public.
          </p>
          <p>
            (15) Produce transaction data, reports, and performance information
            that would contribute to program evaluation, continuous improvement
            in business operations, and transparency and accountability.
          </p>
          <p>
            (16) The system supports seamless coordination and integration with
            the Marketplace, the Federal Data Services Hub, and allows
            interoperability with health information exchanges, public health
            agencies, human services programs, and community organizations
            providing outreach and enrollment assistance services as applicable.
          </p>
          <p>
            (17) For E&E systems, the State must have delivered acceptable
            MAGI-based system functionality, demonstrated by performance testing
            and results based on critical success factors, with limited
            mitigations and workarounds.
          </p>
          <p>
            (18) The State must submit plans that contain strategies for
            reducing the operational consequences of failure to meet applicable
            requirements for all major milestones and functionality.
          </p>
          <p>
            (19) The agency, in writing through the APD, must identify key state
            personnel by name, type and time commitment assigned to each
            project.
          </p>
          <p>
            (20) Systems and modules developed, installed or improved with 90
            percent match must include documentation of components and
            procedures such that the systems could be operated by a variety of
            contractors or other users.
          </p>
          <p>
            (21) For software systems and modules developed, installed or
            improved with 90 percent match, the State must consider strategies
            to minimize the costs and difficulty of operating the software on
            alternate hardware or operating systems.
          </p>
          <p>
            (22) Other conditions for compliance with existing statutory and
            regulatory requirements, issued through formal guidance procedures,
            determined by the Secretary to be necessary to update and ensure
            proper implementation of those existing requirements.
          </p>
        </HelpDrawer>
      )}
    </Fragment>
  );
};

export default StandardsAndConditionsHelpDrawer;
