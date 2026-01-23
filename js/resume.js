import { courseVids, courses } from "./data.js";

let courseId = new URLSearchParams(window.location.search).get('id');
let currentVid = 0;

// write course name
document.querySelector('#r-course-name h1').textContent =
courses.find(course => course.id == courseId).courseName;

// fill sidebar 
let contentList = document.getElementById('r-content-list');
let courseContent = courseVids.find(ele => ele.id == courseId).videos;

let listItems = courseContent.map((vid, idx)=> {
    let listItem = document.createElement('li');
    listItem.textContent = vid.substring(0, vid.length-4);
    listItem.setAttribute('data-idx', idx);
    listItem.setAttribute('data-vid', vid);
    contentList.appendChild(listItem);
    return listItem;
})

// handle sidebar toggle
let sidebar = document.querySelector('#r-aside-content');
document.getElementById('r-aside-toggle').onclick = () => {
    sidebar.style.setProperty('left', '0');
}

document.getElementById('close').onclick = () => {
    sidebar.style.setProperty('left', '-285px');
}

// handle click on course content
let prevLi = null;
let video = document.querySelector('video');
document.querySelectorAll('#r-content-list li').forEach(li => {
    li.onclick = () => {
        if(prevLi != null) {
            prevLi.style.removeProperty('background-color');
            prevLi.style.setProperty('color', '#444');
        }
        li.style.setProperty('background-color', '#4a86e8');
        li.style.setProperty('color', 'white');
        prevLi = li;
        
        video.src = `./videos/${courseContent[Number(li.dataset.idx)]}`;
        document.querySelector('#r-video-container h3')
        .textContent = li.dataset.vid.substring(0, li.dataset.vid.length-4);
        currentVid = Number(li.dataset.idx);
    }
})
listItems[0].click();

/// handle next and previous buttons
let next = document.querySelector('#r-next-btn');
let prev = document.querySelector('#r-prev-btn');

next.addEventListener('click', e => {
    if(currentVid + 1 < courseContent.length) {
        listItems[currentVid+1].click();
    }
})

prev.addEventListener('click', e => {
    if(currentVid - 1 >= 0) {
        listItems[currentVid-1].click();
    }
})