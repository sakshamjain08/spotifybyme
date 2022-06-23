
let colors = ['red', 'dark-violet', 'violet', 'yellow', 'orange', 'gray', 'green'];
colors.sort( ()=>Math.random()-0.5 );
let idx = -1;

let grad = $(`#background_${colors[0]}`).css('background-image');
$(`#background_default`).css('background-image', grad);

$('.topdiv').on('mouseenter', function(){
    $(this).addClass('top-ani');
    $(this).removeClass('top-ani-leave');
    // console.log($(this).attr('id'));
    idx = parseInt($(this).attr('id'));
    if(idx==0){
        return;
    }
    // if(idx%2==0){
    //     $(`#background_${colors[idx]}`).css('background-image', 'linear-gradient(rgba(55,55,55) 30%, #121212)');
    // }
    // else{
    //     $(`#background_${colors[idx]}`).css('background-image', 'linear-gradient(rgba(92,43,17) 30%, #121212');
    // }
    $(`#background_default`).removeClass(`ani-default-enter`)
    $(`#background_default`).addClass(`ani-default-exit`)

    $(`#background_${colors[idx]}`).removeClass(`ani-${colors[idx]}-exit`)
    $(`#background_${colors[idx]}`).addClass(`ani-${colors[idx]}-enter`)
})

$('.topdiv').on('mouseleave', function(){
    $(this).addClass('top-ani-leave');
    $(this).removeClass('top-ani');
    if(idx==0){
        return;
    }

    $(`#background_default`).removeClass(`ani-default-exit`)
    $(`#background_default`).addClass(`ani-default-enter`)

    $(`#background_${colors[idx]}`).removeClass(`ani-${colors[idx]}-enter`)
    $(`#background_${colors[idx]}`).addClass(`ani-${colors[idx]}-exit`)
})


$('.topicon').on('mouseenter', function(){
    $(this).css('transform', 'scale(1.08)');
})
$('.topicon').on('mouseleave', function(){
    $(this).css('transform', 'scale(1)');
})
$('.cardicon').on('mouseenter', function(){
    $(this).css('transform', 'scale(1.08)');
})
$('.cardicon').on('mouseleave', function(){
    $(this).css('transform', 'scale(1)');
})


$('#play_btn').on('mouseenter', function(){
    $(this).css('transform', 'scale(1.08)');
    $('#pause_btn').css('transform', 'scale(1.08)');
    
    $(this).css('box-shadow', '0px 6px 20px 0.1px rgb(79, 74, 74)');
    $('#pause_btn').css('box-shadow', '0px 6px 20px 0.1px rgb(79, 74, 74)');
    // box-shadow: 0px 6px 20px 0.02px rgb(41, 37, 37);

})
$('#play_btn').on('mouseleave', function(){
    $(this).css('transform', 'scale(1)');
    $('#pause_btn').css('transform', 'scale(1)');

    $(this).css('box-shadow', '');
    $('#pause_btn').css('box-shadow', '');
})



$('#next_btn').on('mouseenter', function(){
    $(this).css('transform', 'scale(1.08)');
    $(this).css('box-shadow', '0px 6px 20px 0.1px rgb(79, 74, 74)');

})
$('#next_btn').on('mouseleave', function(){
    $(this).css('transform', 'scale(1)');
    $(this).css('box-shadow', '');
})

$('#prev_btn').on('mouseenter', function(){
    $(this).css('transform', 'scale(1.08)');
    $(this).css('box-shadow', '0px 6px 20px 0.1px rgb(79, 74, 74)');

})
$('#prev_btn').on('mouseleave', function(){
    $(this).css('transform', 'scale(1)');
    $(this).css('box-shadow', '');
})

