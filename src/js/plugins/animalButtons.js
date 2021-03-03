import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes'

const duration = 300

/**
 * Applies filter to display only the animal selected by the user when clicking on 
 * the respective animal button, or displays all animals when user selects "All"
 * @param {animal} animal 
 */
function filterByAnimal(animal) {
    $('[animal]').each(function (i, e) {
        const isTarget = $(this).attr('animal') === animal
            || animal === null
        if (isTarget) {
            $(this).parent().parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().parent().addClass('d-none')
            })
        }
    })
}

/**
 * This jQuery plugin creates all the buttons in the gallery based on the value of the 
 * "animal" attribute of the images. It also creates the "All" button to display all
 * images. Using Set to store values to ensure there is no repetition.
 */
$.fn.animalButtons = function () {
    const animals = new Set
    $('[animal]').each(function (i, e) {
        animals.add($(e).attr('animal'))
    })

    const btns = Array.from(animals).map(animal => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info']).html(animal)
        btn.click(e => filterByAnimal(animal))
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active']).html('All')
    btnAll.click(e => filterByAnimal(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[animal-buttons]').animalButtons()
})
