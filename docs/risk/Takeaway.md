# Takeaway

TODO TODO
<figure markdown>
![](../assets/images/takeaway.jpg){ width="500" }
<figcaption></figcaption>
</figure>





!!! abstract "Overview"
    
    Throughout this guide, the building blocks for Risk Based Prioritization have been detailed and analyzed.
    
    In this final section, we summarize the Takeaways and provide specific recommendations and options to implement Risk Based Prioritization.

    Code and analysis is provided for Acme Inc CVEs to help understand their CVEs:

    1. The key risk factors
    2. What CVEs are in CISA KEV, Weaponized (Metasploit, Nuclei), PoC (ExploitDB)
    3. The effect of changing the EPSS Threshold
    4. The effect of changing the CVSS Base Score Threshold
    5. EPSS Percentiles
    6. Exploratory Data Analysis of their CVE data
    
    !!! warning 

        "The guidance here is highly opinionated and prescriptive and applied to a user context.
        At the beginning of the guide it was stated that [the "writing style" in this guide is "succinct and opinionated"](../introduction/Introduction.md#writing-style).
        
        This section "leads with an opinion", and associated rationale.

 [User Scenarios and User Stories](../requirements/Requirements.md).

  [Requirements for a Risk Based Prioritization Scheme for First Pass Triage](../introduction/Requirements.md).

    

## Risk Based Prioritization Scheme for First Pass Triage

<figure markdown>
![](../assets/images/stages.png)
<figcaption>The scope for this guide is up to and including the First Pass Triage</figcaption>
</figure>

CVE data is public.

CVE Enrichment

* a commercial CTI solution is recommended 
    * while it can be done using public data (as shown in the code for this guide), there's a lot of effort in getting current, comprehensive CTI.
* should include data from your organization (e.g. Incident Response, Bug Bounty, PenTesting findings) to inform Risk



## Risk Based Prioritization Summary against Requirements

| Requirement              | CVSS   | CVSS Base Score Ratings with Exploitation Focus | SSVC Decision Tree |
|--------------------------|--------|--------|--------------------|
| Effective Prioritization | :x:    | ✅ | ✅            |
| Understandable           | :x:    | ✅ | ✅            |
| Independent              | ✅ | ✅ | ✅             |
| Extensible               | :x: | ✅ | ✅             |


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

 