$('#top_by .card').on('click', function(){
    let idx = $(this).attr('id').charAt(4) - 1;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // console.log(idx);
    // console.log(uriarr_top_by[idx]);

    // const a = document.createElement('a');
    // a.setAttribute('href', `/playlist/${uriarr_top_by[idx]}/${token}`);
    // console.log(a);
    // a.click();
    
    $.ajax({
        url: `/playlist/${uriarr_top_by[idx]}/${token}`,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        success: function(response) {
            console.log(response);
            const list_cont = document.querySelector('#list_cont');
            list_cont.innerHTML = '';
            
            const code = response.color.red+','+response.color.green+','+response.color.blue;
            $('#background').css('background-image', `linear-gradient(rgba(${code}), 50%, #121212)`);
            
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            $('#topimg').attr('src', response.img);
            $('#album_head').text(response.name.split('(')[0]);
            $('#album_det').css('display', 'inline-block');
            $('#album').text('ALBUM');
            
            $('#artist_name').text(response.artist);
            $('#year').text(response.year);
            if(response.num==1){
                $('#num').text(response.num+' Song');
            }
            else{
                $('#num').text(response.num+' Songs');
            }
            
            for(let i=0; i<response.num; i++){
                const list_con = document.createElement('div');
                list_con.setAttribute('id', 'list_con');
                
                const nu = document.createElement('div');
                nu.setAttribute('id', 'nu');
                
                const tit_list = document.createElement('div');
                tit_list.setAttribute('id', 'tit_list');
                
                const heading = document.createElement('h4');
                
                const list_singer = document.createElement('p');
                list_singer.setAttribute('id', 'list_singer');
                
                const dur = document.createElement('div');
                dur.setAttribute('id', 'dur');
                
                heading.innerText = response.tracks[i].track_name;
                list_singer.innerText = response.tracks[i].track_artist;
                tit_list.appendChild(heading);
                tit_list.appendChild(list_singer);
                
                nu.innerText = response.tracks[i].track_num;
                dur.innerText = response.tracks[i].duration;
                
                list_con.appendChild(nu);
                list_con.appendChild(tit_list);
                list_con.appendChild(dur);
                
                const play_btn = document.createElement('img');
                play_btn.setAttribute('src', '/play1.png');
                play_btn.setAttribute('id', 'small_play');

                nu.addEventListener('click', function(){
                    play(response.tracks[i].uri);
                });
                list_con.addEventListener('mouseenter', function(){
                    list_con.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    list_con.style.cursor = "pointer";
                    nu.innerText = '';
                    nu.appendChild(play_btn);
                });
                list_con.addEventListener('mouseleave', function(){
                    list_con.style.backgroundColor = '';
                    play_btn.remove();
                    nu.innerText = i+1;
                });
                
                list_cont.appendChild(list_con);
            }
            
            
            setTimeout(function(){
                im_wid = $('#topimg').width();
                // console.log(im_wid);
                let lef = im_wid + 20;
                $('#album_info').css('left', lef);
                $('#album_info').css('visibility', 'visible');
            }, 5);
            
        }
    });
    
    $('#playlist_page').animate({ left: '0px' }, 600, 'linear', function(){
    });
    $('#homepage').css('display', 'none');
    $('#playlist_page').css('display', 'block');
    
    // $('#prog_bar').css('width', '0');
})

// console.log($('#list_con'));


$('#back_btn').on('click', function(){
    
    
    $('#playlist_page').animate({ left: '100vw' }, 600, 'linear', function(){
        $('#homepage').css('display', 'block');
        $('#playlist_page').css('display', 'none');
        $('#background').css('background-image', ``);
        const list_cont = document.querySelector('#list_cont');
        list_cont.innerHTML = '';

    // document.body.scrollTop = document.documentElement.scrollTop = 0;
    $('#topimg').attr('src', '');
    $('#album_head').text('');
    
    $('#artist_name').text('');
    $('#year').text('');
    $('#num').text('');
    });
});

$('#back_btn').on('mouseenter', function(){
    $(this).css('cursor', 'pointer');
});

// console.log($('#artists #card1 .card-img-top').attr('src'));
// if($('#artists #card1 .card-img-top').attr('src')===''){
//     $('#artists #card1 .card-img-top').css('width', '0px');
// }



