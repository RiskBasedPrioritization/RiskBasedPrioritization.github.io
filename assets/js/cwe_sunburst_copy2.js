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
  
  // Ensure minimum segment size for visibility
  root.descendants().forEach(d => {
    // Ensure each segment has a minimum angular width
    if (d.x1 - d.x0 < 0.01 && d !== root) {
      // If segment is too small, set a minimum size of 0.01 radians
      // This may slightly distort the proportions but improves visibility
      const midpoint = (d.x0 + d.x1) / 2;
      d.x0 = midpoint - 0.005;
      d.x1 = midpoint + 0.005;
    }
  });

  // Increase minimum padding between segments
  const arc = d3.arc()
    .startAngle(d=>d.x0).endAngle(d=>d.x1)
    .padAngle(d=>Math.min((d.x1-d.x0)/2,0.003)).padRadius(radius/2)
    .innerRadius(d=>Math.max(innerRadius,d.y0*radius))
    .outerRadius(d=>Math.max(d.y0*radius,d.y1*radius-1));

  // draw slices with improved visibility
  g.selectAll("path")
  .data(root.descendants().slice(1))
  .join("path")
    .attr("fill", color)
    .attr("d", arc)
    .style("cursor", "pointer")
    .style("opacity", 1) // Full opacity for better visibility
    .style("stroke", "#fff")
    .style("stroke-width", "0.5px") // Slightly thicker borders
    .on("mouseover", (event, d) => {
      // Highlight on hover
      d3.select(event.currentTarget)
        .style("opacity", 0.8)
        .style("stroke-width", "1px");
      showInfo(event, d);
    })
    .on("mouseout", (event) => {
      // Restore normal appearance
      d3.select(event.currentTarget)
        .style("opacity", 1)
        .style("stroke-width", "0.5px");
    })
    .on("click", (event, d) => {
      // build the URL you want—here we'll link to the MITRE CWE page:
      const idNum = d.data.id?.split("CWE-")[1];
      if (idNum) {
        window.open(
          `https://cwe.mitre.org/data/definitions/${idNum}.html`,
          "_blank"
        );
      }
    });

  // draw labels with collision detection
  const textNodes = g.append("g")
    .attr("pointer-events","none")
    .attr("text-anchor","middle")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
      .attr("dy", "0.35em") // Vertical centering
      .attr("font-size", "5px")
      .attr("stroke", "#fff")
      .attr("stroke-width", "0.3px")
      .attr("font-weight", "bold")
      .text(d => d.data.id ? d.data.id.split(':')[0] : "")
      .attr("opacity", 0); // Start invisible for positioning
  
  // Set transformation for each text
  textNodes.each(function(d) {
    const node = d3.select(this);
    const angle = (d.x0 + d.x1)/2 * 180/Math.PI;
    const radiusFactor = 1.1;
    const y = (d.y0 + d.y1)/2 * radius * radiusFactor;
    
    node.attr("transform", `rotate(${angle-90}) translate(${y},0) rotate(${angle<180?0:180})`);
  });
  
  // Simple collision detection by checking overlaps and hiding some labels
  const visibleTexts = new Set();
  const textBounds = new Map();
  
  // Collect text bounding boxes
  textNodes.each(function(d) {
    // Get bounds in global space
    const bbox = this.getBBox();
    const ctm = this.getCTM();
    
    // Transform bbox corners
    const corners = [
      {x: bbox.x, y: bbox.y},
      {x: bbox.x + bbox.width, y: bbox.y},
      {x: bbox.x, y: bbox.y + bbox.height},
      {x: bbox.x + bbox.width, y: bbox.y + bbox.height}
    ].map(p => {
      // Apply current transformation matrix
      const pt = svg.node().createSVGPoint();
      pt.x = p.x;
      pt.y = p.y;
      const transformed = pt.matrixTransform(ctm);
      return {x: transformed.x, y: transformed.y};
    });
    
    // Find transformed bounding box
    const minX = Math.min(...corners.map(p => p.x));
    const maxX = Math.max(...corners.map(p => p.x));
    const minY = Math.min(...corners.map(p => p.y));
    const maxY = Math.max(...corners.map(p => p.y));
    
    textBounds.set(d.id, {
      id: d.id,
      minX, maxX, minY, maxY,
      width: maxX - minX,
      height: maxY - minY,
      area: (maxX - minX) * (maxY - minY),
      depth: d.depth,
      text: this
    });
  });
  
  // Sort by area (prioritize larger segments)
  const sortedBounds = Array.from(textBounds.values())
    .sort((a, b) => {
      // First prioritize by depth (outer rings first)
      if (a.depth !== b.depth) return a.depth - b.depth;
      // Then by area (larger first)
      return b.area - a.area;
    });
  
  // Check for overlaps and show non-overlapping texts
  sortedBounds.forEach(box => {
    let overlaps = false;
    
    // Check if this box overlaps with any already visible text
    for (const visibleId of visibleTexts) {
      const otherBox = textBounds.get(visibleId);
      
      // Simple overlap check
      if (!(box.maxX < otherBox.minX || box.minX > otherBox.maxX || 
            box.maxY < otherBox.minY || box.minY > otherBox.maxY)) {
        overlaps = true;
        break;
      }
    }
    
    // If no overlap, make this text visible
    if (!overlaps) {
      d3.select(box.text).attr("opacity", 1);
      visibleTexts.add(box.id);
    }
  });
  
  // Add tooltips for all segments
  textNodes.append("title")
    .text(d => d.data.id && d.data.name ? `${d.data.id}: ${d.data.name}` : (d.data.name || ""));

  // info‐panel with children list
  function showInfo(event, d) {
    const bc = d.ancestors().reverse()
      .map(a => a.data.id || a.data.name || "Root").join(" > ");
      
    let html = `<div class="breadcrumb">${bc}</div>`;
    if (d.data.id) html += `
    <div class="cwe-id">
      <a href="https://cwe.mitre.org/data/definitions/${d.data.id.split('-')[1]}.html" target="_blank">
        ${d.data.id}
      </a>
    </div>`;
    if (d.data.name) html += `<div class="cwe-name">${d.data.name}</div>`;
    if (d.data.abstraction)
                        html += `<div class="cwe-abstraction">Abstraction: ${d.data.abstraction}</div>`;
    
    // Add children information - always show all children
    html += `<div class="children-count">${
              d.children 
                ? `Children: ${d.children.length}`
                : 'Leaf node'
            }</div>`;
            
    // Add list of children if any
    if (d.children && d.children.length > 0) {
      html += `<div class="children-list"><ul>`;
      // Sort children alphabetically by ID
      const sortedChildren = [...d.children].sort((a, b) => {
        const aId = a.data.id || "";
        const bId = b.data.id || "";
        return aId.localeCompare(bId);
      });
      
      sortedChildren.forEach(child => {
        const idNum = child.data.id?.split('-')[1];
        if (child.data.id) {
          html += `<li>
            <a href="https://cwe.mitre.org/data/definitions/${idNum}.html" target="_blank">${child.data.id}</a>: 
            ${child.data.name || ""}
          </li>`;
        } else {
          html += `<li>${child.data.name || ""}</li>`;
        }
      });
      html += `</ul></div>`;
    }
    
    // Add reference indicator if this is a reference node
    if (d.data.isReference) {
      html += `<div class="reference-note">This is a reference to another occurrence (to avoid cycles)</div>`;
    }
    
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