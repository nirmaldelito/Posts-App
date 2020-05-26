$(document).ready(function () {
    // var postList = [];
    // var commentsList = [];
    var trashedComments = [];
    var id = 0;
    var commentId = 0;

    // Static data
    var postList = [
        {id: 0, title: "post1", description: "Example description" }
    ];

    var commentsList = [
        {id: 0, comment: "comment one", commentId: 12},
        {id: 0, comment: "comment two", commentId: 13},
    ];

    // Constructor for post obj
    function Post(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    // Constructor for commets
    function Comments(id, comment, commentId) {
        this.id = id;
        this.comment = comment;
        this.commentId = commentId;
    }

    // Show posts on load
    const showPosts = () => {
        for(var i=0; i < postList.length; i++) {
            $("#post_container").append(postTemplate(postList[i]))
        }
        for (var i=0; i < commentsList.length; i ++) {
            $("#comment_list"+commentsList[i].id).append(commentTemplate(commentsList[i]))
        }
    }

    // Execute posts
    showPosts()

    // Function to create new post
    $("#create_post").on("click", function() {
        var title = $("#post_title").val()
        var description = $("#post_description").val()
        if (title === '') {
            $(".error-msg").css("display", "block")
        } else {
            id++;
            postList.push(new Post(id, title, description))
            var data = {
                id: id,
                title: title,
                description: description
            }
            $("#post_container").append(postTemplate(data))
            $(".error-msg").css("display", "none")
            $("#post_modal").modal('hide')
        }
    })

    // Empty inputfields on modal close
    $('#post_modal').on('hidden.bs.modal', function (e) {
        $("#post_title").val('')
        $("#post_description").val('')
        $(".error-msg").css("display", "none")
    })

    // Destroy post
    $("#post_container").on("click",".destroy-post", function() {
        var id = parseInt(this.id);
        var postElement = $("#post"+id);
        for(var i=0; i < postList.length; i++) {
            if(id === postList[i].id) {
                $("#trash_container").append(trashPostTemplate(postList[i]))
            }
        }
        for(var j=0; j < commentsList.length; j++) {
            if (id === commentsList[j].id) {
                $("#trashed_comments"+id).append(commentTemp(commentsList[j]))
            }
        }
        postElement.remove()
    })

    // Destroy comment
    $("#post_container").on("click", ".destroy-comment", function() {
        var id = parseInt(this.id);
        for(var i=0; i < commentsList.length; i++) {
            if (id === commentsList[i].commentId) {
                $("#trash_container").append(trashCommentTemplate(commentsList[i]))
                $("#comment"+commentsList[i].commentId).remove()
                trashedComments.push(commentsList[i])
                commentsList.splice(i, 1)
            }
        }
    })

    // Edit post
    $("#post_container").on("click",".edit-post", function() {
        var id = this.id;
        console.log(id)
        var newTitle = $("#titlefield"+id).val()
        var newDescritption = $("#descriptionfield"+id).val()
        if (newTitle === '') {
            $(".err-msg").css("display", "block")
        } else {
            $("#title"+id).html(newTitle)
            $("#description"+id).html(newDescritption)
            $("#edit"+id).modal("hide")
            $(".err-msg").css("display", "none")
        }
    })

    // Permanent delete
    $("#post_container").on("click", ".delete-btn", function() {
        var id = parseInt(this.id);
        $("#post"+id).remove()
        for(var i = 0; i < postList.length; i++) {
            if (id === postList[i].id) {
                postList.splice(i, 1)
            }
        }
    })

    // Hard delete comment
    $("#post_container").on("click", ".delete-icon", function() {
        var id = parseInt(this.id);
        $("#comment"+id).remove();
        for(var i = 0; i < commentsList.length; i++) {
            if (id === commentsList[i].id) {
                commentsList.splice(i, 1)
            }
        }
    })

    // Restore posts
    $("#trash_container").on("click", ".restore-btn", function() {
        var id = parseInt(this.id);
        $("#trash"+id).remove();
        for(var i = 0; i < postList.length; i++) {
            if (id === postList[i].id) {
                $("#post_container").append(postTemplate(postList[i]))
            }
        }
        for(var j=0; j < commentsList.length; j++) {
            if (id === commentsList[j].id) {
                $("#comment_list"+id).append(commentTemplate(commentsList[j]))
            }
        }
    })

    // Restore comments
    $("#trash_container").on("click", ".restore-comment", function() {
        var id = parseInt(this.id);
        console.log(id)
        $("#trash_comment"+id).remove();
        for(var i = 0; i < trashedComments.length; i ++) {
            if (id === trashedComments[i].commentId) {
                commentsList.push(trashedComments[i])
                $("#comment_list"+trashedComments[i].id).append(commentTemplate(trashedComments[i]))
                trashedComments.splice(i, 1)
            }
        }

    })

    // Add comments
    $("#post_container").on("keypress", ".comment-field", function(e) {
        var id = parseInt(this.id)
        if(e.which == 13) {
            commentId++
            commentsList.push(new Comments(id, this.value, commentId))
            var data = {
                comment: this.value,
                commentId: commentId
            }
            $("#comment_list"+id).append(commentTemplate(data))
            this.value = '';
        }
    })

    // Template for posts-card {
    function postTemplate(post) {
        return `
            <div class="col-8" id=post`+ post.id +`>
                <div class="card card-container">
                    <div class="card-body">
                    <div class="header-card">
                        <h5 class="card-title" id="title`+ post.id +`">`+ post.title +`</h5>
                        <div class="post-actions">
                            <button class="destroy-post" id=`+ post.id +`>Destroy</button>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#edit`+ post.id +`">Edit</button>
                            <button id=`+ post.id +` class="delete-btn">Delete</button>
                        </div>
                        <!-- Modal -->
                        <div class="modal fade" id="edit`+ post.id +`" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <p class="err-msg">Please enter a title</p>
                                    <input id="titlefield`+ post.id +`" type="text" placeholder="Title" value="`+ post.title +`">
                                    <input id="descriptionfield`+ post.id +`" type="text" placeholder="Title" value="`+ post.description +`">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary edit-post" id=`+ post.id +`>Save</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="card-text" id="description`+ post.id +`">`+ post.description +`</p>
                    <div class="comments-container">
                        <h4>Comments</h4>
                        <input class="comment-field" id=`+ post.id +` type="text" placeholder="Add comment">
                        <div class="comments-list" id=comment_list`+ post.id +`></div>
                    </div>
                    </div>
                </div>
            </div>
        `
    }

    // Template for posts in trash
    function trashPostTemplate(data) {
        return `
            <div class="col-8" id=trash`+ data.id +`>
                <div class="card card-container">
                    <div class="card-body">
                        <div class="header-card">
                            <h5 class="card-title">`+ data.title +`</h5>
                            <div class="post-actions">
                                <button id=`+ data.id +` class="restore-btn">Restore</button>
                            </div>
                        </div>
                    <p class="card-text">`+ data.description +`</p>
                    <div class="comments-container">
                        <h4>Comments</h4>
                        <div class="trash-comments-list" id=trashed_comments`+ data.id +`></div>
                    </div>
                    </div>
                </div>
            </div>
        `
    }

    // Template for comments
    function commentTemplate(data) {
        return `
            <div class="comment" id=comment`+ data.commentId +`>
                <p>`+ data.comment +`</p>
                <div class="comment-actions">
                    <button class="destroy-comment" id=`+ data.commentId +`>Destroy</button>
                    <img class="delete-icon" id=`+ data.commentId +` src="icons/delete.svg">
                </div>
            </div>
        `
    }

    // Template for post's comment in trash
    function commentTemp(data) {
        return `
            <div class="comment" id=comment`+ data.commentId +`>
                <p>`+ data.comment +`</p>
            </div>
        `
    }

    // Template for individual comments in trash
    function trashCommentTemplate(data) {
        return `
            <div class="col-8" id=trash_comment`+ data.commentId +`>
                <div class="trash-comment">
                    <p>`+ data.comment +`</p>
                    <div class="comment-actions">
                        <button class="restore-comment" id=`+ data.commentId +`>restore</button>
                    </div>
                </div>
            </div>
        `
    }
})
