import countries from 'world-countries';
import i18n from 'i18n-iso-countries'
i18n.registerLocale(require("i18n-iso-countries/langs/pt.json"));

const continentNames:any = {
  Africa: "África",
  Antarctic: "Antártida",
  Asia: "Ásia",
  Europe: "Europa",
  Americas: "América",
  Oceania: "Oceania",
};

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: i18n.getName(country.cca2, "pt"), // usa a biblioteca i18n-iso-countries para traduzir o nome do país em Português
  flag: country.flag,
  latlng: country.latlng,
  region: continentNames[country.region],
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCountries;