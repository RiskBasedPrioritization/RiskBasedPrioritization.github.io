# Requirements

Different stakeholders have different needs. These
are captured here and used to inform the solution.



## Personas

### Product Engineer
!!! userstory "Responsible for Finding and Fixing vulnerabilities in the software Products that they develop"


    ~80% of the software in these Products is Open Source Software -
        and has associated CVEs and Zero Days.

    **Represents**: the technical roles: Developer, Product Security,
    DevSecOps

### Security Manager
!!! userstory "Responsible for delivering value for the organization - and focused on Time-To-Value"


    'Wants to optimize the flow of software/value versus security risk.

    **Represents:** the non-technical business roles: includes CISO
### Cyber Defender
!!! userstory "Responsible for defending an organization from cyber security attacks."

    Represents: network defenders,  IT/infosec

### Tool Provider
!!! userstory "Provide tools to help vulnerability risk management"

    Represents: Tool providers: Tool Vendors, open source
    tools,...

### Audit and Compliance

!!! userstory "Responsible for ensuring Products are compliant with regulation and security requirements for their organization"
    Includes internal GRC and industry e.g. PCI.

    **Represents:** Audit, Compliance

### Risk Management
!!! userstory "Responsible for ensuring the policies are defined and signed-off"

    Policies signed-off by various teams (development, security, compliance) and
    works alongside the regulatory requirements.

    **Represents:** Risk

### Cyber Insurance
!!! userstory "Responsible for cybsersecurity insurance (the Risk Transfer part of risk)"

    **Represents:** cybsersecurity insurance and underwriting process

------------------------------------------------------------------------

## User Scenarios

User scenarios are representative of real problems for the majority of
users i.e. the most common scenarios. They give a rich scenario-specific
context and should be written by real users.

It is useful to describe a scenario from 2 perspectives: how things look
now, and how the user would like things to look in the future
(aspirational).


### Find and remediate Vulnerabilities By Risk

!!! userstory "Product Engineer - DevOps:Find and remediate Vulnerabilities By Risk"


    **Background**: There are several tools and services running in the
    DevOps pipeline that detect vulnerabilities in OSS (Open Source
    Software)

    -   Most, but not all, of these have CVEs
    -   The CVEs are in the application OSS code, and the underlying stack
        (Container and Operating Systems OSS code)
    -   A relatively small number of vulnerabilities account for the
        majority of the count of vulnerabilities e.g. there may be 1000's of
        a few CVEs but 10 or less of most CVEs.
    -   All the tools support CVSS, some support EPSS more recently (though
        the tool vendor did not provide guidance on how to use EPSS)

    **Objective**: Optimize the flow of software through the DevOps pipeline
    versus security risk. 

    →  Gather vulnerabilities reported by several tools across the DevOps
    pipeline

    →  Vulnerabilities are prioritized based on risk

    → Data sources for risk are defined

    **Narrative**: 

    **Pre-Narrative** <sub>*(how things are now)*</sub>

    As a Product Engineer, I’m drowning in a sea of CVEs! They just keep
    coming, more and more every year - it’s relentless!

    We use CVSS because our:

    -   tools report CVSS scores.

    But most CVEs have a high CVSS score, so we have to remediate most things.
    It’s whack-a-mole!

    I don’t have a good understanding of all the tools in our DevOps
    pipeline and the vulnerability data they produce. And I don’t know how
    to get it. DevOps Tools don’t help us here.

    

    **Post-Narrative**
    <sub>*(how we want things to be in the future - aspirational)*</sub>

    As a Product Engineer, I care most about my effort vs risk i.e. the
    effort to remediate the vulnerabilities in my environment.

    I use EPSS as a key part of my risk-based prioritization (along with
    Reachability analysis, and Exploratory Data Analysis to understand the
    root systemic causes for my CVEs).

    **Overall, applying these 3 independent measures, I get a 10x reduction in effort and CVEs to fix! Now we’re sailing!**

### Get teams to focus on the real issues (based with real facts and trending) issues and bring the collective risk down for my organization.

