# Introduction to LEV

!!! abstract "Overview"

    In this section we introduce LEV

    -   what it is and what it adds to vulnerability management  
    -   why it matters for day-to-day prioritization  
    -   how to apply it alongside EPSS and KEV  

## What is LEV?

**Likely Exploited Vulnerabilities (LEV) is a probabilistic score proposed by NIST to estimate the chance that a published vulnerability (CVE) has already been exploited in the wild**. 

- A high-performance Python implementation of the: 
Mell P, Spring J (2025) [NIST CSWP 41: "Likely Exploited Vulnerabilities: A Proposed Metric for Vulnerability Exploitation Probability"](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.41.pdf).
(National Institute of Standards and Technology, Gaithersburg, MD), NIST Cybersecurity White Paper (CSWP) NIST
CSWP 41. https://doi.org/10.6028/NIST.CSWP.41 


Whereas EPSS predicts future exploitation over the next 30 days, LEV works backwards—compounding historical EPSS scores—to quantify past exploitation probability. 

The longer and more consistently a CVE has high non-zero EPSS scores, the higher its LEV, reflecting real-world attacker behavior.

!!! tip
    
    LEV is best used when you need evidence-based focus on vulnerabilities likely already weaponized, not just theoretically severe or imminently at risk.

## Why LEV Matters

[EPSS](./Introduction_to_EPSS.md) is the probability of exploitation in the next 30 days. 

 - It is suited to Network environments and may have [False Negatives](./Applying_EPSS_to_your_environment.md#false-positives-and-negatives).

[CISA KEV](../cisa_kev/cisa_kev.md) is a list of vulnerabilities that have been exploited in the wild.

- It contains a subset of known exploited CVEs.

LEV bridges the gap by highlighting vulnerabilities with the strongest historical signal of exploitation (based on EPSS historical data).

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

!!! quote "Translating Probability into Action"

    LEV provides historical context EPSS omits and KEV lists can’t fully capture. Use it to turn probabilistic insight into targeted mitigation.

!!! success "Key Takeaways"

     1. LEV estimates the likelihood a CVE has already been exploited in the wild.  
     2. It leverages and compounds historical EPSS data for evidence-based prioritization.  
     3. Use LEV to measure exploited CVE proportions, evaluate KEV comprehensiveness, and enhance both KEV- and EPSS-driven workflows.  
     4. Combined with continuous validation (e.g., breach-and-attack simulations), LEV helps close the gap between theoretical risk and real-world exploitation.
