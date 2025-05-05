// docs/assets/js/cwe-sunburst.js
async function loadData() {
    const res = await fetch('../../assets/data/cwe_complete_hierarchy_dag.json');
    if (!res.ok) throw new Error(res.status);
    createSunburst(await res.json());
  }
  
  function createSunburst(data) {
    d3.select("#chart").selectAll("*").remove();
    //const width=900, height=900;
    const container = document.getElementById("chart");
    const width     = container.clientWidth;
    const height    = container.clientHeight || width;
    const radius=Math.min(width,height)/2-10, innerRadius=radius*0.15;
    const colorScheme={Pillar:'#e41a1c',Class:'#377eb8',Base:'#4daf4a',Variant:'#984ea3',Compound:'#ff7f00'};
    const color = d => d.depth===0? '#ddd' : d.data.abstraction ? colorScheme[d.data.abstraction] : '#999';
  
    const svg = d3.select("#chart")
      .append("svg")
      .attr("viewBox",[0,0,width,height])
      .style("width","100%").style("height","auto");
  
    const g = svg.append("g")
      .attr("transform",`translate(${width/2},${height/2})`);
  
    svg.call(d3.zoom()
      .scaleExtent([0.5,5])
      .on("zoom", ({transform}) => {
        g.attr("transform",
          `translate(${transform.x+width/2},${transform.y+height/2}) scale(${transform.k})`
        );
      })
    );
  
    const root = d3.partition()
      .size([2*Math.PI,1])(
        d3.hierarchy(data)
          .sum(d=>(!d.children||!d.children.length)?1:0)
          .sort((a,b)=>b.value-a.value)
      );
  
    const arc = d3.arc()
      .startAngle(d=>d.x0).endAngle(d=>d.x1)
      .padAngle(d=>Math.min((d.x1-d.x0)/2,0.005)).padRadius(radius/2)
      .innerRadius(d=>Math.max(innerRadius,d.y0*radius))
      .outerRadius(d=>Math.max(d.y0*radius,d.y1*radius-1));
  
    // draw slices
    g.selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
      .attr("fill", color)
      .attr("d", arc)
      .style("cursor", "pointer")
      .on("mouseover", showInfo)
      .on("click", (event, d) => {
        // build the URL you want—here we’ll link to the MITRE CWE page:
        const idNum = d.data.id?.split("CWE-")[1];
        if (idNum) {
          window.open(
            `https://cwe.mitre.org/data/definitions/${idNum}.html`,
            "_blank"
          );
        }
      });
  
    // draw labels
    g.append("g")
      .attr("pointer-events","none")
      .attr("text-anchor","middle")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
        .attr("transform", d => {
          const angle = (d.x0 + d.x1)/2 * 180/Math.PI;
          const radiusFactor = 1.12;
          const y = (d.y0 + d.y1)/2 * radius * radiusFactor;
          return `rotate(${angle-90}) translate(${y},0) rotate(${angle<180?0:180})`;
        })
        .attr("font-size", "3px")
        .text(d => d.data.id 
          ? d.data.id.split(':')[0] 
          : (d.data.name||"").substring(0,30)
        )
        .on("mouseover click", showInfo);
  
    // info‐panel
    function showInfo(_,d) {
      const bc = d.ancestors().reverse()
        .map(a=>a.data.id||a.data.name||"Root").join(" > ");
      let html = `<div class="breadcrumb">${bc}</div>`;
      if(d.data.id) html += `
      <div class="cwe-id">
        <a href="https://cwe.mitre.org/data/definitions/${d.data.id.split('-')[1]}.html" target="_blank">
          ${d.data.id}
        </a>
      </div>`;
      if(d.data.name)     html += `<div class="cwe-name">${d.data.name}</div>`;
      if(d.data.abstraction)
                          html += `<div class="cwe-abstraction">Abstraction: ${d.data.abstraction}</div>`;
      html += `<div class="children-count">${
                d.children 
                  ? `Children: ${d.children.length}`
                  : 'Leaf node'
              }</div>`;
      d3.select(".node-info").html(html);
    }
  
    // legend
    const legend = d3.select("#legend");
    Object.entries(colorScheme).forEach(([lbl,col]) => {
      legend.append("div")
        .attr("class","legend-item")
        .html(`<div class="legend-color" style="background:${col}"></div><span>${lbl}</span>`);
    });
  
    // initial
    showInfo(null, root);
  }
  
  loadData();
  