!!! userstory "Security Manager - Get teams to focus on the real issues"

    **Background**: CVEs provide a standardized way to identify and track
    security vulnerabilities across software, services, hardware, SaaS,
    APIs, etc. CISOs use CVEs to assess the level of risk associated with
    specific vulnerabilities. The number of CVEs typically indicate the
    overall security landscape and help prioritize which vulnerabilities
    should be addressed first.

    **Pre-Narrative** <sub>*(how things are now)*</sub>

    CISOs are constantly subject to allocate their limited resources effectively. Knowing the number of CVEs on hand helps them determine where to focus their efforts. High-severity vulnerabilities with a large number of reported CVEs may take precedence over others, as they pose a greater risk.

    The greater the organization, the more complex the situation gets.

    If this is not enough, CISOs and directs constantly have a battle with Business, Engineering, Applications teams to provide evidence why a CVE needs to be fixed. Existing scoring like CVSS3 having limitations. Although bigger organizations have access to Threat Intel where CVSS can be married to the threat intel feeds, but this is usually a pipe dream for SMBs or organizations with reduced security budgets.</sub>

    **Post-Narrative**
    <sub>*(how we want things to be in the future - aspirational)*</sub>

    Taking EPSS along with Business Context into account will really help organizations to sift through the CVEs. Focus from VM and Applications teams can be tailored towards fixing the most critical of issues. This will also help with the conversation with Business and App Teams, and reduce (if not eliminate) friction between Security and non-security Teams.</sub>

    

### Fit EPSS scores into existing CVSS-focused Prioritization Policies

!!! userstory "Tool Provider - Fit EPSS scores into existing CVSS-focused Prioritization Policies"

    **Background**: Our software provides many risk factors that combine via
    customizable policies to prioritize the risks that matter most. EPSS is
    a newer factor, and needs to both fit into our customer’s existing
    processes and be easy to understand

    **Objective:** Fit EPSS scores into existing CVSS-focused prioritization
    policies without extensive explanation

    **Pre-Narrative** <sub>*(how things are now)*</sub>  
    As a <u>Tool Provider</u>, our customers look to us to provide a
    prioritized perspective on the relative risk of the great many
    vulnerabilities detected in their applications. The current (admittedly
    immature) state of most customers is to prioritize solely on CVSS score
    or Category with policies such as “Remediate all High and Critical
    Severity Vulnerabilities. More mature customers include other risk
    factors our tool provides, such as whether the vulnerable method is
    reachable in a stack trace (Reachability Analysis).

    **Post-Narrative**
    <sub>*(how we want things to be in the future - aspirational)*</sub>

    As a <u>Tool Provider</u>, I can deliver to my customer the data
    necessary to utilize EPSS scores in their existing context without
    significant additional factors or extensive explanation.  
    My customers are provided with whether a public exploit already exists,
    and if not, what the likelihood of a public exploit existing in the near
    future is. This is put into easy-to-understand severity levels that
    additionally factor in the confidence of the likelihood score and are
    aligned with the existing Critical, High, Medium, Low severities I am
    used to from CVSS.



### Compliance Prioritized by Risk

