# Introduction to LEV

!!! abstract "Overview"

    In this section we introduce NIST Likely Exploited Vulnerabilities (LEV) 

    -   what it is and what it adds to vulnerability management  
    -   why it matters for day-to-day prioritization  
    -   how to apply it alongside EPSS and KEV  

    :technologist: [Source Code] will be provided for LEV. Instead of making invalid assumptions to optimize the computation for LEV2 (handling "EPSS scores as covering only a single day by dividing them by 30": $P_1 \approx P_{30}/30$), it will use the correct algorithm but optimize with concurrent processing.


## What is LEV?

**Likely Exploited Vulnerabilities (LEV) is a probabilistic score proposed by NIST to estimate the chance that a published vulnerability (CVE) has already been exploited in the wild**. 

- A high-performance Python implementation of the: 
Mell P, Spring J (2025) [NIST CSWP 41: "Likely Exploited Vulnerabilities: A Proposed Metric for Vulnerability Exploitation Probability"](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.41.pdf).
(National Institute of Standards and Technology, Gaithersburg, MD), NIST Cybersecurity White Paper (CSWP) NIST
CSWP 41. https://doi.org/10.6028/NIST.CSWP.41 


## Why LEV Matters

|                             | **Past**                                    | **Future**                                     |
|-----------------------------|---------------------------------------------|------------------------------------------------|
| **Exploited**               | [CISA KEV](../cisa_kev/cisa_kev.md)         |                                        |
| **Probability of Exploitation** | LEV (past probability)                    | [EPSS](./Introduction_to_EPSS.md) (next 30 days) |


[CISA KEV](../cisa_kev/cisa_kev.md) is a list of vulnerabilities that have been **exploited** in the wild (**past**).

- It contains a subset of known exploited CVEs.
 
