function album_print(uri, is_btn) {
  $("#playlist_page #background").css("background-image", ``);
  clearInterval(myInterval);
  $("#playlist_page #album_info").css("visibility", "hidden");
  const list_cont = document.querySelector("#playlist_page #list_cont");
  list_cont.innerHTML = "";
  $("#playlist_page #topimg").attr("src", "");
  $("#playlist_page #album_head").text("");
  $("#playlist_page #album").text("");
  $("#playlist_page #artist_name").text("");
  $("#playlist_page #year").text("");
  $("#playlist_page #num").text("");

  $.ajax({
    url: `/album/${uri}/${token}`,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    success: function (response) {
      // console.log(response);
      const list_cont = document.querySelector("#playlist_page #list_cont");
      list_cont.innerHTML = "";

      const code =
        response.color.red +
        "," +
        response.color.green +
        "," +
        response.color.blue;
      $("#playlist_page #background").css(
        "background-image",
        `linear-gradient(rgba(${code}), 50%, #121212)`
      );

      document.body.scrollTop = document.documentElement.scrollTop = 0;
      $("#playlist_page #topimg").attr("src", response.img);
      $("#playlist_page #album_head").text(response.name.split("(")[0]);
      $("#playlist_page #album_det").css("display", "inline-block");
      $("#playlist_page #album").text("ALBUM");

      // $('#playlist_page #tit').css('width', '75%');

      $("#playlist_page #artist_name").text(response.artist);
      $("#playlist_page #year").text(response.year);
      if (response.num == 1) {
        $("#playlist_page #num").text(response.num + " Song");
        $("#playlist_page #album").text("SINGLE");
      } else {
        $("#playlist_page #num").text(response.num + " Songs");
      }

      for (let i = 0; i < response.num; i++) {
        const list_con = document.createElement("div");
        list_con.setAttribute("id", "list_con");

        const nu = document.createElement("div");
        nu.setAttribute("id", "nu");

        const tit_list = document.createElement("div");
        tit_list.setAttribute("id", "tit_list");

        const heading = document.createElement("h4");
        heading.setAttribute("id", "list_song_head");

        const list_singer = document.createElement("p");
        list_singer.setAttribute("id", "list_singer");

        const dur = document.createElement("div");
        dur.setAttribute("id", "dur");

        heading.innerText = response.tracks[i].track_name;
        list_singer.innerText = response.tracks[i].track_artist;
        tit_list.appendChild(heading);
        tit_list.appendChild(list_singer);

        nu.innerText = response.tracks[i].track_num;
        dur.innerText = response.tracks[i].duration;

        list_con.appendChild(nu);
        list_con.appendChild(tit_list);
        list_con.appendChild(dur);

        const play_btn = document.createElement("img");
        play_btn.setAttribute("src", "/play1.png");
        play_btn.setAttribute("id", "small_play");

        nu.addEventListener("click", function () {
          play(response.tracks[i].uri);
        });
        list_con.addEventListener("mouseenter", function () {
          list_con.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          list_con.style.cursor = "pointer";
          nu.innerText = "";
          nu.appendChild(play_btn);
        });
        list_con.addEventListener("mouseleave", function () {
          list_con.style.backgroundColor = "";
          play_btn.remove();
          nu.innerText = i + 1;
        });

        list_cont.appendChild(list_con);
      }

      setTimeout(function () {
        im_wid = $("#playlist_page #topimg").width();
        // console.log('xyz');
        // console.log(im_wid);
        let lef = im_wid + 20;
        $("#playlist_page #album_info").css("left", lef);
        $("#playlist_page #album_info").css("visibility", "visible");
      }, 100);

      myInterval = setInterval(function () {
        im_wid = $("#playlist_page #topimg").width();
        // console.log('abcd');
        // console.log(im_wid);
        let lef = im_wid + 20;
        $("#playlist_page #album_info").css("left", lef);
        $("#playlist_page #album_info").css("visibility", "visible");
      }, 300);
      if (is_btn) {
        play(response.tracks[0].uri);
      }
    },
  });
}

