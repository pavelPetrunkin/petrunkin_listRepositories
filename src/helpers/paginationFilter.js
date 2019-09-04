const paginationFilter = function (repositories, filterType, searchText, currentPage, pageItems) {
    let renderItems,
    search = searchText.toLowerCase();
    repositories.filter(item => {
        const urlCoincidence = item.html_url.toLowerCase().indexOf(search);
        if(filterType === 'All' ) {
            if(
                ~urlCoincidence ||
                ~item.name.toLowerCase().indexOf(search) ||
                !searchText
            ) {
                return item;
            }
        } else if(filterType === 'Repository'){
            if(~item.name.toLowerCase().indexOf(search) || !searchText){
                return item;
            }
        } else if(filterType === 'URL') {
            if(~urlCoincidence || !searchText){
                return item;
            }
        }
    });
    renderItems = repositories.slice(pageItems*(currentPage - 1), pageItems*currentPage);
    return !!renderItems.length ? {fullFilter: renderItems, filters: repositories}
                                : {fullFilter: repositories, filters: repositories};
};

export default paginationFilter;
