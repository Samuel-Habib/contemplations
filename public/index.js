const form = document.getElementById('formField');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const thoughtInput = document.getElementById('thoughtInput').value;
    try{
        const response = await fetch('/submit', {
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