// FORM PROPERTY
const name_form = document.querySelector('#name')
const email_form = document.querySelector('#email')
const site_form = document.querySelector('#site')
const password_form = document.querySelector('#password')
const notes_form = document.querySelector('#note')
const id_form = document.querySelector('#id')

// RESET FORM VALUE TO DEFAULT
function reset_form() {
    name_form.value = '';
    email_form.value = ''
    site_form.value = ''
    password_form.value = ''
    notes_form.innerHTML = ''
    id_form.value = ''
}

// IF DATA EDIT INNER HTML
$(document).ready(function () {
    //showing modal for delete record
    $('#details-tb').on('click', '.tbActionsedit', function () {
        let id = $(this).data('id');
        let tbActionsResult = resultDataApi.find(element => element.id == id);

        let form = document.querySelector("#form")
        let sendform = document.querySelector("#sendform")
        let titleform = document.querySelector("#exampleModalLabel")
        let action = $(this).data('action')

        form.action = $(this).data('path')

        if (action == 'new') {
            console.log('new');
            reset_form()
            titleform.innerHTML = 'Add new data'
            sendform.innerHTML = 'Add data'
        }
        if (action == 'change_data') {
            name_form.value = tbActionsResult.user_name;
            email_form.value = tbActionsResult.email
            site_form.value = tbActionsResult.site
            password_form.value = tbActionsResult.password
            notes_form.innerHTML = tbActionsResult.notes
            id_form.value = tbActionsResult.id
            titleform.innerHTML = 'Change data'
            sendform.innerHTML = 'Change data'
        }
    });

    
    $('#tbActions').on('click', '.modal2', function () {
        let id = $(this).data('id');
        let tbActionsResult = resultDataApi.find(element => element.id == id);

        let form2 = document.querySelector("#form_modal2")
        let formbody = document.querySelector("#modal2-body")
        let action = $(this).data('action')

        form2.action = $(this).data('path')
        if (action == 'delete') {
            formbody.innerHTML = `do you want to delete <i style="color:blue;">${tbActionsResult.user_name}</i> ?`
            formbody.innerHTML += `<input type="hidden" name="id" value="${id}">`
        }
    });


});

