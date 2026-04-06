function generateInputs() {
    const n = document.getElementById("numFriends").value;
    const container = document.getElementById("inputs");

    container.innerHTML = "";

    for (let i = 0; i < n; i++) {
        container.innerHTML += `
            <div class="person">
                <input type="text" placeholder="Name ${i+1}" class="name">
                <input type="number" placeholder="Expense" class="expense">
            </div>
        `;
    }

    document.getElementById("calculateBtn").style.display = "block";
}

function calculate() {
    const names = document.querySelectorAll(".name");
    const expenses = document.querySelectorAll(".expense");

    let n = names.length;
    let total = 0;

    let people = [];

    for (let i = 0; i < n; i++) {
        let name = names[i].value;
        let amount = parseFloat(expenses[i].value);

        total += amount;
        people.push({ name, amount });
    }

    let avg = total / n;

    let debtors = [];
    let creditors = [];

    people.forEach(p => {
        let diff = p.amount - avg;

        if (diff < 0) {
            debtors.push({ name: p.name, amount: -diff });
        } else if (diff > 0) {
            creditors.push({ name: p.name, amount: diff });
        }
    });

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h3>Average: ₹${Math.round(avg)}</h3><h3>Settlements:</h3>`;

    while (debtors.length && creditors.length) {
        debtors.sort((a, b) => a.amount - b.amount);
        creditors.sort((a, b) => b.amount - a.amount);

        let d = debtors.shift();
        let c = creditors.shift();

        let settleAmount = Math.min(d.amount, c.amount);
        let rounded = Math.round(settleAmount);

        resultDiv.innerHTML += `<p>${d.name} pays ₹${rounded} to ${c.name}</p>`;

        d.amount -= settleAmount;
        c.amount -= settleAmount;

        if (d.amount > 0) debtors.push(d);
        if (c.amount > 0) creditors.push(c);
    }
}