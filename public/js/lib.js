$("#lib_open_btn").on("click", function () {
  $.ajax({
    url: `/lib/${token}`,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    success: function (response) {
      // console.log(response);
      const lib_grid = document.querySelector("#lib_grid");
      lib_grid.innerHTML = "";
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      const sec = document.querySelector("#lib_grid");

      const lib_card = document.createElement("div");
      lib_card.setAttribute("class", "lib_card");
      lib_card.setAttribute("id", "liked_card");
      lib_card.style.maxWidth = "none";

      const liked_cardicon = document.createElement("img");
      liked_cardicon.setAttribute("class", "liked_cardicon");
      liked_cardicon.setAttribute("src", "/icon.png");
      liked_cardicon.addEventListener("mouseenter", function () {
        liked_cardicon.style.transform = "scale(1.08)";
      });
      liked_cardicon.addEventListener("mouseleave", function () {
        liked_cardicon.style.transform = "scale(1)";
      });

      const liked_list = document.createElement("div");
      liked_list.setAttribute("id", "liked_list");

      const para = document.createElement("p");
      para.setAttribute("id", "para");

      $.ajax({
        url: `/liked_list/${token}`,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        success: function (response) {
          // console.log(response);
          for (let i = 0; i < response.arr.length; i++) {
            const para_active = document.createElement("span");
            para_active.innerText = response.arr[i].artist + " ";
            const para_muted = document.createElement("span");
            para_muted.innerText = response.arr[i].name + "  ·  ";
            para_muted.style.color = "rgb(192 183 194)";
            para_muted.style.fontWeight = "800";
            para.style.letterSpacing = "1.5px";
            // para.style.wordSpacing = '1px';
            para.appendChild(para_active);
            para.appendChild(para_muted);
          }
        },
      });

      // liked_list.appendChild(para);
      const liked_card_body = document.createElement("div");
      liked_card_body.setAttribute("class", "liked_card_body");

      const heading = document.createElement("h4");
      heading.setAttribute("class", "liked_cardHeading");
      heading.innerText = "Liked Songs";
      const lib_card_text = document.createElement("p");
      lib_card_text.setAttribute("class", "liked_card_text");
      lib_card_text.innerText = "50 liked songs";

      liked_card_body.appendChild(heading);
      liked_card_body.appendChild(lib_card_text);
      lib_card.addEventListener("click", function () {
        show_liked_page(false);
      });

      liked_cardicon.addEventListener("click", function () {
        show_liked_page(true);
      });

      lib_card.appendChild(liked_cardicon);
      lib_card.appendChild(liked_list);
      lib_card.appendChild(liked_card_body);

      sec.appendChild(lib_card);

      for (let i = 0; i < response.playlists.length; i++) {
        const lib_card = document.createElement("div");
        lib_card.setAttribute("class", "lib_card");

        const lib_card_img_top = document.createElement("img");
        lib_card_img_top.setAttribute("class", "lib_card_img_top");
        lib_card_img_top.setAttribute("src", response.playlists[i].image);

        const lib_cardicon = document.createElement("img");
        lib_cardicon.setAttribute("class", "lib_cardicon");
        lib_cardicon.setAttribute("src", "/icon.png");
        lib_cardicon.addEventListener("mouseenter", function () {
          lib_cardicon.style.transform = "scale(1.08)";
        });
        lib_cardicon.addEventListener("mouseleave", function () {
          lib_cardicon.style.transform = "scale(1)";
        });

        const lib_card_body = document.createElement("div");
        lib_card_body.setAttribute("class", "lib_card_body");

        const heading = document.createElement("h4");
        heading.setAttribute("class", "lib_cardHeading");
        heading.innerText = response.playlists[i].name;
        const lib_card_text = document.createElement("p");
        lib_card_text.setAttribute("class", "lib_card_text");
        lib_card_text.innerText = response.playlists[i].des;

        lib_card_body.appendChild(heading);
        lib_card_body.appendChild(lib_card_text);

        lib_card.appendChild(lib_card_img_top);
        lib_card.appendChild(lib_cardicon);
        lib_card.appendChild(lib_card_body);

        lib_card.addEventListener("click", function () {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          // url: `/playlist/${response.playlists[i].uri}/${token}`,
          show_album_page(response.playlists[i].uri, false);
        });

        lib_cardicon.addEventListener("click", function () {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          show_album_page(response.playlists[i].uri, true);
        });

        sec.appendChild(lib_card);
      }

      $("#liked_card").css("visibility", "visible");
    },
  });

  $("#lib_page").animate({ left: "0px" }, 600, "linear", function () {});
    if ($("#homepage").css("display") === "block") {
      let pp = new Pair(document.querySelector("#homepage"), 'home');
      prev_page.push(pp);
    }
    if ($("#playlist_page").css("display") === "block") {
      let pp = new Pair(document.querySelector("#playlist_page"), 'playlist');
      prev_page.push(pp);
    }
    if ($("#liked_page").css("display") === "block") {
      let pp = new Pair(document.querySelector("#liked_page"), 'like');
      prev_page.push(pp);
    }
    if ($("#album_page").css("display") === "block") {
      let pp = new Pair(document.querySelector("#album_page"), 'album');
      prev_page.push(pp);
    }
    // if ($("#lib_page").css("display") === "block") {
    //   let pp = new Pair(document.querySelector("#lib_page"), 'lib');
    //   prev_page.push(pp);
    // }
    if ($("#search_page").css("display") === "block") {
      let pp = new Pair(document.querySelector("#search_page"), 'search');
      prev_page.push(pp);
    }
    $("#homepage").css("display", "none");
    $("#playlist_page").css("display", "none");
    $("#album_page").css("display", "none");
    $("#liked_page").css("display", "none");
    $("#search_page").css("display", "none");
    $("#lib_page").css("display", "block");
});

$("#lib_page #back_btn").on("click", function () {
  $("#lib_page").animate({ left: "100vw" }, 600, "linear", function () {
    let pre = prev_page.pop();
    pre.page.style.display = "block";
    pre.page.style.left = '0px';
    if(pre.str === 'album' || pre.str === 'playlist'){
      let get_uri = page_uri.peek();
      load_page(get_uri);
    }
    else if(pre.str === 'like'){
      liked_page_print(false);
    }
    else if(pre.str === 'search'){
      let get_search = searched.peek();
      search_print(get_search);
    }

    $("#lib_page").css("display", "none");
  });
});

$("#lib_page #back_btn").on("mouseenter", function () {
  $(this).css("cursor", "pointer");
});
