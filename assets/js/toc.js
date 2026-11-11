// Table of Contents Generator
// Generates sidebar TOC from section headings with matching IDs

document.addEventListener("DOMContentLoaded", function() {
  const sectionElements = document.querySelectorAll("section[id], div[id], article[id]");
  
  sectionElements.forEach(function(section) {
    const id = section.getAttribute("id");
    
    // Fixed: use direct child selector (.page-section-label > p)
    // This matches the actual DOM structure from sections.html
    const label = section.querySelector(".page-section-label > p") || 
                  section.querySelector("h2, h3, h1");
    
    if (id && label) {
      let labelText = label.textContent.trim();
      
      // Escape special HTML characters to prevent XSS
      labelText = labelText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
      
      const tocContainer = document.querySelector(".toc-container") || 
                           document.querySelector(".sidebar-toc") || 
                           document.querySelector(".post-sidebar");
      
      if (tocContainer) {
        const tocList = tocContainer.querySelector("ul");
        if (tocList) {
          const tocItem = document.createElement("li");
          tocItem.className = "toc-item";
          tocItem.innerHTML = `<a href="#${id}">${labelText}</a>`;
          tocList.appendChild(tocItem);
        }
      }
    }
  });
});
