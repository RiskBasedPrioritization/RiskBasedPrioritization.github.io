#!/bin/bash

# recursive -r option blows up so recurse in bash instead

# example non-CI usage
# ./checklinks.sh > ./checlinks_report.txt  
# grep '[✖]' checklinks_report.txt   

# Change directory to the docs directory
cd docs

# Find all Markdown files recursively and loop through them
find . -type f -name '*.md' -print0 | while IFS= read -r -d '' file; do
    # Run mkdocs-linkcheck on the file
    mkdocs-linkcheck "$file" --exclude "../assets/images" --exclude "https://www.gartner.com/smarterwithgartner/focus-on-the-biggest-security-threats-not-the-most-publicized" --exclude "https://help.kennasecurity.com/hc/en-us/articles/360026160592-Vulnerability-Scoring-in-Kenna"
done

# False Positives:
# https://help.kennasecurity.com/hc/en-us/articles/360026160592-Vulnerability-Scoring-in-Cisco-Vulnerability-Management
# https://www.gartner.com/smarterwithgartner/focus-on-the-biggest-security-threats-not-the-most-publicized
# https://docs-prv.pcisecuritystandards.org/PCI%20DSS/Standard/PCI-DSS-v4_0.pdf