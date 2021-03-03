import $ from 'jquery'

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

/**
 * Traverses the element and all its children (recursively), looking for the 
 * ajax-include attribute in order to load HTML. Once the attribute is found 
 * in an element, and its HTML is loaded, the attribute is removed to avoid 
 * it being found again. If no parameter is provided, function starts running
 * from <body>.
 * @param {element} parent 
 */
function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find('[ajax-include]').each(function(i, e) {
        const url = $(e).attr('ajax-include')
        $.ajax({
            url,
            success(data) {
                $(e).html(data)
                $(e).removeAttr('ajax-include')

                loadHtmlSuccessCallbacks.forEach(
                    callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()