function adjustCodePairWidths() {
  // Find all code pair containers
  const codePairs = document.querySelectorAll(".code-pair");

  codePairs.forEach((codePair) => {
    const items = codePair.querySelectorAll(".code-pair-item");
    const containerWidth = codePair.clientWidth;
    const gap = parseInt(getComputedStyle(codePair).gap) || 0;

    // First pass: calculate natural widths
    const naturalWidths = Array.from(items).map((item) => {
      // Temporarily remove width constraint to measure content
      item.style.width = "auto";
      const codeBlock = item.querySelector("pre");
      const naturalWidth = codeBlock.scrollWidth;
      return naturalWidth;
    });

    // Calculate total natural width and gap space
    const totalGapWidth = gap * (items.length - 1);
    const totalNaturalWidth = naturalWidths.reduce((sum, width) => sum + width, 0);

    // Second pass: set appropriate widths
    if (totalNaturalWidth + totalGapWidth <= containerWidth) {
      // Case 1: Enough space - set minimum required widths
      items.forEach((item, index) => {
        const percentWidth = (naturalWidths[index] / containerWidth) * 100;
        item.style.width = `${percentWidth}%`;
      });
    } else {
      // Case 2: Not enough space - distribute proportionally
      items.forEach((item, index) => {
        const percentWidth = (naturalWidths[index] / totalNaturalWidth) * ((containerWidth - totalGapWidth) / containerWidth) * 100;
        item.style.width = `${percentWidth}%`;
      });
    }
  });
}

// Run on page load and window resize
window.addEventListener("load", adjustCodePairWidths);
window.addEventListener("resize", adjustCodePairWidths);
