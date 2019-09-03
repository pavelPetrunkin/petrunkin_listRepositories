const paginationFilter = function (news,filterType,searchText,currentPage,pageItems) {
    let filteredNews = [],
        renderItems = [],
        counter = 0,
        firstItem = (currentPage-1)*pageItems;
    news.forEach( (item,i) => {
        if(filterType === 'All' ) {
            if(
                ~item.tag.toLowerCase().indexOf(searchText.toLowerCase()) ||
                ~item.name.toLowerCase().indexOf(searchText.toLowerCase()) ||
                ~item.text.toLowerCase().indexOf(searchText.toLowerCase()) ||
                ~item.userName.toLowerCase().indexOf(searchText.toLowerCase()) ||
                !searchText
            ){
                filteredNews.push(i);
            }
        } else if(filterType === 'Username'){
            if(~item.userName.toLowerCase().indexOf(searchText.toLowerCase()) || !searchText){
                filteredNews.push(i);
            }
        } else if(filterType === 'Tag') {

            if(~item.tag.toLowerCase().indexOf(searchText.toLowerCase()) || !searchText){
                filteredNews.push(i);
            }
        }
    });
    for(let i = firstItem;i < filteredNews.length;i++){
        if(filteredNews.length === pageItems){
            return {fullFilter: filteredNews, filters: filteredNews};
        }
        if(counter === pageItems){
            return !!renderItems.length ? {fullFilter: renderItems, filters: filteredNews}
                : {fullFilter: filteredNews, filters: filteredNews};
        }
        if(filteredNews[i] >= firstItem){
            renderItems.push(filteredNews[i]);
            counter +=1;
        }
    }
    return !!renderItems.length ? {fullFilter: renderItems, filters: filteredNews}
                                : {fullFilter: filteredNews, filters: filteredNews};
};

export default paginationFilter;
