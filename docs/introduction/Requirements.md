# Requirements

!!! abstract "Overview"
    
    Here we list requirements for a Risk Based Prioritization Scheme as provided by users.

    Any solution should be informed by what the user wants, and the rationale behind the solution implementation. This allows understanding and validation of the solution against the requirements and rationale. 

    The broader set of users' requirements is expressed as [User Scenarios and User Stories](../requirements/Requirements.md).
    

## Requirements for a Risk Based Prioritization Scheme for First Pass Triage

1. **Effective Prioritization**
      1. [Focus on Exploitation](../risk/Understanding_Risk.md#where-cvss-epss-cisa-kev-fit), and include the other Risk Factors
      2. The output (score/rating) should be wedge shaped with the sharp end representing the high risk end i.e. there should be a relatively small number of CVEs at the top end of risk.
2. **Understandable**
      1. The rationale, and preferably the requirements or problem statement, should be stated so it's clear what problem the solution is trying to solve, and the rationale for how it solves it.
      2. Given the output (score/rating), it should be possible to easily and uniquely identify the input parameters(s), and the contribution of the input parameters(s) values to the output.
      3. A non-technical person should be able to understand it
3. **Independent**
      1. Preferably uses Public information
      2. Not dependent on a specific Tool or Vendor or the data from it 
         1. Many CTI vendors provide aggregated curated CTI
4. **Extensible**
      1. Organizations may want to extend, customize, or optimize a Risk Based Prioritization Scheme for their environment e.g. change the prioritization associated with a data source or add a new data source.
      2. Some schemes do this by design e.g. *"[SSVC](https://github.com/CERTCC/SSVC) aims to avoid one-size-fits-all solutions in favor of a modular decision-making system with clearly defined and tested parts that vulnerability managers can select and use as appropriate to their context."*
5. **Standard**
      1. TODO