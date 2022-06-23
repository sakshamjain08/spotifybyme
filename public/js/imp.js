

let im_wid = $('#topimg').width();

setTimeout(function(){
    im_wid = $('#topimg').width();
    // console.log(im_wid);
    let lef = im_wid + 20;
    $('#album_info').css('left', lef);
    $('#album_info').css('visibility', 'visible');
}, 5);

// let color_code = $('#color_code').text();
// $('#background').css('background-image', `linear-gradient(rgba(${color_code}), 50%, #121212)`);