/*alert("Подключено!"); Это просто проверка подключения*/
let cursor = document.createElement("img");
$(cursor).attr("src","img/rasp.png")
         .css({
           /*"height": "50px",*/
           "height": "3rem",
           "position": "absolute",
         })
         .appendTo($("body")); /*прикрепляет в конец документа элемент cursor - appendTo*/
/*Подвесим наш созданный cursor на курсор в броузере*/
$(document).mousemove(moveCursor);

function moveCursor(e) {
  e.preventDefault();
  $(cursor).css({
    "top": (e.clientY + 5) + "px", 
    "left": (e.clientX + 5) + "px", /* Если убрать смещение +5, то при нажатии на вирус вирус не будет пропадать, т.к. клик будет срабатывать не на вирус, а на совмещенный с курсором пульверизатор, поэтому курсор и пульверизатор надо немного разнести*/
  })
}

/*"Опишем объект windowBorder с помощью jquery изменяя css*/
/*Пока с background и полностью загораживает наш первоначальный экран, потом уберем background*/
let windowBorder = document.querySelector(".windowBorder");
$(windowBorder).css({
                  "position" : "fixed",
                  "top" : "0",
                  "left" : "0",
                  "height" : document.documentElement.clientHeight,
                  "width" : document.documentElement.clientWidth,
                  /*"background" : "cyan",*/
                  /* убираем background чтобы проступил наш первоначальный экран*/
                  "overflow" : "hidden",
                })

let virusInterval = setInterval(createVirus, 500);
/*let virusInterval = setInterval(createVirus(), 500); если createVirus(), то сразу вызовется, поэтому без скобок (createVirus, 500)*/ 
let virusKilled = 0;

function createVirus() {
  if($(windowBorder).children().length >= 10) {
    return;
  }
  let virus = document.createElement("img");
  $(virus).attr("src", "img/virus.png")
          .css({
             "height" : "100px",
             "width" : "100px",
             "position" : "absolute",
             /*"top" : "150", убрал -, чтобы увидеть появляющиеся вирусы*/
             "top" : "-150", /*будут падать сверху экрана из невидимости*/
             "left" : Math.floor(Math.random() * ($(windowBorder).width() - 100)),
             /* в left вместо $(windowBorder).width() делаем ($(windowBorder).width() - 100) чтобы вирусы не вылезали за край экрана - смещаем на 100 -это ширина вируса*/
           })
           .appendTo($(windowBorder));
           
  let maxHeight = document.documentElement.clientHeight + 150;
  
  let virusDropInterval = setInterval(() => {
    let virusTop = parseInt($(virus).css("top"));
    if (virusTop < maxHeight) {
      $(virus).css("top", virusTop + 1 + "px");
    } else {
      virus.remove();
      clearInterval(virusDropInterval);
    }
    //console.log(parseInt($(virus).css("top")))
  }, 3 + Math.floor(Math.random()*17)); /*изменили интервал на random, чтобы разные вирусы могли падать с разной скоростью, раньше было просто "}, 10);" для всех*/
  //вешаем событие на наш вирус
  virus.onclick = () => { /*функция стрелка на virus.onclick*/
    /*получим координаты удаляемого вируса, чтобв на его месте пшик сделать*/
    let virusCoords = virus.getBoundingClientRect();
    let virusTop = virusCoords.y;
    let virusLeft = virusCoords.x;
    
    /*удаляем вирус*/
    virus.remove();
    /*console.log([virusTop, virusLeft]);*/
    /*создаем пшик на месте удаления вируса*/
    let pop = document.createElement("img");
    $(pop).attr("src","img/pop.gif")
          .css({
           "height" : "100px",
           "width" : "100px",
           "position" : "absolute",
           "top" : virusTop + "px",
           "left" : virusLeft + "px",
         })
         .appendTo($(windowBorder));
    /* удаляем нашу гифку pop после срабатывания с задержкой 500мс после ее вызова*/
    /* Timeout срабатывает один раз в отличие от setInterval*/
    let popTimeout = setTimeout(() => {pop.remove()}, 500)
    killVirus();
  }
}

function killVirus() {
  virusKilled++;
  $(".virusKilled").html(virusKilled);
  if (virusKilled >= 5) {
    alert("Вы победили вирус!");
    virusKilled = 0;
  }
}

