const url = "http://20.244.56.144/test/auth";

const headers = {
    "Content-Type": "application/json"
};

const payload = {
    companyName: "goMart",
    clientID: "463405d0-8fd1-4c98-a09a-f03af35e3377",
    clientSecret: "HeAwCDJxDaplVPDK", 
    ownerName: "Shaik Mohammad Aseel",
    ownerEmail: "shaikaseel2004@gmail.com",
    rollNo: "21BD1A12C0"
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
        throw new Error(`Failed to authenticate. Status code: ${response.status}`);
    }
})
.then(data => {
    console.log("Authentication successful!");
    console.log(data);
})
.catch(error => {
    console.error(error.message);
});
