var express = require('express'); // Express web server framework
 var request = require('request'); // "Request" library
 var cors = require('cors');
 const url = require('url');
 var querystring = require('querystring');
 var cookieParser = require('cookie-parser');
 const path = require('path');
 const ColorThief = require('colorthief');

var router = express.Router();


 var client_id = '9ddc7e09db6d4babb7d05f4d573fbf9b'; // Your client id
 var client_secret = '784b3df20acb4a70a329f370ac2cf69c'; // Your secret
 var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

//  const token=0;
 
 /**
  * Generates a random string containing numbers and letters
  * @param  {number} length The length of the string
  * @return {string} The generated string
  */
 var generateRandomString = function(length) {
   var text = '';
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 
   for (var i = 0; i < length; i++) {
     text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return text;
 };
 
 var stateKey = 'spotify_auth_state';
 
 router.use(express.static(path.join(__dirname, 'public')))
    .use(cors())
    .use(cookieParser());
 
 router.get('/', function(req, res) {
 
   var state = generateRandomString(16);
   res.cookie(stateKey, state);
 
   // your application requests authorization
   var scope = 'user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private user-top-read';
   res.redirect('https://accounts.spotify.com/authorize?' +
     querystring.stringify({
       response_type: 'code',
       client_id: client_id,
       scope: scope,
       redirect_uri: redirect_uri,
       state: state
     }));
 });
 
 router.get('/callback', function(req, res) {
 
   // your application requests refresh and access tokens
   // after checking the state parameter
 
   var code = req.query.code || null;
   var state = req.query.state || null;
   var storedState = req.cookies ? req.cookies[stateKey] : null;
 
   if (state === null || state !== storedState) {
     res.redirect('/#' +
       querystring.stringify({
         error: 'state_mismatch'
       }));
   } else {
     res.clearCookie(stateKey);
     var authOptions = {
       url: 'https://accounts.spotify.com/api/token',
       form: {
         code: code,
         redirect_uri: redirect_uri,
         grant_type: 'authorization_code'
       },
       headers: {
         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
       },
       json: true
     };
 
     // console.log(authOptions);
     request.post(authOptions, function(error, response, body) {
       // console.log(body);
       if (!error && response.statusCode === 200) {
 
         var access_token = body.access_token,
             token = access_token;
             refresh_token = body.refresh_token;
 
            //  var options = {
            //     url: 'https://api.spotify.com/v1/recommendations?seed_artists=6LEG9Ld1aLImEFEVHdWNSB&seed_artists=4PULA4EFzYTrxYvOVlwpiQ&seed_tracks=5W7DOVGQLTigu09afW7QMT&seed_tracks=7AW4g4I9fPfUIyqtbsuAkM&limit=6',
            //     headers: { 'Authorization': 'Bearer ' + access_token },
            //     json: true
            //   };
            
            //   request.get(options, function(error, response, body) {
            //     let name_arr = [];
            //     let img_arr = [];
            //     for(i=0; i<6; i++){
            //         name_arr.push(body.tracks[i].name);
            //         // console.log(body.tracks[i].id);
            //         let ur = 'https://api.spotify.com/v1/tracks/' + body.tracks[i].id;
            //         var options1 = {
            //           url: ur,
            //           headers: { 'Authorization': 'Bearer ' + access_token },
            //           json: true
            //         };
            //         request.get(options1, function(error, response, body1) {
            //           img_arr.push(body1.album.images[0].url)
            //           // console.log(body1.album.images[0].);
            //           console.log(img_arr);
            //         })
            //       }
            //     console.log(name_arr);
       };
        res.render('index', {access_token});
      });
   }
 });

 
 router.get('/refresh_token', function(req, res) {
   // requesting access token from refresh token
   var refresh_token = req.query.refresh_token;
   var authOptions = {
     url: 'https://accounts.spotify.com/api/token',
     headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
     form: {
       grant_type: 'refresh_token',
       refresh_token: refresh_token
     },
     json: true
   };
 
   request.post(authOptions, function(error, response, body) {
     if (!error && response.statusCode === 200) {
       var access_token = body.access_token;
       token = access_token;
       res.send({
         'access_token': access_token
       });
     }
   });
 });


 router.get('/playlist/:uri/:token', function(req, res){
  const {uri, token} = req.params;
  // console.log(token);
  // console.log(uri);
  const id = uri.split(':')[2];
  
  var options = {
    url: 'https://api.spotify.com/v1/albums/'+id,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };
  
  request.get(options, function(error, response, body) {
    let arr = [];
    for(let obj of body.artists){
      arr.push(obj.name);
    }
    let str = arr.join(', ');
    // console.log(body.tracks);
    
    let tracks_arr = [];
    for(let temp_tr of body.tracks.items){
      let arr1 = [];
      for(let obj of temp_tr.artists){
        arr1.push(obj.name);
      }
      let str1 = arr1.join(', ');
      
      const ob = {
        track_name: temp_tr.name,
        track_artist: str1,
        duration: millisToMinutesAndSeconds(temp_tr.duration_ms),
        track_num: temp_tr.track_number,
        uri: temp_tr.uri,
      }
      tracks_arr.push(ob);
    }

    ColorThief.getColor(body.images[0].url)
    .then(color => { 
      // console.log((color.toString().split(',')));
      let dat = body.release_date.split('-')[0];
      const color_rgb = {
        red: color.toString().split(',')[0],
        green: color.toString().split(',')[1],
        blue: color.toString().split(',')[2],
      }

      const obj = {
      img: body.images[0].url,
      name: body.name,
      artist: str,
      num: body.total_tracks,
      year: dat,
      color: color_rgb,
      tracks: tracks_arr,
      }
  
    // console.log(obj);
    res.send(obj);
    // res.render('playlist', {obj});
    })
    .catch(err => { console.log(err) })

  })
})


 router.get('/artist/:uri/:token', function(req, res){
  const {uri, token} = req.params;
  // console.log(token);
  // console.log(uri);
  const id = uri.split(':')[2];


  // https://api.spotify.com/v1/artists/id

  var options1 = {
    url: 'https://api.spotify.com/v1/artists/'+id,
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };
  request.get(options1, function(error, response, body) {
    // console.log(body);
    let str = body.name;

  
  var options = {
    url: 'https://api.spotify.com/v1/artists/'+ id + '/top-tracks?market=IN',
    headers: { 'Authorization': 'Bearer ' + token },
    json: true
  };
  
  request.get(options, function(error, response, body1) {
    let tracks_arr = [];
    for(let temp_tr of body1.tracks){
      let arr1 = [];
      for(let obj of temp_tr.artists){
        // console.log(obj);
        arr1.push(obj.name);
      }
      let str1 = arr1.join(', ');
      
      const ob = {
        track_name: temp_tr.name,
        track_artist: str1,
        duration: millisToMinutesAndSeconds(temp_tr.duration_ms),
        uri: temp_tr.uri,
      }
      tracks_arr.push(ob);
    }

    ColorThief.getColor(body.images[0].url)
    .then(color => { 
      const color_rgb = {
        red: color.toString().split(',')[0],
        green: color.toString().split(',')[1],
        blue: color.toString().split(',')[2],
      }

      const obj = {
      img: body.images[0].url,
      name: body.name,
      color: color_rgb,
      tracks: tracks_arr,
      }
  
    // console.log(obj);
    res.send(obj);
    })
    .catch(err => { console.log(err) })

  })
})
})

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

 module.exports = router;