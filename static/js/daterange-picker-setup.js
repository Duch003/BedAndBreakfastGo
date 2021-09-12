// Example starter JavaScript for disabling form submissions if there are invalid fields
document.addEventListener("DOMContentLoaded", () => {
    const elem = document.getElementById('reservation-dates');
    const rangepicker = new DateRangePicker(elem, {
        format: "yyyy/mm/dd"
    }); 
})