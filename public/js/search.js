let seach_uri_tracks = [];
let seach_uri_album = [];
let seach_uri_playlist = [];
let seach_uri_artist = [];

$(".searchbar input").keypress(function (e) {
  if (e.key === "Enter") {
    // console.log("button pressed");
    let val = $(".searchbar input").val();
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    // $("#search_page #background").css("background-image", ``);
    // $("#search_page #artistss").empty();
    // $("#search_page #Albums").empty();
    // $("#search_page #playlists").empty();
    // $("#search_page #search-tracks").empty();
    // const to_clear = document.querySelector("#to_clear");
    // to_clear.innerHTML = "";

    search_print(val);

    $("#search_page").animate({ left: "0px" }, 600, "linear", function () {});
    if ($("#homepage").css("display") === "block") {
      let pp = new Pair(document.querySelector("#homepage"), "home");
      prev_page.push(pp);
    }
    if ($("#playlist_page").css("display") === "block") {
      let pp = new Pair(document.querySelector("#playlist_page"), "playlist");
      prev_page.push(pp);
    }
    if ($("#liked_page").css("display") === "block") {
      let pp = new Pair(document.querySelector("#liked_page"), "like");
      prev_page.push(pp);
    }
    if ($("#album_page").css("display") === "block") {
      let pp = new Pair(document.querySelector("#album_page"), "album");
      prev_page.push(pp);
    }
    if ($("#lib_page").css("display") === "block") {
      let pp = new Pair(document.querySelector("#lib_page"), "lib");
      prev_page.push(pp);
    }
    if ($("#search_page").css("display") === "block") {
      let pp = new Pair(document.querySelector("#search_page"), "search");
      prev_page.push(pp);
    }
    $("#homepage").css("display", "none");
    $("#album_page").css("display", "none");
    $("#liked_page").css("display", "none");
    $("#lib_page").css("display", "none");
    $("#playlist_page").css("display", "none");
    $("#search_page").css("display", "block");

    searched.push(val);
  }
});

$("#search_page #back_btn").on("click", function () {
  searched.pop();
  if (searched.size() !== 0) {
    $(".searchbar input").val(searched.peek());
  } else {
    $(".searchbar input").val("");
  }
  let pre = prev_page.pop();
  if (pre.str === "search") {
    $("#search_page #background").css("background-image", ``);
    $("#search_page #artistss").empty();
    $("#search_page #Albums").empty();
    $("#search_page #playlists").empty();
    $("#search_page #search-tracks").empty();
    // $("#search_page #span1 .top-res-img").attr("src", "");
    // $("#search_page #span1 .top-res-Heading").text("");
    // $("#search_page #span1 .top-res-singers").text("");
    // $("#search_page #span1 .top-res-text").text("");
    const to_clear = document.querySelector("#to_clear");
    to_clear.innerHTML = "";
    // pre.page.style.left = '0px';
    // pre.page.style.display = "block";
    let get_search = searched.peek();
    search_print(get_search);
  } else {
    $("#search_page").animate({ left: "100vw" }, 600, "linear", function () {
      pre.page.style.left = "0px";
      pre.page.style.display = "block";
      if (pre.str === "album" || pre.str === "playlist") {
        let get_uri = page_uri.peek();
        load_page(get_uri);
      } else if (pre.str === "like") {
        // console.log("liked page");
        liked_page_print(false);
      }
      // else if(pre.str === 'search'){
      //   let get_search = searched.peek();
      //   search_print(get_search);
      // }

      $("#search_page").css("display", "none");
      // document.body.scrollTop = document.documentElement.scrollTop = 0;
      $("#search_page #background").css("background-image", ``);
      $("#search_page #artistss").empty();
      $("#search_page #Albums").empty();
      $("#search_page #playlists").empty();
      $("#search_page #search-tracks").empty();
      // $("#search_page #span1 .top-res-img").attr("src", "");
      // $("#search_page #span1 .top-res-Heading").text("");
      // $("#search_page #span1 .top-res-singers").text("");
      // $("#search_page #span1 .top-res-text").text("");
      const to_clear = document.querySelector("#to_clear");
      to_clear.innerHTML = "";
    });
  }
});

$("#search_page #back_btn").on("mouseenter", function () {
  $(this).css("cursor", "pointer");
});
