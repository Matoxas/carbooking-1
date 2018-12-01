const Validators = {
  brand: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ brand: "pasirinkite gamintoją!" });
      return false;
    }
    return true;
  },

  model: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ model: "pasirinkite modelį!" });
      return false;
    }
    return true;
  },
  description: (value, updateErrors) => {
    if (value.length <= 10) {
      updateErrors({
        description: "aprašymas negali būti trumpesnis nei 10 simbolių!"
      });
      return false;
    }
    return true;
  },
  city: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ city: "pasirinkite miestą!" });
      return false;
    }
    return true;
  },
  address: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ address: "pasirinkite adresą!" });
      return false;
    }
    return true;
  },
  images: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ images: "įkelkite bent vieną nuotrauką!" });
      return false;
    }
    return true;
  },
  email: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ email: "įveskite el.paštą!" });
      return false;
    }

    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(value)) {
      updateErrors({ email: "įveskite teisingą el.paštą!" });
      return false;
    }

    return true;
  },
  date: (date_from, date_until, updateErrors) => {
    if (date_from >= date_until) {
      updateErrors({
        date_from: "nuomos pradžia negali prasidėti veliau nei baigtis!",
        date_until: "nuomos pabaiga negali būti ankščiau nei pradžia!"
      });
      return false;
    }
    return true;
  },
  price: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ price: "įveskite kainą!" });
      return false;
    }

    if (value <= 0) {
      updateErrors({ price: "kaina negali būti mažesnė nei 1€" });
      return false;
    }

    if (value > 99) {
      updateErrors({ price: "kainos limitas - 99€" });
      return false;
    }

    const pattern = new RegExp(/^([0-9]{0,2}((.)[0-9]{0,2}))$/i);
    if (!pattern.test(value)) {
      updateErrors({ price: "neteisingas kainos formatas!" });
      return false;
    }

    return true;
  },
  phone: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ phone: "įveskite telefono numerį!" });
      return false;
    }
    return true;
  }
};

export default Validators;
