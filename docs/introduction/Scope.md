# Scope

!!! abstract "Scope of this Guide"

    The scope for this guide is 

    1. CVEs only - not vulnerabilities that don't have CVEs, not [Zero Days ](../risk/Understanding_Risk.md#zero-days) (until they get a CVE)
    2. Per Vulnerability - not asset/business/runtime/other organization-specific context
## CVEs

Not all [vulnerabilities or exploits have CVEs](https://unit42.paloaltonetworks.com/state-of-exploit-development/).

However, many do, and we can use the data associated with a CVE for Risk Based Prioritization.


## Per Vulnerability 
The scope is 
- "Per Vulnerability" branch in the diagram below
- Generic vulnerability data - not the organization-specific context

A different way of looking at this is that this guide (and the prioritization schemes herein), can be used as a first pass triage and prioritization of vulnerabilities, before the overall asset-specific business and runtime context, and remediation context, is considered, and all the context-specific dependencies that go with that.

In other words, Relative Risk per vulnerability.



<figure markdown>
![Image title](../assets/images/risk_remediation_taxonomy.png)
<figcaption>The scope for this guide is the "Per Vulnerability" branch</figcaption>
</figure>

<figure markdown>
![Image title](../assets/images/stages.png)
<figcaption>The scope for this guide is up to and including the First Pass Triage</figcaption>
</figure>

!!! tip "Having good security hygiene, and a good understanding of your data, is recommended independent of Risk Based Prioritization"
    Independent of the Risk Based Prioritization in this guide:

    - Good Security hygiene e.g. keeping software up to date, is effective in preventing and remediating vulnerabilities.
    - Understanding your vulnerability data, and root causes, should inform your remediation.

!!! tip "See where this guide fits in terms of overall Risk Remediation"

    A more complete picture of Risk Remediation Asset and Remediation branches is shown below. 
    
    - While these are out of scope for this guide, it may be useful as a reference for your Risk Remediation.

    <figure markdown>
    ![](https://github.com/theparanoids/PrioritizedRiskRemediation/blob/main/images/RiskRemediation.png?raw=true)
    <figcaption>Risk Remediation Taxonomy</figcaption>
    </figure>
    
    