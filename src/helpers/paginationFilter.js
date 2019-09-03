const paginationFilter = function (repositories,filterType,searchText,currentPage,pageItems) {
    let filteredRepositories = [],
        renderItems = [],
        counter = 0,
        firstItem = (currentPage-1)*pageItems;
    repositories.forEach( (item,i) => {
        if(filterType === 'All' ) {
            if(
                ~item.html_url.toLowerCase().indexOf(searchText.toLowerCase()) ||
                ~item.name.toLowerCase().indexOf(searchText.toLowerCase()) ||
                !searchText
            ){
                filteredRepositories.push(i);
            }
        } else if(filterType === 'Username'){
            if(~item.name.toLowerCase().indexOf(searchText.toLowerCase()) || !searchText){
                filteredRepositories.push(i);
            }
        } else if(filterType === 'Email') {

            if(~item.email.toLowerCase().indexOf(searchText.toLowerCase()) || !searchText){
                filteredRepositories.push(i);
            }
        }
    });
    for(let i = firstItem;i < filteredRepositories.length;i++){
        if(filteredRepositories.length === pageItems){
            return {fullFilter: filteredRepositories, filters: filteredRepositories};
        }
        if(counter === pageItems){
            return !!renderItems.length ? {fullFilter: renderItems, filters: filteredRepositories}
                : {fullFilter: filteredRepositories, filters: filteredRepositories};
        }
        if(filteredRepositories[i] >= firstItem){
            renderItems.push(filteredRepositories[i]);
            counter +=1;
        }
    }
    return !!renderItems.length ? {fullFilter: renderItems, filters: filteredRepositories}
                                : {fullFilter: filteredRepositories, filters: filteredRepositories};
};

export default paginationFilter;
