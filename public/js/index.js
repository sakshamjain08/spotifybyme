let colors = [
  "red",
  "dark-violet",
  "violet",
  "yellow",
  "orange",
  "gray",
  "green",
];
colors.sort(() => Math.random() - 0.5);
let idx = -1;

let grad = $(`#background_${colors[0]}`).css("background-image");
$(`#background_default`).css("background-image", grad);

$(".searchbar #search").focus(function () {
  $(this).css("background-color", "white");
  $(this).css("cursor", "text");
  $(this).css("box-shadow", "0px 2px 20px 0.2px rgb(84, 78, 78)");
  $(this).animate({ opacity: "1" }, 100, "linear", function () {});
  $("#ser_span").animate({ opacity: "0" }, 100, "linear", function () {});
  $(".searchbar #search").addClass("sear");
});

$(".searchbar #search").focusout(function () {
  // console.log($(this).val());
  //   let inp = $(this).val();
  //   if (inp.length === 0) {
  $(this).css("cursor", "pointer");
  $(this).css("box-shadow", "");
  $(this).animate({ opacity: "0" }, 100, "linear", function () {});
  $("#ser_span").animate({ opacity: "1" }, 100, "linear", function () {});
  $(".searchbar #search").removeClass("sear");
  //   }
});

$(".topdiv").on("mouseenter", function () {
  $(this).addClass("top-ani");
  $(this).removeClass("top-ani-leave");
  // console.log($(this).attr('id'));
  idx = parseInt($(this).attr("id"));
  if (idx == 0) {
    return;
  }
  // if(idx%2==0){
  //     $(`#background_${colors[idx]}`).css('background-image', 'linear-gradient(rgba(55,55,55) 30%, #121212)');
  // }
  // else{
  //     $(`#background_${colors[idx]}`).css('background-image', 'linear-gradient(rgba(92,43,17) 30%, #121212');
  // }
  $(`#background_default`).removeClass(`ani-default-enter`);
  $(`#background_default`).addClass(`ani-default-exit`);

  $(`#background_${colors[idx]}`).removeClass(`ani-${colors[idx]}-exit`);
  $(`#background_${colors[idx]}`).addClass(`ani-${colors[idx]}-enter`);
});

$(".topdiv").on("mouseleave", function () {
  $(this).addClass("top-ani-leave");
  $(this).removeClass("top-ani");
  if (idx == 0) {
    return;
  }

  $(`#background_default`).removeClass(`ani-default-exit`);
  $(`#background_default`).addClass(`ani-default-enter`);

  $(`#background_${colors[idx]}`).removeClass(`ani-${colors[idx]}-enter`);
  $(`#background_${colors[idx]}`).addClass(`ani-${colors[idx]}-exit`);
});

$(".topicon").on("mouseenter", function () {
  $(this).css("transform", "scale(1.08)");
});
$(".topicon").on("mouseleave", function () {
  $(this).css("transform", "scale(1)");
});
$(".cardicon").on("mouseenter", function () {
  $(this).css("transform", "scale(1.08)");
});
$(".cardicon").on("mouseleave", function () {
  $(this).css("transform", "scale(1)");
});

$("#play_btn").on("mouseenter", function () {
  $(this).css("transform", "scale(1.08)");
  $("#pause_btn").css("transform", "scale(1.08)");

  $(this).css("box-shadow", "0px 6px 20px 0.1px rgb(79, 74, 74)");
  $("#pause_btn").css("box-shadow", "0px 6px 20px 0.1px rgb(79, 74, 74)");
  // box-shadow: 0px 6px 20px 0.02px rgb(41, 37, 37);
});
$("#play_btn").on("mouseleave", function () {
  $(this).css("transform", "scale(1)");
  $("#pause_btn").css("transform", "scale(1)");

  $(this).css("box-shadow", "");
  $("#pause_btn").css("box-shadow", "");
});

$("#next_btn").on("mouseenter", function () {
  $(this).css("transform", "scale(1.08)");
  $(this).css("box-shadow", "0px 6px 20px 0.1px rgb(79, 74, 74)");
});
$("#next_btn").on("mouseleave", function () {
  $(this).css("transform", "scale(1)");
  $(this).css("box-shadow", "");
});

$("#prev_btn").on("mouseenter", function () {
  $(this).css("transform", "scale(1.08)");
  $(this).css("box-shadow", "0px 6px 20px 0.1px rgb(79, 74, 74)");
});
$("#prev_btn").on("mouseleave", function () {
  $(this).css("transform", "scale(1)");
  $(this).css("box-shadow", "");
});

let myInterval = 0;

$("#top_by .card").on("click", function () {
  let idx = $(this).attr("id").charAt(4) - 1;
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  // console.log("function called");

  show_playlist_page(uriarr_top_by[idx], false, "album");
});

$("#top_by .cardicon").on("click", function (e) {
  e.stopPropagation();
  let idx = $(this).attr("id").charAt(8) - 1;
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  show_playlist_page(uriarr_top_by[idx], true, "album");
});

// console.log($('#list_con'));

$("#playlist_page #back_btn").on("click", function () {
  $("#playlist_page").animate({ left: "100vw" }, 600, "linear", function () {
    // $('#homepage').css('display', 'block');
    page_uri.pop();
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
    $("#playlist_page").css("display", "none");
    $("#playlist_page #background").css("background-image", ``);
    const list_cont = document.querySelector("#playlist_page #list_cont");
    list_cont.innerHTML = "";

    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#playlist_page #topimg").attr("src", "");
    $("#playlist_page #album_head").text("");
    $("#playlist_page #album").text("");

    $("#playlist_page #artist_name").text("");
    $("#playlist_page #year").text("");
    $("#playlist_page #num").text("");
    clearInterval(myInterval);
  });
});

