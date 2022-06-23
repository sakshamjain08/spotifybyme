var seconds = 00; 
var minutes = 00; 
var tens = 00;
var appendMinutes = document.getElementById("minutes")
var appendSeconds = document.getElementById("seconds")

const tokabcd = document.querySelector('#token');
const tokenabcd = tokabcd.innerHTML.trim();

let footer_visi = false;

let dat;

let vol = 0.5;

window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(tokenabcd); },
        volume: vol,
    });


    // Ready
    player.addListener('ready', (data) => {
      console.log('Ready with Device ID', data);
      dat = data.device_id;
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
      console.error(message);
    });

      

    // document.getElementById('togglePlay').onclick = function () {
    //     console.log('reewdsdc');
    //     play(dat);
    // };
    $('.topicon').on('click', function(){
      let iidx = parseInt($(this).attr('id'));
      play(uriarr_top[iidx]);
    })

    $('#play_btn').on('click', function(){
      if($(this).attr('class').includes('play-exit')){
        player.togglePlay().then(() => {
          console.log('Toggled playback!');
        });
        $('#prog_bar').pause();
        stop_timer();
        $('#play_btn').removeClass('play-exit');
        $('#pause_btn').removeClass('pause-enter');
        $('#pause_btn').addClass('pause-exit');
        $('#play_btn').addClass('play-enter');
      }
      else{
        player.togglePlay().then(() => {
          console.log('Toggled playback!');
        });
        $('#prog_bar').resume();
        start_timer();
        $('#play_btn').addClass('play-exit');
        $('#pause_btn').addClass('pause-enter');
        $('#pause_btn').removeClass('pause-exit');
        $('#play_btn').removeClass('play-enter');
      }
    })

    $('#next_btn').on('click', function(){
      player.nextTrack().then(() => {
        console.log('Skipped to next track!');
        // fu();
        setTimeout(function(){
          $.ajax({
            url: "https://api.spotify.com/v1/me/player/currently-playing",
            // type: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            success: function(response) {
              check();
    
                // console.log(response);

                let idd = response.item.id;

                setSongDetails(idd);
            }
         });
        }, 2000);
      });
    })

    $('#prev_btn').on('click', function(){
      player.previousTrack().then(() => {
        console.log('Set to previous track!');

        setTimeout(function(){
          $.ajax({
            url: "https://api.spotify.com/v1/me/player/currently-playing",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            success: function(response) {
                check();
                // console.log(response.item.id);

                let idd = response.item.id;

                setSongDetails(idd);
            }
         });
        }, 2000);
      });
    })



    player.connect();
  }

  function play(uri) {
    $.ajax({
        url: "https://api.spotify.com/v1/me/player/play?device_id=" + dat,
        type: "PUT",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        data: `{"uris": ["${uri}"]}`,
        success: function(response) {
            // console.log(response);
            reset_timer();
            $('#prog_bar').stop(true).css({width: 0});
            let idd = (uri.split(':')[2]);
            $.ajax({
              url: "https://api.spotify.com/v1/tracks/" + idd,
              type: "GET",
              headers: {
                  'Authorization': 'Bearer ' + token,
                  'Content-Type': 'application/json'
              },
              success: function(response) {
                  // console.log(response.artists);
                  // $('#song_name').text(response.name);
                  check(response.name);
              }
            });
            // setTimeout(fu, 3500);
            $('.playcontrols').css('display', 'block');
            $('#play_btn').addClass('play-exit');
            $('#pause_btn').addClass('pause-enter');
            $('#pause_btn').removeClass('pause-exit');
            $('#play_btn').removeClass('play-enter');

            $('.footer').addClass('foot_en');

            setSongDetails(idd);

            $.ajax({
              url: 'https://api.spotify.com/v1/recommendations?seed_tracks='+idd,
              headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
              },
          
              success: function(response) {
                
                let arr = [];
                for(let i=0; i<10; i++){
                    let temp_uri = response.tracks[i].uri;
                  // console.log(response.tracks[i].uri);
                  arr.push(response.tracks[i].uri);
                
                    // setTimeout(qu(temp_uri), 10000);
                    // setTimeout(function(){ qu(temp_uri); }, 2000);
                    
                  }
                  qu(arr, 0);
              }
          });
        }
  });
  }


  function qu(arr, idx){
    if(idx===arr.length){
      return;
    }
    
      $.ajax({
        url: "https://api.spotify.com/v1/me/player/queue?uri=" + arr[idx] + "&device_id=" + dat,
        type: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        success: function(response) {
            // console.log('done');
            qu(arr, idx+1);
            // console.log('chal gaya')
        },
        error:   function() {
          qu(arr, idx);
      }
      });

  }


  function pause() {
    $.ajax({
        url: "https://api.spotify.com/v1/me/player/pause?device_id=" + dat,
        type: "PUT",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        success: function(response) {
            // console.log(response);
            // console.log('chal gaya')
        }
  });
  }


  let prev_name;
  function check(name){
    $.ajax({
        url: "https://api.spotify.com/v1/me/player/currently-playing",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        success: function(response) {
            console.log(response);
            if(response==undefined || ((response.item.name==prev_name) && (response.item.name != name))){
              // console.log('abcd');
              check(name);
            }
            else{
              prev_name = response.item.name;
              reset_timer();
              start_timer();
              $('#prog_bar').stop(true).css({width: 0});
              // $('#prog_bar').animate({ width: '100%' }, 10000, 'linear', function(){
              $('#prog_bar').animate({ width: '100%' }, response.item.duration_ms, 'linear', function(){
                $('#prog_bar').css('width', '0');
              });
            }  
        }
    });
}

