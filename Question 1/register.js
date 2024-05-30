const url = "http://20.244.56.144/test/register";

const headers = {
    "Content-Type": "application/json"
};

const payload = {
    companyName: "goMart",
    ownerName: "Shaik Mohammad Aseel",
    rollNo: "21BD1A12C0",
    ownerEmail: "shaikaseel2004@gmail.com",
    accessCode: "osDvxf"
};

fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
})
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error(`Failed to register. Status code: ${response.status}`);
    }
})
.then(data => {
    console.log("Registration successful!");
    console.log(data);
})
.catch(error => {
    console.error(error.message);
});
