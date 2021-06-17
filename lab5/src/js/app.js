//const testModules = require('./test-module');
const lab3Modules  = require('./lab3Functions');
require('../css/app.css');

/** ******** Your code here! *********** */

/** LAB 5 TASKS */

//TASK 1



let techers_info = document.getElementsByClassName('teachers-account-info');
let techers_name = document.getElementsByClassName('teacher-fullname');
let teachers_country = document.getElementsByClassName('teacher-country');
let teachers_image = document.getElementsByClassName('teacher-image');
let popup_teachers_photo = document.getElementsByClassName('popup-teacher-image');
let popup_teachers_name = document.getElementsByClassName('tchr_info_name_surname')
let popup_teachers_country = document.getElementsByClassName('popup-teacher-country')
let popup_teachers_gender = document.getElementsByClassName('tchr_years_gender')
let popup_teachers_email = document.getElementsByClassName('popup-teacher-email')
let popup_teachers_number = document.getElementsByClassName('popup-teacher-phone-number')
let popup_teachers_note = document.getElementsByClassName('popup-teacher-note')

//all_teachers = Teachers.teachers_info;
//let filling = '<div class="star_img"><image class="star_fav"src="https://i.pinimg.com/originals/d6/1f/da/d61fdaa0c0ba93c6ad5f6a189e8af625.jpg"></div>'

let teacher_info_block = '\
<div class="teachers-account-info"> \
    <div class="star_img"><image class="star_fav"src="https://i.pinimg.com/originals/d6/1f/da/d61fdaa0c0ba93c6ad5f6a189e8af625.jpg"></div>\
    <div class="teacher-avatar"><a href="#popup_tchr_info" class="pop"><img class="teacher-image" src="" alt="Teacher-image"></a></div> \
    <div class="teacher-fullname"></div> \
    <div class="teacher-country"></div> \
</div>';

var array = []
let get_50 = 'seed=torgov&results=50';
let get_10 = 'seed=torgov&results=10';
fillwithteachers(get_50)

for(let i = 0 ; i < 10 ; i++){
    document.getElementById("tchrs_accs_wrapper").innerHTML += teacher_info_block;
}

async function async_fullfill(array){
    let teachers_stars = document.getElementsByClassName('star_img')
    for(let i = 0 ;  i < 10; i++){
        if (array[i] != undefined || array[i] != null){
            if(techers_info[i].className == ( "teachers-account-info _hidden" )){
                techers_info[i].className = ( "teachers-account-info" );
            }
            if (array[i].favorite === false){
                teachers_stars[i].style.visibility = "hidden";
            }
            else{
                teachers_stars[i].style.visibility = "visible";
            }
            techers_info[i].id = array[i].id;
            techers_name[i].innerHTML = array[i].full_name;
            teachers_image[i].src = array[i].picture_large;
            teachers_country[i].innerHTML = array[i].country;
        }
        else{
            let teachers_info = document.getElementsByClassName('teachers-account-info');
            if(teachers_info[i].className != ( "teachers-account-info _hidden" )){
                teachers_info[i].className += ( " _hidden" );
            }
        }
    }
}

function fullfill(array){
    let teachers_stars = document.getElementsByClassName('star_img')
    for(let i = 0 ;  i < 10; i++){
        if (array[i] != undefined || array[i] != null){
            if(techers_info[i].className == ( "teachers-account-info _hidden" )){
                techers_info[i].className = ( "teachers-account-info" );
            }
            if (array[i].favorite === false){
                teachers_stars[i].style.visibility = "hidden";
            }
            else{
                teachers_stars[i].style.visibility = "visible";
            }
            techers_info[i].id = array[i].id;
            techers_name[i].innerHTML = array[i].full_name;
            teachers_image[i].src = array[i].picture_large;
            teachers_country[i].innerHTML = array[i].country;
        }
        else{
            let teachers_info = document.getElementsByClassName('teachers-account-info');
            if(teachers_info[i].className != ( "teachers-account-info _hidden" )){
                teachers_info[i].className += ( " _hidden" );
            }
        }
    }
}


function filter_teachers_by_age(Minage){
    let teachers_stars = document.getElementsByClassName('star_img')
    const filteredArray = lab3Modules.searchByParameter(array, Minage, false);
    console.log(filteredArray);
    for(let i = 0 ;  i < 10; i++){
        if (filteredArray[i] != undefined || filteredArray[i] != null){
            if(techers_info[i].className == ( "teachers-account-info _hidden" )){
                techers_info[i].className = ( "teachers-account-info" );
            }
            if (filteredArray[i].favorite === false){
                teachers_stars[i].style.visibility = "hidden";
            }
            else{
                teachers_stars[i].style.visibility = "visible";
            }
            techers_info[i].id = filteredArray[i].id;
            techers_name[i].innerHTML = filteredArray[i].full_name;
            teachers_image[i].src = filteredArray[i].picture_large;
            teachers_country[i].innerHTML = filteredArray[i].country;
        }
        else{
            let teachers_info = document.getElementsByClassName('teachers-account-info');
            if(teachers_info[i].className != ( "teachers-account-info _hidden" )){
                teachers_info[i].className += ( " _hidden" );
            }
        }
    }
}

