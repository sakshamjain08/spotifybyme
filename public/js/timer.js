            
var Interval ;

function start_timer(){
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}

function stop_timer(){
    clearInterval(Interval);
}

function reset_timer(){
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    minutes = "00";
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
}

function startTimer () {
  tens++; 
  
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
  }
  
  if (seconds > 9){
    appendSeconds.innerHTML = seconds;
  }

  if(seconds > 59){
      minutes++;
      appendMinutes.innerHTML = "0" + minutes;
      seconds = 0;
      appendSeconds.innerHTML = "0" + 0;
  }

  if(minutes > 9){
      appendMinutes.innerHTML = minutes;
  }

}


$('#for_hover').on('click', function(e){
    // console.log(e.offsetX);
    // console.log($(this).width());
    // console.log((tap*100)/total_width);
    let total_width = $(this).width();
    let tap = e.offsetX;
    let seek_to_dur = set_time((tap)/total_width);
    let left_dur = song_dur - seek_to_dur;
    seek_to_dur = parseInt(seek_to_dur);

    // $('#prog_bar').stop(true).css({width: e.offsetX});
    $('#prog_bar').stop(true);

    $('#prog_bar').animate({ width: e.offsetX }, 50, 'linear', function(){
        $('#prog_bar').animate({ width: '100%' }, left_dur, 'linear', function(){
            $('#prog_bar').css('width', '0');
        });
    });
    

    $.ajax({
        url: "https://api.spotify.com/v1/me/player/seek?position_ms=" + seek_to_dur,
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
})

$('#for_hover').on('mouseenter', function(e){
    $('#full_prog_bar').animate({
        bottom: '-2px',
        height: '9px',
        borderRadius: '9px' 
    }, 50, 'linear', function(){});

    $('#prog_bar').css('background-color', 'rgba(27,215,96,255)');
})

$('#for_hover').on('mouseleave', function(e){
    $('#full_prog_bar').animate({
        bottom: '0px',
        height: '5px',
        borderRadius: '5px'
    }, 50, 'linear', function(){});

    $('#prog_bar').css('background-color', 'white');
})


function set_time(percent){
    // console.log(song_dur);
    let dur_temp = song_dur * percent;
    // console.log(millisToMinutesAndSeconds(dur_temp));
    // console.log(millisToMinutesAndSeconds(dur_temp).split(':')[0]);
    // console.log(millisToMinutesAndSeconds(dur_temp).split(':')[1]);
    // console.log(millisToMinutesAndSeconds(song_dur));
    tens = "00";
    seconds = millisToMinutesAndSeconds(dur_temp).split(':')[1];
    minutes = millisToMinutesAndSeconds(dur_temp).split(':')[0];

    appendSeconds.innerHTML = seconds;
    
    if(minutes > 9){
        appendMinutes.innerHTML = minutes;
    }
    else{
        appendMinutes.innerHTML = "0" + minutes;
    }

    return (dur_temp);
}


$('#vol_for_hover').on('click', function(e){
    // console.log(e.offsetX);
    // console.log($(this).width());
    // console.log(e.offsetX/$(this).width());

    vol = e.offsetX/$(this).width();
    vol_perc = parseInt(vol*100);
    vol = vol_perc/100;

    // $('#prog_bar').stop(true).css({width: e.offsetX});
    $('#vol_bar').animate({ width: e.offsetX }, 50, 'linear', function(){

    });

    $.ajax({
        url: "https://api.spotify.com/v1/me/player/volume?volume_percent=" + vol_perc,
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
})


$('#vol_for_hover').on('mouseenter', function(e){
    $('#full_vol_bar').animate({
        top: '1px',
        height: '7px',
        borderRadius: '7px' 
    }, 10, 'linear', function(){});

    $('#vol_bar').css('background-color', 'rgba(27,215,96,255)');
})

$('#vol_for_hover').on('mouseleave', function(e){
    $('#full_vol_bar').animate({
        top: '2px',
        height: '5px',
        borderRadius: '5px'
    }, 10, 'linear', function(){});

    $('#vol_bar').css('background-color', 'white');
})


var d = new Date(); // for now
// d.getHours() // => 9
// d.getMinutes() // =>  30
// d.getSeconds()
// console.log(d.getHours());

if(d.getHours()>=5 && d.getHours()<=11){
    $('#greeting').text('Good Morning');
}
if(d.getHours()>=12 && d.getHours()<=16){
    $('#greeting').text('Good Afternoon');
}
if(d.getHours()>=17 && d.getHours()<=23){
    $('#greeting').text('Good Evening');
}
if(d.getHours()>=0 && d.getHours()<=4){
    $('#greeting').text('Good Evening');
}