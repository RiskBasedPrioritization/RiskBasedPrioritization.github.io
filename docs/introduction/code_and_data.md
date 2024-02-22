---
icon: material/play-box-edit-outline
---
# Source Code and Data

!!! abstract "Overview"

    This section gives an overview of the data and the notebooks (code + documentation) for the analysis that is part of this guide:

    - Running the Code - the environments it can be run
    - Data Sources - the public data sources used
    - Analysis - the code for the analysis, the output of which is used in this guide


## Running the Code

The source code provided with this guide is available as Jupyter Notebooks.

These can be run 

* locally or offline (requires that you have a Jupyter Notebooks environment setup)
* online via browser in [Colab](https://colab.research.google.com/). (No environment setup required)

!!! tip "The source code notebooks are available in Colab to run from your browser"

    !!! quote
        Colab, or "Colaboratory", allows you to write and execute Python in your browser, with

        * Zero configuration required
        * Access to GPUs free of charge
        * Easy sharing

        https://colab.research.google.com/



## Data Sources

| Data Source |    Detail     | ~~ CVE count K | 
|-------------|:-------------:|---------------:|
| [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)    |  Active Exploitation|              1 | 
| [EPSS](https://www.first.org/epss/api)        |    Predictor of Exploitation   |        220 | 
| [Metasploit modules](https://github.com/rapid7/metasploit-framework)  | Weaponized Exploit |              3 | 
| [Nuclei templates](https://github.com/projectdiscovery/nuclei-templates)      |  Weaponized Exploit           |              2 | 
| [ExploitDB](https://gitlab.com/exploit-database/exploitdb)   |  Published Exploit Code             |            25 | 
| [NVD CVE Data](https://nvd.nist.gov/vuln/data-feeds) | NVD CVEs | 220| 
| [Qualys TruRisk Report](https://www.qualys.com/forms/tru-research-report/) | The 2023 Qualys TruRisk research report lists 190 CVEs from 2022 with QVS scores| .2| 
| [Microsoft Security Response Center (MSRC)](https://msrc.microsoft.com/update-guide/vulnerability) | CVEs Exploited and with Exploitability Assessment| .2| 




## Analysis
See [analysis](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/analysis) directory for these files.

1. [enrich_cves.ipynb](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/analysis/enrich_cves.ipynb) 
    1. Take the data sources from [data_in/](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/data_in/) 
    2. Enrich the CVE data from NVD with the other data sources
    3. Add an "Exploit" column to indicate the source of the exploitability (used later to set colors of CVE data in plots)
    4. store the output in data_out/nvd_cves_v3_enriched.csv.gz
2. [kev_epss_cvss.ipynb](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/analysis/kev_epss_cvss.ipynb)
      1. Read the enriched CVE data from data_out/CVSSData_enriched.csv.gz
      2. Read the data from CISA KEV alert reports in ./data_in/cisa_kev/
      3. Plot CISA KEV datasets showing EPSS, CVSS by source of the exploitability
      4. Write data_out/cisa_kev/csa/csa.csv.gz which is the CISA KEV CyberSecurity Alerts (CSA) subset with EPSS and other data
3. [qualys.ipynb](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/qualys.ipynb)
       1. Read the enriched CVE data from data_out/CVSSData_enriched.csv.gz
       2. Read the data from ./data_in/qualys
       3. Plot Qualys dataset showing EPSS, CVSS by source of the exploitability
       4. Write data_out/qualys/qualys.csv.gz which is the Qualys data with EPSS and other data
 4. [msrc.ipynb](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/msrc.ipynb)
       1. Read the enriched CVE data from data_out/CVSSData_enriched.csv.gz
       2. Read the data from ./data_in/msrc
       3. Plot Microsoft Exploitability Index dataset showing EPSS, CVSS by source of the exploitability
       4. Write data_out/msrc/msrc.csv.gz which is the MSEI data with EPSS and other data


### CISA SSVC Decision Trees
See [cisa_ssvc_dt](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/cisa_ssvc_dt/) directory for these files.

#### CISA SSVC Decision Tree From Scratch Example Implementation

[DT_from_scratch.ipynb](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/cisa_ssvc_dt/DT_from_scratch.ipynb) 

1. Read the enriched CVE data from data_out/CVSSData_enriched.csv.gz
2. Read the Decision Tree definition cisa_ssvc_dt/DT_rbp.csv
3. Define the Decision Logic for the Decision Nodes
4. Calculate the Decision Node Values for all CVEs
5. Do some Exploratory Data Analysis with Venn Diagrams to understand our data
6. Calculate the Output Decision from the Decision Node Values
7. Plot Flow of All CVEs across the Decision Tree aka Sankey
   1. Read the Sankey Diagram template definition cisa_ssvc_dt/DT_sankey.csv
8. Triage some CVEs
   1. Read a list of CVEs to triage cisa_ssvc_dt/triage/cves2triage.csv
   2. Get Decisions
   3. Plot 


#### CISA SSVC Decision Tree Analysis for Feature Importance

[DT_analysis.ipynb](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/cisa_ssvc_dt/DT_analysis.ipynb) 

1. Read the Decision Tree definition cisa_ssvc_dt/DT_rbp.csv
2. Perform Feature Importance using 2 methods
   1. Permutation Importance 
   2. Drop-column Importance
   
See [https://github.com/CERTCC/SSVC/issues/309](https://github.com/CERTCC/SSVC/issues/309) for the suggestion to add drop column importance to CISA SSVC.






## Getting Data from Data Sources

!!! tip "A snapshot of the data used for this guide is available"
    A snapshot of this data is already available with the source in [data_in](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/data_in)

    * A date.txt file is included in each folder with the data that contains the date of download.

    But you can download current data as described here. 

* [get_data.sh](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/data/get_data.sh) gets the data that can be downloaded automatically and used as-is.
* Other data is manually downloaded - see instructions below.
    * MSRC
    * ExploitDB
    * GPZ
* Larger files are gzip'd

### National Vulnerability Database (NVD)
Get NVD data automatically

* A notebook or script in [nvd](https://github.com/RiskBasedPrioritization/RiskBasedPrioritizationAnalysis/data_in/nvd) downloads the NVD data.
* The data is output to data_out/CVSSData.csv.gz
* Note: The download method used will be deprecated some time after Dec 2023 per https://nvd.nist.gov/vuln/data-feeds


### Google Project Zero (GPZ)
See [0day "In the Wild" GoogleSheet](https://docs.google.com/spreadsheets/d/1lkNJ0uQwbeC1ZTRrxdtuPLCIl7mlUreoKfSIgajnSyY/edit#gid=1190662839) 

* Select "All" tab.
* File - Download as csv

### Microsoft Security Response Center (MSRC) 
* Go to https://msrc.microsoft.com/update-guide/vulnerability
* Edit columns - ensure these columns are selected "Exploitability Assessment" and "Exploited"
* Download

### Qualys TruRisk Report
The CVE data was extracted from the [Qualys TruRisk Report](https://www.qualys.com/forms/tru-research-report/) PDF.
This data is static so a date.txt is not included.

### ExploitDB
* Download https://gitlab.com/exploit-database/exploitdb/-/blob/main/files_exploits.csv (manually for now - credentials required for automation)
* Extract the CVEs using the script in the directory i.e. some entries don't have CVEs - and have only Open Source Vulnerability Database (OSVDB) entries instead.


### Other Vulnerability Data Sources 

See [other vulnerability data sources](../risk/Data_Sources.md#other-vulnerability-data-sources) that are not currently used here.

