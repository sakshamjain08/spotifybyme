$.ajax({
  url: "https://api.spotify.com/v1/me",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },

  success: function (response) {
    // console.log(response.id);
    let user_id = response.id;

    $.ajax({
      url:
        "https://api.spotify.com/v1/users/" + user_id + "/playlists?limit=30",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },

      success: function (response) {
        for (let obj of response.items) {
          const li = document.createElement("li");
          li.innerText = obj.name;

          li.addEventListener("click", function () {
            // url: `/playlist/${obj.uri}/${token}`,
            show_album_page(obj.uri, false);
          });
          const ul = document.querySelector("#side ul");
          ul.appendChild(li);
        }
      },
    });
  },
});

$("#like_btn").on("click", function () {
  show_liked_page(false);
});

$("#liked_page #back_btn").on("click", function () {
  $("#liked_page").animate({ left: "100vw" }, 600, "linear", function () {
    let pre = prev_page.pop();
    pre.page.style.display = "block";
    pre.page.style.left = "0px";
    if (pre.str === "album" || pre.str === "playlist") {
      let get_uri = page_uri.peek();
      load_page(get_uri);
    } else if (pre.str === "like") {
      liked_page_print(false);
    } else if (pre.str === "search") {
      let get_search = searched.peek();
      search_print(get_search);
    }
    $("#liked_page").css("display", "none");
    clearInterval(myInterval);
  });
});

$("#liked_page #back_btn").on("mouseenter", function () {
  $(this).css("cursor", "pointer");
});