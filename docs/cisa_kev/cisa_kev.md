# CISA KEV

!!! abstract "Overview"

    This section gives an overview of CISA KEV.

    See also:

    * [Where CVSS, EPSS, CISA KEV Fit](../risk/Understanding_Risk.md#where-cvss-epss-cisa-kev-fit) in the Risk Taxonomy.
    * [EPSS and CISA KEV](../epss/EPSS_and_CISA_KEV.md) for an analysis of CISA KEV CVEs.
    * [Log4Shell Example](../risk/Log4Shell.md) for an example of a CISA KEV entry.

## CISA KEV

!!! quote

    For the benefit of the cybersecurity community and network defenders—and to help every organization better manage vulnerabilities and keep pace with threat activity — CISA maintains the authoritative source of vulnerabilities that have been exploited in the wild: the Known Exploited Vulnerability (KEV) catalog https://www.cisa.gov/known-exploited-vulnerabilities-catalog. 

    The KEV catalog sends a clear message to all organizations to prioritize remediation efforts on the subset of vulnerabilities that are causing immediate harm based on adversary activity. 

    **Organizations should use the KEV catalog as an input to their vulnerability management prioritization framework.**

    Vulnerability management frameworks—such as the Stakeholder-Specific Vulnerability Categorization (SSVC) model—consider a vulnerability's exploitation status.

    https://www.cisa.gov/known-exploited-vulnerabilities 

## Criteria For Cisa To Add A Vulnerability To The Kev Catalog
    
!!! info "There are three criteria for CISA to add a vulnerability to the KEV catalog"

    - The vulnerability has an assigned Common Vulnerabilities and Exposures (CVE) ID.

    - There is reliable evidence that the vulnerability has been actively exploited in the wild.

    - There is a clear remediation action for the vulnerability, such as a vendor-provided update.

!!! info "CISA KEV currently includes ~1.1K CVEs, and defines criteria for inclusion"

    CISA Known Exploited Vulnerabilities Catalog (CISA KEV) is a source of vulnerabilities that have been exploited in the wild.

    - It contains a [subset of known exploited CVEs](../risk/Understanding_Risk.md#how-many-vulnerabilities-are-being-exploited).

    There's several criteria including:

    !!! quote
        "A vulnerability under active exploitation is one for which there is reliable evidence that execution of malicious code was performed by an actor on a system without permission of the system owner." 

        "Events that do not constitute as active exploitation, in relation to the KEV catalog, include:

         * Scanning
         * Security research of an exploit
         * Proof of Concept (PoC)
        
        https://www.cisa.gov/known-exploited-vulnerabilities 

## Applying CISA KEV

!!! quote
    “All federal civilian executive branch (FCEB) agencies are required to remediate vulnerabilities in the KEV catalog within prescribed timeframes under Binding Operational Directive (BOD) 22-01, Reducing the Significant Risk of Known Exploited Vulnerabilities.  Although not bound by BOD 22-01, every organization, including those in state, local, tribal, and territorial (SLTT) governments and **private industry can significantly strengthen their security and resilience posture by prioritizing the remediation of the vulnerabilities listed in the KEV catalogue as well**. CISA strongly recommends all stakeholders include a requirement to immediately address KEV catalogue vulnerabilities as part of their vulnerability management plan.

    https://www.cisa.gov/known-exploited-vulnerabilities 



!!! success "Takeaways"
    1. CISA maintains a catalog of vulnerabilities that have been exploited in the wild.
    2. CISA KEV contains a [subset of known exploited CVEs](../risk/Understanding_Risk.md#how-many-vulnerabilities-are-being-exploited).
    3. Organizations should use this KEV catalog as an input to their vulnerability management prioritization framework to prioritize by Risk.
