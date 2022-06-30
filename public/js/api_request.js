
const tok = document.querySelector('#token');
const token = tok.innerHTML.trim();


let uriarr_top = JSON.parse(localStorage.getItem('uriArrayTop'));
let uriarr_top_by = JSON.parse(localStorage.getItem('uriArrayTopBy'));
let uriarr_artist = JSON.parse(localStorage.getItem('uriArrayArtist'));
let uriarr_like = JSON.parse(localStorage.getItem('uriArrayLike'));
let uriarr_playlist = JSON.parse(localStorage.getItem('uriArrayPlaylist'));
// let uriarr_user_playlist = JSON.parse(localStorage.getItem('uriArrayUserPlaylist'));



$.ajax({
    url: 'https://api.spotify.com/v1/recommendations?seed_artists=6LEG9Ld1aLImEFEVHdWNSB&seed_artists=4PULA4EFzYTrxYvOVlwpiQ&seed_tracks=5W7DOVGQLTigu09afW7QMT&seed_tracks=7AW4g4I9fPfUIyqtbsuAkM&limit=6',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },

    success: function(response) {
        // console.log(response);
        let num = 0;
        for(let img of $('.topdiv .topimg')){
            // console.log(img);
            let ur = 'https://api.spotify.com/v1/tracks/' + response.tracks[num].id;
            $.ajax({
                url: ur,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                success: function(resp) {
                    img.setAttribute("src", resp.album.images[0].url);
                }
            })
            num++;
        }
        // console.log(response.tracks[0].uri);
        let arr = [];
        num = 0;
        for(let head of $('.topdiv h5')){
            head.innerText = response.tracks[num].name;
            arr.push(response.tracks[num].uri);
            num++;
        }
        localStorage.setItem('uriArrayTop', JSON.stringify(arr));
        uriarr_top = JSON.parse(localStorage.getItem('uriArrayTop'));
    }
});


$.ajax({
    url: 'https://api.spotify.com/v1/me/top/artists',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    success: function(response) {
        // console.log(response);
        let num = Math.floor(Math.random()*19);

        let data = [];
        let arr = [];

        for(let i=num; i<(num+6); i++){
            let n = i%19;
            data.push(response.items[n]);
        }

        // console.log(data);
        let count = 0;
        for(let card of $('#artists .card')){
            const im = document.querySelector(`#card${count+1} .card-img-top`);
            const heading = document.querySelector(`#card${count+1} h4`);
            const des = document.querySelector(`#card${count+1} p`);
            im.setAttribute('src', data[count].images[0].url);
            arr.push(data[count].uri);
            heading.innerText = data[count].name;
            des.innerText = 'Artist';
            count++;
        }

        // console.log(arr);

        localStorage.setItem('uriArrayArtist', JSON.stringify(arr));
        uriarr_artist = JSON.parse(localStorage.getItem('uriArrayArtist'));
    }
});


$.ajax({
    url: 'https://api.spotify.com/v1/browse/featured-playlists?country=IN&locale=pa_IN',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    success: function(response) {
        // console.log(response);
        let size = response.playlists.items.length;
        let num = Math.floor(Math.random()*size);

        let data = [];
        let arr = [];

        for(let i=num; i<(num+6); i++){
            let n = i%size;
            data.push(response.playlists.items[n]);
        }

        // console.log(data);
        let count = 0;
        for(let card of $('#featured .card')){
            const im = document.querySelector(`#featured #card${count+1} .card-img-top`);
            const heading = document.querySelector(`#featured #card${count+1} h4`);
            const des = document.querySelector(`#featured #card${count+1} p`);
            im.setAttribute('src', data[count].images[0].url);
            arr.push(data[count].uri);
            heading.innerText = data[count].name;
            des.innerText = data[count].description;
            count++;
        }

        localStorage.setItem('uriArrayPlaylist', JSON.stringify(arr));
        uriarr_playlist = JSON.parse(localStorage.getItem('uriArrayPlaylist'));
    }
});


let artists_arr = ['6LEG9Ld1aLImEFEVHdWNSB', '4PULA4EFzYTrxYvOVlwpiQ', '6DARBhWbfcS9E4yJzcliqQ', '2P9JaCtpbQSuZOgvtPrUJ8'];

let ran_num = Math.floor(Math.random()*artists_arr.length);


$.ajax({
    url: 'https://api.spotify.com/v1/artists/'+artists_arr[ran_num],
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    success: function(response) {
        // console.log(response.name);
        $('#top_by_heading').text(`More from ${response.name}`);
        $('#like_heading').text(`More like ${response.name}`);
    }
});


$.ajax({
    url: 'https://api.spotify.com/v1/artists/'+  artists_arr[ran_num]  +'/albums',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    success: function(response) {
        // console.log(response);
        let size = response.items.length;
        let num = Math.floor(Math.random()*size);
        let data = [];

        for(let i=num; i<(num+6); i++){
            let n = i%size;
            data.push(response.items[n]);
        }

        let arr = [];

        // console.log(data);
        let count = 0;
        for(let card of $('#top_by .card')){
            const im = document.querySelector(`#top_by #card${count+1} .card-img-top`);
            const heading = document.querySelector(`#top_by #card${count+1} h4`);
            const des = document.querySelector(`#top_by #card${count+1} p`);
            im.setAttribute('src', data[count].images[0].url);
            heading.innerText = data[count].name;
            arr.push(data[count].uri);
            // des.innerText = data[count].description;

            let tempp_arr = [];
            for(let obj of data[count].artists){
              // console.log(obj.name);
              tempp_arr.push(obj.name);
            }
            des.innerText = tempp_arr.join(', ');

            count++;
        }

        localStorage.setItem('uriArrayTopBy', JSON.stringify(arr));
        uriarr_top_by = JSON.parse(localStorage.getItem('uriArrayTopBy'));
    }
});


$.ajax({
    url: 'https://api.spotify.com/v1/artists/'+  artists_arr[ran_num]  +'/related-artists',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    success: function(response) {
        // console.log(response);
        let size = response.artists.length;
        let num = Math.floor(Math.random()*size);
        let data = [];
        let arr = [];

        for(let i=num; i<(num+6); i++){
            let n = i%size;
            data.push(response.artists[n]);
        }

        let count = 0;
        for(let card of $('#like .card')){
            const im = document.querySelector(`#like #card${count+1} .card-img-top`);
            const heading = document.querySelector(`#like #card${count+1} h4`);
            const des = document.querySelector(`#like #card${count+1} p`);
            im.setAttribute('src', data[count].images[0].url);
            heading.innerText = data[count].name;
            arr.push(data[count].uri);
            des.innerText = 'Artist';
            count++;
        }

        localStorage.setItem('uriArrayLike', JSON.stringify(arr));
        uriarr_like = JSON.parse(localStorage.getItem('uriArrayLike'));
    }
});
