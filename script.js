const $ = element => document.querySelector(element);
const $$ = element => document.querySelectorAll(element);

// REFERENCE TD & TH
const thsElement = $$('thead tr th');
const ths = [...thsElement];
const tdsElement = $$('tbody tr td');
const tds = [...tdsElement];

// SELECT REFERENCE
const select = $('select');

// SELECT CREATE
function createOptions(n) {
    for (let i = 0; i < n; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', i);
        option.innerText = i;
        if (i === 0) {
            option.innerText = 'Ninguna';
        }
        select.appendChild(option);
    }
}

// FILL SELECT WITH THS LENGTH
thsLength = ths.length;
createOptions(thsLength);


function fixColumns() {
    // SELECT VALUE
    const selectedValue = parseInt(select.value);  
    ths.forEach(th => {
        // REMOVE STICKY CLASS FROM ALL THS
        th.classList.remove('sticky-column');
        // MEASURE PREVIOUS THS AND SET LEFT POSITION
        if (selectedValue > 0) {
            let prevSiblingsArray = [];
            let prevSibling = th.previousElementSibling
            while (prevSibling) {
                prevSiblingsArray.push(prevSibling.offsetWidth);
                prevSibling = prevSibling.previousElementSibling;
            }
            let addition = prevSiblingsArray.reduce((acc, current) => acc + current, 0);
            th.style.left = addition + 'px';
        }
    })
    tds.forEach(td => {
        // REMOVE STICKY CLASS FROM ALL TDS
        td.classList.remove('sticky-column');
    })
      // MEASURE PREVIOUS TDS AND SET LEFT POSITION
    if (selectedValue > 0) {
        for (let index = 0; index < selectedValue; index++) {
            ths[index].classList.add('sticky-column');
            const rows = $$('tbody tr')
            rows.forEach(row => {
                const tdsInRow = row.querySelectorAll('td');
                if (tdsInRow[index]) {
                    tdsInRow[index].classList.add('sticky-column');
                }
                let prevSiblingsArray = [];
                let prevSibling = tdsInRow[index].previousElementSibling
                while (prevSibling) {
                    prevSiblingsArray.push(prevSibling.offsetWidth);
                    prevSibling = prevSibling.previousElementSibling;
                }
                let addition = prevSiblingsArray.reduce((acc, current) => acc + current, 0);
                tdsInRow[index].style.left = addition + 'px';
            })
        }
    }
}

select.addEventListener('change', fixColumns)