!!! userstory "Audit and Compliance - Compliance Prioritized by Risk"

    **Background**: There are industry requirements to remediate CVEs above a
    certain CVSS score.

    -   e.g. PCI DSS 4.0 11.3.2.1 “External vulnerability scans are
        performed after any significant change as follows: Vulnerabilities
        that are scored 4.0 or higher by the CVSS are resolved.”

    **Narrative**: Compliance Requirement to Remediate CVEs above a certain CVSS score

    **Pre-Narrative** <sub>*(how things are now)*</sub>

    As a <u>Compliance Analyst</u>, we are required to comply with certain
    regulations that prescribe remediation based on the CVSS score of a
    vulnerability when externally facing. ~~Is this feasible?~~ There is no
    allowance for asset or organization specific variation in patching
    threshold. This rigid vulnerability management practice places an unfair
    burden on cyber defenders constraining their ability to target their
    effort proportional to the threat against a specific asset. A
    <a href="https://csrc.nist.gov/glossary/term/PII" rel="nofollow">PII</a>
    database is likely to be subjected to more threat than the canteen menu.

    
    **Post-Narrative**
    <sub>*(how we want things to be in the future - aspirational)*</sub>

    Even though we need to remediate all CVEs above a certain CVSS score,
    we prioritize CVEs by risk so we remediate the highest risk ones first.
    In other words, we focus on security and compliance. EPSS scores help in
    prioritization efforts.~~

    A guidance on calculating asset and organization specific patching
    threshold based on EPSS, informed by SSVC and Open FAIR<sup>TM</sup>. 
    This approach can be adopted, for example, under PCI DSS V4 Customized
    Approach assessment method (<a
    href="https://blog.pcisecuritystandards.org/pci-dss-v4-0-is-the-customized-approach-right-for-your-organization"
    rel="nofollow">https://blog.pcisecuritystandards.org/pci-dss-v4-0-is-the-customized-approach-right-for-your-organization</a>)

### Prioritized by EPSS score and remediated accordingly

!!! userstory "Risk Management - Prioritized by EPSS score and remediated accordingly"

    Across the board, there is an expectation to remediate CVEs
    above a certain CVSS score. Usually, a CVSS score of 7 and over. With
    adopting EPSS scores in the risk program, the EPSS threshold needs to be
    defined in the organization policies.

    **Narrative**: Update the policy documentation to Remediate CVEs above a certain EPSS threshold

    **Pre-Narrative** <sub>*(how things are now)*</sub>

    Right now, there is a handful of organizations really taking EPSS into
    consideration as a prioritization tool. EPSS threshold is a thought and
    there is no industry wide consensus of what an optimal EPSS threshold
    is. Additionally, such guidance is also included from the regulatory
    bodies as an acceptable metric. 

    
    **Post-Narrative**
    <sub>*(how we want things to be in the future - aspirational)*</sub>

    Taking EPSS along with Business Context into account will really help organizations to sift through the CVEs. A clear policy not only needs to be defined and accepted by different functions in the organizations, the process of prioritization needs to be automated to consider business context, criticality of the application. Defining and making sure there is acceptance via the policies will reduce (if not eliminate) friction between Security and non-security Teams.

### Provide users of the solution a roadmap and priority list of vulnerabilities to address as the landscape evolves

!!! userstory "Risk Management - Provide users of the solution a roadmap and priority list of vulnerabilities to address as the landscape evolves"

    How EPSS is deployed and can be used by a tool vendor to assist with
    vulnerability prioritization at scale. EPSS can provide additional
    embellishment/metadata of a discovered vulnerability and focus and
    organization efforts on what to remediate first. 

    **Background**

    Current state of play: 

    Most cyber security teams are drowning in CVE's and high scoring CVSS
    (Common Vulnerability Scoring System). This is the result of treating
    vulnerabilities with little or no context. The intelligent approach is
    to address vulnerabilities based on risk of breach. Which vulnerabilities
    should I address to lower the probability of breach?   

    A vulnerability management programme should be designed in such a way
    that weaknesses and risks to an organization are addressed first. The
    reality of vulnerability management and mitigation is that "we can’t fix
    all the vulnerabilities". This is due to resource, cost and value
    considerations. It makes no financial sense focusing on fixing all
    vulnerabilities faced by an organization, there are generally too many.
    When mitigating vulnerabilities and protecting an organization attention
    needs to be paid to vulnerabilities which have a significant statistical
    chance of being exploited and damaging an enterprise. The return on
    investment of addressing vulnerabilities which have a low probability of
    being used in a breach attempt is extremely low and wasteful of limited
    resources. Unfortunately some compliance frameworks require
    vulnerabilities to be mitigated regardless of the probability of breach,
    EPSS does not solve this blunt approach to cyber resilience. 

    **Objective**

    Provide users of the solution a roadmap and priority list of
    vulnerabilities to address as the landscape evolves.  
    The landscape is a twofold beast;

    1.  Technology changes over time, change introduces risk which may
        introduce weakness and vulnerability. Today’s secure system may be
        insecure tomorrow due to an unknown vulnerability being discovered.
        This is not uncommon and a continuous challenge..
    2.  The threat actor landscape can evolve, approach to breach &
        cybercriminality and tooling used by threat actors can change the
        priority of a vulnerability. Today threat actors and industrialized
        cybercrime are focusing and commonly using CVE-2023-XYZ, tomorrow
        this may change and additional vulnerabilities may be used in
        addition. 

    
    Most medium sized organizations and enterprises have tens, if not
    hundreds, of open vulnerabilities. Most organizations have a stretched
    cyber security team and product development teams should be focusing on
    new product not retrofitting. These challenges combined, result in not
    having the ability to remediate all the vulnerabilities all the time. We must
    be able to prioritize based on real-world data. Vulnerability severity
    score alone does not necessarily mean such a vulnerability is commonly
    used to breach a system.  EPSS can be used to provide real-world breach
    prediction metadata per vulnerability in order to guide an organization
    on which issues need to be addressed first relative to the long backlog
    of vulnerabilities most organization are faced with.   

    It's not uncommon to combine EPSS with other vulnerability severity
    rating metadata, In the case of Edgescan this is CISA KEV (CISA Known
    Exploitable Vulnerability Catalog), CVSS (Common Vulnerability Scoring
    System) and  in the case of Edgescan, EVSS (Edgescan Validated Security
    Score). Combining such metadata can provide much higher fidelity in
    terms of prioritization. 

    **Narrative**

    Vulnerability management programmes generally have a number of metrics
    to measure by. Most common are CVSS, A tool risk score (generally
    without context), Vulnerability age (date opened/date closed), to name a
    few....

    Context: Generally speaking using CVSS alone is a blunt instrument as it
    does not have any context in relation to the business value of the
    vulnerable asset, chance of breach is ignored etc. CVSS is still used
    for compliance (such as PCI DSS) and simple ordering of vulnerabilities
    relative to each other. EPSS does not have business context but has
    breach probability. When breach probability is combined with internal
    metadata such as asset importance this can hugely assist with
    prioritization.

    Independence: A value-add of EPSS is the fact that the data is derived
    by an independent third party with greater reach than most private or
    proprietary risk models.  It reflects the real world without any
    commercial bias; this is important.

### Knowing Risk for a Vulnerability Before or Without a CVE

!!! userstory "Any - Knowing Risk for a Vulnerability Before or Without a CVE"

    **Background**: 

    Many vulnerabilities don't have CVEs but represent a real risk - these
    include, but are not limited to, zero-days.

    Per The State of Exploit Development: 80% of Exploits Publish Faster
    than CVEs

    -   *Of the 45,450 public exploits in Exploit Database, there are 11,079
        (~26%) exploits in Exploit Database that have mapped CVE numbers.*
    -   *Among those 11,079 exploits:*
        -   *14% are zero-day (published before the vendors release the
            patch), 23% are published within a week after the patch release
            and 50% are published within a month after the patch release. On
            average, an exploit is published 37 days after the patch is
            released. Patch as soon as possible – the risk of a
            vulnerability being exploited increases quickly after vendors
            release the patches.*
        -   *80% of public exploits are published before the CVEs are
            published. On average, an exploit is published 23 days before
            the CVE is published. Software and hardware may also have
            vulnerabilities with public exploits that don't have CVEs. Check
            security updates from vendors frequently and apply updates as
            soon as possible.*

    Per Focus on the Biggest Security Threats, Not the Most Publicized,
    Gartner, Nov 2017

    -   *Zero day vulnerabilities made up only approximately 0.4% of
        vulnerabilities during the past decade.*
    -   *The amount spent on trying to detect them is out of kilter with the
        actual risks they pose. This is compared with the massive numbers of
        breaches and infections that come from a small number of known
        vulnerabilities that are being repeatedly exploited.*
    -   *As a top priority, focus your efforts on patching the
        vulnerabilities that are being exploited in the wild or have
        competent compensating control(s) that can. This is an effective
        approach to risk mitigation and prevention, yet very few
        organizations do this.*

    

    **Narrative**: 

    **Pre-Narrative** <sub>*(how things are now)*</sub>

    When a zero-day drops, it takes days before "the dust settles and there
    is clarity" on the risk associated with the vulnerability.

    It's typically a manual exercise repeated simultaneously by many
    individuals across organizations in the dark.

    

    I don't have a good overall risk rating or prioritization (including
    exploitation probability) for my vulnerabilities

    → For vulnerabilities without CVEs, I don't have a good "risk rating"
    (including exploitation probability).

    → If only *~26% of vulnerabilities have CVEs, I don't have a good "risk
    rating" (including exploitation probability) for the other ~74%!*

    *→* Am I "<u><a
    href="https://www.phrases.org.uk/meanings/rearranging-the-deckchairs-on-the-titanic.html?expand_article=1"
    rel="nofollow">Rearranging deckchairs on the Titanic</a></u>" by only
    focusing on Risk Based Prioritization of vulnerabilities with CVEs?

    

    **Post-Narrative**
    <sub>*(how we want things to be in the future - aspirational)*</sub>

    As <u>Any</u>, I can assess the risk associated with <u>any
    vulnerability</u> based on the meta-data / parameters for that
    vulnerability.

    This "risk rating" (including exploitation probability) is available via
    a unique globally recognized identifier for that vulnerability e.g.
    OSVD, GHSA, CVE....

    I recognize that this "risk rating" is very volatile initially in the
    case of zero-days - but it is fresh (reflects current known
    information - which changes significantly in the first few days of a
    zero-day)

    I now have a holistic view of risk (including exploitation probability)
    for all known vulnerabilities!