function artist_print(uri, is_btn) {
  $("#playlist_page #background").css("background-image", ``);
  clearInterval(myInterval);
  $("#playlist_page #album_info").css("visibility", "hidden");
  const list_cont = document.querySelector("#playlist_page #list_cont");
  list_cont.innerHTML = "";
  $("#playlist_page #topimg").attr("src", "");
  $("#playlist_page #album_head").text("");
  $("#playlist_page #album").text("");
  $("#playlist_page #artist_name").text("");
  $("#playlist_page #year").text("");
  $("#playlist_page #num").text("");

  $.ajax({
    url: `/artist/${uri}/${token}`,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    success: function (response) {
      // console.log(response);
      const list_cont = document.querySelector("#playlist_page #list_cont");
      list_cont.innerHTML = "";

      const code =
        response.color.red +
        "," +
        response.color.green +
        "," +
        response.color.blue;
      $("#playlist_page #background").css(
        "background-image",
        `linear-gradient(rgba(${code}), 50%, #121212)`
      );

      document.body.scrollTop = document.documentElement.scrollTop = 0;
      $("#playlist_page #topimg").attr("src", response.img);
      $("#playlist_page #album_head").text(response.name.split("(")[0]);
      $("#playlist_page #album_det").css("display", "none");
      $("#playlist_page #album").text("ARTIST");

      // $('#tit').css('width', '75%');

      for (let i = 0; i < response.tracks.length; i++) {
        const list_con = document.createElement("div");
        list_con.setAttribute("id", "list_con");

        const nu = document.createElement("div");
        nu.setAttribute("id", "nu");

        const tit_list = document.createElement("div");
        tit_list.setAttribute("id", "tit_list");

        const heading = document.createElement("h4");
        heading.setAttribute("id", "list_song_head");

        const list_singer = document.createElement("p");
        list_singer.setAttribute("id", "list_singer");

        const dur = document.createElement("div");
        dur.setAttribute("id", "dur");

        heading.innerText = response.tracks[i].track_name;
        list_singer.innerText = response.tracks[i].track_artist;
        tit_list.appendChild(heading);
        tit_list.appendChild(list_singer);

        nu.innerText = i + 1;
        const play_btn = document.createElement("img");
        play_btn.setAttribute("src", "/play1.png");
        play_btn.setAttribute("id", "small_play");
        dur.innerText = response.tracks[i].duration;

        list_con.appendChild(nu);
        list_con.appendChild(tit_list);
        list_con.appendChild(dur);

        nu.addEventListener("click", function () {
          play(response.tracks[i].uri);
        });
        list_con.addEventListener("mouseenter", function () {
          list_con.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          list_con.style.cursor = "pointer";
          nu.innerText = "";
          nu.appendChild(play_btn);
        });
        list_con.addEventListener("mouseleave", function () {
          list_con.style.backgroundColor = "";
          play_btn.remove();
          nu.innerText = i + 1;
        });

        list_cont.appendChild(list_con);
      }

      if (is_btn) {
        play(response.tracks[0].uri);
      }

      setTimeout(function () {
        im_wid = $("#playlist_page #topimg").width();
        // console.log('xyz');
        // console.log(im_wid);
        let lef = im_wid + 20;
        $("#playlist_page #album_info").css("left", lef);
        $("#playlist_page #album_info").css("visibility", "visible");
      }, 100);

      myInterval = setInterval(function () {
        im_wid = $("#playlist_page #topimg").width();
        // console.log('abcd');
        // console.log(im_wid);
        let lef = im_wid + 20;
        $("#playlist_page #album_info").css("left", lef);
        $("#playlist_page #album_info").css("visibility", "visible");
      }, 300);
    },
  });
}

