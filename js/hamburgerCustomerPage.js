
    // --------------------------------------------------------------------------------------------------
    //nav bar and side bar code
    // Function to toggle the sidebar
    function toggleSidebar() {
        var sideBar = document.querySelector('.side-bar');
        var menuBtn = document.querySelector('.menu-btn');
        var closeBtn = document.querySelector('.close-btn');
        if (sideBar.classList.contains('active')) {
            sideBar.classList.remove('active');
            menuBtn.style.visibility = 'visible';
        } else {
            sideBar.classList.add('active');
            menuBtn.style.visibility = 'hidden';
        }
    }

    // Function to toggle sub menus
    function toggleSubmenu(btn) {
        var subMenu = btn.nextElementSibling;
        var dropdown = btn.querySelector('.dropdown');
        if (subMenu.style.display === 'block') {
            subMenu.style.display = 'none';
            dropdown.classList.remove('rotate');
        } else {
            subMenu.style.display = 'block';
            dropdown.classList.add('rotate');
        }
    }

    // Event listeners
    document.querySelector('.menu-btn').addEventListener('click', toggleSidebar);
    document.querySelector('.close-btn').addEventListener('click', toggleSidebar);

    var subBtns = document.querySelectorAll('.sub-btn');
    subBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            toggleSubmenu(btn);
        });
    });

    //end of side bar 
// --------------------------------------------------------------------------------------------------
    
//  code for handling the "Upload Work" button click
//let uploadButton = document.getElementById('upload-work');

// uploadButton.addEventListener('click', function () {
//     // Code to trigger a file upload dialog or perform the desired action
//     alert('Upload Work button clicked!');
// });

 // JavaScript function to simulate hiring a vendor
 function hireVendor(vendorId) {
    alert(`Hiring Vendor ${vendorId}`);
}
// --------------------------------------------------------------------------------------------------

// the below code belongs to customer delete
let de=document.getElementById("delete-account")
console.log(de);
de.addEventListener("click",(e)=>{
  e.preventDefault();


  fetch(`http://localhost:8080/customer?id=${localStorage.getItem("id")}`, {
method: 'DELETE'

})
.then(response => response.json())
.then(obj => {
  
  console.log(obj);
  if(obj.status===302){
    localStorage.clear();
    window.location.href="http://127.0.0.1:5501/index.html"
  }
  
 
 
})
.catch(error => {

  console.error("error")
});


})

// --------------------------------------------------------------------------------------------------
// Define the logout function

function logoutB() {
    localStorage.clear();
    window.location.href = "http://127.0.0.1:5501/index.html";
}

// Add an event listener to the "Logout" button
const logoutS = document.getElementById('logout');
logoutS.addEventListener('click', logoutB);
// --------------------------------------------------------------------------------------------------
//for fetching the vndors from the BE
function hireVendor(vendorId) {
    // Redirect to a new page with the vendor ID as a query parameter
    window.location.href = `vendordetailsforcustomer.html?vendorId=${vendorId}`;
}

fetch(`http://localhost:8080/vendors?id=${localStorage.getItem("id")}`, {
    method: 'GET'
})
.then((x) => x.json())
.then((obj) => {
    console.log(obj);

    if (obj.status === 302) {
    
        const vendorDataList = obj.data;
        
        // to target the container of div which we created in html
        const vendorListContainer = document.getElementById("vendor-list");

        // Clear any existing content in the container
        vendorListContainer.innerHTML = '';

        // to itterate through list of vendors
        vendorDataList.forEach((vendorData) => {
            // it will create one new div container for every vendor data
            const vendorItem = document.createElement('div');
            vendorItem.classList.add('vendor-item');

            // for name printing i am crating h2 tag
            const vendorName = document.createElement('h2');
            vendorName.classList.add('vendor-name');
            vendorName.textContent = `Vendor Name: ${vendorData.name}`;
            
            // for showing work type i am creating p tag here
            const vendorWork = document.createElement('p');
            vendorWork.classList.add('vendor-work');
            vendorWork.textContent = `Work: ${vendorData.role}`;
            
            // again to show location i am craeting p tag
            const vendorLocation = document.createElement('p');
            vendorLocation.classList.add('vendor-location');

            if (vendorData.address) {
                vendorLocation.textContent = `Location: ${vendorData.address.landmark}`;
            } else {
                vendorLocation.textContent = 'Location: N/A'; // or some default value
            }            
            // again to show costperday i am creating p tag
            const costPerDay = document.createElement('p');
            costPerDay.classList.add('vendor-costperday');
            costPerDay.textContent = `CostPerDay: ${vendorData.costPerDay}`;
            
            // to  Create a hire button in div tag
            const hireButton = document.createElement('button');
            hireButton.classList.add('hire-button');
            hireButton.textContent = 'Hire';
            hireButton.addEventListener('click', () => hireVendor(vendorData.id)); // Assuming you have a hireVendor function
            
            // here we are adding h2 and those three p tag to div container
            vendorItem.appendChild(vendorName);
            vendorItem.appendChild(vendorWork);
            vendorItem.appendChild(vendorLocation);
            vendorItem.appendChild(costPerDay);
            vendorItem.appendChild(hireButton);

            // so here we are just adding our container in to html outer div container created in html
            vendorListContainer.appendChild(vendorItem);
        });
    }
})
.catch((error) => {
    console.error(error);
});