### 

!!! userstory "Any - A Holistic Unified View of Risk"



    **Background**: 

    "Risk is per Asset and depends on Impact of a Vulnerability being
    exploited by a Threat" per Elements of Risk. That asset can be tangible
    (e.g. a server, a facility, etc.) or intangible (e.g. an application, a
    virtual machine, a container, data, etc.). The level(s) that you track
    risk for tangible and intangible assets will depend on your goals and
    objectives. It probably does not make sense to track risk for assets
    that you don't intend to manage. For example, it is probably sufficient
    to track risk at the application level as compared to the component
    level, such as the web server, the app server, the database server,
    etc.) unless different people are responsible for managing each of these
    components. A key point in being able to track risk is to be able to
    measure by area of responsibility whether overall risk is getting better
    or worse and then to be able to drill down into the risk and ascertain
    where the increases and decreases are coming from. 

    Risk can be approached from different perspectives:

    1.  From an organization perspective, the risk associated with the
        assets in the organization
        1.  FAIR and <u><a
            href="https://www.amazon.com/How-Measure-Anything-Cybersecurity-Risk/dp/1119892309"
            rel="nofollow" style="text-decoration: none;text-align: left;">How to
            Measure Anything in Cybersecurity Risk</a></u> (Bayesian)
            are examples of this top-down risk approach
    2.  From a per vulnerability perspective - Generally, based on actual data, such as threats and
        vulnerabilities.
        1.  For a given vulnerability, the Impact of the Vulnerability being
            exploited by a Threat for a given Asset.

    Also, given EPSS is a probability, it is technically possible to combine
    probabilities of Exploitation into an overall probability of
    Exploitation. It doing likelihood calculations, it is important to keep
    in mind that EPSS considers the likelihood of attempted exploitation.
    Even if the exploitation is attempted, it may not actually be
    successful, such as due to reachability issues and compensating
    controls.

    3.  e.g. see "<a
        href="https://www.servicenow.com/community/secops-forum/exploit-prediction-scoring-system-epss-scoring-coming-to/td-p/1296592"
        rel="nofollow">EPSS Can Scale, to Produce System, Network, and
        Enterprise-level Exploit Predictions</a>".

    

    **Objective**: Have a holistic unified view of risk i.e. reconcile the
    Top-down and Bottom-Up view of Risk - and understand Risk in context.

    E.g. taking a recent Research Analysis "Commonalities in Vehicle
    Vulnerabilities" https://ioac.tv/3Pp13bE as an example:

    > Automotive manufacturers and vendors should not hyper-focus on
    > critical-risk and high-risk vulnerabilities, and thus overlook
    > vulnerabilities categorized as medium-risk and below. Attackers are
    > inherently languid, and most exploits discovered in the wild follow
    > the path of least resistance. **Tolerating medium-risk vulnerabilities
    > could lead to a rise in attack chains that achieve a critical
    > compromise** of an automotive component.
    >
    > This paper collects the automotive-related data IOActive has
    > discovered through thousands of testing hours and provides a wide-band
    > analysis of the years 2012 to 2022 via data points such as the impact,
    > likelihood, and overall risk of the vulnerabilities we discovered.

    Understand risk for a given vulnerability in aggregate for

    1.  chained vulnerabilities
    2.  an asset or organization

    

    **Narrative:**

    **Pre-Narrative** <sub>*(how things are now)*</sub>

    As <u>Any</u>, I observe 2 irreconcilable views of Risk - top-down and
    bottom-up. And I don't know how to reconcile these views.

    

    **Post-Narrative**
    <sub>*(how we want things to be in the future - aspirational)*</sub>

    As <u>Any</u>, I can see how to relate the bottom-up view of risk to the
    top-down view, so I have more context to inform my risk-based
    prioritization and remediation.