function playlist_print(uri, is_btn) {
  $("#album_page #background").css("background-image", ``);
  clearInterval(myInterval);
  $("#album_page #album_info").css("visibility", "hidden");
  const list_cont = document.querySelector("#album_page #list_cont");
  list_cont.innerHTML = "";
  $("#album_page #topimg").attr("src", "");
  $("#album_page #album_head").text("");
  $("#album_page #album").text("");
  $("#album_page #playlist_des").text("");

  $.ajax({
    url: `/playlist/${uri}/${token}`,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    success: function (response) {
      // console.log(response);
      const list_cont = document.querySelector("#album_page #list_cont");
      list_cont.innerHTML = "";

      const code =
        response.color.red +
        "," +
        response.color.green +
        "," +
        response.color.blue;
      $("#album_page #background").css(
        "background-image",
        `linear-gradient(rgba(${code}), 50%, #121212)`
      );

      document.body.scrollTop = document.documentElement.scrollTop = 0;
      $("#album_page #topimg").attr("src", response.img);
      $("#album_page #album_head").text(response.name.split("(")[0]);
      $("#album_page #album_det").css("display", "none");
      $("#album_page #playlist_des").css("display", "inline-block");
      // $('#album_page #alb').css('display', 'flex');
      $("#album_page #playlist_des").text(response.des);

      $("#album_page #album").text("PLAYLIST");

      // $('#tit').css('width', '60%');

      for (let i = 0; i < response.tracks.length; i++) {
        const list_con = document.createElement("div");
        list_con.setAttribute("id", "list_con");

        const nu = document.createElement("div");
        nu.setAttribute("id", "nu");

        const tit_list = document.createElement("div");
        tit_list.setAttribute("id", "tit_list1");

        const heading = document.createElement("h4");
        heading.setAttribute("id", "list_song_head");

        const list_singer = document.createElement("p");
        list_singer.setAttribute("id", "list_singer");

        const alb = document.createElement("div");
        alb.setAttribute("id", "alb");
        const p_alb = document.createElement("p");
        p_alb.setAttribute("id", "p_alb");

        const dur = document.createElement("div");
        dur.setAttribute("id", "dur");

        heading.innerText = response.tracks[i].track_name;
        list_singer.innerText = response.tracks[i].track_artist;
        tit_list.appendChild(heading);
        tit_list.appendChild(list_singer);

        p_alb.innerText = response.tracks[i].track_album;
        alb.appendChild(p_alb);

        nu.innerText = i + 1;
        dur.innerText = response.tracks[i].duration;

        list_con.appendChild(nu);
        list_con.appendChild(tit_list);
        list_con.appendChild(alb);
        list_con.appendChild(dur);

        const play_btn = document.createElement("img");
        play_btn.setAttribute("src", "/play1.png");
        play_btn.setAttribute("id", "small_play");

        nu.addEventListener("click", function () {
          play(response.tracks[i].uri);
        });
        list_con.addEventListener("mouseenter", function () {
          list_con.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          list_con.style.cursor = "pointer";
          nu.innerText = "";
          nu.appendChild(play_btn);
        });
        list_con.addEventListener("mouseleave", function () {
          list_con.style.backgroundColor = "";
          play_btn.remove();
          nu.innerText = i + 1;
        });

        list_cont.appendChild(list_con);
      }

      if (is_btn) {
        play(response.tracks[0].uri);
      }

      setTimeout(function () {
        im_wid = $("#album_page #topimg").width();
        // console.log('xyz');
        // console.log(im_wid);
        let lef = im_wid + 20;
        $("#album_page #album_info").css("left", lef);
        $("#album_page #album_info").css("visibility", "visible");
      }, 100);

      myInterval = setInterval(function () {
        im_wid = $("#album_page #topimg").width();
        // console.log('abcd');
        // console.log(im_wid);
        let lef = im_wid + 20;
        $("#album_page #album_info").css("left", lef);
        $("#album_page #album_info").css("visibility", "visible");
      }, 300);
    },
  });
}

