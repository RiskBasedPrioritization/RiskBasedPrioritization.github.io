# Applying EPSS to your environment

!!! abstract "Overview"

    In this section we look at some of the considerations in interpreting EPSS scores for CVEs in YOUR environment:

    - Type of Environment where EPSS works best
    - Types of CVEs that EPSS works best for

## EPSS for YOUR Environment

The [EPSS Model](https://www.first.org/epss/model) ground truth and validation is based on exploitation observations from
network- or host-layer intrusion detection/prevention systems (IDS/IPS),
and honeypots, deployed globally at scale by the EPSS commercial data
partners.

The EPSS score is the likelihood the observations will contain a
specific CVE in the next 30 days in this **"EPSS Environment"**. 

- The EPSS score for a CVE does not depend on count of observations i.e. 1 or many observations results in the same score.

!!! tip "If YOUR environment is similar to the EPSS model environment, then a similar probability of exploitation activity should apply to YOUR environment, and therefore the EPSS scores for the CVEs in your environment."


    !!! quote
        Organizations should measure and validate the usefulness of EPSS in their environments. No organization should assume that its environment matches the data used to train EPSS. However, many organizations’ environments should be a near-enough match.  

        [Probably Don’t Rely on EPSS Yet](https://insights.sei.cmu.edu/blog/probably-dont-rely-on-epss-yet/), Jonathan Spring, June 6, 2022

### Enterprise Environment

!!! tip "EPSS is best suited to enterprise environments"
    

    !!! quote
        Similarly, these detection systems will be typically installed on
        public-facing perimeter internet devices, and therefore less suited to
        detecting computer attacks against internet of things (IoT) devices,
        automotive networks, ICS, SCADA, operational technology (OT), medical
        devices, etc

        [Enhancing Vulnerability Prioritization: Data-Driven Exploit Predictions with Community-Driven Insights](https://arxiv.org/pdf/2302.14172.pdf), Feb 2023

### Network Attacks

Vulnerabilities that are remotely exploitable (i.e. Network Attack
Vector in CVSS Base Score terms) have a higher Exploitability (CVSS Base
Score Exploitability metrics group)  

1.  remotely exploitable versus those that require physical or local
    proximity.
2.  can be exercised automatically over the network without requiring
    user-interaction (e.g. clicking a button or a link).

EPSS is best suited to these types of vulnerabilities.

!!! quote
    Moreover, the nature of the detection devices generating the events
    will be biased toward detecting network based attacks, as opposed to
    attacks from other attack vectors such as host-based attacks or
    methods requiring physical proximity

    [Enhancing Vulnerability Prioritization: Data-Driven Exploit Predictions with Community-Driven Insights](https://arxiv.org/pdf/2302.14172.pdf), Feb 2023


!!! example

    At the time of writing this guide, [CISA Warns of Active Exploitation Apple iOS and macOS Vulnerability](https://thehackernews.com/2024/02/cisa-warns-of-active-exploitation-of.html).

    This CVE has a consistently low EPSS score near zero [(https://api.first.org/data/v1/epss?cve=CVE-2022-48618&scope=time-series)](https://api.first.org/data/v1/epss?cve=CVE-2022-48618&scope=time-series).

    This is to be expected because the CVE Attack Vector is "Local", not Network, per [(https://nvd.nist.gov/vuln/detail/CVE-2022-48618)](https://nvd.nist.gov/vuln/detail/CVE-2022-48618) 

## False Positives and Negatives

As with any tool, with these IDS/IPS and honeypot exploitation
observations used to feed the EPSS model, there will be False Positives (though these are typically
low with signature-based detection systems), and False Negatives:

!!! quote
    Any signature-based detection device is only able to alert on events
    that it was programmed to observe. Therefore, we are not able to
    observe vulnerabilities that were exploited but undetected by the
    sensor because a signature was not written.

    [Enhancing Vulnerability Prioritization: Data-Driven Exploit Predictions with Community-Driven Insights](https://arxiv.org/pdf/2302.14172.pdf), Feb 2023

The
<u><a href="https://www.first.org/epss/model" rel="nofollow">EPSS Model</a></u>
uses the attributes of each vulnerability to predict exploitability (and
not the exploitation observations which are for training and validation
only)

-   So if a vulnerability is rated low, that's because it shares
    attributes (or lack of attributes) with many of the non-exploited
    vulnerabilities.
-   Conversely, if it's rated high, it has shared qualities with
    vulnerabilities that have historically been exploited.

This partially compensates for the False Positives and False Negatives
from the IDS/IPS and honeypot exploitation observations, and the
Exploitation Types and Environment that EPSS is less suited for.

  




#### EPSS Percentile Score for your Environment

The number of CVEs found in your environment will be a subset of all
published CVEs, and will depend on:

1.  the technology stacks in your environment
2.  your ability to detect these CVEs

!!! note "EPSS does not differentiate between 1 detection of a CVE versus many"
    EPSS does not differentiate between 1 instance of a CVE versus many
    i.e. in an organization, there may be many instances of a small
    number of CVEs, and then fewer instances of other CVEs.

    -  E.g. if there's a CVE in a software component that's pervasive
        in your organization, there will be many counts of that CVE. 
    -  Your Remediation effort will be based on the counts per CVEs in
        your environment

Percentiles are a direct transformation from probabilities and provide a measure of an EPSS probability relative to all other scores. That is, the percentile is the proportion of all values less than or equal to the current rank. 

- The EPSS Percentile score is relative to all ~~220K published CVEs
that have an EPSS score.
- A fraction of those CVEs will apply to a typical organization e.g.
~~20K.
- A user is likely more interested in the EPSS Percentile for their
organization - than for all CVEs.
- A CVE's EPSS Percentile could be e.g. 60% - but in the 90% percentile
for the CVEs in the organization (if the organization has few CVEs with
high EPSS score).

!!! tip "Source Code is provided to calculate EPSS percentiles for a list of CVEs"
    The EPSS Percentile is easily calculated for your organization (based on
    the subset of CVEs applicable to your organization and their EPSS
    scores). 

    Source code is provided with this guide to calculate EPSS percentiles for a list of CVEs.


!!! success "Takeaways"        
    
    1. When applying EPSS to your environment, you should understand that EPSS is best suited to 
          1. Enterprise environments
          2. Detect Network attacks
    2. Code is provided to calculate EPSS score percentiles for your environment/CVEs
    3. The EPSS group provides a Coverage, Efficiency, Effort figure showing the tradeoffs between alternative remediation strategies