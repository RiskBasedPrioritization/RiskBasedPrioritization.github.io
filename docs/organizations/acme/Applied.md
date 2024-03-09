---
icon: material/play-box-edit-outline 
---

# Putting it all Together

    Code and analysis is provided for Acme Inc CVEs to help understand their CVEs:

    1. The key risk factors
    2. What CVEs are in CISA KEV, Weaponized (Metasploit, Nuclei), PoC (ExploitDB)
    3. The effect of changing the EPSS Threshold
    4. The effect of changing the CVSS Base Score Threshold
    5. EPSS Percentiles
    6. Exploratory Data Analysis of their CVE data
    7. 

sample of CVEs and counts
percentile score
3d plot of sources, counts cvss, epss (sliders)


input will be a list of CVEs, with optional counts of these,
this will be generated semi-automatically
 
@Jay Jacobs (Cyentia)
 any guidance on picking a variable and associated distribution to sample all CVEs to create something representative of an organization.
the naive way is to do a random sample (with fixed seed for reproducibility) and then review and hand tweak as needed e.g. by comparing to my orgs data
this can be replaced by an organizations with their own CVEs and counts so they can run the notebooks on their data
the notebook will
enrich the list of CVEs with all the data sources we have (EPSS, CISA KEV, metasploit,.....)
3D interactive zoomable/rotatable scatter plot of EPSS vs CVSS score vs counts of CVEs
the CVEs will be color-coded by data sources  e.g. red for CISA KEV, etc...
it may have sliders on both EPSS and CVSS so users can see the effect of different thresholds
calculate the EPSS percentiles for that set of CVEs
a second notebook will run an EDA on the enriched set of CVEs
this is primarily to educate users on the ease and power of EDA
Let me know if there's anything else that we could do for orgs in terms of analyzing (their) CVEs (edited) 





...maybe I'll do a notebook on applying the decision tree code to their CVEs


https://community.plotly.com/t/3d-interactive-graph-linked-with-three-sliders/72418


import plotly.graph_objects as go
import pandas as pd

# Sample DataFrame (Replace this with your actual DataFrame)
data = {
    'CVE': ['CVE-2021-0001', 'CVE-2021-0002', 'CVE-2021-0003', 'CVE-2021-0004'],
    'EPSS': [0.2, 0.3, 0.5, 0.7],
    'Count': [10, 20, 30, 40],
    'CVSScore': [2, 5, 8, 9]
}
df = pd.DataFrame(data)

# Create the 3D Scatter plot
fig = go.Figure()

# Initial plot with all data
fig.add_trace(go.Scatter3d(
    x=df['EPSS'],
    y=df['CVSScore'],
    z=df['Count'],
    mode='markers',
    marker=dict(
        size=8,
        color=df['Count'],  # Color by Count
        colorscale='Viridis',  # Choose a color scale
        opacity=0.8
    )
))

# Add sliders
sliders = [
    dict(
        steps=[dict(method='restyle',
                    args=['visible', [False] * len(df)),
               dict(label='All',
                    method='restyle',
                    args=['visible', [True] * len(df))])]
]

# Slider for EPSS score
fig.update_layout(
    sliders=[
        dict(
            active=0,
            currentvalue={"prefix": "EPSS Score Filter: "},
            pad={"t": 50},
            steps=[dict(
                label=str(score),
                method="update",
                args=[{"visible": df['EPSS'] >= score},
                      {"title": "EPSS Score Filter: " + str(score)}])
                for score in df['EPSS'].unique()]
        )
    ]
)

# Slider for CVSS score
fig.update_layout(
    sliders=[
        dict(
            active=0,
            currentvalue={"prefix": "CVSS Score Filter: "},
            pad={"t": 50},
            steps=[dict(
                label=str(score),
                method="update",
                args=[{"visible": df['CVSScore'] >= score},
                      {"title": "CVSS Score Filter: " + str(score)}])
                for score in df['CVSScore'].unique()]
        )
    ]
)

# Set axes labels
fig.update_layout(scene=dict(xaxis_title='EPSS Score',
                              yaxis_title='CVSS Score',
                              zaxis_title='Count'))

# Set layout options for interactive plot
fig.update_layout(scene=dict(xaxis=dict(range=[0, 1]),
                             yaxis=dict(range=[0, 10]),
                             zaxis=dict(range=[0, df['Count'].max()])),
                  width=800, height=600,
                  title='3D Scatter Plot with EPSS and CVSS Scores')

# Show the plot
fig.show()