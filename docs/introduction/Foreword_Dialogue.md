# Foreword Dialogue

**User A:** Hey, have you ever noticed the difference between CVSS and
EPSS standards when it comes to vulnerability rankings and thresholds? I
did some research, and I found out that around 15% of CVEs are ranked as
Critical according to CVSS, while about 40% are considered High.

**User B:** Wow, those numbers are pretty high for CVSS. But what about
EPSS?

**User A:** Well, that's where it gets interesting. With a lower EPSS
threshold of 0.1, you're left with only about 5% of CVEs. It's actually
quite in line with the fact that around 5% of CVEs are actively
exploited, which is why standards like CISA KEV and EPSS are so
relevant.

**User B:** That's a good point. So, if I understand correctly, EPSS
prioritizes the vulnerabilities differently. How does it break down?

**User A:** Yes, you got it. Interestingly, with EPSS, about 5% are
considered "Not Low," while a whopping 95% fall into the "Low" category
(where "Low" is below the EPSS threshold of 0.1). On the other hand,
with CVSS it's almost the opposite. A striking 96% of CVEs fall into the
"Not Low" category, which includes Critical, High, and Medium severity
levels. Only 4% are considered "Low" according to CVSS.

**User B:** So, what's the big question here? Does a user who's used to
prioritizing 15/60/96% of CVEs with CVSS rankings really need to further
sub-divide that 5% according to EPSS?

**User A:** Precisely! It makes you wonder if the extra granularity
provided by EPSS for that small percentage is truly necessary,
considering the broader categorization provided by CVSS. It's an
interesting perspective to consider when assessing vulnerabilities.

**User B:** Absolutely. It highlights the importance of understanding
both standards and their implications when it comes to managing
vulnerabilities effectively.