$("#playlist_page #back_btn").on("mouseenter", function () {
  $(this).css("cursor", "pointer");
});

$("#album_page #back_btn").on("click", function () {
  page_uri.pop();
  let pre = prev_page.pop();
  pre.page.style.left = "0px";
  if (pre.str === "album") {
    $("#album_page #background").css("background-image", ``);
    const list_cont = document.querySelector("#album_page #list_cont");
    list_cont.innerHTML = "";

    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#album_page #topimg").attr("src", "");
    $("#album_page #album_head").text("");
    $("#album_page #album").text("");
    $("#album_page #playlist_des").text("");
    clearInterval(myInterval);
    let get_uri = page_uri.peek();
    load_page(get_uri);
  } else {
    $("#album_page").animate({ left: "100vw" }, 600, "linear", function () {
      // $('#homepage').css('display', 'block');
      pre.page.style.display = "block";
      if (pre.str === "album" || pre.str === "playlist") {
        let get_uri = page_uri.peek();
        load_page(get_uri);
      } else if (pre.str === "like") {
        liked_page_print(false);
      } else if (pre.str === "search") {
        let get_search = searched.peek();
        search_print(get_search);
      }
      // prev_page.style.left = '0vw';
      $("#album_page").css("display", "none");
      $("#album_page #background").css("background-image", ``);
      const list_cont = document.querySelector("#album_page #list_cont");
      list_cont.innerHTML = "";

      // document.body.scrollTop = document.documentElement.scrollTop = 0;
      $("#album_page #topimg").attr("src", "");
      $("#album_page #album_head").text("");
      $("#album_page #album").text("");

      $("#album_page #playlist_des").text("");
      clearInterval(myInterval);
    });
  }
});

$("#album_page #back_btn").on("mouseenter", function () {
  $(this).css("cursor", "pointer");
});

$("#home_btn").on("click", function () {
  $("#album_page").animate({ left: "100vw" }, 600, "linear", function () {
    $("#homepage").css("display", "block");
    $("#album_page").css("display", "none");
    $("#album_page #background").css("background-image", ``);
    const list_cont = document.querySelector("#album_page #list_cont");
    list_cont.innerHTML = "";
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#album_page #topimg").attr("src", "");
    $("#album_page #album_head").text("");
    $("#album_page #album").text("");

    $("#album_page #playlist_des").text("");
    clearInterval(myInterval);
  });

  $("#playlist_page").animate({ left: "100vw" }, 600, "linear", function () {
    $("#homepage").css("display", "block");
    $("#playlist_page").css("display", "none");
    $("#playlist_page #background").css("background-image", ``);
    const list_cont = document.querySelector("#playlist_page #list_cont");
    list_cont.innerHTML = "";
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#playlist_page #topimg").attr("src", "");
    $("#playlist_page #album_head").text("");
    $("#playlist_page #album").text("");

    $("#playlist_page #artist_name").text("");
    $("#playlist_page #year").text("");
    $("#playlist_page #num").text("");
    clearInterval(myInterval);
  });

  $("#lib_page").animate({ left: "100vw" }, 600, "linear", function () {
    $("#homepage").css("display", "block");
    $("#lib_page").css("display", "none");
    // const lib_grid = document.querySelector("#lib_grid");
    // lib_grid.innerHTML = "";

    // document.body.scrollTop = document.documentElement.scrollTop = 0;
  });

  $("#liked_page").animate({ left: "100vw" }, 600, "linear", function () {
    $("#homepage").css("display", "block");
    $("#liked_page").css("display", "none");
  });

  $("#search_page").animate({ left: "100vw" }, 600, "linear", function () {
    $("#homepage").css("display", "block");
    $("#search_page").css("display", "none");
    $("#search_page #background").css("background-image", ``);

    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("#search_page #artistss").empty();
    $("#search_page #Albums").empty();
    $("#search_page #playlists").empty();
    $("#search_page #search-tracks").empty();
  });

  prev_page.empty();
  searched.empty();
  page_uri.empty();
  $(".searchbar input").val("");

  if ($("#homepage").css("display") === "block") {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
});

// console.log($('#artists #card1 .card-img-top').attr('src'));
// if($('#artists #card1 .card-img-top').attr('src')===''){
//     $('#artists #card1 .card-img-top').css('width', '0px');
// }

$("#artists .card").on("click", function () {
  let idx = $(this).attr("id").charAt(4) - 1;
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  show_playlist_page(uriarr_artist[idx], false, "artist");
});

$("#artists .cardicon").on("click", function (e) {
  e.stopPropagation();
  let idx = $(this).attr("id").charAt(8) - 1;
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  show_playlist_page(uriarr_artist[idx], true, "artist");
});

$("#like .card").on("click", function () {
  let idx = $(this).attr("id").charAt(4) - 1;
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  show_playlist_page(uriarr_like[idx], false, "artist");
});

$("#like .cardicon").on("click", function (e) {
  e.stopPropagation();
  let idx = $(this).attr("id").charAt(8) - 1;
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  show_playlist_page(uriarr_like[idx], true, "artist");
});

$("#featured .card").on("click", function () {
  let idx = $(this).attr("id").charAt(4) - 1;
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  show_album_page(uriarr_playlist[idx], false);
});

$("#featured .cardicon").on("click", function (e) {
  e.stopPropagation();
  let idx = $(this).attr("id").charAt(8) - 1;
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  show_album_page(uriarr_playlist[idx], true);
});
