document.addEventListener("DOMContentLoaded", function () {
  const rootStyle = getComputedStyle(document.documentElement);
  const minTableWidth = parseFloat(rootStyle.getPropertyValue("--table-min-width"));
  const gapWidth = parseFloat(rootStyle.getPropertyValue("--table-gap"));

  function calculateMaxTableCount(tableContainer) {
    const containerWidth = tableContainer.clientWidth;
    const maxTableCount = Math.floor(containerWidth / (minTableWidth + gapWidth));
    console.log("\n------ Debug Info ------");
    console.log("Container:", tableContainer);
    console.log("containerWidth =", containerWidth);
    console.log("minTableWidth =", minTableWidth);
    console.log("gapWidth =", gapWidth);
    console.log("maxTableCount =", maxTableCount > 0 ? maxTableCount : 1);

    return maxTableCount > 0 ? maxTableCount : 1;
  }

  // Helper function to count br elements in a row
  function countBrElements(row) {
    const tds = row.querySelectorAll("td");
    if (tds.length === 0) return 0;

    const firstTdBrCount = tds[0].querySelectorAll("br").length;
    const secondTdBrCount = tds.length > 1 ? tds[1].querySelectorAll("br").length : 0;

    return Math.max(firstTdBrCount, secondTdBrCount);
  }

  // Helper function to calculate effective row count
  function getVisualRowCount(row) {
    const brCount = countBrElements(row);
    return brCount + 1; // Add 1 because n br elements create n+1 visual rows
  }

  function distributeRowsInContainer(tableContainer) {
    const mainTable = tableContainer.querySelector("table");
    const actualRows = Array.from(mainTable.querySelectorAll("tr"));
    const stack = actualRows.reverse();

    // Calculate total effective rows
    let visualRowCount = 0;
    actualRows.forEach((row) => {
      visualRowCount += getVisualRowCount(row);
    });

    const maxTableCount = calculateMaxTableCount(tableContainer);
    const visualRowCountAvg = Math.ceil(visualRowCount / maxTableCount);

    console.log("\n------ Debug Info ------");
    console.log("Container:", tableContainer);
    console.log("Actual Rows =", actualRows.length);
    console.log("Visual Rows =", visualRowCount);
    console.log("Average Visual Rows Per Table =", visualRowCountAvg);

    mainTable.remove();

    function distributeRows() {
      const tables = [];

      for (let i = 0; i < maxTableCount; i++) {
        const newTable = document.createElement("table");
        newTable.style.width = "100%";
        tables.push(newTable);
        tableContainer.appendChild(newTable);
      }

      for (let i = 0; i < maxTableCount; i++) {
        const newTable = tables[i];
        const isLastTable = i === maxTableCount - 1;
        let visualRowCountCur = 0;
        let actualRowCountCur = 0;

        while (stack.length > 0) {
          let row = stack.pop();
          newTable.appendChild(row);
          visualRowCountCur += getVisualRowCount(row);
          actualRowCountCur++;

          if (!isLastTable && visualRowCountCur >= visualRowCountAvg) {
            console.log(newTable, "is assigned", visualRowCountCur, "visual rows,", actualRowCountCur, "actual rows");
            break;
          }

          if (stack.length === 0) {
            console.log(newTable, "is assigned", visualRowCountCur, "visual rows,", actualRowCountCur, "actual rows");
          }
        }

        // Handle separators
        let firstRow = newTable.rows[0];
        if (firstRow && firstRow.classList.contains("separator") && !firstRow.classList.contains("desc")) {
          newTable.deleteRow(0);
          visualRowCountCur--;
          actualRowCountCur--;
        }

        let lastRowIndex = newTable.rows.length - 1;
        let lastRow = newTable.rows[lastRowIndex];
        if (lastRow && lastRow.classList.contains("separator")) {
          if (lastRow.classList.contains("desc")) {
            newTable.deleteRow(lastRowIndex);
            stack.push(lastRow);
          } else {
            newTable.deleteRow(lastRowIndex);
          }

          visualRowCountCur--;
          actualRowCountCur--;
        }
      }
    }

    distributeRows();

    // Reattach anchor link event listeners
    const anchorLinks = tableContainer.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.classList.remove("highlight");
          void targetElement.offsetWidth;
          targetElement.classList.add("highlight");
        }
      });
    });
  }

  const tableContainers = document.querySelectorAll(".table-container");
  tableContainers.forEach(distributeRowsInContainer);
});
