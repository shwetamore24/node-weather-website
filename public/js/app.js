const weatherForm = document.querySelector("form");


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();    

    const address = document.querySelector("input").value;  
    
    document.getElementById('msg1').textContent = 'Loading...';
    document.getElementById('msg2').textContent = '';

    fetch("http://localhost:3000/weather?address=" + address).then((response) => {
        response.json().then((data) => {
            if(data.error) {               
                document.getElementById('msg1').textContent = data.error;
                document.getElementById('msg2').textContent =  '';                
            } else {
                document.getElementById('msg1').textContent = data.location;
                document.getElementById('msg2').textContent = data.forecast;                
            }
        });
    });
});