function liked_page_print(is_btn) {
  $.ajax({
    url: `/liked/${token}`,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    success: function (response) {
      // console.log(response);

      const list_cont = document.querySelector("#liked_page #list_cont");

      const code =
        response.color.red +
        "," +
        response.color.green +
        "," +
        response.color.blue;
      $("#liked_page #background").css(
        "background-image",
        `linear-gradient(rgba(${code}), 50%, #121212)`
      );

      document.body.scrollTop = document.documentElement.scrollTop = 0;
      $("#liked_page #topimg").attr("src", "/liked_big.png");
      $("#liked_page #album_head").text("Liked Songs");
      $("#liked_page #album_det").css("display", "none");
      $("#liked_page #playlist_des").css("display", "none");
      // $('#liked_page #alb').css('display', 'flex');
      // $('#liked_page #playlist_des').text(response.des);

      $("#liked_page #album").text("PLAYLIST");

      // $('#tit').css('width', '60%');

      for (let i = 0; i < response.tracks.length; i++) {
        const list_con = document.createElement("div");
        list_con.setAttribute("id", "list_con");

        const nu = document.createElement("div");
        nu.setAttribute("id", "nu");

        const tit_list = document.createElement("div");
        tit_list.setAttribute("id", "tit_list1");

        const heading = document.createElement("h4");
        heading.setAttribute("id", "list_song_head");

        const list_singer = document.createElement("p");
        list_singer.setAttribute("id", "list_singer");

        const alb = document.createElement("div");
        alb.setAttribute("id", "alb");
        const p_alb = document.createElement("p");
        p_alb.setAttribute("id", "p_alb");

        const dur = document.createElement("div");
        dur.setAttribute("id", "dur");

        heading.innerText = response.tracks[i].track_name;
        list_singer.innerText = response.tracks[i].track_artist;
        tit_list.appendChild(heading);
        tit_list.appendChild(list_singer);

        p_alb.innerText = response.tracks[i].track_album;
        alb.appendChild(p_alb);

        nu.innerText = i + 1;
        dur.innerText = response.tracks[i].duration;

        list_con.appendChild(nu);
        list_con.appendChild(tit_list);
        list_con.appendChild(alb);
        list_con.appendChild(dur);

        const play_btn = document.createElement("img");
        play_btn.setAttribute("src", "/play1.png");
        play_btn.setAttribute("id", "small_play");

        nu.addEventListener("click", function () {
          play(response.tracks[i].uri);
        });
        list_con.addEventListener("mouseenter", function () {
          list_con.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
          list_con.style.cursor = "pointer";
          nu.innerText = "";
          nu.appendChild(play_btn);
        });
        list_con.addEventListener("mouseleave", function () {
          list_con.style.backgroundColor = "";
          play_btn.remove();
          nu.innerText = i + 1;
        });

        list_cont.appendChild(list_con);
      }

      if (is_btn) {
        play(response.tracks[0].uri);
      }

      setTimeout(function () {
        im_wid = $("#liked_page #topimg").width();
        // console.log('xyz');
        // console.log(im_wid);
        let lef = im_wid + 20;
        $("#liked_page #album_info").css("left", lef);
        $("#liked_page #album_info").css("visibility", "visible");
      }, 100);

      myInterval = setInterval(function () {
        im_wid = $("#liked_page #topimg").width();
        // console.log('abcd');
        // console.log(im_wid);
        let lef = im_wid + 20;
        $("#liked_page #album_info").css("left", lef);
        $("#liked_page #album_info").css("visibility", "visible");
      }, 300);
    },
  });
}

