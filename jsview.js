function clearVisibleContent() {
    const formContainer = document.getElementById('formContainer');
    const table = document.getElementById('patientsTable');
    formContainer.innerHTML = '';
    table.style.display = 'none';
}




function showForm(formType) {
    clearVisibleContent();
    const formContainer = document.getElementById('formContainer');
    let formHTML = '';

    switch (formType) {
        case 'update':
            formHTML = `<h2>Update Patient Details</h2>
                        <form onsubmit="updatePatientDetails(event)">
                            <input type="text" name="patientId" placeholder="Patient ID" required>
                            <input type="text" name="drId" placeholder="New Doctor ID">
                            <input type="text" name="drName" placeholder="New Doctor Name">
                            <input type="text" name="roomNumber" placeholder="New Room Number">
                            <input type="text" name="contact" placeholder="New Contact">
                            <button type="submit">Update Details</button>
                        </form>`;
            break;
        case 'delete':
            formHTML = `<h2>Delete Patient</h2>
                        <form onsubmit="deletePatientById(event)">
                            <input type="text" name="patientId" placeholder="Patient ID" required>
                            <button type="submit">Delete</button>
                        </form>`;
            break;
                case 'register':
                    formHTML = `<h2>Register New Patient</h2>
                                <form onsubmit="return registerPatient(event)">
                                    <input type="text" name="patientId" placeholder="Patient ID" required>
                                    <input type="text" name="patientName" placeholder="Patient Name" required>
                                    <input type="text" name="roomNumber" placeholder="Room Number" required>
                                    <input type="text" name="drId" placeholder="Doctor ID" required>
                                    <input type="text" name="drName" placeholder="Doctor Name" required>
                                    <input type="text" name="age" placeholder="Age" required>
                                    <input type="text" name="gender" placeholder="Gender" required>
                                    <input type="text" name="weight" placeholder="Weight" required>
                                    <input type="text" name="height" placeholder="Height" required>
                                    <input type="text" name="bloodGroup" placeholder="Blood Group" required>
                                    <input type="text" name="address" placeholder="Address" required>
                                    <input type="text" name="contact" placeholder="Contact" required>
                                    <button type="submit">Register</button>
                                </form>`;
                    break;
    }
    formContainer.innerHTML = formHTML;
    formContainer.style.display = 'block';
}
function registerPatient(event) {
    event.preventDefault();
    const form = event.target;
    const newPatientData = {
        patientId: form.patientId.value,
        patientName: form.patientName.value,
        roomNumber: form.roomNumber.value,
        drId: form.drId.value,
        drName: form.drName.value,
        age: form.age.value,
        gender: form.gender.value,
        weight: form.weight.value,
        height: form.height.value,
        bloodGroup: form.bloodGroup.value,
        address: form.address.value,
        contact: form.contact.value
    };

    let patients = JSON.parse(localStorage.getItem('patientData')) || [];
    patients.push(newPatientData); // Add new patient to array
    localStorage.setItem('patientData', JSON.stringify(patients)); // Save back to local storage
    alert('New patient registered successfully!');
    form.reset(); // Reset the form fields after submission
}

function showAllPatients() {
    clearVisibleContent();
    const patients = JSON.parse(localStorage.getItem('patientData')) || [];
    const table = document.getElementById('patientsTable');
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    patients.forEach(patient => {
        const row = `<tr>
                        <td>${patient.patientId}</td>
                        <td>${patient.patientName}</td>
                        <td>${patient.roomNumber}</td>
                        <td>${patient.drId}</td>
                        <td>${patient.drName}</td>
                        <td>${patient.age}</td>
                        <td>${patient.gender}</td>
                        <td>${patient.weight}</td>
                        <td>${patient.height}</td>
                        <td>${patient.bloodGroup}</td>
                        <td>${patient.address}</td>
                        <td>${patient.contact}</td>
                    </tr>`;
        tbody.innerHTML += row;
    });
    table.style.display = 'table';
}

function updatePatientDetails(event) {
    event.preventDefault();
    const form = event.target;
    const id = form.patientId.value;
    const patients = JSON.parse(localStorage.getItem('patientData')) || [];
    const patientIndex = patients.findIndex(p => p.patientId === id);

    if (patientIndex !== -1) {
        if (form.drId.value) patients[patientIndex].drId = form.drId.value;
        if (form.drName.value) patients[patientIndex].drName = form.drName.value;
        if (form.roomNumber.value) patients[patientIndex].roomNumber = form.roomNumber.value;
        if (form.contact.value) patients[patientIndex].contact = form.contact.value;

        localStorage.setItem('patientData', JSON.stringify(patients));
        alert('Patient details updated successfully!');
    } else {
        alert('No patient found with that ID.');
    }
}

function deletePatientById(event) {
    event.preventDefault();
    const id = event.target.elements['patientId'].value;
    let patients = JSON.parse(localStorage.getItem('patientData')) || [];
    patients = patients.filter(p => p.patientId !== id);
    localStorage.setItem('patientData', JSON.stringify(patients));
    alert('Patient deleted successfully!');
}