$('#artists .card').on('click', function(){
    let idx = $(this).attr('id').charAt(4) - 1;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // console.log(idx);
    // console.log(uriarr_top_by[idx]);

    // const a = document.createElement('a');
    // a.setAttribute('href', `/playlist/${uriarr_top_by[idx]}/${token}`);
    // console.log(a);
    // a.click();
    
    $.ajax({
        url: `/artist/${uriarr_artist[idx]}/${token}`,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        success: function(response) {
            // console.log(response);
            const list_cont = document.querySelector('#list_cont');
            list_cont.innerHTML = '';
            
            const code = response.color.red+','+response.color.green+','+response.color.blue;
            $('#background').css('background-image', `linear-gradient(rgba(${code}), 50%, #121212)`);
            
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            $('#topimg').attr('src', response.img);
            $('#album_head').text(response.name.split('(')[0]);
            $('#album_det').css('display', 'none');
            $('#album').text('ARTIST');
            
            for(let i=0; i<response.tracks.length; i++){
                const list_con = document.createElement('div');
                list_con.setAttribute('id', 'list_con');
                
                const nu = document.createElement('div');
                nu.setAttribute('id', 'nu');
                
                const tit_list = document.createElement('div');
                tit_list.setAttribute('id', 'tit_list');
                
                const heading = document.createElement('h4');
                
                const list_singer = document.createElement('p');
                list_singer.setAttribute('id', 'list_singer');
                
                const dur = document.createElement('div');
                dur.setAttribute('id', 'dur');
                
                heading.innerText = response.tracks[i].track_name;
                list_singer.innerText = response.tracks[i].track_artist;
                tit_list.appendChild(heading);
                tit_list.appendChild(list_singer);
                
                nu.innerText = i+1;
                const play_btn = document.createElement('img');
                play_btn.setAttribute('src', '/play1.png');
                play_btn.setAttribute('id', 'small_play');
                dur.innerText = response.tracks[i].duration;
                
                list_con.appendChild(nu);
                list_con.appendChild(tit_list);
                list_con.appendChild(dur);

                nu.addEventListener('click', function(){
                    play(response.tracks[i].uri);
                });
                list_con.addEventListener('mouseenter', function(){
                    list_con.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    list_con.style.cursor = "pointer";
                    nu.innerText = '';
                    nu.appendChild(play_btn);
                });
                list_con.addEventListener('mouseleave', function(){
                    list_con.style.backgroundColor = '';
                    play_btn.remove();
                    nu.innerText = i+1;
                });
                
                list_cont.appendChild(list_con);
            }
            
            
            setTimeout(function(){
                im_wid = $('#topimg').width();
                // console.log(im_wid);
                let lef = im_wid + 20;
                $('#album_info').css('left', lef);
                $('#album_info').css('visibility', 'visible');
            }, 5);
        }
    });
    
    $('#playlist_page').animate({ left: '0px' }, 600, 'linear', function(){
    });
    $('#homepage').css('display', 'none');
    $('#playlist_page').css('display', 'block');
    
})



$('#like .card').on('click', function(){
    let idx = $(this).attr('id').charAt(4) - 1;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
    $.ajax({
        url: `/artist/${uriarr_like[idx]}/${token}`,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        success: function(response) {
            // console.log(response);
            const list_cont = document.querySelector('#list_cont');
            list_cont.innerHTML = '';
            
            const code = response.color.red+','+response.color.green+','+response.color.blue;
            $('#background').css('background-image', `linear-gradient(rgba(${code}), 50%, #121212)`);
            
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            $('#topimg').attr('src', response.img);
            $('#album_head').text(response.name.split('(')[0]);
            $('#album_det').css('display', 'none');
            $('#album').text('ARTIST');
            
            for(let i=0; i<response.tracks.length; i++){
                const list_con = document.createElement('div');
                list_con.setAttribute('id', 'list_con');
                
                const nu = document.createElement('div');
                nu.setAttribute('id', 'nu');
                
                const tit_list = document.createElement('div');
                tit_list.setAttribute('id', 'tit_list');
                
                const heading = document.createElement('h4');
                
                const list_singer = document.createElement('p');
                list_singer.setAttribute('id', 'list_singer');
                
                const dur = document.createElement('div');
                dur.setAttribute('id', 'dur');
                
                heading.innerText = response.tracks[i].track_name;
                list_singer.innerText = response.tracks[i].track_artist;
                tit_list.appendChild(heading);
                tit_list.appendChild(list_singer);
                
                nu.innerText = i+1;
                const play_btn = document.createElement('img');
                play_btn.setAttribute('src', '/play1.png');
                play_btn.setAttribute('id', 'small_play');
                dur.innerText = response.tracks[i].duration;
                
                list_con.appendChild(nu);
                list_con.appendChild(tit_list);
                list_con.appendChild(dur);

                nu.addEventListener('click', function(){
                    play(response.tracks[i].uri);
                });
                list_con.addEventListener('mouseenter', function(){
                    list_con.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    list_con.style.cursor = "pointer";
                    nu.innerText = '';
                    nu.appendChild(play_btn);
                });
                list_con.addEventListener('mouseleave', function(){
                    list_con.style.backgroundColor = '';
                    play_btn.remove();
                    nu.innerText = i+1;
                });
                
                list_cont.appendChild(list_con);
            }
            
            
            setTimeout(function(){
                im_wid = $('#topimg').width();
                // console.log(im_wid);
                let lef = im_wid + 20;
                $('#album_info').css('left', lef);
                $('#album_info').css('visibility', 'visible');
            }, 5);
        }
    });
    
    $('#playlist_page').animate({ left: '0px' }, 600, 'linear', function(){
    });
    $('#homepage').css('display', 'none');
    $('#playlist_page').css('display', 'block');
    
})