function search_print(val) {
  $("#search_page #background").css("background-image", ``);
  $("#search_page #artistss").empty();
  $("#search_page #Albums").empty();
  $("#search_page #playlists").empty();
  $("#search_page #search-tracks").empty();
  const to_clear = document.querySelector("#to_clear");
  to_clear.innerHTML = "";

  $.ajax({
    url: `/search/${token}/${val}`,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },

    success: function (response) {
      // console.log("response recieved");
      // console.log(response);

      seach_uri_tracks = [];
      seach_uri_album = [];
      seach_uri_playlist = [];
      seach_uri_artist = [];

      //innitially clean all childs
      // $("#search_page #artistss").empty();
      // $("#search_page #Albums").empty();
      // $("#search_page #playlists").empty();
      // $("#search_page #search-tracks").empty();
      // const span_add = document.querySelector('#span1');
      // span_add.innerHTML = '';
      const to_clear = document.querySelector("#to_clear");

      const top_result = document.createElement("div");
      top_result.setAttribute("id", "top_result");

      // const h2_heading = document.createElement('h2');
      // h2_heading.innerText = 'Top result';

      const top_res_img = document.createElement("img");
      top_res_img.setAttribute("class", "top-res-img");

      const top_res_icon = document.createElement("img");
      top_res_icon.setAttribute("src", "/icon.png");
      top_res_icon.setAttribute("class", "top-res-icon");
      top_res_icon.setAttribute("id", "top-res-icon");

      const top_res_body = document.createElement("div");
      top_res_body.setAttribute("class", "top-res-body");

      const top_res_Heading = document.createElement("h4");
      top_res_Heading.setAttribute("class", "top-res-Heading");

      const top_res_singers = document.createElement("h5");
      top_res_singers.setAttribute("class", "top-res-singers");

      const top_res_text = document.createElement("p");
      top_res_text.setAttribute("class", "top-res-text");

      top_res_body.appendChild(top_res_Heading);
      top_res_body.appendChild(top_res_singers);
      top_res_body.appendChild(top_res_text);

      top_result.appendChild(top_res_img);
      top_result.appendChild(top_res_icon);
      top_result.appendChild(top_res_body);

      to_clear.appendChild(top_result);

      //top result

      let topimgsrc;
      let topreshead;
      let topresart;
      let toprestext;
      let topresimg = $("#search-topbar .top-res-img");
      let topimgh4 = $("#search-topbar .top-res-Heading");
      let topimgp = $("#search-topbar .top-res-text");
      $("#search-topbar .top-res-icon").on("mouseenter", () => {
        // console.log("inside icon");
        $("#search-topbar .top-res-icon").css("transform", "scale(1.08)");
      });

      $("#search-topbar .top-res-icon").on("mouseleave", () => {
        //console.log('inside icon');
        $("#search-topbar .top-res-icon").css("transform", "scale(1)");
      });
      // console.log(response.tracks[0].track_name.toUpperCase() == val.toUpperCase());

      if (
        val.toUpperCase() === response.artist[0].artist_name.toUpperCase() &&
        val.toUpperCase() !== response.tracks[0].track_name.toUpperCase()
      ) {
        topimgsrc = response.artist[0].artist_image.url;
        topreshead = response.artist[0].artist_name;
        toprestext = "ARTIST";
        topresimg.css("border-radius", "50%");
        topresimg.css("margin", "21px 0px 20px 21px");
        topimgh4.css('margin-left', '21px');
        topimgp.css('margin-top', '5px');
        topimgp.css('margin-left', '25px');
        $("#search-topbar #top_result").on("click", () => {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          // url: `/artist/${response.artist[0].uri}/${token}`,

          show_playlist_page(response.artist[0].uri, false, "artist");
        });
        $("#search-topbar .top-res-icon").on("click", (e) => {
          e.stopPropagation();
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          // url: `/artist/${response.artist[0].uri}/${token}`,

          show_playlist_page(response.artist[0].uri, true, "artist");
        });
      } else {
        topimgsrc = response.tracks[0].track_image.url;
        topreshead = response.tracks[0].track_name;
        topresart = response.tracks[0].track_artist.split(",");
        let artist = topresart[0] + "," + topresart[1];
        $("#search-topbar .top-res-singers").text(`${topresart}`);
        topimgp.css("width", "40px");
        toprestext = `Song`;
        topresimg.css("border-radius", "7px");
        topresimg.css("margin", "16px 0px 14px 16px");
        topimgh4.css('margin-left', '16px');
        topimgp.css('margin-top', '9px');
        topimgp.css('margin-left', '21px');

        // top_res_icon.addEventListener("click", function(){
        //   console.log('abcd');
        //     play(response.tracks[0].uri)
        // })
        $("#search-topbar .top-res-icon").on("click", () => {
          // console.log('done');
          // console.log(response.tracks[0].uri);
          // console.log(response.tracks[0].track_name);
          play(response.tracks[0].uri);
        });
      }

      topresimg.attr("src", `${topimgsrc}`);
      topresimg.css("height", "80px");
      topresimg.css("width", "80px");
      topimgh4.text(`${topreshead}`);
      topimgp.text(toprestext);

      // for tracks

      let i = 1;
      let songlists = $("#search-tracks");
      // console.log(songlists);
      //  let buttn = $('#search-tracks .tracks-buttons');
      //  let iconimg = $('#SearchPage #artistss #acardicon1').getAttribute('src');
      for (let trk of response.tracks) {
        let listitem = document.createElement("div");
        listitem.setAttribute("class", "song-list");
        listitem.setAttribute("id", `song-list${i}`);

        let img = document.createElement("img");
        let btn = document.createElement("img");
        let span1 = document.createElement("span");
        let h4 = document.createElement("h4");
        let p = document.createElement("p");
        let h4_2 = document.createElement("h4");

        btn.setAttribute("src", "/play1.png");
        btn.setAttribute("class", "tracks-buttons");
        btn.setAttribute("id", `track-button${i}`);
        img.setAttribute("src", `${trk.track_image.url}`);
        img.setAttribute("class", "song-list-img");

        span1.setAttribute("class", "song-list-body");
        h4.setAttribute("class", "song-list-Heading");
        h4.textContent = trk.track_name;

        p.setAttribute("class", "song-list-text");
        p.textContent = trk.track_artist;

        h4_2.setAttribute("class", "song-list-dur");
        h4_2.textContent = trk.duration;

        listitem.appendChild(btn);
        listitem.appendChild(img);
        span1.appendChild(h4);
        span1.appendChild(p);
        listitem.appendChild(span1);
        listitem.appendChild(h4_2);

        songlists.append(listitem);

        listitem.addEventListener("mouseenter", () => {
          btn.style.opacity = "100";
          img.classList.add("greyimg");
          listitem.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
        });
        listitem.addEventListener("mouseleave", () => {
          btn.style.opacity = "0";
          img.classList.remove("greyimg");
          listitem.style.backgroundColor = "transparent";
        });

        //play song on btn click;
        btn.addEventListener("click", () => {
          play(trk.uri);
        });

        seach_uri_tracks.push(trk.uri);
        i++;
      }

      //for artists
      i = 1;
      let artistbar = $("#search_page #artistss");
      //  let iconimg = $('#SearchPage #artistss #acardicon1').getAttribute('src');
      for (let art of response.artist) {
        if (art.artist_image != null) {
          let artcard = document.createElement("div");
          artcard.setAttribute("class", "acard");
          artcard.setAttribute("id", `acard${i}`);

          let artimg = document.createElement("img");
          artimg.setAttribute("src", `${art.artist_image.url}`);
          artimg.setAttribute("class", "acard-img-top");

          let icon = document.createElement("img");
          icon.setAttribute("src", "/icon.png");
          icon.setAttribute("class", "acardicon");
          icon.setAttribute("id", `acardicon${i}`);
          icon.addEventListener("mouseenter", function () {
            icon.style.transform = "scale(1.08)";
          });
          icon.addEventListener("mouseleave", function () {
            icon.style.transform = "scale(1)";
          });

          //  let articon = document.createElement('img');
          // articon.setAttribute('url',`${iconimg}`);//might have some prob;
          // articon.setAttribute('class','acardicon');
          // articon.setAttribute('id',`acardicon${i}`);

          let artcardbody = document.createElement("div");
          artcardbody.setAttribute("class", "acard-body");

          let artcardbodyh4 = document.createElement("h4");
          artcardbodyh4.setAttribute("class", "acardHeading");
          artcardbodyh4.textContent = `${art.artist_name}`;

          let artcardbodyp = document.createElement("p");
          artcardbodyp.setAttribute("class", "acard-text");
          artcardbodyp.textContent = "Artist";

          artcardbody.appendChild(icon);
          artcardbody.appendChild(artcardbodyh4);
          artcardbody.appendChild(artcardbodyp);

          artcard.appendChild(artimg);
          //   artcard.appendChild(articon);
          artcard.appendChild(artcardbody);

          artistbar.append(artcard);

          seach_uri_artist.push(art.uri);
          i++;
        }
      }

      // For the searched album part
      i = 1;
      let albumbar = $("#search_page #Albums");
      //  let iconimg = $('#SearchPage #artistss #acardicon1').getAttribute('src');
      for (let alb of response.album) {
        if (alb.album_image != null) {
          let albcard = document.createElement("div");
          albcard.setAttribute("class", "acard");
          albcard.setAttribute("id", `acard${i}`);

          let albimg = document.createElement("img");
          albimg.setAttribute("src", `${alb.album_image.url}`);
          albimg.setAttribute("class", "acard-img-top");

          let icon = document.createElement("img");
          icon.setAttribute("src", "/icon.png");
          icon.setAttribute("class", "acardicon");
          icon.setAttribute("id", `acardicon${i}`);
          icon.addEventListener("mouseenter", function () {
            icon.style.transform = "scale(1.08)";
          });
          icon.addEventListener("mouseleave", function () {
            icon.style.transform = "scale(1)";
          });
          //  let articon = document.createElement('img');
          // articon.setAttribute('url',`${iconimg}`);//might have some prob;
          // articon.setAttribute('class','acardicon');
          // articon.setAttribute('id',`acardicon${i}`);

          let albcardbody = document.createElement("div");
          albcardbody.setAttribute("class", "acard-body");

          let albcardbodyh4 = document.createElement("h4");
          albcardbodyh4.setAttribute("class", "acardHeading");
          albcardbodyh4.textContent = `${alb.album_name}`;

          let albcardbodyp = document.createElement("p");
          albcardbodyp.setAttribute("class", "acard-text");
          albcardbodyp.textContent = `${alb.albums_artists}`;

          albcardbody.appendChild(icon);
          albcardbody.appendChild(albcardbodyh4);
          albcardbody.appendChild(albcardbodyp);

          albcard.appendChild(albimg);
          //   artcard.appendChild(articon);
          albcard.appendChild(albcardbody);

          albumbar.append(albcard);

          seach_uri_album.push(alb.uri);
          i++;
        }
      }

      // For the searched playlist part
      i = 1;
      let playlistbar = $("#search_page #playlists");
      //  let iconimg = $('#SearchPage #artistss #acardicon1').getAttribute('src');
      for (let alb of response.playlist) {
        if (alb.playlist_image != null) {
          // console.log("inside playlist");
          let albcard = document.createElement("div");
          albcard.setAttribute("class", "acard");
          albcard.setAttribute("id", `acard${i}`);

          let albimg = document.createElement("img");
          albimg.setAttribute("src", `${alb.playlist_image.url}`);
          albimg.setAttribute("class", "acard-img-top");

          let icon = document.createElement("img");
          icon.setAttribute("src", "/icon.png");
          icon.setAttribute("class", "acardicon");
          icon.setAttribute("id", `acardicon${i}`);
          icon.addEventListener("mouseenter", function () {
            icon.style.transform = "scale(1.08)";
          });
          icon.addEventListener("mouseleave", function () {
            icon.style.transform = "scale(1)";
          });
          //  let articon = document.createElement('img');
          // articon.setAttribute('url',`${iconimg}`);//might have some prob;
          // articon.setAttribute('class','acardicon');
          // articon.setAttribute('id',`acardicon${i}`);

          let albcardbody = document.createElement("div");
          albcardbody.setAttribute("class", "acard-body");

          let albcardbodyh4 = document.createElement("h4");
          albcardbodyh4.setAttribute("class", "acardHeading");
          albcardbodyh4.textContent = `${alb.playlist_name}`;

          let albcardbodyp = document.createElement("p");
          albcardbodyp.setAttribute("class", "acard-text");
          albcardbodyp.textContent = `Playlist`;

          albcardbody.appendChild(icon);
          albcardbody.appendChild(albcardbodyh4);
          albcardbody.appendChild(albcardbodyp);

          albcard.appendChild(albimg);
          //   artcard.appendChild(articon);
          albcard.appendChild(albcardbody);

          playlistbar.append(albcard);

          seach_uri_playlist.push(alb.uri);
          i++;
        }
      }

      //------------------- track page here---------------------------------

      //--------------playlist page here---------------
      $("#search_page #playlists .acard").on("click", function () {
        let idx = parseInt($(this).attr("id").substring(5)) - 1;
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        show_album_page(seach_uri_playlist[idx], false);
      });

      $("#search_page #playlists .acardicon").on("click", function (e) {
        e.stopPropagation();
        let idx = parseInt($(this).attr("id").substring(9)) - 1;
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        show_album_page(seach_uri_playlist[idx], true);
      });

      //------------Artist Page here----------------

      $("#search_page #artistss .acard").on("click", function () {
        let idx = $(this).attr("id").substring(5);
        idx = parseInt(idx) - 1;
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        show_playlist_page(seach_uri_artist[idx], false, "artist");
      });

      $("#search_page #artistss .acardicon").on("click", function (e) {
        e.stopPropagation();
        let idx = parseInt($(this).attr("id").substring(9)) - 1;
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        show_playlist_page(seach_uri_artist[idx], true, "artist");
      });

      //-----------Album page-----------------------------------------------

      $("#search_page #Albums .acard").on("click", function () {
        let idx = parseInt($(this).attr("id").substring(5)) - 1;
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        show_playlist_page(seach_uri_album[idx], false, "album");
      });

      $("#search_page #Albums .acardicon").on("click", function (e) {
        e.stopPropagation();
        let idx = parseInt($(this).attr("id").substring(9)) - 1;
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        show_playlist_page(seach_uri_album[idx], true, "album");
      });
    },
  });
}
