$(function () {

    var $open1 = $('#open1');
    var $open2 = $('#open2');
    var $sweetP = $('.sweet-con p');
    var $sweetH2 = $('.sweet-con h2');
    var $sweetHeader = $('.sweet-header');
    var $sweetImg = $('.sweet-img');
    var alertOnFoo = true;
    var giftOnFoo = false;
    var alertCount = 1;
    var speakOnFoo = true;

    var bgmBtn = document.getElementById('bgm-btn');
    var bgmBg = document.getElementById('bgm-bg');
    var bgmLose = document.getElementById('bgm-lose');
    var bgmWin = document.getElementById('bgm-win');


    function btnBgm() {
        bgmBtn.play();
    }
    function bgBgm() {
        bgmBg.play();
    }
    function loseBgm() {
        bgmLose.play();
    }
    function winBgm() {
        bgmWin.play();
    }

    //spake函数
    function speak(b) {
        var a = new SpeechSynthesisUtterance, c = speechSynthesis.getVoices();
        a.voice = c[6], a.voiceURI = "native", a.volume = 1, a.rate = 1, a.pitch = 1, a.text = b, a.lang = "en-US", speechSynthesis.speak(a)
    }

    //获取时间和写入
    const p = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"];
    const n = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "อาจ", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

    function getDate(h, f, k) {
        var b = new Date;
        b.setDate(b.getDate() - h);
        var j = b.getDate();
        j < 10 && (j = "0" + j);
        var c = b.getMonth(),
            g = b.getFullYear();
        return f ? p[b.getDay()] : k ? n[c] + " " + j + ", " + g : n[c] + " " + j
    }
    function addText(b, a) {
        for (var d = document.getElementsByClassName(b), c = 0; c < d.length; c++) {
            d[c].innerText = a
        }
    }
    //调用
    addText("today_readable", getDate(0, !0));

    //弹框显示的函数
    show();
    function show() {
        switch (alertCount) {
            case 1:
                $open1.show();
                $open2.show();
                alertCount++;
                break;
            case 2:
                $('.sweet-header .title').html('แจ้งให้ทราบ');
                $sweetP.html('มันว่างเปล่า <br>โปรดลองอีกครั้งคุณยังเหลืออีกสองครั้ง');
                alertCount++;

                $sweetImg.hide();
                $sweetH2.show();
                $open1.show();
                $open2.show();
                break;
            case 3:
                $open1.show();
                $open2.show();
                $sweetP.html('มันว่างเปล่า <br>โปรดลองอีกครั้งคุณเหลืออีกเพียงลองแล้ว');
                alertCount++;
                break;
            case 4:
                giftOnFoo = true;
                $sweetHeader.html('ขอแสดงความยินดี');
                $sweetP.css('paddingBottom','0.8rem');
                $sweetP.html('คุณได้เลือกกล่องของขวัญที่เหมาะสมแล้ว');

                $sweetH2.hide();
                $open1.show();
                $open2.show();
                break;
        }
    }
    //弹框隐藏的函数
    $('#open1,#open2').click(function () {

        $open1.hide();
        $open2.hide();
        spin();

        if (speakOnFoo) {
            bgBgm();
            speakOnFoo = false;
        }else {
            btnBgm();
        }

        if (alertOnFoo) {
            timer2 = setTimeout(countdown3, 4500);
            alertOnFoo = false;
        }
        if (giftOnFoo) {
            hideLast();
        }

    });

    //礼物数量倒计时
    var num = 9;
    var $giftNum = $('#gift-num');
    function countdown3() {
        num--;

        switch (num) {
            case 8:
                $giftNum.addClass('num1');
                break;
            case 7:
                $giftNum.addClass('num2');
                break;
        }
    }

    //评论部分倒计时
    setTimeout(function () {
        $('#shower1').show();
    },3000);
    setTimeout(function () {
        $('#shower2').show();
    },6000);
    setTimeout(function () {
        $('#shower3').show();
    },9000);
    //第一个页面的倒计时
    var timer = setInterval(countdown, 1000);
    function countdown() {
        var mins = parseInt(document.getElementById("mins").innerHTML);
        var secs = parseInt(document.getElementById("hsecs").innerHTML);

        var nmins = mins;
        var nsecs = secs;
        nsecs--;
        if( nsecs <= 0 && nmins != 0  ){
            nsecs = 59;
            nmins--;
        }
        else if ( nmins == 0 && nsecs == 0 ){
            clearInterval(timer);
            nmins = 0;
            nsecs = 0;
        }

        document.getElementById("mins").innerHTML = nmins;
        document.getElementById("hsecs").innerHTML = nsecs;
        if (nsecs < 10) nsecs = "0" + nsecs;
        document.getElementById("hsecs").innerHTML = nsecs;
    }

    //转盘抽奖函数
    var count = 1;
    var $dWheel = $('#wheel');
    function spin() {
        switch (count) {
            case 1:
                $dWheel.removeClass('spinAround2 transparent').addClass('spinAround');
                loseBgm();
                setTimeout(function () {
                    show();

                    setTimeout(function () {
                        alerts("เหลือ 8 ของขวัญเท่านั้น", 2500, "red");
                        var timer = setInterval(function () {
                            alerts("สวายรับบัตรของขวัญ 7-11", 2000, "blue");
                            clearInterval(timer);
                        }, 6000);
                    }, 4000);
                }, 6800);
                break;
            case 2:
                $dWheel.removeClass('spinAround').addClass('spinAround2');
                loseBgm();
                setTimeout(function () {
                    show();
                }, 7000);
                break;
            case 3:
                winBgm();
                $dWheel.removeClass('spinAround2').addClass('spinAround3');
                $sweetImg.attr('src', dir + '/123.png').css({'padding':'10px','width':'2.3rem'}).show();
                setTimeout(function () {
                    $dWheel.addClass('transparent');
                    show();

                }, 6800);
                setTimeout(function () {

                    timer3 = setTimeout(countdown3, 1200);
                    setTimeout(function () {
                        alerts("เหลือเพียง 7 ของขวัญเท่านั้น", 2500, "red");
                    },1500);

                }, 7500);
                break;
        }
        count++;
    }

    //显示礼物列表进度条处理函数
    function hideLast() {

        $('.con-middle-page1').hide();
        $('.con-middle-page2').show();
        drawszlider(10,0);

        $("#v0a").fadeIn();
        $("#v1a").fadeIn();
        $("#v1b").fadeIn();

        setTimeout(function () {
            $("#v1a").attr('src', dir + '/fb-check-min.png');
            $("#v1b").hide();
            $("#v1d").show();
            $("#v2a").show();
            $("#v2b").show();
        }, 3000);

    }

    //check进度条函数
    var slidewhere = 0;
    var holvanszlider = 0;
    var $oCmPage2 = $('.con-middle-page2');
    var $oCmPage3 = $('.con-middle-page3');
    var onFoo0 = true;
    var lastOnFoo = true;
    var drTimer = null;

    function drawszlider(ossz, meik) {
        var szazalek = Math.round((meik * 100) / ossz);
        document.getElementById("szliderbar").style.width = szazalek + "%";
        document.getElementById("szazalek").innerHTML = szazalek + "%";
        holvanszlider = meik;

        if (onFoo0) {
            slidewhere = holvanszlider + 1;
        }

        if (slidewhere > 60 && onFoo0) {
            slidewhere = 100;
            onFoo0 = false;

            $("#v2a").attr('src', dir + '/fb-check-min.png');
            $("#v2b").hide();
            $("#v2d").show();
            $("#v3a").show();
            $("#v3b").show();

            setTimeout(function () {
                $("#v3a").attr('src', dir + '/fb-check-min.png');
                $("#v3b").hide();
                $("#v3d").show();
                $("#vfinal").show();
                $("#v0a").hide();
                $("#v0b").show();

                setTimeout(function () {
                    $oCmPage2.hide();
                    $oCmPage3.show();
                    lastOnFoo = false;
                    clearTimeout(drTimer);
                    setTimeout(function () {
                        $(".v4Img").hide();
                        $(".v4Wrap").show();
                    },1500);
                },800);
            },300);
        }

        if (lastOnFoo) {
            drTimer = setTimeout(() => {
                drawszlider(100, slidewhere);
            }, 90);
        }
    }

    //红蓝弹框淡入函数
    function fadeIn(el) {
        el.style.opacity = 0;
        el.style.display = "block";

        var last = +new Date();
        var tick = function () {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
            last = +new Date();

            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };

        tick();
    }

    //红蓝弹框函数
    function alerts(text, autoclose, theme) {
        var elems = document.createElement('div');
        elems.style.opacity = 0;
        elems.innerHTML = text;
        elems.className += "notij"
        if (theme == "red") {
            elems.className += " theme_error";
        }
        if (theme == "blue") {
            elems.className += " theme_info";
        }
        document.getElementById("notij-que").appendChild(elems);
        var d = document.createElement('div');
        d.className += "notij-msg";
        d.innerHTML = elems.innerHTML;
        elems.innerHTML = "";
        elems.appendChild(d);
        fadeIn(elems);
        setTimeout(function () {
            elems.style.display = "none";
            document.getElementById("notij-que").removeChild(elems);
        }, autoclose);
    }

    setTimeout(function () {
        alerts("เหลือเพียง 9 ของขวัญเท่านั้น", 2500, "red");
        var timer = setInterval(function () {
            alerts("ซนได้รับบัตรของขวัญ", 2000, "blue");
            clearInterval(timer);
        }, 6000);
    }, 1500);

});

