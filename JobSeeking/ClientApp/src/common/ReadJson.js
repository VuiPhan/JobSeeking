const handleGetJson = async (Name,FileName) => {
    const DataJson = await import(`../assets/language/${FileName}.json`);
    const loadData = async () => await JSON.parse(JSON.stringify(DataJson));
    const data =await loadData();
    return data[Name];
}
export default handleGetJson;