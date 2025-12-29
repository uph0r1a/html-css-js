const form = document.getElementById("rsvpForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const event = document.getElementById("event").value;
    const attendingYes = document.getElementById("yes").checked;
    const attendingNo = document.getElementById("no").checked;

    if (!name || !email || !event || (!attendingYes && !attendingNo)) {
        alert("Please fill all fields correctly before submitting.");
        return;
    }

    alert(`Thank you,${name}! Your RSVP for the ${event} is confirmed.`);
    form.reset();
});