**Cyber Defender**

!!! userstory "Cyber Defender (CSIRT or ISAC) - Communicate and amplify critical guidance about a vulnerability report to stakeholders for action"


    **Background**: Vulnerability coordinators serve an amplifying role,
    especially for small or medium-sized stakeholders that have limited
    vulnerability report intake and triage capabilities. A CSIRT or ISAC
    should have a defined constituency of stakeholders to which it is
    providing value and services. A CSIRT should provide some (but need not
    be all) of the FIRST CSIRT services. <a
    href="https://www.first.org/standards/frameworks/csirts/csirt_services_framework_v2.1#7-4-Service-Vulnerability-coordination"
    rel="nofollow">CSIRT Services Framework Version 2.1 (first.org)</a>.

    **Objective**: Conduct vulnerability triage (services framework 7.3.1)
    in order to provide useful notifications to stakeholders (services
    framework 7.5.2). Goal is for the CSIRT to provide a limited and finite
    number of alerts to constituents to drive actions on critical
    vulnerabilities that mitigate the risk to the constituency.


    **Narrative:**

    **Pre-Narrative** <sub>*(how things are now)*</sub>

    CSIRTs often obtain pre-release notification of vulnerabilities from
    vendors or other coordination partners. CSIRT staff need to triage
    vulnerability reports for further information gathering and action.
    State of exploitation of the vulnerability is one contributor to triage.

    **Post-Narrative**
    <sub>*(how we want things to be in the future - aspirational)*</sub>

    EPSS can be appropriately integrated into pre-release triage evaluation
    of vulnerabilities.

    

