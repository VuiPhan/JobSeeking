import jsonData from '../assets/language/PersonalPage.json'
const handleGetJson = (Name) => {
    const loadData = () => JSON.parse(JSON.stringify(jsonData));
    const data = loadData();
    return data[Name];
}
export default handleGetJson;