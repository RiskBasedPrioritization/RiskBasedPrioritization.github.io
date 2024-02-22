# Takeaways

!!! abstract "Overview"
    
    Throughout this guide, the building blocks for Risk Based Prioritization have been detailed and analyzed.
    
    In this final section, we summarize the Takeaways and provide specific recommendations and options to implement Risk Based Prioritization.

    Code and analysis is provided for Acme Inc CVEs. You can apply the same code and analysis for your CVEs. TODO 

    Code and analysis is provided for 3 schemes to allow comparison and refinement: (TODO)

    1. CVSS Temporal & Threat Metrics
    2. CVSS Base Score Ratings with Exploitation Focus (TODO code and analysis for this)
    3. SSVC Decision Trees

    Public data is used, but it can be easily augmented with commercial CTI.


    !!! warning 

        "The guidance here is highly opinionated and prescriptive and applied to a user context.
        At the beginning of the guide it was stated that [the "writing style" in this guide is "succinct and opinionated"](../introduction/Introduction.md#writing-style).
        
        This section "leads with an opinion", and associated rationale.



## Risk Based Prioritization Scheme for First Pass Triage

<figure markdown>
![Image title](../assets/images/stages.png)
<figcaption>The scope for this guide is up to and including the First Pass Triage</figcaption>
</figure>

CVE data is public.

CVE Enrichment

* a commercial CTI solution is recommended 
    * while it can be done using public data (as shown in the code for this guide), there's a lot of effort in getting current, comprehensive CTI.
* should include data from your organization (e.g. Incident Response, Bug Bounty, PenTesting findings) to inform Risk



## Requirements for a Risk Based Prioritization Scheme for First Pass Triage

1. **Effective Prioritization**
      1. [Focus on Exploitation](../risk/Understanding_Risk.md#where-cvss-epss-cisa-kev-fit), and include the other Risk Factors
      2. The output (score/rating) should be wedge shaped with the sharp end representing the high risk end i.e. there should be a relatively small number of CVEs at the top end of risk.
2. **Understandable**
      1. The rationale, and preferably the requirements or problem statement, should be stated so it's clear what problem the solution is trying to solve, and the rationale for how it solves it.
      2. Given the output (score/rating), it should be possible to easily and uniquely identify the input parameters(s), and the contribution of the input parameters(s) values to the output.
      3. A non-technical person should be able to understand it
3. **Independent**
      1. Prefereably uses Public information
      2. Not dependent on a specific Tool or Vendor or the data from it
         1. Many CTI vendors provide aggregated curated CTI

## Risk Based Prioritization Summary against Requirements

| Requirement              | CVSS   | Qualys | SSVC Decision Tree |
|--------------------------|--------|--------|--------------------|
| Effective Prioritization | :x:    | ✅ | ✅            |
| Understandable           | :x:    | ✅ | ✅            |
| Independent              | ✅ | ✅ | ✅             |


### CVSS Temporal & Threat Metrics

It is possible to combine all the key risk factors into an overall CVSS score but...
!!! quote

    The convenience of a single CVSS score comes with the cost of not being able to understand or differentiate between the risk factors from the score, and not being able to prioritize effectively using the score.

    [CVSS](../cvss/CVSS.md)

But if you do chose this option then, see "Enriching the NVD CVSS scores to include Temporal & Threat Metrics" project referenced in [CVSS](../cvss/CVSS.md).


### CVSS Base Score Ratings with Exploitation Focus

[Qualys TruRisk Approach](../vendors/Qualys.md#in-depth-look-into-data-driven-science-behind-qualys-trurisk) is a good starting point. Any organization can apply this approach or similar.

EPSS should be included to inform "likelihood of exploitation".

* TODO provide code to implement this or similar

### SSVC Decision Trees

[SSVC](../ssvc/SSVC.md) Decision Trees can give more granularity than combining CVSS Ratings and Explotation factors i.e. better Risk Based Prioritization.

The CVSS Base score parameters are used instead of CVSS scores.

* Reference Code is provided in this guide.
### Proprietary
If you **implement** a proprietary Risk Based Prioritization scheme, keep the following in mind:

!!! quote

    Any person can invent a security system so clever that she or he can't think of how to break it.

    [Schneier's Law](https://en.wikipedia.org/wiki/Bruce_Schneier#:~:text=The%20law%20is%20phrased%20as,of%20how%20to%20break%20it.)

If you **use** a proprietary third-party Risk Based Prioritization scheme, keep the [requirements](#requirements-for-a-risk-based-prioritization-scheme-for-first-pass-triage) above, and the following, in mind:

!!! warning

    Beware of claims of "secret sauce", "special Intellectual Property", "unique proprietary intel" as reasons to prevent you understanding the Risk Based Prioritization scheme.

!!! success "Takeaways"
    1. Prioritizing vulnerabilities that are being exploited in the wild, or are more likely to be exploited, reduces the
          1. cost of vulnerability management
          2. risk by reducing the time adversaries have access to vulnerable systems they are trying to exploit
    2. Either [CVSS Base Score Ratings with Exploitation Focus](#cvss-base-score-ratings-with-exploitation-focus) or  [SSVC Decision Trees](#ssvc-decision-trees), that [Focus on Exploitation](../risk/Understanding_Risk.md#where-cvss-epss-cisa-kev-fit), are good starting points or references for a Risk Based Prioritization scheme.
    3. Apply a Risk Based Prioritization scheme based on your environment, and refine it based on your data.

 