[EPSS](./Introduction_to_EPSS.md) is the **probability of exploitation** in the next 30 days (**future**). 

 - It is suited to Network environments and may have [False Negatives](./Applying_EPSS_to_your_environment.md#false-positives-and-negatives).

LEV gives a **probability of exploitation** in the **past** 

- LEV can be used to augment CISA KEV i.e. shortlist candidates for addition to KEV (with other qualifying factors e.g. industry evidence)
- LEV works backwards—compounding historical EPSS scores — to quantify past exploitation probability. 
    - The longer and more consistently a CVE has high EPSS scores, the higher its LEV, reflecting real-world attacker behavior.
- In **practice**,
    - It needs to be validated against real evidence of exploitation data to understand it, validate it, and calibrate it.
    - The LEV list should be made available directly - or used to augment the KEV list




!!! tip "As a general user, how do I use LEV"

    You don't:
    
    - The LEV list is not officially published as of June 1 2025. And even if it was, the LEV list by itself is not that useful for a general user i.e. there isn't a user guide, there isn't validation of the data.
    - General users who use CISA KEV may benefit from LEV by additional validated entries being added to KEV ala use case "augment KEV based vulnerability remediation prioritization by identifying higherprobability vulnerabilities that may be missing" 



!!! tip "LEV inherits some characteristics of EPSS"

    Because LEV is based on EPSS only, the same points about [Applying EPSS to your environment](Applying_EPSS_to_your_environment.md#applying-epss-to-your-environment) apply to LEV also.

!!! quote "LEV use cases"

    The LEV probabilities have at least four use cases:
    
    1. measure the expected number and proportion of vulnerabilities, as identified by Common Vulnerability and Exposures (CVE) identifiers, that actors have exploited,
    2. estimate the comprehensiveness of KEV lists,
    3. augment KEV based vulnerability remediation prioritization by identifying higherprobability vulnerabilities that may be missing, and
    4. augment EPSS based vulnerability remediation prioritization by identifying vulnerabilities that may be underscored. 
    
    [NIST CSWP 41: "Likely Exploited Vulnerabilities: A Proposed Metric for Vulnerability Exploitation Probability"](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.41.pdf)


## How LEV Works

1. **Windowing EPSS**

      * EPSS(v, dᵢ) gives the probability of exploitation in the 30-day window starting at date dᵢ.
  
2. **Non-Exploitation Probability**

      * For each window, compute (1 − EPSS × window-fraction).

3. **Compound Across Time**

      * Multiply all “no-exploit” probabilities from first EPSS release (d₀) to today (dₙ).

4. **Flip to Get LEV**

      * LEV = 1 − ∏₍windows₎(no-exploitProbability).

This approach treats each EPSS window as evidence that exploitation may already have occurred, with longer exposure driving LEV toward 1.0.

## Applying LEV in Vulnerability Management

LEV outputs a daily, per-CVE probability of past exploitation along with supporting history, enabling:

1. **Measuring Exploited Proportion**

    * Estimate how many CVEs have likely been weaponized to date.

2. **Assessing KEV Coverage**

    * Compute a lower bound on how many CVEs a KEV list should include, revealing gaps.

3. **Augmenting KEV-Driven Remediation**

    * Flag high-LEV CVEs missing from KEV for review or urgent patching.

4. **Strengthening EPSS-Driven Prioritization**

    * Combine LEV with EPSS (and KEV overrides) in a Composite Probability:
        `max(EPSS, KEV_flag, LEV)`
    * Ensures previously exploited CVEs receive top attention.






## Likely Exploited Vulnerabilities (LEV) Algorithm
---

### LEV2 Approximation

!!! quote

    The LEV2 equation requires significantly more computational resources. It handles EPSS scores
    as covering only a single day by dividing them by 30 (instead of each score covering a 30-day
    window). This enables the equation to incorporate far more EPSS scores within the
    computation and increases the equation’s responsiveness to changing scores (especially for
    newly released vulnerabilities).


 "It handles EPSS scores as covering only a single day by dividing them by 30": $P_1 \approx P_{30}/30$

Dividing a 30-day probability by 30 to get a 1-day probability generally **does not make sense** in a rigorous probabilistic context.

**Probabilities are not linear over time in this way.** If you have a probability $P_{30}$ of an event occurring over 30 days, it doesn't mean the probability on any single day is $P_{30}/30$.

**The "Small Probability" approximation:** The approach (dividing by 30) only makes sense as a rough approximation when the EPSS scores (which represent 30-day likelihoods) are very small (which is true for most but not all scores, where the ones we care about are high scores):

* If $P_1$ is very small, then $(1 - P_1)^{30} \approx 1 - 30P_1$ (using the binomial approximation or first-order Taylor expansion for $(1-x)^n \approx 1-nx$ when $x$ is small).
* In this case, $P_{30} = 1 - (1 - P_1)^{30} \approx 1 - (1 - 30P_1) = 30P_1$.
* So, if $P_{30} \approx 30P_1$, then $P_1 \approx P_{30}/30$.

This appears to be the underlying assumption for the deliberate simplification made in the NIST formula - likely for computational efficiency


**Independent Events Assumption:** If we assume the events (vulnerabilities being exploited) are independent day-to-day, then the probability of *not* being exploited over 30 days would be the product of the probabilities of *not* being exploited on each individual day.

* Let $P_1$ be the daily probability of exploitation.
* The probability of *not* being exploited on a given day is $(1 - P_1)$.
* The probability of *not* being exploited over 30 days is $(1 - P_1)^{30}$.
* Therefore, the probability of *being* exploited over 30 days is $1 - (1 - P_1)^{30}$.
* If you're given $P_{30}$ (the 30-day likelihood), you'd solve $P_{30} = 1 - (1 - P_1)^{30}$ for $P_1$. This is a much more complex calculation than simple division.
  
The **Independent Events Assumption:** is not valid. 

- The EPSS data shows that signature detections tend to be grouped in time - not randomly distributed



!!! success "Key Takeaways"

     1. LEV estimates the likelihood a CVE has already been exploited in the wild.  
     2. It leverages and compounds historical EPSS data for evidence-based prioritization.  
     3. Use LEV to measure exploited CVE proportions, evaluate KEV comprehensiveness, and enhance both KEV- and EPSS-driven workflows.  
     4. Combined with continuous validation (e.g., breach-and-attack simulations), LEV helps close the gap between theoretical risk and real-world exploitation.
