# Grouped EPSS
!!! abstract "Overview"

    Because EPSS is a probability (of exploitation in the next 30 days), other probabilities can be determined based on standard probability theory e.g.

    - probability of exploitation in the next N days for 1 CVE
        - e.g. this is used in [NIST LEV](./LEV.md) calculations
    - probability of exploitation in the next 30 days for several CVEs i.e. **grouped EPSS** (from 1 to many and typical usage is the CVEs on a given container/asset or other logical grouping). This is described in 
        - "3: EPSS Can Scale, to Produce System, Network, and Enterprise-level Exploit Predictions" in https://www.first.org/epss/user-guide
        - [Modeling Asset Risk Using Grouped EPSS](https://youtu.be/W2UMqkRyBOY?t=367) at [VulnCon 2025](https://www.first.org/conference/vulncon2025/program#pModeling-Asset-Risk-Using-Grouped-EPSS) by Stephen Shaffer.

## Core Concept

!!! info 

    When you're looking at the probability of **at least one vulnerability being exploited**, it's easier to calculate the opposite:

    > **What is the probability that *none* of the vulnerabilities are exploited?**

    Once you have that, you subtract it from 1 to get the probability that **at least one** is exploited.

    This is based on the assumption that vulnerabilities are **independent** — the exploitation of one doesn't affect the others.

    ---

    ### Formula

    If you have *N* vulnerabilities with individual exploit probabilities $P_1, P_2, ..., P_N$, then:

    #### 🟢 Probability that **none** are exploited:

    $$
    P(\text{no exploits}) = (1 - P_1) \times (1 - P_2) \times \dots \times (1 - P_N)
    $$

    #### 🔴 Probability that **at least one** is exploited:

    $$
    P(\text{at least one exploit}) = 1 - P(\text{no exploits})
    $$

    ---

    ### Simple Worked Example

    !!! Example "Simple Worked Example"

        Let’s say a system has **3 vulnerabilities**:

        1. Vulnerability A: 10% chance of being exploited → $P_1 = 0.10$
        2. Vulnerability B: 20% chance → $P_2 = 0.20$
        3. Vulnerability C: 15% chance → $P_3 = 0.15$

        ---

        #### Step 1: Calculate the chance of **no vulnerabilities being exploited**:

        $$
        P(\text{no exploits}) = (1 - 0.10) \times (1 - 0.20) \times (1 - 0.15) = 0.90 \times 0.80 \times 0.85 = 0.612
        $$

        ---

        #### Step 2: Calculate the chance of **at least one being exploited**:

        $$
        P(\text{at least one exploit}) = 1 - 0.612 = 0.388
        $$

        **So, there is a 38.8% chance that at least one vulnerability will be exploited.**



## Using Grouped EPSS

!!! tip "Using Grouped EPSS"

    Per [Modeling Asset Risk Using Grouped EPSS](https://youtu.be/W2UMqkRyBOY?t=367), Grouped EPSS can be applied to 

    1. Identify high risk assets based on the grouped probability of exploitation for that asset.
    2. Prioritize remediation efforts by identifying which CVEs, if addressed, would most significantly reduce the grouped EPSS score across assets.
    3. Utilize grouped EPSS as a decision support mechanism to allocate security efforts to the riskiest assets or groups, aligning with organizational priorities.
    4. Track the distribution of grouped EPSS scores over time to understand shifts in the organization's asset risk posture and the effectiveness of security interventions.
    5. Analyze your internal data to identify tipping points for specific assets, determining how many vulnerabilities need to be fixed to bring their grouped EPSS score below a desired threshold.
    6. Enrich asset data with internal data classification standards to [combine likelihood (grouped EPSS) with potential impact](https://youtu.be/W2UMqkRyBOY?t=884) for a comprehensive risk assessment.