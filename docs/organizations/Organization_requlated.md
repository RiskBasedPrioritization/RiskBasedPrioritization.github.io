# Organization CVSS CISA KEV EPSS

This organization operates in a regulated environment (e.g. <a
href="https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard"
rel="nofollow">PCI</a> or
<a href="https://en.wikipedia.org/wiki/FedRAMP"
rel="nofollow">FedRAMP</a>) that requires usage of CVSS.

-   e.g. <a
    href="https://docs-prv.pcisecuritystandards.org/PCI%20DSS/Standard/PCI-DSS-v4_0.pdf"
    rel="nofollow">PCI DSS 4.0</a> 11.3.2.1 “External vulnerability
    scans are performed after any significant change as follows:
    Vulnerabilities that are scored 4.0 or higher by the CVSS are
    resolved.”

A CVEs "scored 4.0 or higher by the CVSS" is pretty much all CVEs
(\>96%) per "CVSS Severity Rating Scale"

  

The organization uses CVSS score and "Likelihood of Exploit" to
prioritize CVEs for the CVSS threshold required by regulation.
Specifically it uses:

1.  CVSS Score
2.  Active Exploitation
    1.  CISA KEV
    2.  Vendor Cyber Threat Intelligence for CVEs that are actively
        exploited that are not in CISA KEV
3.  Weaponized Exploitation
    1.  Vendor Cyber Threat Intelligence for CVEs that are weaponized
        that includes public information from Metasploit, Nuclei.
4.  EPSS scores above a Threshold

  