const table = document.getElementsByTagName("table")[0]

table.lastElementChild.innerHTML = Object.entries(recordManager.get()).map(([name, money]) => `
    <tr>
        <td>${name}</td>
        <td>${money}</td >
    </tr >
    `).join("")
