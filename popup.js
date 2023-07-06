```javascript
let comments = {};

document.getElementById('saveButton').addEventListener('click', saveComment);
document.getElementById('optionsButton').addEventListener('click', openOptions);

function saveComment() {
    let comment = document.getElementById('commentInput').value;
    let url = window.location.href;
    let timestamp = new Date().getTime();

    if (!comments[url]) {
        comments[url] = [];
    }

    comments[url].push({ comment, timestamp });

    chrome.storage.sync.set({ 'comments': comments }, function() {
        console.log('Comment saved');
    });

    document.getElementById('commentInput').value = '';
    loadComments();
}

function loadComments() {
    chrome.storage.sync.get('comments', function(data) {
        comments = data.comments || {};
        let url = window.location.href;
        let commentList = document.getElementById('commentList');
        commentList.innerHTML = '';

        if (comments[url]) {
            comments[url].forEach(function(commentObj) {
                let commentElement = document.createElement('li');
                commentElement.textContent = commentObj.comment;
                commentList.appendChild(commentElement);
            });
        }
    });
}

function openOptions() {
    chrome.runtime.openOptionsPage();
}

function init() {
    loadComments();
}

document.addEventListener('DOMContentLoaded', init);
```