let song_dur;

function setSongDetails(idd){
  $.ajax({
    url: "https://api.spotify.com/v1/tracks/" + idd,
    type: "GET",
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    success: function(response) {
        // console.log(response.artists);
        $('#curr_song_img').attr('src', response.album.images[0].url);
        $('#song_name').text(response.name);
        song_dur = response.duration_ms;
        $('#end_time').text(millisToMinutesAndSeconds(response.duration_ms));

        let arr = [];
        for(let obj of response.artists){
          // console.log(obj.name);
          arr.push(obj.name);
        }

        let str = arr.join(', ');
         $('#singer_name').text(str);
    }
  });
}



//   function check(){
//   let abcd = 0;
//   const clearinter = setInterval(function fu(){
//     $.ajax({
//         url: "https://api.spotify.com/v1/me/player/currently-playing",
//         headers: {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json'
//         },
//         success: function(response) {
//             console.log(response);
//             if(response==undefined){
//               // console.log('wait');
//             }
//             else{
//               abcd++;
//               console.log(abcd);
//               if(abcd===1){
//                 // console.log('this is unique');
//                 console.log(response.item.name);
//                 // clearInterval(clearinter);
//                 // $('#prog_bar').css('width', '0px');
//                 $('#prog_bar').stop(true).css({width: 0});
//                 // $('#prog_bar').removeClass('prog_start');
//                 // $('#prog_bar').addClass('prog_start');
//                 $('#prog_bar').animate({ width: '100%' }, response.item.duration_ms, 'linear', function(){
//                   console.log('started');
//                 });
//               }
//               // console.log('done func');
//               clearInterval(clearinter);
//             }
            
      
//         }
//     });
//   }, 1000);
// }


  // function fu(){
  //   $.ajax({
  //       url: "https://api.spotify.com/v1/me/player/currently-playing",
  //       headers: {
  //           'Authorization': 'Bearer ' + token,
  //           'Content-Type': 'application/json'
  //       },
  //       success: function(response) {

  //           console.log(response);
  //       }
  //   });
  // }

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


let curr_playing;
setInterval(function alwaysRunning(){
  $.ajax({
      url: "https://api.spotify.com/v1/me/player/currently-playing",
      headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
      },
      success: function(response) {
          // console.log(response);
          if(response==undefined || response.item.name==curr_playing){

          }
          else{
            // console.log('prev : '+prev_name+'     curr : '+response.item.name);
              // console.log(response.item.name + ' from curr_playing');
              // console.log(response.item.id);
              setSongDetails(response.item.id);
              curr_playing = response.item.name;
              reset_timer();
              start_timer();
              $('#prog_bar').stop(true).css({width: 0});
              // $('#prog_bar').animate({ width: '100%' }, 10000, 'linear', function(){
              $('#prog_bar').animate({ width: '100%' }, response.item.duration_ms, 'linear', function(){
                $('#prog_bar').css('width', '0');
              });
            }  
      }
  });
}, 1000);