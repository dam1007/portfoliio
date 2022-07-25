    window.addEventListener("load", function () {

        let loader = document.querySelector('.loader');
        let loaderText = document.querySelector('.loader-text');
        let num = 0;
        let interval = setInterval(progress, 2000/60);

        function progress(){
            num++;
            loaderText.innerText = num + '%';

            if(num > 100){
                loader.style.display = 'none';
                clearInterval(interval);
            }
        }
        

        //locomitive
        gsap.registerPlugin(ScrollTrigger);

        const pageContainer = document.querySelector("#main");
        pageContainer.setAttribute("data-scroll-container", "");

        const scroller = new LocomotiveScroll({
            el: pageContainer,
            smooth: true,
            getDirection: true,
            inertia: 0.8,
            mobile: {
                smooth: true,
                inertia: 0.8,
                getDirection: true,
            },
                tablet: {
                smooth: true,
                inertia: 0.8,
                getDirection: true,
            },
        });

        scroller.on("scroll", function (t) {
            document.documentElement.setAttribute("data-direction", t.direction);
        });

        scroller.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(pageContainer, {
            scrollTop(value) {
                return arguments.length ?
                    scroller.scrollTo(value, 0, 0) :
                    scroller.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    left: 0,
                    top: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            pinType: pageContainer.style.transform ? "transform" : "fixed"
        });

        let horizontalSections = document.querySelectorAll(".horizontal-scroll");

        horizontalSections.forEach((horizontalSection) => {
            let pinWrap = horizontalSection.querySelector(".pin-wrap");
            let pinWrapWidth = pinWrap.offsetWidth;
            let horizontalScrollLength = pinWrapWidth - window.innerWidth;
            gsap.to(pinWrap, {
                scrollTrigger: {
                    scroller: "[data-scroll-container]",
                    scrub: true,
                    trigger: horizontalSection,
                    pin: true,
                    start: "top top",
                    end: () => `+=${pinWrapWidth}`,
                    invalidateOnRefresh: true
                },
                x: -horizontalScrollLength,
                ease: "none"
            });
        });

        ScrollTrigger.addEventListener("refresh", () => scroller.update());
        ScrollTrigger.refresh();
    });
    

    //코드보기
    let btnCode = document.querySelectorAll('.view');
    let btnClose1 = document.querySelectorAll('.close');
    let codeView = document.querySelectorAll('.code-view');
    let tabmenu = document.querySelectorAll('.tab-menu .menu');
    let tabconAll = document.querySelectorAll('.tab-con');
    let tabcon = document.querySelectorAll('tab-con .con');

    //버튼 클릭 시 코드 보이게 
    btnCode.forEach((e, index) => {
        e.addEventListener('click', () => {
            codeView[index].style.display = 'block';
        });
    });
    btnClose1.forEach((e, index) => {
        e.addEventListener('click', () => {
            codeView[index].style.display = 'none';
        });
    });

    //코드보기 탭메뉴 
    tabconAll.forEach((el) => {
        el.children[0].style.display = 'block';
    });

    tabmenu.forEach((el, index) => {
        el.addEventListener('click', e => {
            e.preventDefault();
            
            let btnTarget = e.target.parentNode;
            let idx = btnTarget.dataset.indexNumber;
            //console.log(e.target,btnTarget, idx);
            for(let i = 0; i < el.children.length; i++){
                el.children[i].classList.remove('active');
                tabconAll[index].children[i].style.display = 'none';
            }
            btnTarget.classList.add('active');
            tabconAll[index].children[idx - 1].style.display = 'block';
            
        });
    });


    //section5 play 버튼 클릭 시 게임 보이기
    let btnPlay = document.querySelectorAll('.btn-play');
    let closeGame = document.querySelectorAll('.game-close');
    let article = document.querySelectorAll('.section5 .right');
    let game = document.querySelectorAll('.game');
    let dimm = document.querySelectorAll('.dimm');

    btnPlay.forEach((elem, index) => {
        btnPlay[index].addEventListener('click', () => {
            //console.log(elem, index);
            game[index].style.display = 'block';
            dimm[index].style.display = 'none';
        });
        dimm[index].style.display = 'block';
    });
    //게임창 close
    closeGame.forEach((elem, index) => {
        closeGame[index].addEventListener('click', () => {
            game[index].style.display = 'none';
            dimm[index].style.display = 'block';
        });

    });
    article.forEach((elem, index) => {
        article[index].addEventListener('click', () => {
            game[index].style.display = 'none';
            dimm[index].style.display = 'block';
        });
    });

    let element = document.querySelectorAll('iframe body');


    // section6 버튼 클릭 시 설명 show, 버튼 글자 변경
    let btnExplain = document.querySelectorAll('.section6 .explain');
    let btnClose = document.querySelectorAll('.section6 .close');
    let subcont = document.querySelectorAll('.section6 .subcont');
    let btnCode2 = document.querySelectorAll('.section6 .view');
    let codeView2 = document.querySelectorAll('.section6 .code-view');

    //설명보기
    btnExplain.forEach((el, index) => {
        el.addEventListener('click', (e) => {
            //console.log(index);
            if(!el.classList.contains('close')) {
                el.classList.add('close');
                el.innerText = '설명 닫기'; 
                subcont[index].style.display = 'block';
            } else {
                el.classList.remove('close');
                el.innerText = '설명 보기'; 
                subcont[index].style.display = 'none';
            }
            codeView2[index].style.display = 'none';
            btnCode2[index].innerText = '코드 보기'; 
        });
    });

    //코드보기
    btnCode2.forEach((el, index) => {
        el.addEventListener('click', (e) => {
            //console.log(index);
            if(!el.classList.contains('close')) {
                el.classList.add('close');
                el.innerText = '코드 닫기'; 
                codeView2[index].style.display = 'block';
            } else {
                el.classList.remove('close');
                el.innerText = '코드 보기'; 
                codeView2[index].style.display = 'none';
            }
            subcont[index].style.display = 'none';
            btnExplain[index].innerText = '설명 보기';
        });
    });


    // 창 resize 시 알림 화면
    window.addEventListener('resize', (e) => {
        let innerHeight = e.target.innerHeight;
        let full = document.getElementById('full');
        innerHeight > 640 ? full.style.display = 'none' : full.style.display = 'block';
    });