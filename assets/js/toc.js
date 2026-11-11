// Table of Contents Generator
// Generates sidebar TOC from h2 headings with matching IDs

document.addEventListener("DOMContentLoaded", function() {
  const sectionElements = document.querySelectorAll("section[id], div[id], article[id]");
  
  sectionElements.forEach(function(section) {
    const id = section.getAttribute("id");
    const label = section.querySelector(".page-section-label p") || section.querySelector("h2, h3, h1");
    
    if (id && (label || document.body.classList.contains("enable-toc"))) {
      let labelText = "";
      if (label) {
        labelText = label.textContent.trim();
      }
      
      const tocContainer = document.querySelector(".toc-container") || document.querySelector(".sidebar-toc") || document.querySelector(".post-sidebar");
      
      if (tocContainer) {
        const tocItem = document.createElement("li");
        tocItem.className = "toc-item";
        tocItem.innerHTML = `<a href="#${id}">${labelText}</a>`;
        
        const tocList = tocContainer.querySelector("ul");
        if (tocList) {
          tocList.appendChild(tocItem);
        }
      }
    }
  });
});
