let buttonComment = document.getElementById ("button_comment"),
    formCommentText = document.getElementById ("form_comment_text"),
    formCommentName = document.getElementById ("form_comment_name"), 
    formComment = document.querySelector ("#form_comment"),
    commentsList = document.querySelector ("#comments_list"),
    buttonComSortAsc = document.querySelector ("#btn_comsort_asc"),
    buttonComSortDes = document.querySelector ("#btn_comsort_des");

buttonComment.disabled = true;
formCommentName.value = formCommentText.value = "";
buttonComment.addEventListener ("click", addComment);
formCommentName.addEventListener ("input", enableButton);
formCommentText.addEventListener ("input", enableButton);
buttonComSortAsc.addEventListener ("click", sortCommentsAsc);
buttonComSortDes.addEventListener ("click", sortCommentsDes);

function enableButton () {
    buttonComment.disabled = !(formCommentName.value && 
        formCommentText.value); 
}

function addComment () {
    let commentName = document.createElement ("p"),
        commentText = document.createElement ("p"),
        commentDate = document.createElement ("p"),
        comment = document.createElement ("div"),
        today = new Date (),
        date = today.getFullYear () + "-" + 
            String (today.getMonth () + 1).padStart (2, "0") + "-" + 
            String (today.getDate ()).padStart (2, "0") + " " + 
            String (today.getHours ()).padStart (2, "0") + ":" + 
            String (today.getMinutes()).padStart (2, "0") + ":" + 
            String (today.getSeconds ()).padStart (2, "0");

    sortCommentsAsc ();
    comment.classList.add ("comment");
    commentDate.classList.add ("comment-date");
    commentName.classList.add ("comment-name");
    commentText.classList.add ("comment-text");
    commentDate.innerHTML = date;
    commentName.innerHTML = formCommentName.value + " said:";
    commentText.innerHTML = formCommentText.value;
    commentsList.append (comment);
    comment.append (commentDate);
    comment.append (commentName);
    comment.append (commentText);
  
    formCommentText.value = formCommentName.value = "";
    buttonComment.disabled = true;
}

function sortCommentsAsc () {
    let commentsElement = document.querySelectorAll (".comment"),
        comments = [];

    for (let i = 0; i < commentsElement.length; i++) {
        comments.push ({
            date: commentsElement[i].querySelector (".comment-date").innerHTML,
            comment: commentsElement[i] 
        });
    }
    comments.sort ((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
    });
    for (let i = 0; i < comments.length; i++) {
        comments[i].comment.remove ();
    }
    for (let i = 0; i < comments.length; i++) {
        commentsList.append (comments[i].comment);
    } 
}

function sortCommentsDes () {
    let commentsElement = document.querySelectorAll (".comment"),
        comments = [];

    for (let i = 0; i < commentsElement.length; i++) {
        comments.push ({
            date: commentsElement[i].querySelector (".comment-date").innerHTML,
            comment: commentsElement[i] 
        });
    }
    comments.sort ((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
    });
    for (let i = 0; i < comments.length; i++) {
        comments[i].comment.remove ();
    }
    for (let i = 0; i < comments.length; i++) {
        commentsList.append (comments[i].comment);
    } 
}



