const adminUsername = "admintarak";
const adminPassword = "Admin@1234";
function login(event) {
    console.log("krishan")
    event.preventDefault(); // Prevent form from submitting normally
    const username = document.getElementById('first').value;
    const password = document.getElementById('psw').value;

    

    if (username === adminUsername && password === adminPassword) {
        alert("Admin login successful!");
        // Redirect to home.html
        window.location.href = "home.html";
    } else {
        alert("Invalid credentials. Please try again.");
    }
    return false;
}