------------------------------------------------------------------------

## User Stories

!!! tip "Writing a User Story"
    A User Story takes the form As a \[type of user\], I want \[some goal\], so that \[some reason\]

    They should be written by real users e.g. the real users representing
    the Personas (not by the people developing the solution)


### Focused Vulnerability Fix
!!! userstory "Focused Vulnerability Fix"

    As a Product **Engineer** and user of any vulnerability detection or
    ranking tool, I want to minimize the False Negatives, and the False
    Positives, so I remediate the vulnerabilities that should be fixed, and only
    the vulnerabilities that should be fixed.

### My Effort in My Environment
!!! userstory "My Effort in My Environment"

    As a Product **Engineer,** I care most about my effort i.e. the effort
    to remediate the vulnerabilities in my environment. My effort is affected by
    counts of instances for a given CVE ID.

### Unified Prioritized Personalized Achievable view 
!!! userstory "Unified Prioritized Personalized Achievable view "
    As a Product Engineer / Security Manager, I want a unified prioritized
    personalized achievable view (across tools and teams) of what to fix
    first

### Know Risk and Remediation
!!! userstory "Know Risk and Remediation"
    As a Security Manager, I want to know risk and remediation per Asset and
    for the organization

  

### Confidence Level of EPSS Scores
!!! userstory "Confidence Level of EPSS Scores"

    As a Tool Provider I want to provide my customers with not just an EPSS
    Score, but the Confidence level of that assessment. The estimation of
    score accuracy has a direct impact on my ability to de-prioritize lower
    EPSS scores. Low Confidence should ideally be communicated, and ideally
    influence Severity levels.