async function fillwithteachers(Parametres){
    let url = `https://randomuser.me/api/?${Parametres}`
    console.log(url);
    array = await lab3Modules.createFormattedArray(url);
    await async_fullfill(array)
    await fill_stats_table(array);
    console.log(array)
}

$('select.country-filter').on('change', function() {
    let country_selected = this.value;
    if(country_selected == ''){
        fillwithteachers(get_50);
    }
    else{
        fillwithteachers('seed=torgov&results=50&nat=' + country_selected);
    }
});

$('select.age-filter').on('change', function() {
    let age_selected = this.value;
    if(age_selected === ''){
        fillwithteachers(get_50);
    }
    else{
        filter_teachers_by_age(age_selected);
    }
});

$('select.gender-filter').on('change', function() {
    let gender_selected = this.value;
    if(gender_selected === ''){
        fillwithteachers(get_50);
    }
    else{
        fillwithteachers('results=10&gender='+ gender_selected);
    }
});

$("#only-favourites-filter").click(function(){
    if ($('#only-favourites-filter').is(':checked')){ 
        favTeachersArray = lab3Modules.filterArray(array, null, null, null, null, true);   
        console.log(favTeachersArray)    
        fullfill(favTeachersArray);
    } else {
        fillwithteachers(get_50);
    }
});

function fill_stats_table(statsArray) 
{
    if (document.getElementById("stats-table-body").innerHTML == ''){
        for(let i = 0 ; i < 10 ; i++)
        {
            if (statsArray[i] != undefined || statsArray[i] != null){
                Fullname = statsArray[i].full_name;
                const name_surname = Fullname.split('<br>');
                const table_row =`<tr id = "table-row-${i}">
                                    <td>${name_surname[0]+' '+name_surname[1]}</td>
                                    <td>${statsArray[i].age}</td>
                                    <td>${statsArray[i].gender}</td>
                                    <td>${statsArray[i].country}</td>
                                </tr>`;
                document.getElementById("stats-table-body").innerHTML += table_row;
            }
        }
    }
}

function toogle_fav_teacher(id){
    for(let i = 0 ; i < array.length ; i++){
        if(id == array[i].id){
            if(array[i].favorite === true){
                array[i].favorite = false;
            }
            else {
                array[i].favorite = true;
            }
        }
    }
}

$("#toggle-teacher-to-fav").click(function(){
    let Class = this.className;
    let id = document.getElementById("popup-teacher-id").innerHTML;
    if (Class === "add-teacher-to-fav"){
        document.getElementById("star_inf_fav").style.visibility = "visible";
        document.getElementById("toggle-teacher-to-fav").innerHTML = "delete from favorite";
        document.getElementById("toggle-teacher-to-fav").className = "delete-teacher-from-fav";
        toogle_fav_teacher(id);
    }
    else {
        document.getElementById("star_inf_fav").style.visibility = "hidden";
        document.getElementById("toggle-teacher-to-fav").innerHTML = "add to favorite";
        document.getElementById("toggle-teacher-to-fav").className = "add-teacher-to-fav";
        toogle_fav_teacher(id);
    }
    refresh_teacher(id);
    console.log(array);
});

function refresh_teacher(Id){
    let stars = document.getElementsByClassName('star_img');
    for(let i = 0 ; i < techers_info.length ; i++){
        if (techers_info[i].id === Id && stars[i].style.visibility === "hidden"){
            stars[i].style.visibility = "visible";
        }
        else if (techers_info[i].id === Id && stars[i].style.visibility === "visible") {
            stars[i].style.visibility = "hidden";
        } 
    }
}

popup_close.onclick= function(){ 
    document.getElementById("popup-teacher-info").className = "popup-teacher-info";
}

$("#popup-button-add-teacher").click(function(){
    document.getElementById("popup-add-teacher").className += " _open";
});


$("#popup-button-add-teacher-bottom").click(function(){
    document.getElementById("popup-add-teacher").className += " _open";
});

$("#popup-close-teacher-form").click(function(){
    document.getElementById("popup-add-teacher").className = "popup-add-teacher";
});

