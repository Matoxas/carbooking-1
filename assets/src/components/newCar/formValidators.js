import { getLatLng, geocodeByAddress } from "react-places-autocomplete";

const Validators = {
  brand: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ brand: "pasirinkite gamintoją!" });
      return false;
    }
    updateErrors({ brand: "" });
    return true;
  },

  model: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ model: "pasirinkite modelį!" });
      return false;
    }
    updateErrors({ model: "" });
    return true;
  },
  description: (value, updateErrors) => {
    if (value.length <= 10) {
      updateErrors({
        description: "aprašymas negali būti trumpesnis nei 10 simbolių!"
      });
      return false;
    }
    if (value.length >= 200) {
      updateErrors({
        description: "aprašymas negali viršyti 200 simbolių ribos"
      });
      return false;
    }
    updateErrors({ description: "" });
    return true;
  },
  address: (value, updateErrors, setCity, allCities) => {
    let result = true;
    if (value.length <= 0) {
      updateErrors({ address: "įveskite adresą!" });
      return false;
    }
    result = geocodeByAddress(value)
      .then(results => {
        //tikrinam ar pasirinkta šalis yra Lietuva
        const country =
          results[0].address_components[4].short_name == "LT"
            ? results[0].address_components[4].short_name == "LT"
            : results[0].address_components[5].short_name == "LT";

        //tikrinam ar miestas yra 1 ar 2 array objektas
        const city = results[0].address_components[1].types.includes("locality")
          ? results[0].address_components[1].short_name
          : results[0].address_components[2].short_name;

        //jei šalis Lietuva
        if (country) {
          //tikrinam ar pasirinktas miestas yra leistinų miestų sąraše
          const validCity =
            allCities.filter(function(item) {
              const cityInArray = item.city == city;

              //jei taip, priskiriam miesto id į state
              if (cityInArray) {
                setCity(item.id);
              }
              return cityInArray;
            }).length > 0;
          // jei viskas ok, grąžinam true
          if (validCity) {
            return true;
          } else {
            updateErrors({
              address:
                "Deja, jūsų mieste galimybės nuomoti automobilio kol kas nėra."
            });
            return false;
          }
        } else {
          updateErrors({ address: "Patikslinkite adresą!" });
          return false;
        }
      })
      .catch(error => {
        updateErrors({ address: "Netinkamas adresas!" });
        return false;
      });

    return result;
  },
  images: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ images: "įkelkite bent vieną nuotrauką!" });
      return false;
    }
    updateErrors({ images: "" });
    return true;
  },
  name: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ name: "įveskite vardą!" });
      return false;
    }
    if (value.length >= 20) {
      updateErrors({ name: "ilgiausias vardo ilgis - 20 simbolių" });
      return false;
    }
    updateErrors({ name: "" });
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
    updateErrors({ email: "" });
    return true;
  },
  date: (date_from, date_until, updateErrors) => {

    const dateFromRefactored = new Date(date_from);
    const dateUntilRefactored = new Date(date_until);
    dateFromRefactored.setHours(0, 0, 0, 0);
    dateUntilRefactored.setHours(0, 0, 0, 0);

    if (dateFromRefactored >= dateUntilRefactored) {
      updateErrors({
        date_from: "nuomos pradžia negali prasidėti veliau nei baigtis!",
        date_until: "nuomos pabaiga negali būti ankščiau nei pradžia!"
      });
      return false;
    }
    updateErrors({ date_until: "", date_from: "" });
    return true;
  },
  price: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ price: "įveskite kainą!" });
      return false;
    }

    if (value <= 1) {
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
    updateErrors({ price: "" });
    return true;
  },
  phone: (value, updateErrors) => {
    if (value.length <= 0) {
      updateErrors({ phone: "įveskite telefono numerį!" });
      return false;
    }
    const pattern = new RegExp(/^\+?(\d{3})\D?\D?(\d{3})\D?(\d{5})$/);
    if (!pattern.test(value)) {
      updateErrors({ phone: "įveskite teisingą telefono numerį" });
      return false;
    }
    updateErrors({ name: "" });
    return true;
  }
};

export default Validators;
