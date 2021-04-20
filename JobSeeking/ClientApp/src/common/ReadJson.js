const handleGetJson = async (Name,FileName) => {
    const DataJson = await import(`../assets/language/${FileName}.json`);
    const loadData = async () => await JSON.parse(JSON.stringify(DataJson));
    debugger;
    const data = loadData();
    return data[Name];
}
export default handleGetJson;