const filters = {
    searchText: '',
    sortBy: 'origSlotNum',
    showLastName: false
}


const getFilters = () => filters;

const setFilters = (updateObj) => {
    if (typeof updateObj.searchText === 'string') {
        filters.searchText = updateObj.searchText
    };

    if (typeof updateObj.sortBy === 'string') {
        filters.sortBy = updateObj.sortBy
    };

    if (typeof updateObj.showLastName === 'boolean') {
        filters.showLastName = updateObj.showLastName
    };
}

export { getFilters, setFilters }