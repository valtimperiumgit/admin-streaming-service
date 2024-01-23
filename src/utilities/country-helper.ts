import IMedia from "../entities/media";

const getCountryName = (countryId: string, countries: IMedia[]) => {

    let country = countries.filter((country) => country.id === countryId )?.[0];

    return country !== undefined ? country.name : "";
}

export default getCountryName;