### Severity Categories
!!! userstory "Severity Categories"
    As a Tool Provider I want to provide my customers with not just an EPSS
    Score, but a standard Severity level that is familiar to me and
    officially provided by the same organization that provides the scores.
    Critical, High, Medium, Low are values I understand and can be mapped to
    existing policies and processes easily - especially for communication to
    less security-fluent stakeholders.

### Existing Public Exploits
!!! userstory "Existing Public Exploits"
    As a Tool Provider I want to provide my customers with a complete Public
    Exploit workflow and decision tree without having to add additional data
    feeds beyond EPSS into my application data. For my customers to
    prioritize a given vulnerability based on EPSS, I first have to add a
    separate data feed of known public exploits and the logic chain of “If
    no public exploits, than use EPSS for likelihood to determine priority”
    This requires additional data presented separately in my Tool and can
    lead to customer misunderstandings such as “Why is the EPSS low but you
    are telling me it already has a public exploit?” Ideally, EPSS scores
    would factor in already published exploits and skip this step.

### Remediation SLA
!!! userstory "Remediation SLA"
    As Any, I want to have a Service Level Agreement (SLA) based on risk, so
    there is a clear definition of when a vulnerability should be fixed.

    > In govt space they still rely on remediation SLAs based on CVSS
    > severity. As do many commercial orgs not yet educated to the nuances
    > of determining a vuln severity. I think using fairly common
    > terms/bins/labels would help folks grasp an understanding of EPSS more
    > quickly. Labels/bins are already arbitrary in CVSS but it’s still
    > heavily relied upon.


## People Behind the Personas
|             Persona            |                                                                                                                                                                                                                                                                                                                                                                  Who leads that Persona                                                                                                                                                                                                                                                                                                                                                                  |   |   |
|:------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|---|---|
| **Product Engineer**              | Chris Madden,  Stephen Shaffer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |   |   |
| **Security Manager**               | Aruneesh Salhotra                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |   |   |
| **Cyber Defender**                 | Patrick Dunstan, Jonathan Spring                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |   |   |
| **Tool Provider**                  |  Eoin Keary  https://www.edgescan.com/  Edgescan is the first fully-integrated cybersecurity platform that unifies five robust solutions into a single combative platform. These solutions include: external attack surface management, risk-based vulnerability management, application security testing, API security testing, and pentesting as a service. Edgescan was listed as one of the “notable vendors” for EASM in the Q1 2023 Forrester Landscape for External Attack Surface Management <br><br>Steve Finegan AppSOC  <br><br>Jeffrey Martin Mend.io  SCA/SAST/Image+cloud scanning. The first SCA vendor to support Reachability analysis Mend.io has been recognized as a Visionary in the 2023 Gartner® Magic Quadrant™ for Application Security Testing. |   |   |
| **Audit and Compliance**          | Denny Wan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |   |   |
| **Cyber Insurance**                | Derrick Lewis                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |   |   |
| **Risk Management (Risk Manager)** | Aruneesh Salhotra                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |   |   |
