const notiyModal = (title, html, icon, confirmationButton) => {
    Swal.fire({
        title: title,
        html: html,
        icon: icon,
        confirmButtonText: confirmationButton
    });
}

const Propmpt = () => {
    let toast = (c) => {
        const {
            message = "",
            icon = "success",
            position = "top-end"
        } = c;

        const Toast = Swal.mixin({
            toast: true,
            icon: icon,
            title: message,
            position: position,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire();
    };

    let success = (c) => {
        const {
            message = "",
            title = "",
            footer = "",

        } = c
        Swal.fire({
            icon: 'success',
            title: title,
            text: message,
            footer: footer
        })
    };

    let error = (c) => {
        const {
            message = "",
            title = "",
            footer = "",

        } = c
        Swal.fire({
            icon: 'error',
            title: title,
            text: message,
            footer: footer
        })
    };

    let custom = async (c) => {
        const {
            message = "",
            title = "",
        } = c;

        const { value: formValues } = await Swal.fire({
            title: title,
            html: message,
            focusConfirm: false,
            backdrop: false,
            showCancelButton: true,
            willOpen: () => {
                const elem = document.getElementById("reservation-dates-modal");
                const rp = new DateRangePicker(elem, {
                    format: "yyyy-mm-dd",
                    showOnFocus: true
                });
            },
            didOpen: () => {
                document.getElementById("start").removeAttribute("disabled");
                document.getElementById("end").removeAttribute("disabled");
            },
            preConfirm: () => {
                return [
                    document.getElementById("start").value,
                    document.getElementById("end").value
                ]
            }
        })

        if (formValues) {
            Swal.fire(JSON.stringify(formValues))
        }
    }

    return {
        toast: toast,
        success: success,
        error: error,
        custom: custom
    }
}