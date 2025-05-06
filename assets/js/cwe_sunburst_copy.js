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
    const radius = Math.min(width, height) / 2 - 10;
    const innerRadius = radius * 0.12;
    
    // Enhanced color scheme with better contrast
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
    
    // Improved color function with opacity for better readability
    const color = d => {
      if (d.depth === 0) return '#ddd';
      if (d.data.abstraction && colorScheme[d.data.abstraction]) {
        return colorScheme[d.data.abstraction];
      }
      return '#999';
    };
  
    const svg = d3.select("#chart")
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .style("width", "100%")
      .style("height", "auto");
  
    const g = svg.append("g")
      .attr("transform", `translate(${width/2},${height/2})`);
  
    // Enhanced zoom functionality
    svg.call(d3.zoom()
      .scaleExtent([0.5, 12])
      .on("zoom", ({transform}) => {
        g.attr("transform",
          `translate(${transform.x + width/2},${transform.y + height/2}) scale(${transform.k})`
        );
        
        // Dynamically adjust text size based on zoom level
        d3.selectAll(".slice-label")
          .style("font-size", d => {
            // Base size calculation with increased values
            const angle = d.x1 - d.x0;
            let baseSize;
            
            if (d.depth < 2) {
              baseSize = Math.min(2.5, Math.max(1.5, angle * 35));
            } else if (d.depth < 3) {
              baseSize = Math.min(2.0, Math.max(1.2, angle * 30));
            } else {
              baseSize = Math.min(1.7, Math.max(1.0, angle * 25));
            }
            
            // Scale font size based on zoom level, with a minimum size
            return `${Math.max(0.8, baseSize / transform.k)}px`;
          });
      })
    );
  
    // Optimize hierarchy calculation
    const root = d3.partition()
      .size([2 * Math.PI, 1])(
        d3.hierarchy(data)
          .sum(d => (!d.children || !d.children.length) ? 1 : 0)
          .sort((a, b) => b.value - a.value)
      );
    
    // Improved arc generator with padding
    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.003))
      .padRadius(radius / 2)
      .innerRadius(d => Math.max(innerRadius, d.y0 * radius))
      .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));
  
    // Draw slices with hover effects
    g.selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
        .attr("fill", color)
        .attr("d", arc)
        .attr("stroke", "white")
        .attr("stroke-width", 0.5)
        .style("cursor", "pointer")
        .style("opacity", 0.9)
        .on("mouseover", (event, d) => {
          d3.select(event.currentTarget)
            .style("opacity", 1)
            .attr("stroke-width", 1);
          showInfo(event, d);
        })
        .on("mouseout", (event) => {
          d3.select(event.currentTarget)
            .style("opacity", 0.9)
            .attr("stroke-width", 0.5);
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
  
    // Draw ALL labels with improved visibility - maximize text display
    g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
        .attr("class", "slice-label")
        .attr("transform", d => {
          const angle = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          const radius_factor = 0.5 + (d.y0 + d.y1) / 2;
          const y = radius_factor * radius * 0.92;
          return `rotate(${angle - 90}) translate(${y},0) rotate(${angle < 180 ? 0 : 180})`;
        })
        .attr("dy", "0.35em")
        .attr("font-size", d => {
          const angle = d.x1 - d.x0;
          // Maximize font size for all segments
          if (d.depth < 2) {
            return Math.min(2.5, Math.max(1.5, angle * 35)) + "px";
          } else if (d.depth < 3) {
            return Math.min(2.0, Math.max(1.2, angle * 30)) + "px";
          } else {
            return Math.min(1.7, Math.max(1.0, angle * 25)) + "px";
          }
        })
        .attr("fill", d => {
          const bgColor = color(d);
          // Determine text color based on background brightness
          return isColorDark(bgColor) ? "white" : "black";
        })
        .text(d => {
          if (!d.data.id) return "";
          
          // Always show CWE ID for all segments
          return d.data.id.split(':')[0];
        })
        .style("pointer-events", "none")
        // Extra-strong text shadow for maximum readability
        .style("text-shadow", "0 0 4px rgba(255,255,255,0.9), 0 0 2px rgba(0,0,0,0.5)")
        .style("font-weight", d => d.depth < 3 ? "bold" : "normal")
        .style("user-select", "none");
  
    // Helper function to determine if a color is dark
    function isColorDark(color) {
      if (!color) return false;
      
      let r, g, b;
      if (color.startsWith('#')) {
        const hex = color.substring(1);
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else {
        const rgb = color.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          r = parseInt(rgb[0]);
          g = parseInt(rgb[1]);
          b = parseInt(rgb[2]);
        } else {
          return false;
        }
      }
      
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.5;
    }
  
    // Add tooltip for better information display
    d3.select(".cwe-tooltip").remove();
    
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "cwe-tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "5px 8px")
      .style("box-shadow", "0 0 5px rgba(0,0,0,0.2)")
      .style("pointer-events", "none")
      .style("z-index", "1000")
      .style("font-size", "12px")
      .style("max-width", "300px");
  
    // Enhanced info-panel
    function showInfo(event, d) {
      // Show tooltip near mouse with more detailed info
      if (event) {
        tooltip
          .style("visibility", "visible")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 10) + "px")
          .html(`<strong>${d.data.id || "Root"}</strong>${d.data.name ? '<br>' + d.data.name.substring(0, 50) + (d.data.name.length > 50 ? '...' : '') : ''}`);
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
      
      // Add children information - always show all children without toggle
      const childCount = d.children ? d.children.length : 0;
      if (childCount > 0) {
        html += `<div class="children-count">Children: ${childCount}</div>`;
        
        // Always show all children directly
        html += `<div class="children-list"><ul>`;
        d.children.forEach(child => {
          html += `<li>${child.data.id || ""}: ${child.data.name || ""}</li>`;
        });
        html += `</ul></div>`;
      } else {
        html += `<div class="children-count">Leaf node (no children)</div>`;
      }
      
      // Add reference indicator if this is a reference node
      if (d.data.isReference) {
        html += `<div class="reference-note">This is a reference to another occurrence (to avoid cycles)</div>`;
      }
      
      d3.select(".node-info").html(html);
      
      // Add toggle functionality for large child lists
      setTimeout(() => {
        document.getElementById("toggleChildren")?.addEventListener("click", function(e) {
          e.preventDefault();
          const list = this.nextElementSibling;
          list.style.display = list.style.display === "none" ? "block" : "none";
        });
      }, 0);
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
  
    // Initial info
    showInfo(null, root);
  }
  
  loadData();