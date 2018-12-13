const Validators = {
    commentName: (value) => {
        if (value.length < 1) {
            return "Įveskite savo vardą!";
        }
        return "";
    },
    commentText: (value) => {
        if (value.length < 4) {
            return "Įveskite daugiau nei 4 raides!"
        }
        return "";
    }
};

export default Validators;