const commandSections = Array.from(document.querySelectorAll("[data-command-columns]"), (container) => {
  const table = container.querySelector("table");
  const rows = Array.from(table.tBodies[0].rows);
  const units = [];

  for (let index = 0; index < rows.length; index++) {
    if (rows[index].classList.contains("table-light") && index + 1 < rows.length) {
      units.push([rows[index], rows[++index]]);
    } else {
      units.push([rows[index]]);
    }
  }

  return { container, table, units, width: 0 };
});

function createColumn(source) {
  const column = document.createElement("div");
  column.className = "col";
  const table = source.cloneNode(false);
  table.append(source.caption.cloneNode(true), source.tHead.cloneNode(true));
  const body = document.createElement("tbody");
  table.append(body);
  column.append(table);
  return { column, body };
}

function distributeCommands(section) {
  const width = section.container.getBoundingClientRect().width;
  if (width === section.width || width <= 0) return;
  section.width = width;

  const count = Math.min(section.units.length, Math.max(1, Math.floor(width / 360)));
  const columns = Array.from({ length: count }, () => createColumn(section.table));
  section.container.replaceChildren(...columns.map(({ column }) => column));
  columns[0].body.append(...section.units.flat());

  const heights = section.units.map((unit) => unit.reduce((height, row) => height + row.getBoundingClientRect().height, 0));
  let remainingHeight = heights.reduce((total, height) => total + height, 0);
  let next = 0;

  for (let index = 0; index < count; index++) {
    const columnsLeft = count - index;
    const targetHeight = remainingHeight / columnsLeft;
    let height = 0;
    const first = next;

    while (next < section.units.length) {
      const unitsLeft = section.units.length - next;
      if (next > first && unitsLeft <= columnsLeft - 1) break;
      if (next > first && columnsLeft > 1 && Math.abs(height - targetHeight) <= Math.abs(height + heights[next] - targetHeight)) {
        break;
      }
      height += heights[next];
      next++;
    }

    columns[index].body.append(...section.units.slice(first, next).flat());
    remainingHeight -= height;
  }
}

function refreshColumns() {
  commandSections.forEach(distributeCommands);
}

let pendingFrame;
const observer = new ResizeObserver(() => {
  cancelAnimationFrame(pendingFrame);
  pendingFrame = requestAnimationFrame(refreshColumns);
});

commandSections.forEach(({ container }) => observer.observe(container));
refreshColumns();
