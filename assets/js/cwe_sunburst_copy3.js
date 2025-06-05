// docs/assets/js/cwe-sunburst.js
async function loadData() {
    const res = await fetch('../../assets/data/cwe_complete_hierarchy_dag.json');
    if (!res.ok) throw new Error(res.status);
    createSunburst(await res.json());
  }
  
  function createSunburst(data) {
    d3.select("#chart").selectAll("*").remove();
    
    const container = document.getElementById("chart");
    const width = container.clientWidth;
    const height = container.clientHeight || width;
    const radius = Math.min(width, height) / 2 - 10, innerRadius = radius * 0.15;
    
    // Enhanced color scheme
    const colorScheme = {
      'Pillar': '#e41a1c',
      'Class': '#377eb8',
      'Base': '#4daf4a',
      'Variant': '#984ea3',
      'Compound': '#ff7f00',
      'Composite': '#e377c2',
      'Chain': '#8c564b',
      'Unknown': '#7f7f7f'
    };
    
    const color = d => d.depth === 0 ? '#ddd' : 
                       d.data.abstraction ? colorScheme[d.data.abstraction] || '#999' : '#999';
  
    const svg = d3.select("#chart")
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("width", "100%")
      .style("height", "auto");
  
    const g = svg.append("g")
      .attr("transform", `translate(${width/2},${height/2})`);
  
    // Enhanced zoom functionality that preserves text size differences
    svg.call(d3.zoom()
      .scaleExtent([0.5, 8])
      .on("zoom", ({transform}) => {
        g.attr("transform",
          `translate(${transform.x + width/2},${transform.y + height/2}) scale(${transform.k})`
        );
        
        // Adjust font sizes during zoom while preserving the hierarchy
        d3.selectAll(".slice-label")
          .style("font-size", function() {
            const d = d3.select(this).datum();
            
            // Base font size depends on abstraction type and depth
            let baseSize;
            if (d.data.abstraction === 'Pillar') {
              baseSize = 7; // Pillar - largest text
            } else if (d.data.abstraction === 'Class') {
              baseSize = 5.5; // Class - second largest
            } else if (d.depth === 1) {
              baseSize = 5; // Other top level nodes
            } else if (d.depth === 2) {
              baseSize = 4; // Second level nodes
            } else {
              baseSize = 3; // Other levels - regular size
            }
            
            // Scale based on zoom level
            if (transform.k > 1) {
              // When zooming in, don't grow text too much
              return `${baseSize * Math.pow(transform.k, 0.2)}px`;
            } else {
              // When zooming out, shrink properly
              return `${baseSize * transform.k}px`;
            }
          });
      })
    );
  
    const root = d3.partition()
      .size([2 * Math.PI, 1])(
        d3.hierarchy(data)
          .sum(d => (!d.children || !d.children.length) ? 1 : 0)
          .sort((a, b) => b.value - a.value)
      );
  
    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => Math.max(innerRadius, d.y0 * radius))
      .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));
  
    // Draw slices with hover effect
    g.selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
        .attr("fill", color)
        .attr("d", arc)
        .style("cursor", "pointer")
        .style("opacity", 0.9)
        .on("mouseover", (event, d) => {
          d3.select(event.currentTarget).style("opacity", 1);
          showInfo(event, d);
        })
        .on("mouseout", (event) => {
          d3.select(event.currentTarget).style("opacity", 0.9);
        })
        .on("click", (event, d) => {
          const idNum = d.data.id?.split("CWE-")[1];
          if (idNum) {
            window.open(
              `https://cwe.mitre.org/data/definitions/${idNum}.html`,
              "_blank"
            );
          }
        });
  
    // Calculate optimal spacing based on abstraction type and depth
    function getOptimalSpacing(d) {
      const segmentSize = d.x1 - d.x0;
      let spacingFactor;
      
      // Spacing based on abstraction type first, then depth
      if (d.data.abstraction === 'Pillar') {
        spacingFactor = 1.22; // Pillar needs more space due to larger font
      } 
      else if (d.data.abstraction === 'Class') {
        spacingFactor = 1.20; // Class needs more space due to larger font
      }
      // Other levels based on depth and segment size
      else if (d.depth === 1) {
        spacingFactor = 1.18;
      }
      else if (d.depth === 2) {
        spacingFactor = 1.15;
      }
      // Other levels need more spacing to avoid overlap
      else {
        spacingFactor = segmentSize < 0.01 ? 1.25 : 
                        segmentSize < 0.05 ? 1.20 : 1.12;
      }
      
      return spacingFactor;
    }
    
    // Draw labels with hierarchical sizing
    g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
        .attr("class", d => `slice-label depth-${d.depth}`)
        .attr("transform", d => {
          const angle = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          const spacingFactor = getOptimalSpacing(d);
          const y = (d.y0 + d.y1) / 2 * radius * spacingFactor;
          return `rotate(${angle - 90}) translate(${y},0) rotate(${angle < 180 ? 0 : 180})`;
        })
        .attr("dy", "0.35em")
        .attr("font-size", d => {
          // Set font size based on abstraction type and hierarchy level
          if (d.data.abstraction === 'Pillar') {
            return "7px"; // Pillar - largest text
          } else if (d.data.abstraction === 'Class') {
            return "3.5px"; // Class - second largest
          } else if (d.depth === 1) {
            return "3px"; // Other top level nodes
          } else if (d.depth === 2) {
            return "4px"; // Second level nodes
          } else {
            return "3px"; // All other nodes
          }
        })
        .attr("font-weight", d => d.depth <= 2 ? "bold" : "normal") // Bold for top two levels
        .text(d => d.data.id ? d.data.id.split(':')[0] : (d.data.name || "").substring(0, 30))
        .style("text-shadow", "0 0 4px rgba(255,255,255,0.8), 0 0 2px rgba(0,0,0,0.4)")
        .style("pointer-events", "none")
        .style("user-select", "none");
  
    // Add tooltip
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "cwe-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "5px 8px")
      .style("box-shadow", "0 0 5px rgba(0,0,0,0.2)")
      .style("pointer-events", "none")
      .style("z-index", "1000")
      .style("font-size", "12px");
  
    // Enhanced info panel
    function showInfo(event, d) {
      // Update tooltip
      if (event) {
        tooltip
          .style("visibility", "visible")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px")
          .html(`<strong>${d.data.id || "Root"}</strong>${d.data.name ? '<br>' + d.data.name : ''}`);
      }
      
      // Update info panel
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
      html += `<div class="children-count">${
                d.children 
                  ? `Children: ${d.children.length}`
                  : 'Leaf node'
              }</div>`;
      
      // Show children list for all nodes with children
      if (d.children && d.children.length > 0) {
        html += `<div class="children-list"><ul>`;
        d.children.forEach(child => {
          html += `<li>${child.data.id || ""}: ${child.data.name || ""}</li>`;
        });
        html += `</ul></div>`;
      }
      
      d3.select(".node-info").html(html);
    }
  
    // Enhanced legend
    const legend = d3.select("#legend");
    legend.selectAll("*").remove(); // Clear existing legend
    
    legend.append("div")
      .attr("class", "legend-title")
      .text("CWE Abstraction Levels");
      
    Object.entries(colorScheme).forEach(([lbl, col]) => {
      legend.append("div")
        .attr("class", "legend-item")
        .html(`
          <div class="legend-color" style="background:${col}; width:15px; height:15px; display:inline-block;"></div>
          <span style="margin-left:5px;">${lbl}</span>
        `);
    });
  
    // Add user instructions
    d3.select("body")
      .append("div")
      .attr("class", "instructions")
      .style("margin-top", "10px")
      .style("text-align", "center")
      .html(`
        <p>Info:</p>
        <ul style="list-style-type:disc; text-align:left; display:inline-block;">
          <li>Use your mouse wheel (or pinch) to zoom, and drag to pan.</li>
          <li>Hover on any segment to see CWE details.</li>
          <li>Click on any segment to open a new page for that MITRE CWE.</li>
          <li>Use your browser search (e.g. CTRL+F) to find and highlight a CWE</li>
        </ul>
      `);
  
    // Initialize with root info
    showInfo(null, root);
  }
  
  loadData();