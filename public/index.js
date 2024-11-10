const form = document.getElementById('formField');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const thoughtInput = document.getElementById('thoughtInput').value;
    try{
        const response = await fetch('/submit/thought', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ thought: thoughtInput }),
        });
        location.reload();
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error submitting task:', error);
    }
});

document.getElementById("mythoughts").onclick = () => {
    window.location.href = "/mythoughts";
}

document.getElementById("ideas").onclick = () => {
    window.location.href = "/ideas";
}

