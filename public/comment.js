tableau.extensions.initializeDialogAsync();

window.onload = () => {
    const data = JSON.parse(window.localStorage.getItem("data"));
    console.log("results: ", data);

    document.getElementById("question").value = data.question;
    document.getElementById("heading").value = data.heading;
}

function create(){
    let email = document.getElementById("email").value;
    let q = document.getElementById("question").value;
    let h = document.getElementById("heading").value;
    let c = document.getElementById("comment").value;

    const url = window.location.origin + "/api/comments/";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            quarter:"2023.Q4",
            heading:h,
            question:q,
            comment:c,
            emailto: email
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data);
            window.location.href = `mailto:${email}?subject=Please Review ${h} section!&body=Hi <Pease update the name>, %0a %0a Action Required on Question: ${q} %0a %0a ${c}`
            tableau.extensions.ui.closeDialog('Hey there');
        });
}
