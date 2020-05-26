$(document).ready(function () {
    // var postList = [
    //     {id: 11, title: "post1", description: "bjfhkjsdnfkjdsjkgnjsbgjsajgbajbjdsa", comment : ["kjsdjhsdhs", "ajjdakdjajdkakd"]},
    //     {id: 22, title: "post2", description: "bjfhkjsdnfkjdsjkgnjsbgjsajgbajbjdsa", comment: ["kjsdjhsdhs", "ajjdakdjajdkakd"]}
    // ];

    var id = 0;

    // Blueprint for post obj
    function Post(id, title, description, comments) {
        this.id = id
        this.title = title,
        this.description = description,
        this.comments = comments
    }

    // Show posts on load
    // const showPosts = () => {
    //     for(var i=0; i < postList.length; i++) {
    //         $("#post_container").append(postCardTemplate(postList[i]))
    //     }
    // }

    // Execute posts
    // showPosts()

    // Function to create new post
    $("#create_post").on("click", function() {
        var title = $("#post_title").val()
        var description = $("#post_description").val()
        id++;
        var comments = [];
        postList.push(new Post(id, title, description, comments))
        var data = {
            id: id,
            title: title,
            description: description
        }
        $("#post_container").append(postCardTemplate(data))
        $("#post_modal").modal('hide')
    })

    // Empty inputfields on modal close
    $('#post_modal').on('hidden.bs.modal', function (e) {
        $("#post_title").val('')
        $("#post_description").val('')
    })

    // Destroy post
    $("#post_container").on("click",".destroy-post", function() {
        var id = parseInt(this.id);
        var postElement = $("#post"+id)
        for(var i=0; i < postList.length; i++) {
            if(id === postList[i].id) {
                $("#trash_container").append(trashPostTemplate(postList[i]))
            }
        }
        postElement.remove()
    })

    // Edit post
    $("#post_container").on("click",".edit-post", function() {
        var id = this.id;
        console.log(id)
        var newTitle = $("#titlefield"+id).val()
        var newDescritption = $("#descriptionfield"+id).val()
        console.log(newDescritption)
        $("#title"+id).html(newTitle)
        $("#description"+id).html(newDescritption)
        $("#edit"+id).modal("hide")
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

    // Restore posts
    $("#trash_container").on("click", ".restore-btn", function() {
        var id = parseInt(this.id);
        console.log(id)
        $("#trash"+id).remove();
        for(var i = 0; i < postList.length; i++) {
            if (id === postList[i].id) {
                $("#post_container").append(postCardTemplate(postList[i]))
            }
        }
    })

    // Add comments
    $("#post_container").on("keypress", ".comment-field", function(e) {
        if(e.which == 13) {
            $(".comments-list").append(commentTemplate(this.value))
            this.value = ''
        }
    })

    // Template for posts-card {
    function postCardTemplate(post) {
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
                                    <input id="titlefield`+ post.id +`" type="text" placeholder="Title" value="`+ post.title +`">
                                    <input id="descriptionfield`+ post.id +`" type="text" placeholder="Title" value="`+ post.description +`">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary edit-post" id=`+ id +`>Save</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="card-text" id="description`+ post.id +`">`+ post.description +`</p>
                    <div class="comments-container">
                        <h4>Comments</h4>
                        <input class="comment-field" id=`+ post.id +` type="text" placeholder="Add comment">
                        <div class="comments-list"></div>
                    </div>
                    </div>
                </div>
            </div>
        `
    }

    // Template for trash posts
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
                        <div class="comments-list">
                            <div class="comment trash-comments">
                                <p>lknkjajknakfnajkhfioajdl</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        `
    }

    // Template for comments
    function commentTemplate(data) {
        return `
            <div class="comment">
                <p>`+ data +`</p>
            </div>
        `
    }
})
