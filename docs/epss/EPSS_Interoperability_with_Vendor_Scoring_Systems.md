# EPSS Interoperability with Vendor Scoring Systems

Different tool vendors use different vulnerability scoring/ranking
methods; some use EPSS.

-   A full list of vendors using EPSS is given in List of Vendors using
    EPSS.

This section of the guide

1.  lists a selection of vendors using EPSS
2.  details how some vendors are using EPSS

A lot of vendors support EPSS in their products, but don't say/know how
to apply it, and so there's a need for an Applied Guide like this.

<table class="wrapped relative-table confluenceTable"
style="width: 81.2049%;">
<colgroup>
<col style="width: 2%" />
<col style="width: 6%" />
<col style="width: 83%" />
<col style="width: 7%" />
</colgroup>
<tbody>
<tr class="header">
<th class="confluenceTh" scope="col">#</th>
<th class="confluenceTh" scope="col">Vendor</th>
<th class="confluenceTh" scope="col">Scoring</th>
<th class="confluenceTh" scope="col">Uses EPSS as part of scoring</th>
</tr>

<tr class="odd">
<td class="confluenceTd">1</td>
<td class="confluenceTd"><a
href="https://qualysguard.qg2.apps.qualys.com/qwebhelp/fo_portal/reports/trurisk_details.htm"
rel="nofollow" style="text-decoration: underline;">Qualys</a></td>
<td class="confluenceTd"><p><a
href="https://qualysguard.qg2.apps.qualys.com/qwebhelp/fo_portal/reports/trurisk_details.htm"
rel="nofollow" style="text-decoration: underline;">Qualys Vulnerability
Score (QVS)</a> is a Qualys-assigned score for a vulnerability based on
multiple factors associated with the CVE such as CVSS and external
threat indicators like active exploitation, exploit code maturity, and
many more.</p></td>
<td class="confluenceTd" style="text-align: center;"><img
src="images/icons/emoticons/check.svg" class="emoticon emoticon-tick"
data-emoticon-name="tick" alt="(tick)" /></td>
</tr>
<tr class="even">
<td class="confluenceTd">2</td>
<td class="confluenceTd">Cisco</td>
<td class="confluenceTd"><p><a
href="https://blogs.cisco.com/security/epss-and-its-role-in-cisco-vulnerability-management-risk-scoring"
rel="nofollow">https://blogs.cisco.com/security/epss-and-its-role-in-cisco-vulnerability-management-risk-scoring</a></p>
<p><a
href="https://help.kennasecurity.com/hc/en-us/articles/360026160592-Vulnerability-Scoring-in-Kenna"
rel="nofollow" style="text-decoration: underline;">Kenna Security
Vulnerability Risk Score</a></p></td>
<td class="confluenceTd" style="text-align: center;"><img
src="images/icons/emoticons/check.svg" class="emoticon emoticon-tick"
data-emoticon-name="tick" alt="(tick)" /></td>
</tr>
<tr class="odd">
<td class="confluenceTd">3</td>
<td class="confluenceTd"><a
href="https://docs.tenable.com/tenablesc/Content/RiskMetrics.htm"
rel="nofollow" style="text-decoration: underline;">Tenable</a></td>
<td class="confluenceTd"><p><a
href="https://docs.tenable.com/tenablesc/Content/RiskMetrics.htm"
rel="nofollow"
style="text-decoration: underline;">Tenable</a> Vulnerability Priority
Rating (VPR) uses the severity and the facility to be exploited, similar
to EPSS. See also <a
href="https://www.tenable.com/blog/you-cant-fix-everything-how-to-take-a-risk-informed-approach-to-vulnerability-remediation"
rel="nofollow"
style="text-decoration: underline;text-align: left;">https://www.tenable.com/blog/you-cant-fix-everything-how-to-take-a-risk-informed-approach-to-vulnerability-remediation</a></p></td>
<td class="confluenceTd" style="text-align: center;"><img
src="images/icons/emoticons/error.svg" class="emoticon emoticon-cross"
data-emoticon-name="cross" alt="(error)" /></td>
</tr>
<tr class="even">
<td class="confluenceTd">4</td>
<td class="confluenceTd"><a
href="https://docs.snyk.io/fixing-and-prioritizing-issues/starting-to-fix-vulnerabilities/snyk-priority-score"
rel="nofollow" style="text-decoration: underline;">Snyk</a></td>
<td class="confluenceTd"><p><a
href="https://docs.snyk.io/fixing-and-prioritizing-issues/starting-to-fix-vulnerabilities/snyk-priority-score"
rel="nofollow" style="text-decoration: underline;">Snyk created their
own score</a> (Snyk Priority Score) for prioritization by using CVSS and
other factors mentioned above, such as exploit maturity, remediation
process, or mentions in the community</p>
<p><a
href="https://snyk.io/blog/improved-risk-assessment-with-epss-scores-in-snyk/"
rel="nofollow">https://snyk.io/blog/improved-risk-assessment-with-epss-scores-in-snyk/</a></p></td>
<td class="confluenceTd" style="text-align: center;"><img
src="images/icons/emoticons/error.svg" class="emoticon emoticon-cross"
data-emoticon-name="cross" alt="(error)" /></td>
</tr>
<tr class="odd">
<td class="confluenceTd">5</td>
<td class="confluenceTd">MicroSoft</td>
<td class="confluenceTd"><blockquote>
The Exploitability Index may help customers evaluate risk for a
vulnerability. Microsoft evaluates the potential exploitability of each
vulnerability associated with a Microsoft security update and then
publishes the exploitability information as part of the monthly
Microsoft security update details
</blockquote></td>
<td class="confluenceTd" style="text-align: center;"><img
src="images/icons/emoticons/error.svg" class="emoticon emoticon-cross"
data-emoticon-name="cross" alt="(error)" /></td>
</tr>
<tr class="even">
<td class="confluenceTd">6</td>
<td class="confluenceTd">Rapid7</td>
<td class="confluenceTd"><p>Rapid7 created a proprietary scoring
methodology called Active Risk. It "takes into account the latest
version of the CVSS available for a vulnerability and enriches it with
multiple threat intelligence feeds, including proprietary Rapid7
research, to provide security teams with a threat-aware vulnerability
risk score." Data sources include: CISA KEV, Metasploit, Rapid7's
Project Heisenberg and
AttackerKB.https://www.rapid7.com/products/insightvm/features/active-risk-score/</p>
<p>https://www.rapid7.com/blog/post/2023/09/25/introducing-active-risk/</p></td>
<td class="confluenceTd" style="text-align: center;"><img
src="images/icons/emoticons/error.svg" class="emoticon emoticon-cross"
data-emoticon-name="cross" alt="(error)" /></td>
</tr>
<tr class="odd">
<td class="confluenceTd">7</td>
<td class="confluenceTd"><a
href="https://amnesia.first.org/display/EPSS/Wiz.io"
rel="nofollow">Wiz.io</a></td>
<td class="confluenceTd"><p>Created their own binning for EPSS "to
ensure even distribution between critical, high, and medium
severities"</p></td>
<td class="confluenceTd" style="text-align: center;"><img
src="images/icons/emoticons/error.svg" class="emoticon emoticon-cross"
data-emoticon-name="cross" alt="(error)" /></td>
</tr>
<tr class="even">
<td class="confluenceTd">8</td>
<td class="confluenceTd">Edgescan</td>
<td class="confluenceTd"><p>EPSS is visable as a floating point score
(0.00) alongside CVSS, CISAKEV (boolean) and EVSS (Edgescan Validated
Security Score).  Edgescan has also implemented an overall priority
score combining CVSS, EPSS and CISA KEV with some weightings to deliver
an overall priority score, we call this the Edgescan eXposure Factor
(EXF) - More to come when deployed.</p>
<p>https://www.edgescan.com/solutions/risk-based-vulnerability-management-rbvm/</p></td>
<td class="confluenceTd" style="text-align: center;"><img
src="images/icons/emoticons/check.svg" class="emoticon emoticon-tick"
data-emoticon-name="tick" alt="(tick)" /></td>
</tr>
<tr class="odd">
<td class="confluenceTd">9</td>
<td class="confluenceTd">Mend.io</td>
<td class="confluenceTd"><p>SCA tool shows CVSS score, EPSS score, and
public exploits per
https://docs.mend.io/bundle/sca_user_guide/page/public_exploits_in_mend_sca.html</p></td>
<td class="confluenceTd" style="text-align: center;"><img
src="images/icons/emoticons/error.svg" class="emoticon emoticon-cross"
data-emoticon-name="cross" alt="(error)" /></td>
</tr>
</tbody>
</table>

  
