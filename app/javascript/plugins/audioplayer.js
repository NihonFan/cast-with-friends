$(document).ready(function() {

    var armElement = $('.player-container .player .player-element.player-element-tonearm svg'),
        vinylElement = $('.player-container .player .player-element.player-element-lp svg')
    ;

    function armPositionStart() {

        armElement.velocity({
            rotateZ: "25deg"
        }, {
            duration: 1200,
            easing: "linear"
        });

    }

    function recordPlaying() {

        // Use with local tracks only
        // var trackDuration = audio.duration;

        var trackDuration = $('li.current-track').attr('data-duration');

        armElement.velocity({
            rotateZ: "45deg"
        }, {
            duration: (trackDuration * 1000),
            easing: "linear"
        });

        vinylElement.velocity({
            rotateZ: "+=360deg"
        }, {
            duration: 1820,
            easing: "linear",
            loop: true,
            delay: 0
        });

    }

    function armPositionReset() {

        armElement.velocity('stop');
        armElement.velocity({
            rotateZ: "25deg"
        }, {
            duration: 1200,
            easing: "linear"
        });

    }

    function recordPausing() {

        armElement.velocity('stop');
        vinylElement.velocity('stop', true);

    }

    // function recordStopping() {

    //     vinylElement.velocity('stop', true);
    //     armElement.velocity('stop');
    //     armElement.velocity({
    //         rotateZ: "0deg"
    //     }, {
    //         duration: 1500,
    //         easing: "linear"
    //     });

    // }

    var audio = $('.vinyl-player')[0]
        firstTrack = $('.player-playlist').find('li:first-child'),
        lastTrack = $('.player-playlist').find('li:last-child')
    ;

    $('.player-button-play').click(function() {

        $(this).addClass('paused');
        $('.player-button-pause').addClass('paused');

        if (audio.currentTime > 0 && audio.paused) {

            recordPlaying();
            audio.play();

        }
        else {

            armPositionStart();

            firstTrack.addClass('current-track');
            $('.vinyl-player').attr('src', firstTrack.attr('data-track'));
            $('.player-element-lp').find('image').attr('xlink:href', firstTrack.attr('data-artwork'));

            setTimeout(function() {
                recordPlaying();
                audio.play();
            }, 1500);
        }

    });

    $('.player-button-pause').click(function() {

        recordPausing();

        $(this).removeClass('paused');
        $('.player-button-play').removeClass('paused');
        audio.pause();

    });

    // $('.player-button-stop').click(function() {

    //     $('li.current-track').removeClass('current-track');
    //     $('.player-button-play, .player-button-pause').removeClass('paused');

    //     audio.pause();
    //     audio.currentTime = 0;

    //     recordStopping();

    // });

    $('.player-button-prev').click(function() {

        if ( $('li.current-track').length ) {

            armPositionReset();

            var currentTrack = $('li.current-track'),
                prev = (currentTrack.is(':first-child')) ? lastTrack : currentTrack.prev(),
                prevTrack = prev.attr('data-track'),
                prevArtwork = prev.attr('data-artwork')
            ;
            currentTrack.removeClass('current-track');

        }
        else {

            armPositionStart();

            var prev = firstTrack,
                prevTrack = prev.attr('data-track'),
                prevArtwork = prev.attr('data-artwork')
            ;
        }

        $('.player-button-play:not(.paused)').addClass('paused');
        $('.player-button-pause:not(.paused)').addClass('paused');

        prev.addClass('current-track');

        $('.vinyl-player').attr('src', prevTrack);
        $('.player-element-lp').find('image').attr('xlink:href', prevArtwork);

        audio.pause();
        audio.load();

        setTimeout(function() {
            recordPlaying();
            audio.oncanplaythrough = audio.play();
        }, 2000);

    });

    $('.player-button-next').click(function() {

        if ( $('li.current-track').length ) {

            armPositionReset();

            var currentTrack = $('li.current-track'),
                next = (currentTrack.is(':last-child')) ? firstTrack : currentTrack.next(),
                nextTrack = next.attr('data-track'),
                nextArtwork = next.attr('data-artwork')
            ;
            currentTrack.removeClass('current-track');
        }
        else {

            armPositionStart();

            var next = firstTrack,
                nextTrack = next.attr('data-track'),
                nextArtwork = next.attr('data-artwork')
            ;
        }

        $('.player-button-play:not(.paused)').addClass('paused');
        $('.player-button-pause:not(.paused)').addClass('paused');

        next.addClass('current-track');

        $('.vinyl-player').attr('src', nextTrack);
        $('.player-element-lp').find('image').attr('xlink:href', nextArtwork);

        audio.pause();
        audio.load();

        setTimeout(function() {
            recordPlaying();
            audio.oncanplaythrough = audio.play();
        }, 2000);

    });

    $('.player-playlist').find('li').click(function() {

        selectedTrack = $(this);

        if ( $('li.current-track').length ) {

            armPositionReset();

            $('li.current-track').removeClass('current-track');

            selectedTrack.addClass('current-track');

        }
        else {

            armPositionStart();

            selectedTrack.addClass('current-track');
            $('.vinyl-player').attr('src', selectedTrack.attr('data-track'));
            $('.player-element-lp').find('image').attr('xlink:href', selectedTrack.attr('data-artwork'));
        }

        $('.player-button-play:not(.paused)').addClass('paused');
        $('.player-button-pause:not(.paused)').addClass('paused');

        audio.pause();
        audio.load();

        setTimeout(function() {
            recordPlaying();
            audio.oncanplaythrough = audio.play();
        }, 1500);
    });

    // audio.addEventListener('ended', function(){

    //     var currentTrack = $('li.current-track');

    //     if (currentTrack.is(':last-child')) {

    //         currentTrack.removeClass('current-track');
    //         $('.player-button-play, .player-button-pause').removeClass('paused');

    //         audio.pause();
    //         audio.currentTime = 0;

    //         recordStopping();

    //     }
    //     else {

    //         armPositionReset();

    //         var next = currentTrack.next(),
    //             nextTrack = next.attr('data-track'),
    //             nextArtwork = next.attr('data-artwork')
    //         ;

    //         currentTrack.removeClass('current-track');
    //         next.addClass('current-track');

    //         $('.vinyl-player').attr('src', nextTrack);
    //         $('.player-element-lp').find('image').attr('xlink:href', nextArtwork);

    //         audio.pause();
    //         audio.load();

    //         setTimeout(function() {
    //             recordPlaying();
    //             audio.oncanplaythrough = audio.play();
    //         }, 3000);

    //     }

    // });

});
