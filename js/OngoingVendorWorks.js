document.addEventListener('DOMContentLoaded', function () {
const workTableContainer = document.getElementById('table-container');

fetch(`http://localhost:8080/work/ongoingworks?id=${localStorage.getItem("id")}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const workTableBody = document.getElementById('workdata');

        // to clear the previous data else it will just add data without clearing previous leads to duplicate datas
        workTableBody.innerHTML = "";

        for (let i = 0; i < data.data.length; i++) {
            let item = data.data[i];
            const type = data.data[i].type;
            const startDate = data.data[i].startDate;
            const endDate = data.data[i].endDate;
            const vname = item.customer ? item.customer.name : 'N/A'; // Check if customer data exists
            const vemail = item.customer ? item.customer.email : 'N/A';
            const vphone = item.customer ? item.customer.phone : 'N/A';
            const loc = data.data[i].address;

            const row = workTableBody.insertRow();
            row.innerHTML = `
                <td>${type}</td>
                <td>${startDate}</td>
                <td>${endDate}</td>
                <td>${loc.d_no} ${loc.street} ${loc.landmark} ${loc.district} ${loc.pinCode} ${loc.state}</td>
                <td>${vname}</td>
                <td>${vemail}</td>
                <td>${vphone}</td>
                <td><button id="button1"  class="end-work-button">End Work</button></td>
            `;

            const endWorkButton = row.querySelector(".end-work-button");
            endWorkButton.addEventListener("click", () => {
                fetch(`http://localhost:8080/end?w_id=${item.id}&ven_id=${localStorage.getItem("id")}`, {
                    method: "PUT"
                })
                .then((response) => response.json())
                .then((obj) => {
                    console.log(obj);

                    if (obj.data.endDate != null) {
                        alert(`you successfully ended the work on ${obj.data.endDate}`);
                    }
                })
                .catch((error) => {
                    alert("the work is still not ended or finished");
                });
            });
        }

        let display = workTableContainer.classList.toggle("true");
        if (display) {
            workTableContainer.style.display = "block";
        } else {
            workTableContainer.style.display = "none";
        }
    })
    .catch(error => {
        console.error('Error fetching work data:', error);
    });
});