$(".teachers-account-info").click(function(){
    var Id = this.id;
    for(let i = 0 ; i < array.length ; i++){
        if(Id === array[i].id){
            document.getElementById("popup-teacher-id").innerHTML = Id;
            popup_teachers_photo[0].src = array[i].picture_large;
            popup_teachers_name[0].innerHTML = array[i].full_name;
            popup_teachers_country[0].innerHTML = array[i].country + ', ' + array[i].state;
            popup_teachers_gender[0].innerHTML = array[i].age +', ' + array[i].gender;
            popup_teachers_email[0].innerHTML = array[i].email;
            popup_teachers_number[0].innerHTML = array[i].phone;
            popup_teachers_note[0].innerHTML = array[i].note;
            if (array[i].favorite != true){
                document.getElementById("star_inf_fav").style.visibility = "hidden";
                document.getElementById("toggle-teacher-to-fav").innerHTML = "add to favorite";
                document.getElementById("toggle-teacher-to-fav").className = "add-teacher-to-fav";
            }
            else{
                document.getElementById("star_inf_fav").style.visibility = "visible";
                document.getElementById("toggle-teacher-to-fav").innerHTML = "delete from favorite";
                document.getElementById("toggle-teacher-to-fav").className = "delete-teacher-from-fav";
            }
        }
    }
    document.getElementById("popup-teacher-info").className += " _open";
});

teacherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formMale = document.getElementById('male_radio').checked 
    formCountry = document.getElementById("country").value;
    let formData =  Array.from(document.querySelectorAll('#teacherForm input'))
    .reduce((acc , input ) => ({...acc, [input.id]: input.value }) , {})
    if (formMale){
        delete formData.female_radio
    } else{
        delete formData.male_radio
    }
      // task 5
    const postPath = `${window.location.origin}/api/teachers`;
    const postUrl = new URL(postPath);
    postUrl.port = 3000;
    fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    document.getElementById("popup-add-teacher").className = "popup-add-teacher";
});
  

function sort_stat_table(zxc, increasing)
{
    sortedArray =   lab3Modules.sortArray(array, zxc, increasing);
    for(let i = 0 ; i < 10 ; i++)
    {
        Fullname = sortedArray[i].full_name;
        const name_surname = Fullname.split('<br>');
        const table_text=`
                            <td>${name_surname[0]+' '+name_surname[1]}</td>
                            <td>${sortedArray[i].age}</td>
                            <td>${sortedArray[i].gender}</td>
                            <td>${sortedArray[i].country}</td>
                        `;
        document.getElementById(`table-row-${i}`).innerHTML = table_text;
    }
}

$(".stats_header").click(function(){
    if(this.id == 'name-th'){
        if (this.className == 'stats_header'){
            this.className += ' increasing';
            sort_stat_table('full_name', true);
        }else{
            this.className = 'stats_header';
            sort_stat_table('full_name', false);
        }
    }
    else if(this.id == 'age-th'){
        if (this.className == 'stats_header'){
            this.className += ' increasing';
            sort_stat_table('age', true);
        }else{
            this.className = 'stats_header';
            sort_stat_table('b_day', true);
        }
    }
    else if(this.id == 'nationality-th'){
        if (this.className == 'stats_header'){
            this.className += ' increasing';
            sort_stat_table('country', true);
        }else{
            this.className = 'stats_header';
            sort_stat_table('country', false);
        }
    }
});

function search_by_name(param){
    const paramStr = param.toString();
    const findedUsers = [];
    array.forEach((teacher) => {
        if (teacher.full_name.includes(paramStr) || teacher.age.toString().includes(paramStr) || teacher.note.includes(paramStr)){
            findedUsers.push(teacher);
        } 
    });
    return findedUsers;
}


function fill_by_teachers_found(filteredArray){
    let teachers_stars = document.getElementsByClassName('star_img')
    for(let i = 0 ;  i < 10; i++){
        if (filteredArray[i] != undefined || filteredArray[i] != null){
            if(techers_info[i].className == ( "teachers-account-info _hidden" )){
                techers_info[i].className = ( "teachers-account-info" );
            }
            if (filteredArray[i].favorite === false){
                teachers_stars[i].style.visibility = "hidden";
            }
            else{
                teachers_stars[i].style.visibility = "visible";
            }
            techers_info[i].id = filteredArray[i].id;
            techers_name[i].innerHTML = filteredArray[i].full_name;
            teachers_image[i].src = filteredArray[i].picture_large;
            teachers_country[i].innerHTML = filteredArray[i].country;
        }
        else{
            let teachers_info = document.getElementsByClassName('teachers-account-info');
            if(teachers_info[i].className != ( "teachers-account-info _hidden" )){
                teachers_info[i].className += ( " _hidden" );
            }
        }
    }
}

$("#search-teacher-by-parametr").click(function(){
    let elem = 
    search_param = document.getElementById(`search-field`).value;
    document.getElementById(`search-field`).value = '';
    const findedTeachers = search_by_name(search_param);
    console.log(findedTeachers);   
    fill_by_teachers_found(findedTeachers);
});

$("#on-next-click").click(function(){
    
    const words = this.className.split(' ');
    page_num = parseInt(words[1]);
    page_num += 1;
    this.className = 'pagination';
    this.className += ` ${page_num}`
    //let urL = 'https://randomuser.me/api/?page=3&results=10&seed=abc'
    console.log(`page=${page_num}&results=10&seed=torgov`);
    fillwithteachers(`page=${page_num}&results=10&seed=torgov`);
});


