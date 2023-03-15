document.addEventListener( 'DOMContentLoaded', function () {

    const ajaxResults = document.getElementById('ajax-results');
    const fetchResults = document.getElementById('fetch-results');

    const TARGET_API = 'https://en.wikipedia.org/w/api.php?action=query'
                            + '&meta=siteinfo&siprop=statistics&format=json'
                            + '&formatversion=2&origin=*';
    
    const ajaxRequest = new XMLHttpRequest();

    const onAjaxLoaded = () => {
        if (ajaxRequest.readyState !== 4) {
            // Not actually loaded yet
            return;
        }
        ajaxResults.innerText = ajaxRequest.responseText;
    };
    const onFetchLoaded = (response) => {
        response.json().then(
            (data) => fetchResults.innerText = JSON.stringify(data)
        );
    };

    const startRequests = () => {
        ajaxRequest.addEventListener('readystatechange', onAjaxLoaded);
        ajaxRequest.open('GET', TARGET_API);
        ajaxRequest.send();

        fetch(TARGET_API).then(onFetchLoaded);
    };

    startRequests();

} );