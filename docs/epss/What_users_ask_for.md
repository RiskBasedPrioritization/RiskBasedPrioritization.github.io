# What Users Ask For

!!! abstract "Overview"
    Any solution should be informed by what the user wants, and the rationale behind the solution implementation. This allows understanding and validation of the solution against the requirements and rationale. 

    In this section, we look at users' requirements as expressed as [User Scenarios and User Stories](../requirements/Requirements.md)

!!! note
    The first step of this Guide was asking users that represent stakeholders/roles to provide their requirements as ([User Scenarios and User Stories](../requirements/Requirements.md), and to introduce the [Design Thinking](https://scaledagileframework.com/design-thinking/) process. Extracts are provided below from [User Scenarios and User Stories](../requirements/Requirements.md).

    - We have not yet iterated on these requirements per [Design Thinking](https://scaledagileframework.com/design-thinking/) to get to the underlying problem definition. It is common for users to express an implementation of what they want - similar to what they know, rather than the underlying reasons why they want it. 

### EPSS Ratings Similar to CVSS

Coming from CVSS, users naturally want/expect similar ratings ala Critical, High, Medium, Low severities.

!!! example "Related User Scenarios and User Stories"

    [Fit EPSS to CVSS Ratings](../requirements/Requirements.md#fit-epss-scores-into-existing-cvss-focused-prioritization-policies)
        
    !!! quote
        This is put into easy-to-understand severity levels that additionally factor in the confidence of the likelihood score and are aligned with the existing Critical, High, Medium, Low severities I am used to from CVSS.

    [Severity Categories](../requirements/Requirements.md#severity-categories)

    !!! quote
        As a Tool Provider I want to provide my customers with not just an EPSS Score, but a standard Severity level that is familiar to me and officially provided by the same organization that provides the scores. Critical, High, Medium, Low are values I understand and can be mapped to existing policies and processes easily - especially for communication to less security-fluent stakeholders.

#### Feedback

CVSS already includes support for Exploitation in [CVSS Exploit Maturity](../risk/Understanding_Risk.md#cvss-exploit-maturity).

* See section [CVSS Exploit Maturity](../cvss/CVSS.md#cvss-exploit-maturity) for more details, including 
    * the limitations of using [CVSS Exploit Maturity](../cvss/CVSS.md#cvss-exploit-maturity) for risk-based prioritization
    * an example project that calculates [CVSS Exploit Maturity](../cvss/CVSS.md#cvss-exploit-maturity) and includes EPSS scores and thresholds


This guide gives alternatives.

In the content below, it will be shown that  

* EPSS allows for effective risk-based prioritization
* The difference in level of effort to remediate issues between EPSS score of ~10% to ~90% is relatively small.
  


### EPSS as the Single Score for Exploitation

!!! quote
    ”Ideally, EPSS scores would factor in already published exploits"

    [Existing Public Exploits](../requirements/Requirements.md#existing-public-exploits)

A similar common request is to

!!!quote
    "set the EPSS score to 1 if there are already published exploits"

#### Feedback
Per [Using EPSS with Known Exploitation](../epss/Introduction_to_EPSS.md#using-epss-with-known-exploitation), EPSS is pre-threat intel and should be used in conjunction with evidence that a vulnerability is being exploited. 
    **EPSS is by design not "the Single Score for Exploitation"**

See https://www.first.org/epss/faq#Everyone-knows-this-vulnerability-has-been-exploited-why-doesn-t-EPSS-score-it-at-100

Per [CVSS](https://www.first.org/cvss/v4.0/specification-document#Threat-Metrics):
!!! quote
    it is recommended to use multiple sources of threat intelligence as many are not comprehensive.

Technically a Single Score exists that includes Exploitation and Severity:

* CVSS already includes support for Exploitation in [CVSS Exploit Maturity](../risk/Understanding_Risk.md#cvss-exploit-maturity).
* See section [CVSS Exploit Maturity](../cvss/CVSS.md#cvss-exploit-maturity) for more details, including 
    * the limitations of using [CVSS Exploit Maturity](../cvss/CVSS.md#cvss-exploit-maturity) for risk-based prioritization
    * an example project that calculates [CVSS Exploit Maturity](../cvss/CVSS.md#cvss-exploit-maturity) and includes EPSS scores and thresholds

This guide gives alternatives.


### Confidence Level of EPSS Scores

!!! example "Related User Scenarios and User Stories"

    [Confidence Level of EPSS Scores](../requirements/Requirements.md#confidence-level-of-epss-scores)

    !!! quote
        As a Tool Provider I want to provide my customers with not just an EPSS Score, but the Confidence level of that assessment. The estimation of score accuracy has a direct impact on my ability to de-prioritize lower EPSS scores. Low Confidence should ideally be communicated, and ideally influence Severity levels.

#### Feedback
Throughout this guide, it's been shown that in some cases EPSS scores will be persistently low even when there is evidence of exploitation e.g. 

* [Microsoft Exploitability Index](../vendors/Microsoft_Exploitability_Index.md)
* [Qualys](../vendors/Qualys.md)
* [CISA KEV](../cisa_kev/cisa_kev.md)
* [Applying EPSS to your environment](Applying_EPSS_to_your_environment.md)

This evidence of exploitation exists outside the EPSS model and EPSS should be used in conjunction with evidence of exploitation. 

In other words, the EPSS model can't give a confidence level on overall exploitation.

!!! quote
    If there is evidence that a vulnerability is being exploited, then that information should supersede anything EPSS has to say, because again, EPSS is pre-threat intel. If there is an absence of exploitation evidence, then EPSS can be used to estimate the probability it will be exploited. 
    
    https://www.first.org/epss/faq


### EPSS to Guide My Effort in My Environment

!!! example "Related User Scenarios and User Stories"

    [Focused Vulnerability Fix Requirements](../requirements/Requirements.md#focused-vulnerability-fix)

    [My Effort in My Environment](../requirements/Requirements.md#my-effort-in-my-environment)

#### Feedback

These points will be covered in the [EPSS Thresholds](./EPSS_Thresholds.md) section. 



