# Decision Trees Example Usage

!!! abstract "Overview"
    Example usage and implementation are provided by different users who
    are using Decision Trees in their organization.

    :technologist: [Source Code](https://github.com/epss-sig/epss-interoperability/blob/main/analysis/cisa_kev_epss_cvss.ipynb) 


!!! example "User Story"

    As Any User, I want to know how to

    1.  Make decisions with EPSS as an Exploitation decision node input
    2.  Determine what threshold(s) to use when making decisions with EPSS
        scores

    So that I can effectively prioritize which vulnerabilities to fix given
    my remediation capacity.


## Decision Node: Exploitation

There are several ways to augment the Exploitation node within SSVC to
incorporate EPSS:

1.  Use an EPSS threshold to trigger an "active" decision i.e. a CVE
    with an EPSS score above this threshold is considered to be actively
    exploited
2.  Create a new decision called "predicted" with its own subsequent
    child nodes
3.  Use EPSS as an early-warning system to notify stakeholders of an
    impending decision change.


### EPSS Score Triggers Active Decision

<img
src="https://www.planttext.com/api/plantuml/png/pPHHRzCm483V_IkE3ObXeJPjMWHeeArfooPLlBH2GWYXmxai1iUs76zGeVrtxCIT9ZJwKXwM5_lkix-SBTlFOCYXC7Rhv5NjuHFMnho0bHIaMohXMfVamDS4dbpJWgcwuDoY2Crua87gXmvWJGIhosBnORs0IYe2gS4wyvs41sUCXygutZ80FcJihFNeV2DrsQ1bx4dmDWHMeTGiX4zT1c_XwFDnLMNX-mASPvmVHJ3gmN9PPCKiWb42uzqCdFOpnWdaFSXVlwBH988yWKaFiYp-9O990jCUO8vvLKKmZO2nqzPl5RrZgUwvn2k73R3V303Ub6HzVP8zXow46OeVxvq9crWO5LP_F9ilSgAEhQIclxEtxCunEiInauptIiho8KcNlI_9zqgMouSaNVQ-PF8loONHj9tJpxsb9CdqVopdvK4IOBViT9ZE0Dj87yxv6XiRc_N70kOaP2kDXeqBru4n7axEufTLHdhq8Syvu_mheF3oXa8tylDhRnhq-4rHY6CoZD2cwqI-8L5hAL31PHFkdTyDYiDik48IrLtiZGzHScofFKJILMgDUEnbihuG_UZtyup2cv7Ukpy0"
draggable="false"
data-image-src="https://www.planttext.com/api/plantuml/png/pPHHRzCm483V_IkE3ObXeJPjMWHeeArfooPLlBH2GWYXmxai1iUs76zGeVrtxCIT9ZJwKXwM5_lkix-SBTlFOCYXC7Rhv5NjuHFMnho0bHIaMohXMfVamDS4dbpJWgcwuDoY2Crua87gXmvWJGIhosBnORs0IYe2gS4wyvs41sUCXygutZ80FcJihFNeV2DrsQ1bx4dmDWHMeTGiX4zT1c_XwFDnLMNX-mASPvmVHJ3gmN9PPCKiWb42uzqCdFOpnWdaFSXVlwBH988yWKaFiYp-9O990jCUO8vvLKKmZO2nqzPl5RrZgUwvn2k73R3V303Ub6HzVP8zXow46OeVxvq9crWO5LP_F9ilSgAEhQIclxEtxCunEiInauptIiho8KcNlI_9zqgMouSaNVQ-PF8loONHj9tJpxsb9CdqVopdvK4IOBViT9ZE0Dj87yxv6XiRc_N70kOaP2kDXeqBru4n7axEufTLHdhq8Syvu_mheF3oXa8tylDhRnhq-4rHY6CoZD2cwqI-8L5hAL31PHFkdTyDYiDik48IrLtiZGzHScofFKJILMgDUEnbihuG_UZtyup2cv7Ukpy0"
alt="PlantUML Diagram" />

  

### Create Predicted Decision with EPSS Threshold

<img
src="https://www.planttext.com/api/plantuml/png/rPHHRzCm483V_IkE3GcmK9isBG8qqDQqPPCgNbeX8OIGSIwBmR4ZvmPKq_uxvoIT9ZJwKXv6Nfoxp_voZiv-0aC9cQ-tmLoM11zLwVrpM1cDhi4ShboE0QX480nL0xveWxDQQHx6WmHiDtK0QqHONMIBz-i55COY60TryDzG4mJl2GeVEii0v528quPKeCgul5Ar48_OMo7KLXadE7mS4dW3Hv-EYoBXvpD8cKXv5C6e0yjbbcIp24Oz6EzMg6ctOjo3j0FfgvSucaIGzc3IWII9NubWqeDf1rIgqgA8O1g142SDRIs-5NtTSwCkWwf0N0i0U9rZJUNJv1cq8SoK_lukUFw9cRUy--FPV94Yjcnb7FwPlH6tZj4XZfral5UIv_T9sknTIRfNibpU9scpToMJlqdElSFj77_kBQMNJF_5TbuS905n8qw6VG-8ZI7kyxMgwZYiFsGmHsqQunri0Xy78IHtpk9NRRqXHPoNKaZv1PGcymFvDVApA_AL8lNL8iSnoJESRryYtw0kdT7AmaN5vuvsa-Aqce-GKVOs9aySzOujDeT960NCZIRC_uTQlNxWLNPrEcxvXrxeAVBrrb_Dlm40"
draggable="false"
data-image-src="https://www.planttext.com/api/plantuml/png/rPHHRzCm483V_IkE3GcmK9isBG8qqDQqPPCgNbeX8OIGSIwBmR4ZvmPKq_uxvoIT9ZJwKXv6Nfoxp_voZiv-0aC9cQ-tmLoM11zLwVrpM1cDhi4ShboE0QX480nL0xveWxDQQHx6WmHiDtK0QqHONMIBz-i55COY60TryDzG4mJl2GeVEii0v528quPKeCgul5Ar48_OMo7KLXadE7mS4dW3Hv-EYoBXvpD8cKXv5C6e0yjbbcIp24Oz6EzMg6ctOjo3j0FfgvSucaIGzc3IWII9NubWqeDf1rIgqgA8O1g142SDRIs-5NtTSwCkWwf0N0i0U9rZJUNJv1cq8SoK_lukUFw9cRUy--FPV94Yjcnb7FwPlH6tZj4XZfral5UIv_T9sknTIRfNibpU9scpToMJlqdElSFj77_kBQMNJF_5TbuS905n8qw6VG-8ZI7kyxMgwZYiFsGmHsqQunri0Xy78IHtpk9NRRqXHPoNKaZv1PGcymFvDVApA_AL8lNL8iSnoJESRryYtw0kdT7AmaN5vuvsa-Aqce-GKVOs9aySzOujDeT960NCZIRC_uTQlNxWLNPrEcxvXrxeAVBrrb_Dlm40" />

See cti.py for the associated code showing how a CTI data source can be
used as part of the Exploitation Decision Node.

  

  

### Append Decisions with EPSS Early Warning

  
!!! example "User Story"
    As a **Cyber Defender**, I use EPSS to inform my SSVC decision tree with
    data regarding CVE exploitation in cases where active exploitation has
    not already been confirmed by another source. I define
    EPSS *thresholds* that make sense for my organization's risk appetite
    and capacity to remediate.


<figure markdown>
![Image title](../assets/images/cisadt_flowchart.png)
<figcaption>Example Decisions using EPSS Thresholds</figcaption>
</figure>

!!! example "User Story"

    As a Cyber Defender, I occasionally come across vulnerabilities that do
    not have an assigned CVE, such as a misconfiguration, or manual audit
    finding. I still want to process these vulnerabilities through my SSVC
    decision tree to be consistent, which is why I have a manual triage
    process that fills in the gaps in information, such as Exploitation and
    Vector, and lets the decision tree handle the rest. I store this
    information in a CSV so that I don't have to manually process any given
    vulnerability more than once.

  

  

| Vulnerability ID | Exploitation | Vector                                                                                                                               | Note                                 |
|:-----------------|:-------------|:-------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------|
| 104188           | Active       | [AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N/E:H/RL:O/RC:C ](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?vector=AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N/E:H/RL:O/RC:C&amp;version=3.1) | SMB Security Signatures Not Required |

  


**Manual Triage**

See manual_triage.py code.


