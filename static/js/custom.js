document.addEventListener("DOMContentLoaded", () => {
    let html = `
    <form id="check-availability-form" action="" method="POST" novalidate class="needs-validation search-form search-form">
        <div class="row">
            <div class="col">
                <div class="row" id="reservation-dates-modal">
                    <div class="col">
                        <input disabled required class="form-control" type="text" name="start" id="start" placeholder="Arrival">
                    </div>
                    <div class="col">
                        <input disabled required class="form-control" type="text" name="end" id="end" placeholder="Departure">
                    </div>
                </div>
            </div>
        </div>
    </form>`
    
    const testBtn = document.getElementById("test");
    testBtn.addEventListener("click", () => {
        // notiyModal("Test title", "Test text", "success", "Text for the button")
        const attention = Propmpt();
        //attention.toast({message: "Hello world", icon: "error"});
        attention.custom({message: html, title: "Choose your dates"});
    });

    
});