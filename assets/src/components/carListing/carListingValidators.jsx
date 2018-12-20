const Validators = {
    commentName: (value) => {
        if (value.length < 1) {
            return "Įveskite savo vardą!";
        }
        return "";
    },
    commentText: (value) => {
        if  (value.length < 1) {
            return "Įveskite komentarą!";
        }
        if (value.length < 4) {
            return "Įveskite daugiau nei 4 raides!";
        }
        if (value.length > 200) {
            return "Komentaras negali būti ilgesnis nei 200 simbolių!";
        }
        return "";
    },
    reservation: (value) => {
        const errors = {};
        if (value.name < 1) {
            errors.name = "Įveskite savo vardą!";
        }
        const patternEmail = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!patternEmail.test(value.email)) {
            errors.email = "Įveskite teisingą el.paštą!";
        }
        const patternPhone = new RegExp(/^\+?(\d{3})\D?\D?(\d{3})\D?(\d{5})$/);
        if (value.phone < 1) {
            errors.phone = "Įveskite telefono numerį!";
        }
        if (!patternPhone.test(value.phone)) {
            errors.phone = "Įveskite teisingą telefono numerį!";
        }
        if (value.message.length < 1) {
            errors.message = "Įveskite žinutę!";
        }
        if (value.message.length < 10) {
            errors.message = "Žinutė negali turėti mažiau nei 10 simbolių!";
        }
        if (value.message.length > 300) {
            errors.message = "Žinutė negali būti ilgesnė nei 300 simbolių!";
        }
        return errors;
    }
};

export default Validators;