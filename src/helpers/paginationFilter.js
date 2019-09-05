const paginationFilter = function (repositories, filterType, searchText, currentPage, pageItems) {
    let renderItems,
    search = searchText.toLowerCase();
    const filteredRepos = repositories.filter(item => {
        const urlCoincidence = item.html_url.toLowerCase().indexOf(search);
        const name = item.name.toLowerCase().indexOf(search);
        if(filterType === 'All' ) {
            if(
                ~urlCoincidence ||
                ~name ||
                !searchText
            ) {
                return item;
            }
        } else if(filterType === 'Repository'){
            if(~name || !searchText){
                return item;
            }
        } else if(filterType === 'URL') {
            if(~urlCoincidence || !searchText){
                return item;
            }
        }
    });
    renderItems = filteredRepos.slice(pageItems*(currentPage - 1), pageItems*currentPage);
    return !!renderItems.length ? {fullFilter: renderItems, filters: filteredRepos}
                                : {fullFilter: filteredRepos, filters: filteredRepos};
};

export default paginationFilter;
